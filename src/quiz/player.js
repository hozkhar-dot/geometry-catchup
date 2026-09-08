// Shared quiz player.
//
// mount(container, {
//   questions: Question[],
//   mode: 'practice' | 'checkpoint',
//   title: string,
//   timeLimitSec?: number,        // checkpoint countdown
//   target?: number,              // checkpoint pass mark
//   persist: boolean,             // write attempts to progress store
//   onFinish(summary): void,      // called once with the summary
//   backHref: string,
// })
//
// Practice: feedback and solution after every answer, optional stopwatch.
// Checkpoint: no feedback until the end, visible countdown, auto-ends at 0.
// Keyboard: 1-4 pick a choice, Enter submits / advances, Esc ends practice.

import { renderMath } from '../math.js';
import { recordAttempt } from '../progress.js';

const SLOW_MS = 90 * 1000; // a question taking longer than this is flagged in the summary

export function mountQuiz(container, opts) {
  const state = {
    i: 0,
    answers: [],            // { qid, given, correct, timeMs }
    selected: null,         // mc index or numeric string
    submitted: false,       // current question answered (practice only)
    startedAt: Date.now(),
    qStartedAt: Date.now(),
    timerId: null,
    stopwatchOn: false,
    finished: false,
  };
  const { questions, mode } = opts;
  const isCheckpoint = mode === 'checkpoint';

  function timeLeftSec() {
    if (!opts.timeLimitSec) return null;
    return Math.max(0, opts.timeLimitSec - Math.floor((Date.now() - state.startedAt) / 1000));
  }

  function fmt(sec) {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${String(s).padStart(2, '0')}`;
  }

  function tick() {
    const el = container.querySelector('#quiz-timer');
    if (!el) return;
    if (opts.timeLimitSec) {
      const left = timeLeftSec();
      el.textContent = fmt(left);
      el.classList.toggle('timer-low', left <= 60);
      if (left <= 0) finish('time');
    } else if (state.stopwatchOn) {
      el.textContent = fmt(Math.floor((Date.now() - state.startedAt) / 1000));
    }
  }

  function startTimer() {
    stopTimer();
    state.timerId = setInterval(tick, 500);
  }
  function stopTimer() {
    if (state.timerId) clearInterval(state.timerId);
    state.timerId = null;
  }

  function current() {
    return questions[state.i];
  }

  function render() {
    const q = current();
    const n = questions.length;
    container.innerHTML = `
      <div class="quiz">
        <div class="quiz-bar">
          <div class="quiz-progress" aria-label="Question ${state.i + 1} of ${n}">
            <span>Question <strong>${state.i + 1}</strong> of ${n}</span>
            <div class="bar"><div class="bar-fill" style="width:${((state.i) / n) * 100}%"></div></div>
          </div>
          <div class="quiz-timer-wrap">
            ${opts.timeLimitSec
              ? `<span class="quiz-timer" id="quiz-timer" role="timer" aria-live="off">${fmt(timeLeftSec())}</span>`
              : `<button type="button" class="btn-link" id="stopwatch-toggle" aria-pressed="${state.stopwatchOn}">${state.stopwatchOn ? 'Hide stopwatch' : 'Show stopwatch'}</button>
                 <span class="quiz-timer ${state.stopwatchOn ? '' : 'hidden'}" id="quiz-timer" role="timer" aria-live="off"></span>`}
          </div>
        </div>

        <article class="card question" aria-labelledby="q-prompt">
          <p class="q-meta small muted">${q.topic} · ${q.difficulty}</p>
          ${q.diagram ? `<figure class="q-diagram">${q.diagram}</figure>` : ''}
          <div class="q-prompt" id="q-prompt">${q.prompt}</div>
          ${q.type === 'mc' ? renderChoices(q) : renderNumeric(q)}
          <div class="q-actions">
            ${state.submitted
              ? `<button type="button" class="btn" id="next-btn">${state.i + 1 < n ? 'Next question' : 'See summary'}</button>`
              : `<button type="button" class="btn" id="submit-btn" disabled>${isCheckpoint && state.i + 1 === n ? 'Submit and finish' : 'Check answer'}</button>`}
            ${!isCheckpoint ? `<button type="button" class="btn btn-secondary" id="end-btn">End practice</button>` : ''}
          </div>
          <div class="q-feedback" id="q-feedback" aria-live="polite">${state.submitted ? renderFeedback(q) : ''}</div>
        </article>
        <p class="small muted kbd-hint">Keyboard: 1-4 pick an answer, Enter to check or continue${isCheckpoint ? '' : ', Esc to end'}.</p>
      </div>`;
    renderMath(container);
    wire(q);
  }

  function renderChoices(q) {
    const letters = ['A', 'B', 'C', 'D'];
    return `<div class="choices" role="group" aria-label="Answer choices">
      ${q.choices.map((c, idx) => {
        const cls = ['choice'];
        if (state.selected === idx) cls.push('choice-selected');
        if (state.submitted) {
          if (idx === q.answer) cls.push('choice-correct');
          else if (state.selected === idx) cls.push('choice-wrong');
        }
        return `<button type="button" class="${cls.join(' ')}" data-idx="${idx}" aria-pressed="${state.selected === idx}" ${state.submitted ? 'disabled' : ''}>
          <span class="choice-letter">${letters[idx]}</span><span class="choice-body">${c}</span>
        </button>`;
      }).join('')}
    </div>`;
  }

  function renderNumeric(q) {
    return `<div class="numeric">
      <label for="numeric-input">Your answer</label>
      <input id="numeric-input" type="text" inputmode="decimal" autocomplete="off" spellcheck="false"
        value="${state.selected ?? ''}" ${state.submitted ? 'disabled' : ''} aria-describedby="numeric-help" />
      <span id="numeric-help" class="small muted">Enter a number. Fractions like 3/4 are fine.</span>
    </div>`;
  }

  function renderFeedback(q) {
    const a = state.answers[state.i];
    const verdict = a.correct
      ? `<p class="verdict verdict-ok">Correct.</p>`
      : `<p class="verdict verdict-bad">Not quite. ${q.type === 'mc' ? `The answer is ${['A', 'B', 'C', 'D'][q.answer]}.` : `The answer is ${q.answer}.`}</p>`;
    return `${verdict}<details class="solution" open><summary>Worked solution</summary>${q.solution}</details>`;
  }

  function wire(q) {
    container.querySelectorAll('.choice').forEach((btn) => {
      btn.addEventListener('click', () => select(Number(btn.dataset.idx)));
    });
    const input = container.querySelector('#numeric-input');
    if (input) {
      input.addEventListener('input', () => {
        state.selected = input.value;
        container.querySelector('#submit-btn').disabled = input.value.trim() === '';
      });
      if (!state.submitted) input.focus();
    }
    container.querySelector('#submit-btn')?.addEventListener('click', submit);
    container.querySelector('#next-btn')?.addEventListener('click', next);
    container.querySelector('#end-btn')?.addEventListener('click', () => finish('ended'));
    container.querySelector('#stopwatch-toggle')?.addEventListener('click', () => {
      state.stopwatchOn = !state.stopwatchOn;
      render();
      tick();
    });
    if (state.submitted) container.querySelector('#next-btn')?.focus();
    else if (q.type === 'mc') container.querySelector('.choice')?.focus();
    tick();
  }

  function select(idx) {
    if (state.submitted) return;
    state.selected = idx;
    container.querySelectorAll('.choice').forEach((b) => {
      const on = Number(b.dataset.idx) === idx;
      b.classList.toggle('choice-selected', on);
      b.setAttribute('aria-pressed', on);
    });
    container.querySelector('#submit-btn').disabled = false;
  }

  function submit() {
    if (state.submitted || state.selected === null || state.selected === '') return;
    const q = current();
    const timeMs = Date.now() - state.qStartedAt;
    const correct = q.type === 'mc' ? state.selected === q.answer : numericMatch(state.selected, q.answer, q.tolerance);
    state.answers[state.i] = { qid: q.id, given: state.selected, correct, timeMs };
    if (opts.persist) recordAttempt({ qid: q.id, blockId: q.blockId, topic: q.topic, correct, timeMs });
    state.submitted = true;
    if (isCheckpoint) {
      // No feedback during a checkpoint: move straight on.
      next();
    } else {
      render();
    }
  }

  function next() {
    if (state.i + 1 >= questions.length) {
      finish('complete');
      return;
    }
    state.i += 1;
    state.selected = null;
    state.submitted = false;
    state.qStartedAt = Date.now();
    render();
  }

  function finish(reason) {
    if (state.finished) return;
    state.finished = true;
    stopTimer();
    document.removeEventListener('keydown', onKey);
    const answered = state.answers.filter(Boolean);
    const summary = {
      reason,
      mode,
      total: questions.length,
      answered: answered.length,
      correct: answered.filter((a) => a.correct).length,
      timeSec: Math.floor((Date.now() - state.startedAt) / 1000),
      byTopic: groupByTopic(questions, state.answers),
      items: questions.map((q, idx) => ({ q, a: state.answers[idx] || null })),
    };
    renderSummary(summary);
    opts.onFinish?.(summary);
  }

  function renderSummary(s) {
    const pct = s.total ? Math.round((s.correct / s.total) * 100) : 0;
    const passed = opts.target != null ? s.correct >= opts.target : null;
    const slow = s.items.filter((it) => it.a && it.a.timeMs > SLOW_MS);
    container.innerHTML = `
      <div class="quiz-summary">
        <section class="card ${passed === true ? 'card-ok' : passed === false ? 'card-accent' : ''}">
          <h2>${opts.title}: ${s.reason === 'time' ? 'time is up' : 'summary'}</h2>
          <p class="big-number">${s.correct} <span class="muted">/ ${s.total}</span> <span class="muted small">(${pct}%)</span></p>
          ${passed === true ? `<p class="verdict verdict-ok">Passed. Target was ${opts.target} of ${s.total}.</p>` : ''}
          ${passed === false ? `<p class="verdict verdict-bad">Below target (${opts.target} of ${s.total}). Repeat this block's practice set, then retake.</p>` : ''}
          <p class="small muted">Time: ${fmt(s.timeSec)}${s.answered < s.total ? ` · ${s.total - s.answered} unanswered` : ''}</p>
          <div class="btn-row">
            <a class="btn" href="${opts.backHref}">Back</a>
            <a class="btn btn-secondary" href="#/review">Open Review</a>
          </div>
        </section>

        <section class="card">
          <h3>By topic</h3>
          <div class="table-wrap"><table class="topic-table">
            <thead><tr><th scope="col">Topic</th><th scope="col">Correct</th><th scope="col">Avg time</th></tr></thead>
            <tbody>
              ${Object.entries(s.byTopic).map(([t, v]) => `<tr>
                <td>${t}</td><td>${v.correct} / ${v.total}</td><td>${fmt(Math.round(v.avgMs / 1000))}${v.avgMs > SLOW_MS ? ' <span class="pill pill-in-progress">slow</span>' : ''}</td>
              </tr>`).join('')}
            </tbody>
          </table></div>
          ${slow.length ? `<p class="small muted">${slow.length} question${slow.length === 1 ? '' : 's'} took over ${SLOW_MS / 1000 / 60} minutes. Slow topics are worth a second pass even when correct.</p>` : ''}
        </section>

        <section class="card">
          <h3>Every question</h3>
          <ol class="summary-list">
            ${s.items.map(({ q, a }) => `<li class="${a ? (a.correct ? 'sum-ok' : 'sum-bad') : 'sum-skip'}">
              <div class="sum-head"><span class="sum-mark" aria-hidden="true">${a ? (a.correct ? '✓' : '✗') : '–'}</span>
                <span class="small muted">${q.topic}${a ? ` · ${fmt(Math.round(a.timeMs / 1000))}` : ' · unanswered'}</span></div>
              ${q.diagram ? `<figure class="q-diagram q-diagram-small">${q.diagram}</figure>` : ''}
              <div class="q-prompt">${q.prompt}</div>
              ${q.type === 'mc' ? `<p class="small">Your answer: ${a ? ['A', 'B', 'C', 'D'][a.given] : 'none'} · Correct: ${['A', 'B', 'C', 'D'][q.answer]} ${q.choices[q.answer]}</p>` : `<p class="small">Your answer: ${a ? a.given : 'none'} · Correct: ${q.answer}</p>`}
              <details class="solution"><summary>Worked solution</summary>${q.solution}</details>
            </li>`).join('')}
          </ol>
        </section>
      </div>`;
    renderMath(container);
    container.querySelector('h2')?.setAttribute('tabindex', '-1');
    container.querySelector('h2')?.focus();
  }

  function onKey(e) {
    if (state.finished) return;
    const tag = document.activeElement?.tagName;
    if (e.key === 'Escape' && !isCheckpoint) { finish('ended'); return; }
    if (e.key === 'Enter') {
      if (state.submitted) { e.preventDefault(); next(); return; }
      const btn = container.querySelector('#submit-btn');
      if (btn && !btn.disabled) { e.preventDefault(); submit(); }
      return;
    }
    if (tag === 'INPUT') return;
    if (['1', '2', '3', '4'].includes(e.key) && current().type === 'mc') {
      select(Number(e.key) - 1);
    }
  }

  document.addEventListener('keydown', onKey);
  startTimer();
  render();

  return {
    destroy() {
      stopTimer();
      document.removeEventListener('keydown', onKey);
    },
  };
}

function groupByTopic(questions, answers) {
  const out = {};
  questions.forEach((q, idx) => {
    const a = answers[idx];
    if (!out[q.topic]) out[q.topic] = { total: 0, correct: 0, sumMs: 0, answered: 0, avgMs: 0 };
    const t = out[q.topic];
    t.total += 1;
    if (a) { t.answered += 1; t.sumMs += a.timeMs; if (a.correct) t.correct += 1; }
    t.avgMs = t.answered ? t.sumMs / t.answered : 0;
  });
  return out;
}

/** Accepts "3/4", "0.75", " -2 ", "12.5". Tolerance defaults to 0.01 absolute. */
export function numericMatch(givenRaw, answer, tolerance = 0.01) {
  const given = parseNumber(givenRaw);
  if (given === null || Number.isNaN(given)) return false;
  return Math.abs(given - answer) <= tolerance;
}

export function parseNumber(raw) {
  if (raw === null || raw === undefined) return null;
  const s = String(raw).trim().replace(/,/g, '');
  if (s === '') return null;
  const frac = s.match(/^(-?\d+(?:\.\d+)?)\s*\/\s*(-?\d+(?:\.\d+)?)$/);
  if (frac) {
    const d = Number(frac[2]);
    return d === 0 ? null : Number(frac[1]) / d;
  }
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
}
