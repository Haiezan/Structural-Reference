import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const websiteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const repoRoot = path.resolve(websiteRoot, '..');
const sourceRoot = path.join(repoRoot, 'ABAQUS Documents');

function splitIndex(content) {
  const copyrightMatch = content.match(/\n## .*(?:Copyright Notice|版权声明)[\s\S]*?(?=\n?###\s+|$)/);
  const copyright = copyrightMatch ? copyrightMatch[0].trim() : '';
  const body = copyrightMatch
    ? content.slice(0, copyrightMatch.index) + content.slice(copyrightMatch.index + copyrightMatch[0].length)
    : content;

  const matches = [...body.matchAll(/^###\s+(.+)$/gm)];
  if (!matches.length) return null;

  const prefix = body.slice(0, matches[0].index);
  const blocks = matches.map((match, index) => {
    const start = match.index;
    const end = index + 1 < matches.length ? matches[index + 1].index : body.length;
    return {
      heading: match[1].trim(),
      text: body.slice(start, end).trimEnd() + '\n\n'
    };
  });
  return { prefix: prefix.trimEnd() + '\n\n', blocks, copyright };
}

function isAppendixBlock(block) {
  return /^AP\d+/i.test(block.heading);
}

function appendixNumber(block) {
  const match = block.heading.match(/^AP(\d+)/i);
  return match ? Number(match[1]) : Number.MAX_SAFE_INTEGER;
}

async function main() {
  const modules = (await fs.readdir(sourceRoot, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b, 'en'));

  let changed = 0;
  for (const moduleTitle of modules) {
    const indexPath = path.join(sourceRoot, moduleTitle, 'INDEX.md');
    let content;
    try {
      content = await fs.readFile(indexPath, 'utf8');
    } catch {
      continue;
    }

    const parsed = splitIndex(content);
    if (!parsed) continue;

    const normal = parsed.blocks.filter((block) => !isAppendixBlock(block));
    const appendices = parsed.blocks.filter(isAppendixBlock).sort((a, b) => appendixNumber(a) - appendixNumber(b));
    if (!appendices.length) continue;

    const reordered =
      parsed.prefix +
      [...normal, ...appendices].map((block) => block.text).join('') +
      (parsed.copyright ? `\n${parsed.copyright}\n` : '');
    if (reordered !== content) {
      await fs.writeFile(indexPath, reordered, 'utf8');
      changed += 1;
      console.log(`${moduleTitle}: moved ${appendices.length} appendix block(s) after main sections`);
    }
  }

  console.log(`Updated ${changed} INDEX.md file(s).`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
