// Review page: every question ever missed, grouped by topic, plus a topic
// health table built from the attempt log (accuracy and average time). A
// missed question leaves the list after two correct answers on different days.

import { load } from '../progress.js';
import { blockById } from '../data/plan.js';
import { getQuestion } from '../content/index.js';
import { renderMath } from '../math.js';
import { formatShort } from '../dates.js';

const SLOW_MS = 90 * 1000;      // same threshold as the quiz summary
const WEAK_PCT = 75;            // the plan's "redo anything below 75 percent" rule
const MIN_ATTEMPTS = 3;         // do not judge a topic on one or two questions

export function reviewPage(root) {
  const state = load();
  const missed = Object.entries(state.missed).map(([qid, m]) => ({ qid, ...m, q: getQuestion(qid), ...missHistory(state, qid) }));
  const groups = {};
  for (const m of missed) (groups[m.topic || 'Other'] ||= []).push(m);
  const topics = Object.keys(groups).sort((a, b) => groups[b].length - groups[a].length || a.localeCompare(b));
  const health = topicHealth(state);
  const cleared = clearedCount(state);
  const halfway = missed.filter((m) => m.correctDates.length === 1).length;

  root.innerHTML = `
    <h1>Review</h1>
    <p class="muted">Every question you have missed, grouped by topic. A question leaves this list after you answer it correctly twice, at least a day apart.</p>

    ${missed.length === 0
      ? `<section class="card"><p>Nothing to review right now. Missed questions from practice sets and checkpoints collect here automatically.</p>
          ${cleared ? `<p class="small muted">${cleared} question${cleared === 1 ? '' : 's'} cleared so far.</p>` : ''}</section>`
      : `<section class="card card-accent">
           <p class="lead">${missed.length} question${missed.length === 1 ? '' : 's'} to retry across ${topics.length} topic${topics.length === 1 ? '' : 's'}.</p>
           <p class="small muted">${halfway ? `${halfway} answered correctly once, one more correct day clears ${halfway === 1 ? 'it' : 'them'}. ` : ''}${cleared ? `${cleared} cleared so far.` : ''}</p>
           <a class="btn" href="#/quiz/review/practice">Retry all missed questions</a>
         </section>`}

    ${health.length ? `
    <section class="card" aria-labelledby="health-h">
      <h2 id="health-h">Topic health</h2>
      <p class="small muted">From every question you have answered. Flagged: under ${WEAK_PCT}% correct, or averaging over ${SLOW_MS / 60000} minutes per question. Slow topics are worth a second pass even when correct.</p>
      <div class="table-wrap">
        <table class="topic-table">
          <thead><tr><th scope="col">Topic</th><th scope="col">Block</th><th scope="col">Correct</th><th scope="col">Avg time</th><th scope="col"></th></tr></thead>
          <tbody>
            ${health.map((h) => `<tr class="${h.flag ? 'row-flag' : ''}">
              <td>${h.topic}</td>
              <td>${h.blockId === 'demo' ? 'Demo' : h.blockId}</td>
              <td>${h.correct} / ${h.total} <span class="muted small">(${h.pct}%)</span></td>
              <td>${fmt(h.avgMs)}</td>
              <td>${h.flag === 'weak' ? '<span class="pill pill-flag">below target</span>' : h.flag === 'slow' ? '<span class="pill pill-in-progress">slow</span>' : h.total >= MIN_ATTEMPTS ? '<span class="pill pill-passed">solid</span>' : '<span class="muted small">too few to judge</span>'}</td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </section>` : ''}

    ${topics.map((t) => `
      <section class="card" aria-labelledby="topic-${slug(t)}">
        <div class="review-head">
          <h2 id="topic-${slug(t)}">${t} <span class="muted small">(${groups[t].length})</span></h2>
          <a class="btn btn-secondary btn-small" href="#/quiz/review/practice/${encodeURIComponent(t)}">Retry this topic</a>
        </div>
        <ul class="review-list">
          ${groups[t].map(reviewItem).join('')}
        </ul>
      </section>`).join('')}
  `;
  renderMath(root);
}

function reviewItem(m) {
  const block = m.blockId === 'demo' ? 'Demo' : `Block ${m.blockId}${blockById(m.blockId) ? `: ${blockById(m.blockId).title}` : ''}`;
  const progress = m.correctDates.length === 1 ? 'retried correctly once, one more day to clear' : 'not yet retried correctly';
  const when = m.lastMissed ? `last missed ${formatShort(m.lastMissed)}` : '';
  const times = m.missCount > 1 ? `missed ${m.missCount} times` : '';
  const meta = [block, m.q?.difficulty, when, times].filter(Boolean).join(' · ');
  if (!m.q) {
    return `<li><div class="small muted">${meta}</div><div class="muted">${m.qid} (question no longer available)</div></li>`;
  }
  return `<li class="review-item">
    <div class="small muted">${meta}</div>
    ${m.q.diagram ? `<figure class="q-diagram q-diagram-small">${m.q.diagram}</figure>` : ''}
    <div class="q-prompt">${m.q.prompt}</div>
    <div class="small review-progress ${m.correctDates.length ? 'review-halfway' : ''}">${progress}</div>
    <details class="solution"><summary>Worked solution</summary>${m.q.solution}</details>
  </li>`;
}

/** Last date a question was missed and how many times, from the attempt log. */
function missHistory(state, qid) {
  let lastMissed = null; let missCount = 0;
  for (const a of state.attempts) {
    if (a.qid === qid && !a.correct) { missCount += 1; if (!lastMissed || a.date > lastMissed) lastMissed = a.date; }
  }
  return { lastMissed, missCount };
}

/** Per-topic accuracy and average time across all attempts, flagged topics first. */
function topicHealth(state) {
  const by = {};
  for (const a of state.attempts) {
    const key = `${a.blockId}|${a.topic}`;
    const t = (by[key] ||= { topic: a.topic, blockId: a.blockId, total: 0, correct: 0, sumMs: 0 });
    t.total += 1; if (a.correct) t.correct += 1; t.sumMs += a.timeMs || 0;
  }
  return Object.values(by).map((t) => {
    const pct = Math.round((t.correct / t.total) * 100);
    const avgMs = t.sumMs / t.total;
    const flag = t.total >= MIN_ATTEMPTS && pct < WEAK_PCT ? 'weak' : avgMs > SLOW_MS ? 'slow' : null;
    return { ...t, pct, avgMs, flag };
  }).sort((a, b) => (b.flag ? 1 : 0) - (a.flag ? 1 : 0) || a.pct - b.pct || String(a.blockId).localeCompare(String(b.blockId)));
}

/** Questions that were missed at some point and are no longer in the review list. */
function clearedCount(state) {
  const everMissed = new Set(state.attempts.filter((a) => !a.correct).map((a) => a.qid));
  let n = 0;
  for (const qid of everMissed) if (!state.missed[qid]) n += 1;
  return n;
}

function fmt(ms) {
  const sec = Math.round(ms / 1000);
  return `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, '0')}`;
}

function slug(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-');
}
