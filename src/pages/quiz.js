import { blockById } from '../data/plan.js';
import { getBlockContent, getDemoBlock, getQuestion } from '../content/index.js';
import { load, recordCheckpoint, visitBlock } from '../progress.js';
import { mountQuiz } from '../quiz/player.js';

let active = null;

// Stop timers and keyboard listeners whenever the route changes.
window.addEventListener('hashchange', () => {
  if (active && !window.location.hash.startsWith('#/quiz/')) {
    active.destroy();
    active = null;
  }
});

/**
 * Routes:
 *   #/quiz/:blockId/practice    practice set for a block (or 'demo')
 *   #/quiz/:blockId/checkpoint  timed checkpoint for a block (or 'demo')
 *   #/quiz/review/practice      retry every missed question
 *   #/quiz/review/practice/:topic  retry missed questions in one topic
 */
export function quizPage(root, { blockId, mode, topic }) {
  active?.destroy();
  active = null;

  const isDemo = blockId === 'demo';
  const isReview = blockId === 'review';
  const block = isDemo ? getDemoBlock() : isReview ? null : blockById(blockId);

  let questions = [];
  let title = '';
  let backHref = '#/';
  if (isReview) {
    const missedMap = load().missed;
    const missed = Object.keys(missedMap).filter((qid) => !topic || missedMap[qid].topic === topic);
    questions = missed.map(getQuestion).filter(Boolean);
    title = topic ? `Retry: ${topic}` : 'Retry missed questions';
    backHref = '#/review';
    mode = 'practice';
  } else if (block) {
    const content = getBlockContent(isDemo ? 'demo' : block.id);
    questions = mode === 'checkpoint' ? content.checkpoint : content.practice;
    title = mode === 'checkpoint' ? (block.checkpoint?.label || 'Checkpoint') : `Block ${block.id} practice`;
    if (isDemo) title = mode === 'checkpoint' ? 'Demo checkpoint' : 'Demo practice';
    backHref = isDemo ? '#/settings' : `#/block/${block.id}`;
    if (!isDemo) visitBlock(block.id);
  }

  if (!block && !isReview) {
    root.innerHTML = `<section class="card"><h1>Unknown block</h1><p><a class="btn" href="#/">Back to dashboard</a></p></section>`;
    return;
  }
  if (mode === 'checkpoint' && !block?.checkpoint) {
    root.innerHTML = `<section class="card"><h1>No checkpoint for this block</h1><p><a class="btn" href="${backHref}">Back</a></p></section>`;
    return;
  }
  if (questions.length === 0) {
    root.innerHTML = `
      <nav class="crumbs" aria-label="Breadcrumb"><a href="#/">Dashboard</a> › ${title}</nav>
      <section class="card"><h1>${title}</h1>
      <p>${isReview ? 'Nothing to retry. Missed questions collect here automatically.' : 'No questions here yet. Content for this block arrives in a later build session.'}</p>
      <p><a class="btn" href="${backHref}">Back</a></p></section>`;
    return;
  }

  const isCheckpoint = mode === 'checkpoint';
  // Checkpoints use exactly the plan's question count; practice uses the whole set.
  if (isCheckpoint && block.checkpoint.questions < questions.length) {
    questions = shuffle(questions).slice(0, block.checkpoint.questions);
  }

  root.innerHTML = `
    <nav class="crumbs" aria-label="Breadcrumb"><a href="#/">Dashboard</a> › ${block ? `<a href="${backHref}">${isDemo ? 'Backup' : `Block ${block.id}`}</a>` : `<a href="#/review">Review</a>`} › ${isCheckpoint ? 'Checkpoint' : 'Practice'}</nav>
    <h1>${title}</h1>
    ${isCheckpoint ? `<p class="muted">${block.checkpoint.description}. Target ${block.checkpoint.target} of ${questions.length}. ${Math.round(block.checkpoint.timeLimitSec / 60)} minutes. No feedback until the end.</p>` : `<p class="muted">Feedback and a worked solution after each answer.</p>`}
    <div id="quiz-root"></div>`;

  active = mountQuiz(root.querySelector('#quiz-root'), {
    questions,
    mode,
    title,
    timeLimitSec: isCheckpoint ? block.checkpoint.timeLimitSec : null,
    target: isCheckpoint ? block.checkpoint.target : null,
    persist: !isDemo,
    backHref,
    onFinish(summary) {
      if (isCheckpoint && !isDemo) {
        recordCheckpoint(block.id, { score: summary.correct, total: summary.total, timeSec: summary.timeSec });
      }
    },
  });
}

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
