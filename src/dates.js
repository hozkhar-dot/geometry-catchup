import { PLAN_START, TOTAL_WEEKS } from './data/plan.js';

const DAY_MS = 24 * 60 * 60 * 1000;

export function todayISO(d = new Date()) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function parseISO(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
}

export function daysBetween(aISO, bISO) {
  return Math.round((parseISO(bISO) - parseISO(aISO)) / DAY_MS);
}

/** Week number 1..TOTAL_WEEKS for a date; 0 before the plan starts; TOTAL_WEEKS+1 after it ends. */
export function planWeek(iso = todayISO()) {
  const diff = daysBetween(PLAN_START, iso);
  if (diff < 0) return 0;
  const week = Math.floor(diff / 7) + 1;
  return week > TOTAL_WEEKS ? TOTAL_WEEKS + 1 : week;
}

export function weekStartISO(week) {
  const d = parseISO(PLAN_START);
  d.setDate(d.getDate() + (week - 1) * 7);
  return todayISO(d);
}

export function weekEndISO(week) {
  const d = parseISO(weekStartISO(week));
  d.setDate(d.getDate() + 6);
  return todayISO(d);
}

/** Monday..Sunday bounds of the calendar week containing iso. */
export function calendarWeekBounds(iso = todayISO()) {
  const d = parseISO(iso);
  const dow = (d.getDay() + 6) % 7; // Monday = 0
  const start = new Date(d);
  start.setDate(d.getDate() - dow);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  return { start: todayISO(start), end: todayISO(end) };
}

export function formatShort(iso) {
  const d = parseISO(iso);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}
