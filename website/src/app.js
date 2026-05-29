const state = {
  manifest: null,
  searchIndex: null,
  currentDoc: null,
  query: '',
  moduleFilter: 'all',
  view: localStorage.getItem('abaqus:view') || 'both',
  sidebarOpen: true
};

const app = document.querySelector('#app');

const escapeHtml = (value = '') =>
  value.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);

const slug = (value = '') =>
  value
    .toLowerCase()
    .replace(/<[^>]+>/g, '')
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/g, '');

function normalizePath(input) {
  const segments = input.split('/').filter(Boolean);
  const out = [];
  for (const segment of segments) {
    if (segment === '.') continue;
    if (segment === '..') out.pop();
    else out.push(segment);
  }
  return out.join('/');
}

function resolveAsset(doc, rawUrl) {
  if (/^(https?:|data:|#)/i.test(rawUrl)) return rawUrl;
  if (/\.md(#.*)?$/i.test(rawUrl)) {
    const clean = rawUrl.split('#')[0];
    const rel = normalizePath(`${doc.relPath.split('/').slice(0, -1).join('/')}/${clean}`);
    const lang = clean.includes('/chs/') ? 'chs' : clean.includes('/eng/') ? 'eng' : 'eng';
    const withoutLang = rel.replace(/^(eng|chs)\//, '');
    const id = state.manifest.pathMap[`${doc.moduleSlug}/${lang}/${withoutLang}`] ||
      state.manifest.pathMap[`${doc.moduleSlug}/eng/${withoutLang}`] ||
      state.manifest.pathMap[`${doc.moduleSlug}/chs/${withoutLang}`];
    return id ? `#/doc/${id}` : rawUrl;
  }
  const clean = rawUrl.replace(/^(\.\/)?(\.\.\/)?/, '');
  if (clean.includes('graphics/')) return `./public/assets/abaqus/${doc.moduleSlug}/${clean.slice(clean.indexOf('graphics/'))}`;
  return `./public/assets/abaqus/${doc.moduleSlug}/graphics/${clean.split('/').pop()}`;
}

function inlineMarkdown(text, doc) {
  return escapeHtml(text)
    .replace(/!\[([^\]]*)]\(([^)]+)\)/g, (_, alt, url) => `<img src="${resolveAsset(doc, url)}" alt="${escapeHtml(alt)}" loading="lazy">`)
    .replace(/\[([^\]]+)]\(([^)]+)\)/g, (_, label, url) => `<a href="${resolveAsset(doc, url)}">${label}</a>`)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>');
}

function renderMarkdown(markdown, doc) {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  let html = '';
  let inCode = false;
  let code = [];
  let inList = false;
  let i = 0;

  const closeList = () => {
    if (inList) {
      html += '</ul>';
      inList = false;
    }
  };

  while (i < lines.length) {
    const line = lines[i];
    if (line.trim().startsWith('```')) {
      if (inCode) {
        html += `<pre><code>${escapeHtml(code.join('\n'))}</code></pre>`;
        code = [];
        inCode = false;
      } else {
        closeList();
        inCode = true;
      }
      i += 1;
      continue;
    }
    if (inCode) {
      code.push(line);
      i += 1;
      continue;
    }

    if (/^\|.+\|$/.test(line.trim()) && i + 1 < lines.length && /^\|[\s:-]+\|/.test(lines[i + 1].trim())) {
      closeList();
      const rows = [];
      rows.push(line);
      i += 2;
      while (i < lines.length && /^\|.+\|$/.test(lines[i].trim())) {
        rows.push(lines[i]);
        i += 1;
      }
      const cells = rows.map((row) => row.trim().slice(1, -1).split('|').map((cell) => inlineMarkdown(cell.trim(), doc)));
      html += '<div class="table-wrap"><table><thead><tr>' + cells[0].map((cell) => `<th>${cell}</th>`).join('') + '</tr></thead><tbody>';
      html += cells.slice(1).map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join('')}</tr>`).join('');
      html += '</tbody></table></div>';
      continue;
    }

    const heading = line.match(/^(#{1,6})\s+(.+)$/);
    if (heading) {
      closeList();
      const level = Math.min(heading[1].length, 4);
      const text = inlineMarkdown(heading[2], doc);
      html += `<h${level} id="${slug(heading[2])}">${text}</h${level}>`;
      i += 1;
      continue;
    }

    const bullet = line.match(/^\s*[-*+]\s+(.+)$/);
    if (bullet) {
      if (!inList) {
        html += '<ul>';
        inList = true;
      }
      html += `<li>${inlineMarkdown(bullet[1], doc)}</li>`;
      i += 1;
      continue;
    }

    if (!line.trim()) {
      closeList();
      i += 1;
      continue;
    }

    closeList();
    html += `<p>${inlineMarkdown(line.trim(), doc)}</p>`;
    i += 1;
  }
  closeList();
  return html || '<p class="muted">No content available.</p>';
}

function markdownBlocks(markdown) {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  const blocks = [];
  let i = 0;

  const push = (type, blockLines) => {
    const raw = blockLines.join('\n').trim();
    if (raw) blocks.push({ type, raw, key: blockKey(raw) });
  };

  while (i < lines.length) {
    if (!lines[i].trim()) {
      i += 1;
      continue;
    }

    if (lines[i].trim().startsWith('```')) {
      const start = i;
      i += 1;
      while (i < lines.length && !lines[i].trim().startsWith('```')) i += 1;
      if (i < lines.length) i += 1;
      push('code', lines.slice(start, i));
      continue;
    }

    if (/^\|.+\|$/.test(lines[i].trim()) && i + 1 < lines.length && /^\|[\s:-]+\|/.test(lines[i + 1].trim())) {
      const start = i;
      i += 2;
      while (i < lines.length && /^\|.+\|$/.test(lines[i].trim())) i += 1;
      push('table', lines.slice(start, i));
      continue;
    }

    if (/^#{1,6}\s+\S/.test(lines[i])) {
      push('heading', [lines[i]]);
      i += 1;
      continue;
    }

    if (/^\s*[-*+]\s+/.test(lines[i])) {
      const start = i;
      while (i < lines.length && /^\s*[-*+]\s+/.test(lines[i])) i += 1;
      push('list', lines.slice(start, i));
      continue;
    }

    const start = i;
    while (
      i < lines.length &&
      lines[i].trim() &&
      !/^#{1,6}\s+\S/.test(lines[i]) &&
      !/^\s*[-*+]\s+/.test(lines[i]) &&
      !lines[i].trim().startsWith('```') &&
      !(/^\|.+\|$/.test(lines[i].trim()) && i + 1 < lines.length && /^\|[\s:-]+\|/.test(lines[i + 1].trim()))
    ) {
      i += 1;
    }
    push('paragraph', lines.slice(start, i));
  }

  return blocks;
}

function blockKey(raw) {
  const text = raw
    .replace(/^#+\s*/, '')
    .replace(/\u00a0/g, ' ')
    .trim();
  const numbered = text.match(/^(\d+(?:\.\d+)*|[A-Z](?:\.\d+)*)\b/);
  return numbered ? numbered[1] : '';
}

function renderAlignedMarkdown(english, chinese, doc) {
  const enBlocks = markdownBlocks(english);
  const zhBlocks = markdownBlocks(chinese);
  const rows = [];
  const usedZh = new Set();
  let zhCursor = 0;

  for (const enBlock of enBlocks) {
    let zhIndex = -1;
    if (enBlock.key) {
      zhIndex = zhBlocks.findIndex((block, index) => !usedZh.has(index) && block.key === enBlock.key);
    }
    if (zhIndex === -1) {
      while (zhCursor < zhBlocks.length && usedZh.has(zhCursor)) zhCursor += 1;
      if (zhCursor < zhBlocks.length) zhIndex = zhCursor;
    }

    const zhBlock = zhIndex >= 0 ? zhBlocks[zhIndex] : null;
    if (zhIndex >= 0) {
      usedZh.add(zhIndex);
      if (zhIndex === zhCursor) zhCursor += 1;
    }
    rows.push({ en: enBlock, zh: zhBlock });
  }

  zhBlocks.forEach((block, index) => {
    if (!usedZh.has(index)) rows.push({ en: null, zh: block });
  });

  return rows.map((row) => `
    <section class="aligned-row ${row.en?.type || row.zh?.type || 'paragraph'}">
      <article class="doc-column">${row.en ? renderMarkdown(row.en.raw, doc) : '<p class="muted">No matching English block.</p>'}</article>
      <article class="doc-column zh">${row.zh ? renderMarkdown(row.zh.raw, doc) : '<p class="muted">无对应中文段落。</p>'}</article>
    </section>
  `).join('');
}

function headingsFrom(markdown) {
  return markdown
    .split(/\r?\n/)
    .map((line) => line.match(/^(#{1,3})\s+(.+)$/))
    .filter(Boolean)
    .slice(0, 30)
    .map((match) => ({ level: match[1].length, text: match[2].replace(/[`*_]/g, ''), id: slug(match[2]) }));
}

async function loadManifest() {
  const res = await fetch('./public/data/manifest.json');
  if (!res.ok) throw new Error('Missing generated data. Run npm run generate in website.');
  state.manifest = await res.json();
}

async function loadDoc(id) {
  const res = await fetch(`./public/data/docs/${id}.json`);
  if (!res.ok) throw new Error(`Document not found: ${id}`);
  state.currentDoc = await res.json();
}

async function loadSearchIndex() {
  if (!state.searchIndex) {
    const res = await fetch('./public/data/search-index.json');
    state.searchIndex = await res.json();
  }
}

function moduleForDoc(id) {
  return state.manifest.modules.find((module) => module.docs.some((doc) => doc.id === id));
}

function docMeta(id) {
  for (const module of state.manifest.modules) {
    const doc = module.docs.find((item) => item.id === id);
    if (doc) return doc;
  }
  return null;
}

function renderShell(content) {
  const moduleOptions = state.manifest.modules
    .map((module) => `<option value="${module.slug}" ${state.moduleFilter === module.slug ? 'selected' : ''}>${module.title}</option>`)
    .join('');
  app.innerHTML = `
    <header class="topbar">
      <a class="brand" href="#/">
        <span class="brand-mark">A</span>
        <span><strong>ABAQUS Reference</strong><small>中英文对照文档</small></span>
      </a>
      <form class="top-search" id="topSearch">
        <input id="globalSearch" value="${escapeHtml(state.query)}" placeholder="搜索 element、contact、材料、子程序..." />
      </form>
      <nav class="top-actions">
        <button class="icon-button" id="toggleSidebar" title="切换章节导航">☰</button>
        <select id="moduleFilter" title="筛选模块">
          <option value="all">全部模块</option>
          ${moduleOptions}
        </select>
        <div class="segmented" role="group" aria-label="阅读模式">
          ${['both', 'en', 'zh'].map((view) => `<button data-view="${view}" class="${state.view === view ? 'active' : ''}">${view === 'both' ? '对照' : view.toUpperCase()}</button>`).join('')}
        </div>
      </nav>
    </header>
    ${content}
    <aside class="qr-dock" aria-label="关注和捐赠">
      <details>
        <summary>关注 / 捐赠</summary>
        <div class="qr-panel">
          <div class="qr-item">
            <strong>微信公众号</strong>
            <img src="./img/wechater.jpg" alt="微信公众号二维码" loading="lazy">
            <span>欢迎扫码关注，反馈bug</span>
          </div>
          <div class="qr-donate">
            <p>欢迎捐赠</p>
            <div>
              <figure>
                <img src="./img/wechat-QR.jpg" alt="微信捐赠二维码" loading="lazy">
                <figcaption>微信</figcaption>
              </figure>
              <figure>
                <img src="./img/alipay-QR.jpg" alt="支付宝捐赠二维码" loading="lazy">
                <figcaption>支付宝</figcaption>
              </figure>
            </div>
          </div>
        </div>
      </details>
    </aside>
  `;
  bindShell();
}

function renderHome() {
  const modules = state.manifest.modules.map((module) => `
    <a class="module-row" href="#/doc/${module.docs[0]?.id || ''}">
      <span>${module.title}</span>
      <strong>${module.count}</strong>
    </a>
  `).join('');
  renderShell(`
    <main class="home">
      <section class="intro">
        <div>
          <p class="eyebrow">ABAQUS 6.14 Documentation</p>
          <h1>结构仿真文档的中英文对照阅读站</h1>
          <p>覆盖 ${state.manifest.moduleCount} 个 ABAQUS 文档模块、${state.manifest.docCount.toLocaleString()} 篇文档。左侧章节导航，正文中英文并排阅读，支持本地关键词搜索。</p>
          <form class="hero-search" id="heroSearch">
            <input id="heroSearchInput" placeholder="输入关键词开始搜索" />
            <button>搜索</button>
          </form>
        </div>
        <div class="stats">
          <div><strong>${state.manifest.moduleCount}</strong><span>文档模块</span></div>
          <div><strong>${state.manifest.docCount.toLocaleString()}</strong><span>文档页面</span></div>
          <div><strong>EN / 中文</strong><span>并排对照</span></div>
        </div>
      </section>
      <section class="module-list">
        <h2>文档章节</h2>
        <div class="module-grid">${modules}</div>
      </section>
    </main>
  `);
  document.querySelector('#heroSearch')?.addEventListener('submit', (event) => {
    event.preventDefault();
    state.query = document.querySelector('#heroSearchInput').value.trim();
    location.hash = `#/search?q=${encodeURIComponent(state.query)}`;
  });
}

function renderSidebar(activeId) {
  if (!state.sidebarOpen) return '';
  return `<aside class="sidebar">
    ${state.manifest.modules.map((module) => {
      const isActiveModule = module.docs.some((doc) => doc.id === activeId);
      const docs = module.docs.slice(0, isActiveModule ? module.docs.length : 10).map((doc) => `
        <a class="${doc.id === activeId ? 'active' : ''}" href="#/doc/${doc.id}" title="${escapeHtml(`${doc.titleEn} / ${doc.titleZh}`)}">
          <span class="doc-link-en">${escapeHtml(doc.titleEn)}</span>
          <span class="doc-link-zh">${escapeHtml(doc.titleZh)}</span>
        </a>
      `).join('');
      return `<details ${isActiveModule ? 'open' : ''}>
        <summary>${escapeHtml(module.title)} <small>${module.count}</small></summary>
        <div class="doc-links">${docs}${!isActiveModule && module.docs.length > 10 ? '<em>打开本模块后显示全部章节</em>' : ''}</div>
      </details>`;
    }).join('')}
  </aside>`;
}

function renderDoc() {
  const doc = state.currentDoc;
  const module = moduleForDoc(doc.id);
  const index = module.docs.findIndex((item) => item.id === doc.id);
  const prev = module.docs[index - 1];
  const next = module.docs[index + 1];
  const toc = headingsFrom(doc.english || doc.chinese).map((item) => `<a class="toc-l${item.level}" href="#${item.id}">${escapeHtml(item.text)}</a>`).join('');
  const en = renderMarkdown(doc.english, doc);
  const zh = renderMarkdown(doc.chinese, doc);
  const columns = state.view === 'both'
    ? renderAlignedMarkdown(doc.english, doc.chinese, doc)
    : `<article class="doc-column single">${state.view === 'en' ? en : zh}</article>`;

  renderShell(`
    <div class="reader">
      ${renderSidebar(doc.id)}
      <main class="document">
        <div class="breadcrumbs"><a href="#/">首页</a><span>${escapeHtml(doc.moduleTitle)}</span><span>${escapeHtml(doc.relPath)}</span></div>
        <div class="doc-title">
          <h1>${escapeHtml(doc.titleEn)}</h1>
          <p>${escapeHtml(doc.titleZh)}</p>
        </div>
        <div class="doc-grid ${state.view}">${columns}</div>
        <nav class="prev-next">
          ${prev ? `<a href="#/doc/${prev.id}">← ${escapeHtml(prev.titleEn)}</a>` : '<span></span>'}
          ${next ? `<a href="#/doc/${next.id}">${escapeHtml(next.titleEn)} →</a>` : '<span></span>'}
        </nav>
      </main>
      <aside class="toc"><strong>On this page</strong>${toc || '<p class="muted">No headings</p>'}</aside>
    </div>
  `);
}

function findResults(query) {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (!terms.length) return [];
  return state.searchIndex
    .filter((item) => state.moduleFilter === 'all' || item.moduleSlug === state.moduleFilter)
    .map((item) => {
      const haystack = `${item.titleEn} ${item.titleZh} ${item.text}`.toLowerCase();
      let score = 0;
      for (const term of terms) {
        const titleHit = `${item.titleEn} ${item.titleZh}`.toLowerCase().includes(term);
        const count = haystack.split(term).length - 1;
        score += count + (titleHit ? 8 : 0);
      }
      return { ...item, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 80);
}

async function renderSearch() {
  await loadSearchIndex();
  const results = findResults(state.query);
  renderShell(`
    <main class="search-page">
      <section class="search-head">
        <h1>关键词搜索</h1>
        <p>搜索范围包含标题和正文摘要。输入中英文关键词均可，例如 <code>contact</code>、<code>UMAT</code>、<code>屈曲</code>。</p>
      </section>
      <section class="results">
        <div class="result-count">${state.query ? `${results.length} 条结果：${escapeHtml(state.query)}` : '请输入关键词'}</div>
        ${results.map((item) => {
          const text = item.text.replace(/\s+/g, ' ');
          const lower = text.toLowerCase();
          const pos = lower.indexOf(state.query.toLowerCase().split(/\s+/)[0] || '');
          const excerpt = pos > 0 ? text.slice(Math.max(0, pos - 80), pos + 260) : text.slice(0, 300);
          return `<a class="result" href="#/doc/${item.id}">
            <strong>${escapeHtml(item.titleEn)}</strong>
            <span>${escapeHtml(item.titleZh)}</span>
            <small>${escapeHtml(item.moduleTitle)}</small>
            <p>${escapeHtml(excerpt)}...</p>
          </a>`;
        }).join('')}
      </section>
    </main>
  `);
}

function bindShell() {
  document.querySelector('#topSearch')?.addEventListener('submit', (event) => {
    event.preventDefault();
    state.query = document.querySelector('#globalSearch').value.trim();
    location.hash = `#/search?q=${encodeURIComponent(state.query)}`;
  });
  document.querySelector('#moduleFilter')?.addEventListener('change', (event) => {
    state.moduleFilter = event.target.value;
    if (location.hash.startsWith('#/search')) renderSearch();
  });
  document.querySelectorAll('[data-view]').forEach((button) => {
    button.addEventListener('click', () => {
      state.view = button.dataset.view;
      localStorage.setItem('abaqus:view', state.view);
      if (state.currentDoc) renderDoc();
    });
  });
  document.querySelector('#toggleSidebar')?.addEventListener('click', () => {
    state.sidebarOpen = !state.sidebarOpen;
    if (state.currentDoc) renderDoc();
  });
}

async function route() {
  const hash = location.hash || '#/';
  const [pathPart, queryPart] = hash.slice(1).split('?');
  const params = new URLSearchParams(queryPart || '');
  state.query = params.get('q') || state.query || '';

  try {
    if (!state.manifest) await loadManifest();
    if (pathPart.startsWith('/doc/')) {
      await loadDoc(pathPart.replace('/doc/', ''));
      renderDoc();
    } else if (pathPart.startsWith('/search')) {
      state.currentDoc = null;
      await renderSearch();
    } else {
      state.currentDoc = null;
      renderHome();
    }
  } catch (error) {
    app.innerHTML = `<main class="error"><h1>加载失败</h1><p>${escapeHtml(error.message)}</p></main>`;
  }
}

window.addEventListener('hashchange', route);
route();
