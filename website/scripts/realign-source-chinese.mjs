import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const websiteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const repoRoot = path.resolve(websiteRoot, '..');
const sourceRoot = path.join(repoRoot, 'ABAQUS Documents');
const backupRoot = path.join(repoRoot, '.chs-alignment-backups', new Date().toISOString().replace(/[:.]/g, '-'));
const dryRun = process.argv.includes('--dry-run');

const relOverrides = {
  'Abaqus Analysis User\'s Guide': {
    'book01.md': 'pt01ch01s01.md',
    'pt01.md': 'book01.md'
  }
};

async function exists(file) {
  try {
    await fs.access(file);
    return true;
  } catch {
    return false;
  }
}

async function listMarkdown(dir) {
  const out = [];
  async function walk(current) {
    const entries = await fs.readdir(current, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) await walk(full);
      else if (entry.name.toLowerCase().endsWith('.md')) out.push(full);
    }
  }
  if (await exists(dir)) await walk(dir);
  return out.sort((a, b) => a.localeCompare(b, 'en', { numeric: true }));
}

function firstHeading(markdown, fallback) {
  const match = markdown.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : fallback;
}

function sectionKey(title) {
  const match = title.replace(/\u00a0/g, ' ').trim().match(/^(\d+(?:\.\d+)*)\b/);
  return match ? match[1] : '';
}

function normalizeTitle(title) {
  return title
    .replace(/\u00a0/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

function isSameContent(a, b) {
  return a.replace(/\r\n/g, '\n') === b.replace(/\r\n/g, '\n');
}

async function backupFile(moduleTitle, rel, content) {
  const target = path.join(backupRoot, moduleTitle, rel);
  await fs.mkdir(path.dirname(target), { recursive: true });
  await fs.writeFile(target, content, 'utf8');
}

async function processModule(moduleTitle) {
  const moduleDir = path.join(sourceRoot, moduleTitle);
  const engDir = path.join(moduleDir, 'eng');
  const chsDir = path.join(moduleDir, 'chs');
  if (!(await exists(engDir)) || !(await exists(chsDir))) return null;

  const engFiles = await listMarkdown(engDir);
  const chsFiles = await listMarkdown(chsDir);
  const chsRecords = [];
  for (const file of chsFiles) {
    const rel = path.relative(chsDir, file);
    const content = await fs.readFile(file, 'utf8');
    const title = firstHeading(content, rel);
    chsRecords.push({
      rel,
      content,
      title,
      titleKey: normalizeTitle(title),
      section: sectionKey(title)
    });
  }

  const chsByRel = new Map(chsRecords.map((record) => [record.rel, record]));
  const chsByTitle = new Map();
  const chsBySection = new Map();
  for (const record of chsRecords) {
    if (!chsByTitle.has(record.titleKey)) chsByTitle.set(record.titleKey, []);
    chsByTitle.get(record.titleKey).push(record);
    if (record.section) {
      if (!chsBySection.has(record.section)) chsBySection.set(record.section, []);
      chsBySection.get(record.section).push(record);
    }
  }

  const planned = [];
  const usedSources = new Set();
  const unresolved = [];

  for (const enFile of engFiles) {
    const rel = path.relative(engDir, enFile);
    const enContent = await fs.readFile(enFile, 'utf8');
    const enTitle = firstHeading(enContent, rel);
    const override = relOverrides[moduleTitle]?.[rel];
    const titleMatches = chsByTitle.get(normalizeTitle(enTitle)) || [];
    const sectionMatches = chsBySection.get(sectionKey(enTitle)) || [];
    const sameRel = chsByRel.get(rel);

    let source = override ? chsByRel.get(override) : undefined;
    if (!source && titleMatches.length === 1) source = titleMatches[0];
    if (!source && sectionMatches.length === 1) source = sectionMatches[0];
    if (!source && sameRel) source = sameRel;

    if (!source) {
      unresolved.push({ rel, enTitle });
      continue;
    }
    if (usedSources.has(source.rel) && source.rel !== rel) {
      unresolved.push({ rel, enTitle, reason: `source already used: ${source.rel}` });
      continue;
    }
    usedSources.add(source.rel);

    const current = sameRel?.content || '';
    if (!isSameContent(current, source.content)) {
      planned.push({ targetRel: rel, sourceRel: source.rel, before: current, after: source.content });
    }
  }

  if (!dryRun) {
    for (const item of planned) {
      await backupFile(moduleTitle, item.targetRel, item.before);
      const target = path.join(chsDir, item.targetRel);
      await fs.mkdir(path.dirname(target), { recursive: true });
      await fs.writeFile(target, item.after, 'utf8');
    }
  }

  return { moduleTitle, planned, unresolved };
}

async function main() {
  const modules = (await fs.readdir(sourceRoot, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b, 'en'));

  const results = [];
  for (const moduleTitle of modules) {
    const result = await processModule(moduleTitle);
    if (result) results.push(result);
  }

  const changed = results.reduce((sum, item) => sum + item.planned.length, 0);
  const unresolved = results.reduce((sum, item) => sum + item.unresolved.length, 0);
  console.log(`${dryRun ? 'Dry run' : 'Applied'}: ${changed} Chinese files realigned, ${unresolved} unresolved.`);
  if (!dryRun) console.log(`Backup: ${backupRoot}`);
  for (const result of results.filter((item) => item.planned.length || item.unresolved.length).slice(0, 20)) {
    console.log(`\n${result.moduleTitle}: ${result.planned.length} changed, ${result.unresolved.length} unresolved`);
    for (const item of result.planned.slice(0, 8)) {
      console.log(`  ${item.targetRel} <= ${item.sourceRel}`);
    }
    if (result.planned.length > 8) console.log(`  ... ${result.planned.length - 8} more`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
