import { blockById, TOTAL_WEEKS } from '../data/plan.js';
import { getBlockContent } from '../content/index.js';
import { load, visitBlock } from '../progress.js';

export function blockPage(root, { id }) {
  const b = blockById(id);
  if (!b) {
    root.innerHTML = `<section class="card"><h1>Unknown block</h1><p><a class="btn" href="#/">Back to dashboard</a></p></section>`;
    return;
  }
  visitBlock(b.id);
  const state = load();
  const p = state.blocks[b.id];
  const content = getBlockContent(b.id);
  const weeks = b.weeks.length === 1 ? `Week ${b.weeks[0]}` : `Weeks ${b.weeks[0]}-${b.weeks[b.weeks.length - 1]}`;
  const prev = b.id > 1 ? blockById(b.id - 1) : null;
  const next = b.id < 8 ? blockById(b.id + 1) : null;

  root.innerHTML = `
    <nav class="crumbs" aria-label="Breadcrumb"><a href="#/">Dashboard</a> › Block ${b.id}</nav>
    <h1>Block ${b.id}: ${b.title}</h1>
    <p class="muted">${weeks} of ${TOTAL_WEEKS}${b.checkpoint ? ` · ends with ${b.checkpoint.label}` : ''}</p>
    ${b.note ? `<p class="note">${b.note}</p>` : ''}

    <section class="card" aria-labelledby="topics-h">
      <h2 id="topics-h">Topics</h2>
      <ul class="topics">${b.topics.map((t) => `<li>${t}</li>`).join('')}</ul>
    </section>

    <section class="card" aria-labelledby="lesson-h">
      <h2 id="lesson-h">${content.lessonTitle || 'Lesson'}</h2>
      ${content.lesson ?? placeholder('Lesson', b)}
    </section>

    <section class="card" aria-labelledby="practice-h">
      <h2 id="practice-h">${content.practiceLabel || 'Practice set'}</h2>
      ${content.practice.length
        ? `<p>${content.practice.length} questions. ${content.practiceTimeLimitSec ? `${Math.round(content.practiceTimeLimitSec / 60)}-minute countdown. ` : ''}Instant feedback, solution after each answer.</p>
           <a class="btn" href="#/quiz/${b.id}/practice">Start practice</a>`
        : placeholder('Practice set', b)}
      <p class="small muted">Answered so far: ${p.practiceAnswered} · correct: ${p.practiceCorrect}</p>
    </section>

    ${b.checkpoint ? `
    <section class="card card-accent" aria-labelledby="cp-h">
      <h2 id="cp-h">${b.checkpoint.label}</h2>
      <p>${b.checkpoint.description}. ${content.checkpointNote ? content.checkpointNote + ' ' : ''}Target: ${b.checkpoint.target} of ${b.checkpoint.questions}. Time limit: ${Math.round(b.checkpoint.timeLimitSec / 60)} minutes.</p>
      ${content.checkpoint.length
        ? `<a class="btn" href="#/quiz/${b.id}/checkpoint">Start checkpoint</a>`
        : `<p class="muted small">Checkpoint questions arrive with the block content.</p>`}
      ${state.checkpoints[b.id] ? `<p class="small">Best score: ${state.checkpoints[b.id].score} / ${state.checkpoints[b.id].total} (${state.checkpoints[b.id].passed ? 'passed' : 'below target'})</p>` : ''}
    </section>` : ''}

    <section class="card" aria-labelledby="links-h">
      <h2 id="links-h">Instruction and official practice</h2>
      <p class="small muted">Videos and official questions live on these sites. This site is the practice layer.</p>
      <ul class="links">
        ${b.links.map((l) => `<li><a href="${l.url}" target="_blank" rel="noopener noreferrer">${l.label} ↗</a></li>`).join('')}
      </ul>
    </section>

    <nav class="pager" aria-label="Block navigation">
      ${prev ? `<a href="#/block/${prev.id}">← Block ${prev.id}: ${prev.title}</a>` : '<span></span>'}
      ${next ? `<a href="#/block/${next.id}">Block ${next.id}: ${next.title} →</a>` : '<span></span>'}
    </nav>
  `;
}

function placeholder(what, b) {
  return `<div class="placeholder">
    <p><strong>${what} coming soon.</strong> Block ${b.id} content is written in a later build session. The layout, progress tracking and math rendering are already live, for example:</p>
    <p><span data-tex-display="a^2 + b^2 = c^2"></span></p>
  </div>`;
}
