import { load } from '../progress.js';
import { blockById } from '../data/plan.js';
import { getQuestion } from '../content/index.js';
import { renderMath } from '../math.js';

export function reviewPage(root) {
  const state = load();
  const entries = Object.entries(state.missed);
  const groups = {};
  for (const [qid, m] of entries) {
    const key = m.topic || 'Other';
    (groups[key] ||= []).push({ qid, ...m, q: getQuestion(qid) });
  }
  const topics = Object.keys(groups).sort();

  root.innerHTML = `
    <h1>Review</h1>
    <p class="muted">Every question you have missed, grouped by topic. A question leaves this list after you answer it correctly twice, at least a day apart.</p>
    ${entries.length === 0
      ? `<section class="card"><p>Nothing to review. Missed questions from practice sets and checkpoints collect here automatically.</p></section>`
      : `<section class="card card-accent">
           <p class="lead">${entries.length} question${entries.length === 1 ? '' : 's'} to retry across ${topics.length} topic${topics.length === 1 ? '' : 's'}.</p>
           <a class="btn" href="#/quiz/review/practice">Retry missed questions</a>
         </section>
         ${topics.map((t) => `
           <section class="card">
             <h2>${t} <span class="muted small">(${groups[t].length})</span></h2>
             <ul class="review-list">
               ${groups[t].map((m) => `<li>
                 <div class="small muted">${m.blockId === 'demo' ? 'Demo' : `Block ${m.blockId}: ${blockById(m.blockId)?.title || ''}`} · ${m.correctDates.length === 1 ? 'one correct retry so far' : 'not yet retried correctly'}</div>
                 <div>${m.q ? m.q.prompt : `<span class="muted">${m.qid} (question no longer available)</span>`}</div>
               </li>`).join('')}
             </ul>
           </section>`).join('')}`}
  `;
  renderMath(root);
}
