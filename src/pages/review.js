import { load } from '../progress.js';
import { blockById } from '../data/plan.js';

export function reviewPage(root) {
  const state = load();
  const missed = Object.entries(state.missed);
  root.innerHTML = `
    <h1>Review</h1>
    <p class="muted">Every question you have missed, grouped by topic. A question leaves this list after you answer it correctly twice, at least a day apart.</p>
    <section class="card">
      ${missed.length === 0
        ? '<p>Nothing to review yet. Missed questions from practice sets and checkpoints will collect here.</p>'
        : `<p>${missed.length} question${missed.length === 1 ? '' : 's'} to retry.</p>
           <ul>${missed.map(([qid, m]) => `<li>${qid} · Block ${m.blockId} (${blockById(m.blockId)?.title || ''}) · ${m.topic}</li>`).join('')}</ul>
           <p class="muted small">The retry button arrives with the quiz player in session 2.</p>`}
    </section>`;
}
