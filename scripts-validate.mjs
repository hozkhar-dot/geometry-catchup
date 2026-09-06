// Structural validation of all registered content. Run: node scripts-validate.mjs
import { getBlockContent } from './src/content/index.js';
const blocks = { 1: getBlockContent(1), 2: getBlockContent(2) };
const ids = new Set(); let problems = 0;
const say = (m) => { problems++; console.log('PROBLEM:', m); };
for (const [bid, c] of Object.entries(blocks)) {
  for (const [setName, set] of [['practice', c.practice], ['checkpoint', c.checkpoint]]) {
    set.forEach((q, i) => {
      const tag = `block ${bid} ${setName} #${i + 1} (${q.id})`;
      if (ids.has(q.id)) say(`${tag} duplicate id`); ids.add(q.id);
      if (String(q.blockId) !== String(bid)) say(`${tag} wrong blockId`);
      if (!q.prompt || !q.solution || !q.topic) say(`${tag} missing prompt/solution/topic`);
      if (!['easy', 'medium', 'hard'].includes(q.difficulty)) say(`${tag} bad difficulty`);
      if (q.type === 'mc') {
        if (!Array.isArray(q.choices) || q.choices.length !== 4) say(`${tag} needs 4 choices`);
        if (!(Number.isInteger(q.answer) && q.answer >= 0 && q.answer < 4)) say(`${tag} bad answer index`);
        if (new Set(q.choices).size !== 4) say(`${tag} duplicate choices`);
      } else if (q.type === 'numeric') {
        if (typeof q.answer !== 'number') say(`${tag} numeric answer must be a number`);
      } else say(`${tag} unknown type`);
      for (const m of (q.prompt + q.solution + (q.choices || []).join('')).matchAll(/data-tex(?:-display)?="([^"]*)"/g)) {
        if (/(^|[^\\]);\\Rightarrow/.test(m[1])) say(`${tag} broken thin space`);
      }
    });
    // difficulty ramp: never goes from hard back to easy
    const order = { easy: 0, medium: 1, hard: 2 };
    for (let i = 1; i < set.length; i++) if (order[set[i].difficulty] < order[set[i - 1].difficulty]) say(`block ${bid} ${setName} difficulty dips at #${i + 1}`);
  }
  console.log(`block ${bid}: practice ${c.practice.length}, checkpoint ${c.checkpoint.length}, mc answer positions:`, c.practice.concat(c.checkpoint).filter(q => q.type === 'mc').map(q => q.answer).join(''));
}
console.log(problems ? `${problems} problem(s)` : 'all checks passed');
