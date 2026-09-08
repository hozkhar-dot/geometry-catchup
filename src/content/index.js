// Content registry. Real block modules (block1.js ... block8.js) are added in
// sessions 3-6 and registered here. Each module exports:
//   { lesson: string (HTML), practice: Question[], checkpoint: Question[] }
// Question shape:
//   { id, blockId, topic, difficulty: 'easy'|'medium'|'hard', type: 'mc'|'numeric',
//     prompt: HTML, diagram?: SVG string, choices?: HTML[4], answer: index|number,
//     tolerance?: number, solution: HTML }
// Math goes in <span data-tex="..."> or <span data-tex-display="...">.

import { DUMMY_QUESTIONS, DUMMY_BLOCK } from './dummy.js';
import block1 from './block1.js';
import block2 from './block2.js';
import block3 from './block3.js';
import block4 from './block4.js';
import block5 from './block5.js';
import block6 from './block6.js';
import block7 from './block7.js';
import block8 from './block8.js';

const REGISTRY = {
  1: normalize(block1),
  2: normalize(block2),
  3: normalize(block3),
  4: normalize(block4),
  5: normalize(block5),
  6: normalize(block6),
  7: normalize(block7),
  8: normalize(block8),
};

const EMPTY = { lesson: null, practice: [], checkpoint: [] };

// Authors write the correct choice first. Shuffle deterministically per
// question id so the answer position varies but stays stable across visits.
function hash(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}
function shuffleChoices(q) {
  if (q.type !== 'mc' || q.shuffled) return q;
  const idx = [0, 1, 2, 3];
  let h = hash(q.id);
  for (let i = idx.length - 1; i > 0; i--) {
    h = (Math.imul(h, 1103515245) + 12345) >>> 0;
    const j = h % (i + 1);
    [idx[i], idx[j]] = [idx[j], idx[i]];
  }
  const choices = idx.map((k) => q.choices[k]);
  return { ...q, choices, answer: idx.indexOf(q.answer), shuffled: true };
}
function normalize(content) {
  return { ...content, practice: content.practice.map(shuffleChoices), checkpoint: content.checkpoint.map(shuffleChoices) };
}

export function getBlockContent(blockId) {
  if (blockId === 'demo') return { lesson: null, practice: DUMMY_QUESTIONS, checkpoint: DUMMY_QUESTIONS };
  return REGISTRY[blockId] || EMPTY;
}

export function getDemoBlock() {
  return DUMMY_BLOCK;
}

/** Look up any question by id across all registered content. */
export function getQuestion(qid) {
  for (const key of Object.keys(REGISTRY)) {
    const c = REGISTRY[key];
    const q = c.practice.find((x) => x.id === qid) || c.checkpoint.find((x) => x.id === qid);
    if (q) return q;
  }
  return DUMMY_QUESTIONS.find((x) => x.id === qid) || null;
}
