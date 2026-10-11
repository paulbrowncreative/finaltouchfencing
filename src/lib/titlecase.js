// AP-style title case for headings. Capitalizes every word except short articles, conjunctions and
// prepositions (unless first, last or after a colon). Only ever upper-cases a first letter, so proper
// nouns, acronyms (HOA, MISS DIG, BSEED) and abbreviations (St.) are left as written.
const MINOR = new Set(['a', 'an', 'the', 'and', 'but', 'or', 'nor', 'for', 'yet', 'so', 'as', 'at', 'by', 'in', 'of', 'on', 'per', 'to', 'via', 'vs', 'vs.']);

const cap = (w) => w.replace(/^([^\p{L}\d]*)(\p{Ll})/u, (_, pre, ch) => pre + ch.toUpperCase());
const bare = (w) => w.replace(/^[^\p{L}]+|[^\p{L}.]+$/gu, '').toLowerCase();

export function titleCase(text) {
  const words = text.split(/(\s+)/);
  const idx = words.map((w, i) => (/\S/.test(w) ? i : -1)).filter((i) => i >= 0);
  const first = idx[0];
  const last = idx[idx.length - 1];
  let afterBreak = false;
  for (const i of idx) {
    const w = words[i];
    const force = i === first || i === last || afterBreak;
    const parts = w.split('-');
    // The first part of a hyphenated compound is always capitalized (On-Site, Step-by-Step).
    words[i] = parts
      .map((part, j) => (j === 0 && (force || parts.length > 1)) || !MINOR.has(bare(part)) ? cap(part) : part)
      .join('-');
    afterBreak = /[:?!]$/.test(w) || /^[—–]$/.test(w) || (/\.$/.test(w) && !/^(vs|St|Ch|Art|Mt)\.$/i.test(w));
  }
  return words.join('');
}

// Non-breaking hyphens for large headings, so compounds like "Family-Owned" never split across lines.
export const keepHyphens = (text) => text.replace(/(\p{L})-(\p{L})/gu, '$1\u2011$2');
