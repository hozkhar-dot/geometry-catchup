import { BLOCKS, TOTAL_WEEKS, SESSIONS_PER_WEEK, blockForWeek } from '../data/plan.js';
import { planWeek, weekStartISO, weekEndISO, formatShort, todayISO } from '../dates.js';
import { load, sessionsThisWeek, logStudyDay } from '../progress.js';
import { getBlockContent } from '../content/index.js';

const STATUS_LABEL = {
  'not-started': 'Not started',
  'in-progress': 'In progress',
  'passed': 'Passed checkpoint',
};

export function dashboardPage(root) {
  const state = load();
  const week = planWeek();
  const todo = nextTask(state, week);
  const streak = sessionsThisWeek();
  const reviewCount = Object.keys(state.missed).length;
  const totals = overallTotals(state);

  root.innerHTML = `
    <h1>Dashboard</h1>
    <p class="muted">${weekHeadline(week)}</p>

    <section class="grid-2">
      <div class="card card-accent" aria-labelledby="todo-h">
        <h2 id="todo-h">What to do today</h2>
        <p class="lead">${todo.text}</p>
        ${todo.href ? `<a class="btn" href="${todo.href}">${todo.cta}</a>` : ''}
        ${reviewCount && todo.href !== '#/review' ? `<p class="small muted todo-review"><a href="#/review">${reviewCount} missed question${reviewCount === 1 ? '' : 's'} waiting in Review</a></p>` : ''}
      </div>

      <div class="card" aria-labelledby="streak-h">
        <h2 id="streak-h">This week</h2>
        <p class="big-number">${streak.count} <span class="muted">/ ${streak.target} sessions</span></p>
        <div class="dots" aria-hidden="true">
          ${Array.from({ length: SESSIONS_PER_WEEK }, (_, i) =>
            `<span class="dot ${i < streak.count ? 'dot-on' : ''}"></span>`).join('')}
        </div>
        <button class="btn btn-secondary" id="log-session" type="button"
          ${state.studyDays.includes(todayISO()) ? 'disabled' : ''}>
          ${state.studyDays.includes(todayISO()) ? 'Today is logged' : 'Mark today as a study day'}
        </button>
      </div>
    </section>

    <section class="card" aria-labelledby="timeline-h">
      <h2 id="timeline-h">14-week timeline</h2>
      <ol class="timeline" aria-label="Weeks">
        ${Array.from({ length: TOTAL_WEEKS }, (_, i) => timelineCell(i + 1, week, state)).join('')}
      </ol>
      <p class="muted small">Plan runs ${formatShort(weekStartISO(1))} to ${formatShort(weekEndISO(TOTAL_WEEKS))}, 2026. Three sessions per week, 45 minutes each.</p>
    </section>

    <section aria-labelledby="blocks-h">
      <h2 id="blocks-h">Blocks</h2>
      <p class="muted small">${totals.done} of ${BLOCKS.length} blocks done · ${totals.answered} of ${totals.total} practice questions answered${totals.attempts ? ` · ${totals.accuracy}% correct overall` : ''}</p>
      <div class="block-grid">
        ${BLOCKS.map((b) => blockCard(b, state)).join('')}
      </div>
    </section>

    <section class="card" aria-labelledby="cp-h">
      <h2 id="cp-h">Checkpoints</h2>
      <div class="cp-grid">
        ${BLOCKS.filter((b) => b.checkpoint).map((b) => checkpointTile(b, state)).join('')}
      </div>
      <p class="muted small">If a checkpoint misses its target, repeat that block's practice session before moving on.</p>
    </section>
  `;

  root.querySelector('#log-session')?.addEventListener('click', () => {
    logStudyDay();
    dashboardPage(root);
  });
}

function weekHeadline(week) {
  if (week === 0) return `The plan starts ${formatShort(weekStartISO(1))}. You can preview Block 1 now.`;
  if (week > TOTAL_WEEKS) return 'The 14 weeks are complete. Keep using Review for anything still shaky.';
  const b = blockForWeek(week);
  return `Week ${week} of ${TOTAL_WEEKS} · ${b ? `Block ${b.id}: ${b.title}` : ''}`;
}

function timelineCell(w, currentWeek, state) {
  const b = blockForWeek(w);
  const status = b ? state.blocks[b.id]?.status : 'not-started';
  const cls = [
    'tl-cell',
    w === currentWeek ? 'tl-now' : '',
    w < currentWeek ? 'tl-past' : '',
    status === 'passed' ? 'tl-passed' : '',
    b && b.checkpoint && w === b.weeks[b.weeks.length - 1] ? 'tl-checkpoint' : '',
  ].join(' ');
  return `<li class="${cls}">
    <a href="#/block/${b?.id}" aria-label="Week ${w}, Block ${b?.id} ${b?.title}${w === currentWeek ? ', current week' : ''}">
      <span class="tl-week">W${w}</span>
      <span class="tl-block">B${b?.id}</span>
    </a>
  </li>`;
}

function blockCard(b, state) {
  const p = state.blocks[b.id];
  const status = p?.status || 'not-started';
  const total = getBlockContent(b.id).practice.length;
  const cp = state.checkpoints[b.id];
  const answered = Math.min(p?.practiceAnswered || 0, total);
  const pct = total ? Math.round((answered / total) * 100) : 0;
  const weeks = b.weeks.length === 1 ? `Week ${b.weeks[0]}` : `Weeks ${b.weeks[0]}-${b.weeks[b.weeks.length - 1]}`;
  return `<a class="card block-card status-${status}" href="#/block/${b.id}">
    <div class="block-card-head">
      <span class="block-num">Block ${b.id}</span>
      <span class="pill pill-${status}">${STATUS_LABEL[status]}</span>
    </div>
    <h3>${b.title}</h3>
    <p class="muted small">${weeks}${b.checkpoint ? ' · ' + b.checkpoint.label : ''}</p>
    ${total ? `<div class="bar bar-thin" aria-hidden="true"><div class="bar-fill" style="width:${pct}%"></div></div>
    <p class="small muted card-progress">Practice ${answered}/${total}${cp ? ` · ${b.checkpoint.label} ${cp.score}/${cp.total}` : ''}</p>` : `<p class="small muted card-progress">Content coming soon</p>`}
  </a>`;
}

function checkpointTile(b, state) {
  const cp = state.checkpoints[b.id];
  const target = `${b.checkpoint.target} / ${b.checkpoint.questions}`;
  if (!cp) {
    return `<div class="cp-tile">
      <div class="cp-label">${b.checkpoint.label}</div>
      <div class="cp-score muted">Not taken</div>
      <div class="small muted">Block ${b.id} · target ${target}</div>
    </div>`;
  }
  return `<div class="cp-tile ${cp.passed ? 'cp-pass' : 'cp-fail'}">
    <div class="cp-label">${b.checkpoint.label}</div>
    <div class="cp-score">${cp.score} / ${cp.total}</div>
    <div class="small muted">Block ${b.id} · target ${target} · ${cp.passed ? 'passed' : 'below target'} · ${formatShort(cp.date)}</div>
  </div>`;
}

/**
 * Picks the next task. Rule: work the first block that has not passed its
 * checkpoint (or, for blocks without one, has not been started), never
 * skipping a block. If ahead of the calendar, keep going; if behind, say so.
 */
function nextTask(state, week) {
  if (week === 0) {
    return { text: 'Nothing is due yet. Read the Block 1 lesson to get a head start.', href: '#/block/1', cta: 'Open Block 1' };
  }
  const streak = sessionsThisWeek();
  const scheduled = blockForWeek(Math.min(week, TOTAL_WEEKS));

  // First block that is not finished.
  const pending = BLOCKS.find((b) => {
    const p = state.blocks[b.id];
    if (b.checkpoint) return p?.status !== 'passed';
    // No checkpoint: finished once the practice set has been worked through.
    const practice = getBlockContent(b.id).practice;
    return practice.length === 0 || (p?.practiceAnswered || 0) < practice.length;
  });

  if (!pending) {
    return { text: 'Every block is done. Use Review to retry anything you missed.', href: '#/review', cta: 'Open Review' };
  }

  const behind = scheduled && pending.id < scheduled.id;
  const prefix = behind ? `You are on Block ${pending.id} while the calendar says Block ${scheduled.id}. Finish Block ${pending.id} first. ` : '';
  const s = state.blocks[pending.id]?.status;

  if (s === 'not-started') {
    return { text: `${prefix}Start with the Block ${pending.id} lesson: ${pending.title}.`, href: `#/block/${pending.id}`, cta: `Open Block ${pending.id}` };
  }
  if (pending.checkpoint) {
    const cp = state.checkpoints[pending.id];
    if (cp && !cp.passed) {
      return { text: `${prefix}${pending.checkpoint.label} scored ${cp.score}/${cp.total}, below the ${pending.checkpoint.target} target. Repeat the Block ${pending.id} practice set, then retake it.`, href: `#/block/${pending.id}`, cta: `Open Block ${pending.id}` };
    }
    return { text: `${prefix}Work the Block ${pending.id} practice set. When it feels solid, take ${pending.checkpoint.label}.`, href: `#/block/${pending.id}`, cta: `Open Block ${pending.id}` };
  }
  if (streak.count >= streak.target) {
    return { text: `${prefix}Three sessions logged this week. If you have time, retry missed questions in Review.`, href: '#/review', cta: 'Open Review' };
  }
  return { text: `${prefix}Continue Block ${pending.id}: ${pending.title}.`, href: `#/block/${pending.id}`, cta: `Open Block ${pending.id}` };
}

/** Overall totals for the Blocks heading. A block is done when its checkpoint is passed, or, without one, when its practice set is fully answered. */
function overallTotals(state) {
  let answered = 0, total = 0, done = 0;
  for (const b of BLOCKS) {
    const n = getBlockContent(b.id).practice.length;
    const p = state.blocks[b.id];
    total += n;
    answered += Math.min(p?.practiceAnswered || 0, n);
    if (b.checkpoint ? p?.status === 'passed' : n > 0 && (p?.practiceAnswered || 0) >= n) done += 1;
  }
  const attempts = state.attempts.length;
  const correct = state.attempts.filter((a) => a.correct).length;
  return { answered, total, done, attempts, accuracy: attempts ? Math.round((correct / attempts) * 100) : 0 };
}
