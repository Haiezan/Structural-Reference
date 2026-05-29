import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const websiteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const repoRoot = path.resolve(websiteRoot, '..');
const sourceRoot = path.join(repoRoot, 'ABAQUS Documents');
const publicRoot = path.join(websiteRoot, 'public');
const dataRoot = path.join(publicRoot, 'data');
const docsRoot = path.join(dataRoot, 'docs');
const assetsRoot = path.join(publicRoot, 'assets', 'abaqus');

const skipDirs = new Set(['.git', 'graphics']);
const skipMarkdownFiles = new Set(['jserror.md']);

function slugify(value) {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 90);
}

async function exists(file) {
  try {
    await fs.access(file);
    return true;
  } catch {
    return false;
  }
}

async function rmDir(target) {
  for (let attempt = 0; attempt < 5; attempt += 1) {
    try {
      await fs.rm(target, { recursive: true, force: true, maxRetries: 3, retryDelay: 200 });
      return;
    } catch (error) {
      if (attempt === 4) throw error;
      await new Promise((resolve) => setTimeout(resolve, 300));
    }
  }
}

async function listFiles(dir, ext = '') {
  const out = [];
  async function walk(current) {
    const entries = await fs.readdir(current, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) {
        if (!skipDirs.has(entry.name)) await walk(full);
      } else if ((!ext || entry.name.toLowerCase().endsWith(ext)) && !skipMarkdownFiles.has(entry.name.toLowerCase())) {
        out.push(full);
      }
    }
  }
  if (await exists(dir)) await walk(dir);
  return out.sort((a, b) => a.localeCompare(b, 'en'));
}

async function copyDir(source, target) {
  if (!(await exists(source))) return;
  await fs.mkdir(target, { recursive: true });
  const entries = await fs.readdir(source, { withFileTypes: true });
  for (const entry of entries) {
    const src = path.join(source, entry.name);
    const dst = path.join(target, entry.name);
    if (entry.isDirectory()) await copyDir(src, dst);
    else await fs.copyFile(src, dst);
  }
}

function firstHeading(markdown, fallback) {
  const line = markdown.split(/\r?\n/).find((item) => /^#{1,3}\s+\S/.test(item));
  return line ? line.replace(/^#+\s*/, '').trim() : fallback;
}

function normalizeTitle(value) {
  return value
    .replace(/\u00a0/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

function sectionKey(value) {
  const normalized = value.replace(/\u00a0/g, ' ').trim();
  const match = normalized.match(/^(\d+(?:\.\d+)*)\b/);
  return match ? match[1] : '';
}

function appendixKey(value) {
  const normalized = value.replace(/\u00a0/g, ' ').trim();
  const match = normalized.match(/^([A-Z])(?:\b|\.)/);
  return match ? match[1].charCodeAt(0) - 64 : 0;
}

function relFallbackOrder(rel) {
  const normalized = rel.replace(/\\/g, '/');
  if (/^book\d*\.md$/i.test(normalized)) return [0, 0, normalized];
  if (/^jserror\.md$/i.test(normalized)) return [0, 1, normalized];
  const appendix = normalized.match(/^ap(\d+)/i);
  if (appendix) return [3, Number(appendix[1]), normalized];
  return [1, 0, normalized];
}

function docOrder(rel, title) {
  const appendix = appendixKey(title);
  if (appendix) return [3, appendix, rel.replace(/\\/g, '/')];

  return relFallbackOrder(rel);
}

function compareOrder(a, b) {
  const length = Math.max(a.length, b.length);
  for (let i = 0; i < length; i += 1) {
    const av = a[i] ?? 0;
    const bv = b[i] ?? 0;
    if (typeof av === 'number' && typeof bv === 'number' && av !== bv) return av - bv;
    const text = String(av).localeCompare(String(bv), 'en', { numeric: true });
    if (text) return text;
  }
  return 0;
}

function stripMarkdown(markdown) {
  return markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[[^\]]*]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)]\([^)]*\)/g, '$1')
    .replace(/[#>*_`|~-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function searchText(en, zh, titleEn, titleZh) {
  return `${titleEn} ${titleZh} ${stripMarkdown(en)} ${stripMarkdown(zh)}`.slice(0, 14000);
}

async function indexOrderMap(moduleDir) {
  const indexPath = path.join(moduleDir, 'INDEX.md');
  if (!(await exists(indexPath))) return new Map();
  const content = await fs.readFile(indexPath, 'utf8');
  const order = new Map();
  const linkPattern = /\]\(\.\/eng\/([^)]+\.md)\)/g;
  let match;
  while ((match = linkPattern.exec(content))) {
    const rel = decodeURIComponent(match[1]).replace(/\//g, path.sep);
    if (!order.has(rel)) order.set(rel, order.size);
  }
  return order;
}

async function main() {
  await rmDir(dataRoot);
  await fs.mkdir(docsRoot, { recursive: true });
  await fs.mkdir(assetsRoot, { recursive: true });

  const moduleEntries = (await fs.readdir(sourceRoot, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory())
    .sort((a, b) => a.name.localeCompare(b.name, 'en'));

  const modules = [];
  const search = [];
  const pathMap = {};
  let totalDocs = 0;

  for (const moduleEntry of moduleEntries) {
    const moduleTitle = moduleEntry.name;
    const moduleSlug = slugify(moduleTitle);
    const moduleDir = path.join(sourceRoot, moduleTitle);
    const engDir = path.join(moduleDir, 'eng');
    const chsDir = path.join(moduleDir, 'chs');
    const engFiles = await listFiles(engDir, '.md');
    const chsFiles = await listFiles(chsDir, '.md');
    const indexOrder = await indexOrderMap(moduleDir);
    const chsRecords = [];
    for (const file of chsFiles) {
      const rel = path.relative(chsDir, file);
      const markdown = await fs.readFile(file, 'utf8');
      const title = firstHeading(markdown, rel.replace(/\.md$/i, ''));
      chsRecords.push({ rel, file, markdown, title, titleKey: normalizeTitle(title), section: sectionKey(title) });
    }
    const chsByRel = new Map(chsRecords.map((item) => [item.rel, item]));
    const chsByTitle = new Map(chsRecords.map((item) => [item.titleKey, item]));
    const chsBySection = new Map();
    for (const item of chsRecords) {
      if (!item.section) continue;
      if (!chsBySection.has(item.section)) chsBySection.set(item.section, []);
      chsBySection.get(item.section).push(item);
    }

    await copyDir(path.join(moduleDir, 'graphics'), path.join(assetsRoot, moduleSlug, 'graphics'));

    const docs = [];
    const engRecords = [];
    for (const enPath of engFiles) {
      const rel = path.relative(engDir, enPath);
      const english = await fs.readFile(enPath, 'utf8');
      const titleEn = firstHeading(english, rel.replace(/\.md$/i, ''));
      const fallback = docOrder(rel, titleEn);
      const order = fallback[0] === 0 ? [-1, ...fallback] : indexOrder.has(rel) ? [0, indexOrder.get(rel)] : [1, ...fallback];
      engRecords.push({ rel, english, titleEn, order });
    }

    for (const item of engRecords.sort((a, b) => compareOrder(a.order, b.order))) {
      const { rel, english, titleEn } = item;
      const relPosix = rel.split(path.sep).join('/');
      const baseName = relPosix.replace(/\.md$/i, '');
      const id = `${moduleSlug}--${slugify(baseName) || String(totalDocs + 1)}`;
      const sameRel = chsByRel.get(rel);
      const exactTitle = chsByTitle.get(normalizeTitle(titleEn));
      const sectionMatches = chsBySection.get(sectionKey(titleEn)) || [];
      const sectionMatch = sectionMatches.length === 1 ? sectionMatches[0] : undefined;
      const zhRecord = sameRel || exactTitle || sectionMatch;
      const chinese = zhRecord?.markdown || '';
      const titleZh = zhRecord?.title || titleEn;
      const record = {
        id,
        moduleSlug,
        moduleTitle,
        relPath: relPosix,
        zhRelPath: zhRecord?.rel?.split(path.sep).join('/') || '',
        titleEn,
        titleZh,
        hasEnglish: Boolean(english),
        hasChinese: Boolean(chinese)
      };
      docs.push(record);
      pathMap[`${moduleSlug}/eng/${relPosix}`] = id;
      if (record.zhRelPath) pathMap[`${moduleSlug}/chs/${record.zhRelPath}`] = id;
      await fs.writeFile(
        path.join(docsRoot, `${id}.json`),
        JSON.stringify({ ...record, english, chinese }),
        'utf8'
      );
      search.push({
        id,
        moduleSlug,
        moduleTitle,
        titleEn,
        titleZh,
        text: searchText(english, chinese, titleEn, titleZh)
      });
      totalDocs += 1;
    }

    modules.push({ slug: moduleSlug, title: moduleTitle, count: docs.length, docs });
  }

  const manifest = {
    generatedAt: new Date().toISOString(),
    source: 'ABAQUS Documents',
    moduleCount: modules.length,
    docCount: totalDocs,
    modules,
    pathMap
  };
  await fs.writeFile(path.join(dataRoot, 'manifest.json'), JSON.stringify(manifest), 'utf8');
  await fs.writeFile(path.join(dataRoot, 'search-index.json'), JSON.stringify(search), 'utf8');
  console.log(`Generated ${modules.length} modules and ${totalDocs} bilingual document records.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
