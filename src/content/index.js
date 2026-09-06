// Content registry. Real block modules (block1.js ... block8.js) are added in
// sessions 3-6 and registered here. Each module exports:
//   { lesson: string (HTML), practice: Question[], checkpoint: Question[] }
// Question shape:
//   { id, blockId, topic, difficulty: 'easy'|'medium'|'hard', type: 'mc'|'numeric',
//     prompt: HTML, diagram?: SVG string, choices?: HTML[4], answer: index|number,
//     tolerance?: number, solution: HTML }
// Math goes in <span data-tex="..."> or <span data-tex-display="...">.

import { DUMMY_QUESTIONS, DUMMY_BLOCK } from './dummy.js';

const REGISTRY = {
  // 1: block1, 2: block2, ... added later
};

const EMPTY = { lesson: null, practice: [], checkpoint: [] };

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
