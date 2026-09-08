// Structural validation of all registered content. Run: node scripts-validate.mjs
import katex from 'katex';
import { getBlockContent } from './src/content/index.js';
const blocks = Object.fromEntries([1, 2, 3, 4, 5, 6, 7].map((n) => [n, getBlockContent(n)]));
const ids = new Set(); let problems = 0;
const say = (m) => { problems++; console.log('PROBLEM:', m); };
const unescapeAttr = (s) => s.replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
function checkTex(html, tag) {
  for (const m of html.matchAll(/data-tex(-display)?="([^"]*)"/g)) {
    const src = unescapeAttr(m[2]);
    if (/(^|[^\\]);\\Rightarrow/.test(src)) say(`${tag} broken thin space`);
    try { katex.renderToString(src, { throwOnError: true, displayMode: !!m[1] }); }
    catch (e) { say(`${tag} KaTeX error in "${src}": ${e.message}`); }
  }
}
for (const [bid, c] of Object.entries(blocks)) {
  if (c.lesson) {
    checkTex(c.lesson, `block ${bid} lesson`);
    const words = c.lesson.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().split(' ').length;
    const svgs = (c.lesson.match(/<svg/g) || []).length;
    console.log(`block ${bid}: lesson ~${words} words, ${svgs} diagrams`);
    if (svgs < 1) say(`block ${bid} lesson has no diagram`);
  }
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
        if (/rounded|nearest/i.test(q.prompt) && !(q.tolerance > 0.01)) say(`${tag} rounded answer needs a tolerance`);
      } else say(`${tag} unknown type`);
      checkTex(q.prompt + q.solution + (q.choices || []).join(''), tag);
      if (q.diagram && !/aria-label=/.test(q.diagram)) say(`${tag} diagram lacks aria-label`);
    });
    // difficulty ramp: never goes from hard back to easy
    const order = { easy: 0, medium: 1, hard: 2 };
    for (let i = 1; i < set.length; i++) if (order[set[i].difficulty] < order[set[i - 1].difficulty]) say(`block ${bid} ${setName} difficulty dips at #${i + 1}`);
  }
  console.log(`block ${bid}: practice ${c.practice.length}, checkpoint ${c.checkpoint.length}, mc answer positions:`, c.practice.concat(c.checkpoint).filter(q => q.type === 'mc').map(q => q.answer).join(''));
}
console.log(problems ? `${problems} problem(s)` : 'all checks passed');
