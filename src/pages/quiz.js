import { blockById } from '../data/plan.js';

// Session 2 builds the real quiz player here. This is the routed shell only.
export function quizPage(root, { blockId, mode }) {
  const b = blockById(blockId);
  root.innerHTML = `
    <nav class="crumbs" aria-label="Breadcrumb"><a href="#/">Dashboard</a> › <a href="#/block/${blockId}">Block ${blockId}</a> › ${mode}</nav>
    <section class="card">
      <h1>${mode === 'checkpoint' ? (b?.checkpoint?.label || 'Checkpoint') : 'Practice'}: Block ${blockId}</h1>
      <p>The quiz player is built in session 2. Nothing to answer yet.</p>
      <p><a class="btn" href="#/block/${blockId}">Back to Block ${blockId}</a></p>
    </section>`;
}
