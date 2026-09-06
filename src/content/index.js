// Content registry. Session 1 ships placeholders only.
// Sessions 3-6 replace these with real lessons, practice sets and checkpoints,
// one module per block: src/content/block1.js ... block8.js.

export function getBlockContent(blockId) {
  return {
    lesson: null,      // HTML string once written
    practice: [],      // array of question objects
    checkpoint: [],    // array of question objects (blocks with a checkpoint only)
  };
}
