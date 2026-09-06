// Progress module. Everything lives in localStorage under one key.
// Schema is versioned so later sessions can migrate without losing data.

import { todayISO, calendarWeekBounds } from './dates.js';
import { BLOCKS, SESSIONS_PER_WEEK } from './data/plan.js';

const KEY = 'geometry-catchup:progress';
const SCHEMA_VERSION = 1;

function emptyState() {
  const blocks = {};
  for (const b of BLOCKS) {
    blocks[b.id] = { status: 'not-started', practiceAnswered: 0, practiceCorrect: 0, lastVisited: null };
  }
  return {
    version: SCHEMA_VERSION,
    createdAt: todayISO(),
    studyDays: [],        // ISO dates on which any study activity happened
    blocks,               // per-block mastery summary
    checkpoints: {},      // blockId -> { score, total, passed, date, timeSec }
    attempts: [],         // { qid, blockId, topic, correct, timeMs, date }
    missed: {},           // qid -> { blockId, topic, correctDates: [] }
  };
}

let cache = null;

export function load() {
  if (cache) return cache;
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      cache = migrate(parsed);
      return cache;
    }
  } catch (err) {
    console.warn('Could not read progress, starting fresh.', err);
  }
  cache = emptyState();
  save();
  return cache;
}

export function save() {
  try {
    localStorage.setItem(KEY, JSON.stringify(cache));
  } catch (err) {
    console.warn('Could not save progress.', err);
  }
}

function migrate(state) {
  const fresh = emptyState();
  const merged = { ...fresh, ...state, version: SCHEMA_VERSION };
  // Ensure every block has an entry even if new blocks were added later.
  merged.blocks = { ...fresh.blocks, ...(state.blocks || {}) };
  return merged;
}

export function reset() {
  cache = emptyState();
  save();
  return cache;
}

/* ---------- Mutations ---------- */

export function logStudyDay(date = todayISO()) {
  const s = load();
  if (!s.studyDays.includes(date)) {
    s.studyDays.push(date);
    s.studyDays.sort();
    save();
  }
}

export function visitBlock(blockId) {
  const s = load();
  const b = s.blocks[blockId];
  if (!b) return;
  b.lastVisited = todayISO();
  if (b.status === 'not-started') b.status = 'in-progress';
  save();
}

export function recordAttempt({ qid, blockId, topic, correct, timeMs }) {
  const s = load();
  const date = todayISO();
  s.attempts.push({ qid, blockId, topic, correct, timeMs, date });
  const b = s.blocks[blockId];
  if (b) {
    b.practiceAnswered += 1;
    if (correct) b.practiceCorrect += 1;
    if (b.status === 'not-started') b.status = 'in-progress';
  }
  if (!correct) {
    if (!s.missed[qid]) s.missed[qid] = { blockId, topic, correctDates: [] };
    else s.missed[qid].correctDates = [];
  } else if (s.missed[qid]) {
    const m = s.missed[qid];
    if (!m.correctDates.includes(date)) m.correctDates.push(date);
    // Leaves the review list after two correct answers on different days.
    if (m.correctDates.length >= 2) delete s.missed[qid];
  }
  logStudyDay(date);
  save();
}

export function recordCheckpoint(blockId, { score, total, timeSec }) {
  const s = load();
  const block = BLOCKS.find((b) => b.id === Number(blockId));
  const target = block?.checkpoint?.target ?? Math.ceil(total * 0.75);
  const passed = score >= target;
  const prev = s.checkpoints[blockId];
  // Keep the best score; always keep the latest date.
  if (!prev || score >= prev.score) {
    s.checkpoints[blockId] = { score, total, passed, date: todayISO(), timeSec };
  } else {
    prev.date = todayISO();
  }
  if (passed && s.blocks[blockId]) s.blocks[blockId].status = 'passed';
  logStudyDay();
  save();
  return passed;
}

/* ---------- Derived values ---------- */

export function sessionsThisWeek(iso = todayISO()) {
  const s = load();
  const { start, end } = calendarWeekBounds(iso);
  const count = s.studyDays.filter((d) => d >= start && d <= end).length;
  return { count, target: SESSIONS_PER_WEEK };
}

export function blockStatus(blockId) {
  return load().blocks[blockId]?.status || 'not-started';
}

/* ---------- Export / import ---------- */

export function exportJSON() {
  return JSON.stringify(load(), null, 2);
}

export function downloadExport() {
  const blob = new Blob([exportJSON()], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `geometry-progress-${todayISO()}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export function importJSON(text) {
  const parsed = JSON.parse(text);
  if (!parsed || typeof parsed !== 'object' || !parsed.blocks) {
    throw new Error('That file does not look like a progress export.');
  }
  cache = migrate(parsed);
  save();
  return cache;
}
