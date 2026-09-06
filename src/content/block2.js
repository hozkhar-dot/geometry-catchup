// Block 2: Triangles I. Pythagorean theorem, special right triangles,
// triangle inequality, side-angle relationships. All questions original.

const T = (s) => `<span data-tex="${s}"></span>`;
const D = (s) => `<div data-tex-display="${s}"></div>`;

/* ---------- Diagrams (drawn to scale unless labeled) ---------- */

const svgRight = (a, b, c) => `<svg viewBox="0 0 260 190" width="260" height="190" role="img" aria-label="Right triangle with legs ${a} and ${b} and hypotenuse ${c}">
  <polygon points="30,160 210,160 30,40" fill="none" stroke="currentColor" stroke-width="2"/>
  <rect x="30" y="144" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5"/>
  <text x="120" y="180" text-anchor="middle" font-size="14" fill="currentColor">${b}</text>
  <text x="14" y="104" text-anchor="middle" font-size="14" fill="currentColor">${a}</text>
  <text x="132" y="92" text-anchor="middle" font-size="14" fill="currentColor">${c}</text>
</svg>`;

const svg45 = `<svg viewBox="0 0 240 200" width="240" height="200" role="img" aria-label="45-45-90 triangle: legs x, hypotenuse x times root 2">
  <polygon points="30,170 170,170 30,30" fill="none" stroke="currentColor" stroke-width="2"/>
  <rect x="30" y="154" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5"/>
  <text x="100" y="190" text-anchor="middle" font-size="14" fill="currentColor">x</text>
  <text x="16" y="104" text-anchor="middle" font-size="14" fill="currentColor">x</text>
  <text x="118" y="92" text-anchor="middle" font-size="14" fill="currentColor">x√2</text>
  <text x="48" y="48" font-size="12" fill="currentColor">45°</text>
  <text x="130" y="164" font-size="12" fill="currentColor">45°</text>
</svg>`;

const svg30 = `<svg viewBox="0 0 260 200" width="260" height="200" role="img" aria-label="30-60-90 triangle: short leg x opposite 30 degrees, long leg x root 3 opposite 60 degrees, hypotenuse 2x">
  <polygon points="30,170 220,170 30,60" fill="none" stroke="currentColor" stroke-width="2"/>
  <rect x="30" y="154" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5"/>
  <text x="125" y="190" text-anchor="middle" font-size="14" fill="currentColor">x√3</text>
  <text x="16" y="120" text-anchor="middle" font-size="14" fill="currentColor">x</text>
  <text x="140" y="104" text-anchor="middle" font-size="14" fill="currentColor">2x</text>
  <text x="44" y="82" font-size="12" fill="currentColor">60°</text>
  <text x="178" y="164" font-size="12" fill="currentColor">30°</text>
</svg>`;

const svgLadder = `<svg viewBox="0 0 220 200" width="220" height="200" role="img" aria-label="Ladder leaning against a wall: ladder 10, foot 6 from the wall, height unknown">
  <line x1="40" y1="10" x2="40" y2="180" stroke="currentColor" stroke-width="3"/>
  <line x1="20" y1="180" x2="200" y2="180" stroke="currentColor" stroke-width="3"/>
  <line x1="40" y1="20" x2="160" y2="180" stroke="currentColor" stroke-width="2"/>
  <rect x="40" y="164" width="14" height="16" fill="none" stroke="currentColor" stroke-width="1.2"/>
  <text x="100" y="196" text-anchor="middle" font-size="13" fill="currentColor">6 ft</text>
  <text x="26" y="104" text-anchor="middle" font-size="13" fill="currentColor">h</text>
  <text x="112" y="92" text-anchor="middle" font-size="13" fill="currentColor">10 ft</text>
</svg>`;

const svgIsosceles = `<svg viewBox="0 0 240 200" width="240" height="200" role="img" aria-label="Isosceles triangle with equal sides 13 and base 10, height drawn to the base">
  <polygon points="60,170 160,170 110,50" fill="none" stroke="currentColor" stroke-width="2"/>
  <line x1="110" y1="50" x2="110" y2="170" stroke="currentColor" stroke-width="1.5" stroke-dasharray="5 4"/>
  <rect x="110" y="156" width="12" height="14" fill="none" stroke="currentColor" stroke-width="1.2"/>
  <text x="110" y="190" text-anchor="middle" font-size="13" fill="currentColor">10</text>
  <text x="72" y="106" text-anchor="middle" font-size="13" fill="currentColor">13</text>
  <text x="150" y="106" text-anchor="middle" font-size="13" fill="currentColor">13</text>
  <text x="122" y="104" font-size="13" fill="currentColor">h</text>
</svg>`;

/* ---------- Lesson ---------- */

const lesson = `
<p>This block is the heart of test geometry. Right triangles are everywhere on the SAT and ACT: hidden inside rectangles, squares, ladders, ramps, and later inside circles and trig problems. Three tools handle almost all of them: the Pythagorean theorem, the two special right triangles, and a feel for which side lengths are even possible.</p>

<h3>1. The Pythagorean theorem</h3>
<p>In a <strong>right triangle</strong> (one angle is ${T('90^\\circ')}), the two sides that form the right angle are the <strong>legs</strong>, and the side opposite the right angle, always the longest, is the <strong>hypotenuse</strong>. If the legs are ${T('a')} and ${T('b')} and the hypotenuse is ${T('c')}:</p>
${D('a^2 + b^2 = c^2')}
<figure class="q-diagram">${svgRight('a', 'b', 'c')}</figure>
<p>Why it works, in one picture: build a square on each side of the triangle. The two squares on the legs have exactly the same total area as the square on the hypotenuse. The formula is just that statement in symbols. It works <em>only</em> for right triangles, and ${T('c')} must be the hypotenuse; the most common error is putting a leg where ${T('c')} belongs.</p>
<p><strong>Finding the hypotenuse:</strong> square both legs, add, take the square root. <strong>Finding a leg:</strong> square the hypotenuse, subtract the square of the known leg, take the square root: ${T('b = \\sqrt{c^2 - a^2}')}.</p>

<p><strong>Worked example 1.</strong> A right triangle has legs 9 and 12. Find the hypotenuse.</p>
${D('c^2 = 9^2 + 12^2 = 81 + 144 = 225 \\;\\Rightarrow\\; c = 15')}

<p><strong>Worked example 2.</strong> A right triangle has hypotenuse 26 and one leg 10. Find the other leg.</p>
${D('b^2 = 26^2 - 10^2 = 676 - 100 = 576 \\;\\Rightarrow\\; b = 24')}
<p>Adding instead of subtracting (giving ${T('\\sqrt{776}')}) is the classic mistake. If the hypotenuse is known, subtract.</p>

<p><strong>Pythagorean triples.</strong> A few whole-number right triangles show up constantly. Learn them and you skip the arithmetic: <strong>3-4-5</strong>, <strong>5-12-13</strong>, <strong>8-15-17</strong>, <strong>7-24-25</strong>. Any multiple also works: 6-8-10, 9-12-15, 10-24-26, 15-20-25. Example 1 was a 3-4-5 scaled by 3; example 2 was a 5-12-13 scaled by 2.</p>

<p><strong>Simplifying square roots.</strong> Answers are often left as radicals. Pull out perfect-square factors: ${T('\\sqrt{50} = \\sqrt{25 \\cdot 2} = 5\\sqrt{2}')}, ${T('\\sqrt{48} = \\sqrt{16 \\cdot 3} = 4\\sqrt{3}')}, ${T('\\sqrt{72} = 6\\sqrt{2}')}. Multiple-choice answers usually appear in this simplified form, so learn to recognize it.</p>

<p><strong>The converse (classifying triangles).</strong> If the three sides satisfy ${T('a^2 + b^2 = c^2')} (with ${T('c')} the longest), the triangle is right. If ${T('a^2 + b^2 > c^2')}, the largest angle is less than ${T('90^\\circ')}: the triangle is <strong>acute</strong>. If ${T('a^2 + b^2 < c^2')}, it is <strong>obtuse</strong>. Think of it as: a long third side forces the angle opposite it to open wider.</p>

<h3>2. Special right triangles</h3>
<p>Two right triangles appear so often that their side ratios are worth memorizing. Both come straight from the Pythagorean theorem.</p>

<p><strong>45-45-90</strong> (half a square). The two legs are equal; call each ${T('x')}. Then the hypotenuse is ${T('\\sqrt{x^2 + x^2} = x\\sqrt{2}')}.</p>
<figure class="q-diagram">${svg45}</figure>
${D('\\text{leg} : \\text{leg} : \\text{hypotenuse} = x : x : x\\sqrt{2}')}
<p>Going from leg to hypotenuse: multiply by ${T('\\sqrt{2}')}. From hypotenuse to leg: divide by ${T('\\sqrt{2}')}, which is the same as multiplying by ${T('\\frac{\\sqrt{2}}{2}')}. A square with side ${T('s')} has diagonal ${T('s\\sqrt{2}')}; that is this triangle.</p>

<p><strong>30-60-90</strong> (half an equilateral triangle). Cut an equilateral triangle of side ${T('2x')} down the middle. Each half has hypotenuse ${T('2x')}, short leg ${T('x')} (half the base), and long leg ${T('\\sqrt{(2x)^2 - x^2} = \\sqrt{3x^2} = x\\sqrt{3}')}.</p>
<figure class="q-diagram">${svg30}</figure>
${D('\\text{short leg} : \\text{long leg} : \\text{hypotenuse} = x : x\\sqrt{3} : 2x')}
<p>The short leg is opposite the ${T('30^\\circ')} angle, the long leg is opposite ${T('60^\\circ')}. Always find the short leg first: hypotenuse ÷ 2, or long leg ÷ ${T('\\sqrt{3}')}. Then the other two sides follow.</p>

<p><strong>Worked example 3.</strong> A 30-60-90 triangle has hypotenuse 12. Find both legs.</p>
<p>Short leg = ${T('12 / 2 = 6')}. Long leg = ${T('6\\sqrt{3}')}. Check with Pythagoras: ${T('36 + 108 = 144 = 12^2')}. ✓</p>

<p><strong>Worked example 4.</strong> A 45-45-90 triangle has hypotenuse 10. Find a leg.</p>
${D('\\text{leg} = \\frac{10}{\\sqrt{2}} = \\frac{10\\sqrt{2}}{2} = 5\\sqrt{2}')}
<p>Multiplying top and bottom by ${T('\\sqrt{2}')} clears the root from the denominator; answer choices are written this way.</p>

<h3>3. Which side lengths are possible? The triangle inequality</h3>
<p>Three sticks make a triangle only if the two shorter ones, laid end to end, reach past the longest one. In symbols, for any triangle, <strong>the sum of any two sides is greater than the third side</strong>. It is enough to check the two shortest against the longest.</p>
<p>Turned around: if two sides are ${T('a')} and ${T('b')} (with ${T('a \\ge b')}), the third side ${T('x')} must satisfy</p>
${D('a - b < x < a + b')}
<p><strong>Worked example 5.</strong> Two sides of a triangle are 6 and 10. Which whole numbers could the third side be?</p>
<p>${T('10 - 6 < x < 10 + 6')}, so ${T('4 < x < 16')}: any integer from 5 to 15. Not 4 and not 16; the sides would lie flat.</p>

<h3>4. Sides and angles go together</h3>
<p>In any triangle, <strong>the largest angle is opposite the longest side, and the smallest angle is opposite the shortest side</strong>. If two sides are equal, the angles opposite them are equal (isosceles), and the reverse is also true. So "which angle is largest?" is answered by finding the longest side and looking across from it. The hypotenuse is the longest side of a right triangle precisely because it is opposite the largest angle.</p>

<h3>5. Word problems: finding the hidden right triangle</h3>
<p>Ladders against walls, the diagonal of a rectangle or a TV screen, a kite string, two roads meeting at right angles, the distance "as the crow flies" after going north then east: each of these is a right triangle in disguise. The wall and the ground form the right angle; the ladder is the hypotenuse. A rectangle's diagonal is the hypotenuse of a triangle whose legs are the length and width. Draw the triangle, label the right angle, decide which side is the hypotenuse, then apply the theorem.</p>
<p><strong>Checklist for this block:</strong> (1) Is there a right angle? (2) Which side is the hypotenuse? (3) Is it a special triangle (45-45-90, 30-60-90) or a known triple? (4) Compute, simplify the radical, and answer what was asked (a side, a perimeter, an area).</p>
`;

/* ---------- Practice set (20) ---------- */

const practice = [
  {
    id: 'b2-p01', blockId: 2, topic: 'Pythagorean theorem', difficulty: 'easy', type: 'numeric',
    prompt: `A right triangle has legs of length 5 and 12. Enter the length of the hypotenuse.`,
    answer: 13,
    solution: `${D('c^2 = 5^2 + 12^2 = 25 + 144 = 169 \\;\\Rightarrow\\; c = 13')}<p>This is the 5-12-13 triple.</p>`,
  },
  {
    id: 'b2-p02', blockId: 2, topic: 'Pythagorean theorem', difficulty: 'easy', type: 'mc',
    prompt: `A right triangle has hypotenuse 17 and one leg 8. What is the length of the other leg?`,
    choices: [T('15'), T('\\sqrt{353}'), T('9'), T('25')],
    answer: 0,
    solution: `<p>The hypotenuse is known, so subtract.</p>${D('b^2 = 17^2 - 8^2 = 289 - 64 = 225 \\;\\Rightarrow\\; b = 15')}<p>${T('\\sqrt{353}')} comes from adding instead of subtracting. 9 is just ${T('17 - 8')}, which is not how sides combine.</p>`,
  },
  {
    id: 'b2-p03', blockId: 2, topic: 'Pythagorean theorem', difficulty: 'easy', type: 'mc',
    prompt: `The legs of a right triangle are 2 and 3. What is the length of the hypotenuse?`,
    choices: [T('\\sqrt{13}'), T('5'), T('\\sqrt{5}'), T('13')],
    answer: 0,
    solution: `${D('c = \\sqrt{2^2 + 3^2} = \\sqrt{4 + 9} = \\sqrt{13}')}<p>${T('\\sqrt{13}')} does not simplify (13 has no perfect-square factor). 5 is the sum of the legs; 13 forgets the square root.</p>`,
  },
  {
    id: 'b2-p04', blockId: 2, topic: 'Pythagorean theorem', difficulty: 'easy', type: 'numeric',
    diagram: svgLadder,
    prompt: `A 10-foot ladder leans against a wall with its foot 6 feet from the base of the wall. Enter how high up the wall the ladder reaches, in feet.`,
    answer: 8,
    solution: `<p>The wall and ground meet at a right angle. The ladder is the hypotenuse (10), the ground distance is a leg (6).</p>${D('h^2 = 10^2 - 6^2 = 100 - 36 = 64 \\;\\Rightarrow\\; h = 8')}<p>A 6-8-10 triangle: the 3-4-5 triple doubled.</p>`,
  },
  {
    id: 'b2-p05', blockId: 2, topic: 'Special right triangles', difficulty: 'easy', type: 'mc',
    prompt: `A 45-45-90 triangle has legs of length 7. What is the length of the hypotenuse?`,
    choices: [T('7\\sqrt{2}'), T('14'), T('7'), T('7\\sqrt{3}')],
    answer: 0,
    solution: `<p>In a 45-45-90 triangle, hypotenuse = leg ${T('\\times \\sqrt{2}')}.</p>${D('7\\sqrt{2}')}<p>Check: ${T('\\sqrt{49 + 49} = \\sqrt{98} = 7\\sqrt{2}')}. 14 would be doubling, which is the 30-60-90 rule, not this one.</p>`,
  },
  {
    id: 'b2-p06', blockId: 2, topic: 'Special right triangles', difficulty: 'easy', type: 'mc',
    prompt: `In a 30-60-90 triangle, the side opposite the ${T('30^\\circ')} angle is 4. What is the length of the hypotenuse?`,
    choices: [T('8'), T('4\\sqrt{3}'), T('4\\sqrt{2}'), T('12')],
    answer: 0,
    solution: `<p>The side opposite ${T('30^\\circ')} is the short leg. The hypotenuse is twice the short leg.</p>${D('2 \\cdot 4 = 8')}<p>${T('4\\sqrt{3}')} is the long leg, not the hypotenuse.</p>`,
  },
  {
    id: 'b2-p07', blockId: 2, topic: 'Special right triangles', difficulty: 'easy', type: 'numeric',
    prompt: `A 45-45-90 triangle has hypotenuse ${T('6\\sqrt{2}')}. Enter the length of one leg.`,
    answer: 6,
    solution: `<p>Leg = hypotenuse ${T('\\div \\sqrt{2}')}.</p>${D('\\frac{6\\sqrt{2}}{\\sqrt{2}} = 6')}`,
  },
  {
    id: 'b2-p08', blockId: 2, topic: 'Special right triangles', difficulty: 'medium', type: 'mc',
    prompt: `A 30-60-90 triangle has hypotenuse 10. What is the length of the longer leg?`,
    choices: [T('5\\sqrt{3}'), T('5'), T('10\\sqrt{3}'), T('5\\sqrt{2}')],
    answer: 0,
    solution: `<p>Short leg first: ${T('10 / 2 = 5')}. Long leg = short leg ${T('\\times \\sqrt{3}')}.</p>${D('5\\sqrt{3}')}<p>5 is the short leg. ${T('10\\sqrt{3}')} multiplies the hypotenuse by ${T('\\sqrt{3}')} instead of the short leg.</p>`,
  },
  {
    id: 'b2-p09', blockId: 2, topic: 'Triangle inequality', difficulty: 'medium', type: 'mc',
    prompt: `Which set of lengths can be the three sides of a triangle?`,
    choices: [T('6,\\ 8,\\ 13'), T('3,\\ 4,\\ 8'), T('5,\\ 5,\\ 10'), T('2,\\ 9,\\ 12')],
    answer: 0,
    solution: `<p>Check that the two shorter sides add to more than the longest.</p><ul><li>${T('6 + 8 = 14 > 13')} ✓</li><li>${T('3 + 4 = 7 < 8')} ✗</li><li>${T('5 + 5 = 10')}, not greater than 10 ✗ (the sides lie flat)</li><li>${T('2 + 9 = 11 < 12')} ✗</li></ul>`,
  },
  {
    id: 'b2-p10', blockId: 2, topic: 'Triangle inequality', difficulty: 'medium', type: 'mc',
    prompt: `Two sides of a triangle have lengths 5 and 9. Which of the following could be the length of the third side?`,
    choices: [T('13'), T('4'), T('14'), T('15')],
    answer: 0,
    solution: `<p>The third side must be strictly between the difference and the sum of the other two.</p>${D('9 - 5 < x < 9 + 5 \\;\\Rightarrow\\; 4 < x < 14')}<p>Only 13 is in that range. 4 and 14 are the endpoints, which are not allowed.</p>`,
  },
  {
    id: 'b2-p11', blockId: 2, topic: 'Pythagorean theorem', difficulty: 'medium', type: 'mc',
    prompt: `A triangle has sides 7, 8 and 12. Which best describes it?`,
    choices: ['Obtuse', 'Right', 'Acute', 'Not a possible triangle'],
    answer: 0,
    solution: `<p>It is a valid triangle (${T('7 + 8 > 12')}). Compare the squares, with 12 as the longest side.</p>${D('7^2 + 8^2 = 49 + 64 = 113 \\quad\\text{vs}\\quad 12^2 = 144')}<p>${T('113 < 144')}, so the angle opposite the 12 is more than ${T('90^\\circ')}: obtuse.</p>`,
  },
  {
    id: 'b2-p12', blockId: 2, topic: 'Side-angle relationships', difficulty: 'medium', type: 'mc',
    prompt: `In triangle ${T('ABC')}, ${T('AB = 9')}, ${T('BC = 5')} and ${T('AC = 7')}. Which angle is the largest?`,
    choices: [T('\\angle C'), T('\\angle A'), T('\\angle B'), 'Cannot be determined'],
    answer: 0,
    solution: `<p>The largest angle is opposite the longest side. The longest side is ${T('AB = 9')}. The angle opposite side ${T('AB')} is the one at the vertex not on that side: ${T('C')}.</p><p>Tip: the side's name lists the two vertices it touches; the missing letter is the angle across from it.</p>`,
  },
  {
    id: 'b2-p13', blockId: 2, topic: 'Pythagorean theorem', difficulty: 'medium', type: 'numeric',
    prompt: `A rectangle is 9 units by 12 units. Enter the length of its diagonal.`,
    answer: 15,
    solution: `<p>The diagonal splits the rectangle into two right triangles with legs 9 and 12.</p>${D('d = \\sqrt{9^2 + 12^2} = \\sqrt{81 + 144} = \\sqrt{225} = 15')}<p>A 3-4-5 triple scaled by 3.</p>`,
  },
  {
    id: 'b2-p14', blockId: 2, topic: 'Special right triangles', difficulty: 'medium', type: 'numeric',
    prompt: `A square has a diagonal of length 10. Enter the area of the square.`,
    answer: 50,
    solution: `<p>The diagonal of a square with side ${T('s')} is ${T('s\\sqrt{2}')}.</p>${D('s\\sqrt{2} = 10 \\;\\Rightarrow\\; s = \\frac{10}{\\sqrt{2}} \\;\\Rightarrow\\; s^2 = \\frac{100}{2} = 50')}<p>You never need ${T('s')} itself; the area is ${T('s^2')}. Shortcut: a square's area is half the diagonal squared, ${T('d^2 / 2')}.</p>`,
  },
  {
    id: 'b2-p15', blockId: 2, topic: 'Special right triangles', difficulty: 'hard', type: 'mc',
    prompt: `An equilateral triangle has sides of length 8. What is its height?`,
    choices: [T('4\\sqrt{3}'), T('8\\sqrt{3}'), T('4'), T('4\\sqrt{2}')],
    answer: 0,
    solution: `<p>The height splits the equilateral triangle into two 30-60-90 triangles with hypotenuse 8 and short leg 4 (half the base). The height is the long leg.</p>${D('h = 4\\sqrt{3}')}<p>Check: ${T('4^2 + (4\\sqrt{3})^2 = 16 + 48 = 64 = 8^2')}.</p>`,
  },
  {
    id: 'b2-p16', blockId: 2, topic: 'Special right triangles', difficulty: 'hard', type: 'mc',
    prompt: `A 45-45-90 triangle has hypotenuse 9. What is the length of each leg?`,
    choices: [T('\\dfrac{9\\sqrt{2}}{2}'), T('9\\sqrt{2}'), T('\\dfrac{9}{2}'), T('3\\sqrt{2}')],
    answer: 0,
    solution: `${D('\\text{leg} = \\frac{9}{\\sqrt{2}} = \\frac{9}{\\sqrt{2}} \\cdot \\frac{\\sqrt{2}}{\\sqrt{2}} = \\frac{9\\sqrt{2}}{2}')}<p>${T('9\\sqrt{2}')} multiplies instead of dividing (that would make the leg longer than the hypotenuse, impossible).</p>`,
  },
  {
    id: 'b2-p17', blockId: 2, topic: 'Pythagorean theorem', difficulty: 'hard', type: 'numeric',
    prompt: `Two boats leave the same dock. One travels 15 km due north and stops. The other travels 36 km due east and stops. Enter the straight-line distance between the boats, in km.`,
    answer: 39,
    solution: `<p>North and east are perpendicular, so the dock is the right angle and the distance between the boats is the hypotenuse.</p>${D('d = \\sqrt{15^2 + 36^2} = \\sqrt{225 + 1296} = \\sqrt{1521} = 39')}<p>This is the 5-12-13 triple scaled by 3.</p>`,
  },
  {
    id: 'b2-p18', blockId: 2, topic: 'Special right triangles', difficulty: 'hard', type: 'mc',
    prompt: `In a 30-60-90 triangle, the longer leg has length 9. What is the length of the hypotenuse?`,
    choices: [T('6\\sqrt{3}'), T('18'), T('9\\sqrt{3}'), T('3\\sqrt{3}')],
    answer: 0,
    solution: `<p>Find the short leg first: long leg ${T('= x\\sqrt{3} = 9')}, so</p>${D('x = \\frac{9}{\\sqrt{3}} = \\frac{9\\sqrt{3}}{3} = 3\\sqrt{3}')}<p>Hypotenuse ${T('= 2x = 6\\sqrt{3}')}. Choosing 18 treats 9 as the short leg. ${T('3\\sqrt{3}')} is the short leg, not the hypotenuse.</p>`,
  },
  {
    id: 'b2-p19', blockId: 2, topic: 'Pythagorean theorem', difficulty: 'hard', type: 'numeric',
    diagram: svgIsosceles,
    prompt: `An isosceles triangle has two sides of length 13 and a base of length 10. Enter the area of the triangle.`,
    answer: 60,
    solution: `<p>The height to the base splits it into two right triangles, each with hypotenuse 13 and one leg 5 (half of 10).</p>${D('h = \\sqrt{13^2 - 5^2} = \\sqrt{169 - 25} = \\sqrt{144} = 12')}${D('\\text{Area} = \\tfrac{1}{2} \\cdot 10 \\cdot 12 = 60')}<p>Using 13 as the height (giving 65) is the trap; 13 is a slanted side, not the height.</p>`,
  },
  {
    id: 'b2-p20', blockId: 2, topic: 'Pythagorean theorem', difficulty: 'hard', type: 'mc',
    prompt: `The legs of a right triangle are ${T('x')} and ${T('x + 7')}, and the hypotenuse is ${T('x + 8')}. What is the perimeter of the triangle?`,
    choices: [T('30'), T('25'), T('13'), T('60')],
    answer: 0,
    solution: `${D('x^2 + (x + 7)^2 = (x + 8)^2')}${D('x^2 + x^2 + 14x + 49 = x^2 + 16x + 64')}${D('x^2 - 2x - 15 = 0 \\;\\Rightarrow\\; (x - 5)(x + 3) = 0 \\;\\Rightarrow\\; x = 5')}<p>(${T('x = -3')} is rejected: a length cannot be negative.) The sides are 5, 12, 13, and the perimeter is ${T('5 + 12 + 13 = 30')}. Choosing 13 answers with the hypotenuse instead of the perimeter.</p>`,
  },
];

/* ---------- Checkpoint 1 (10, timed, Pythagorean and special triangles) ---------- */

const checkpoint = [
  {
    id: 'b2-c01', blockId: 2, topic: 'Pythagorean theorem', difficulty: 'easy', type: 'mc',
    prompt: `A right triangle has legs 9 and 40. What is the length of the hypotenuse?`,
    choices: [T('41'), T('49'), T('31'), T('\\sqrt{1519}')],
    answer: 0,
    solution: `${D('c = \\sqrt{9^2 + 40^2} = \\sqrt{81 + 1600} = \\sqrt{1681} = 41')}<p>49 is the sum of the legs; ${T('\\sqrt{1519}')} comes from subtracting.</p>`,
  },
  {
    id: 'b2-c02', blockId: 2, topic: 'Pythagorean theorem', difficulty: 'easy', type: 'numeric',
    prompt: `A right triangle has hypotenuse 25 and one leg 7. Enter the length of the other leg.`,
    answer: 24,
    solution: `${D('b = \\sqrt{25^2 - 7^2} = \\sqrt{625 - 49} = \\sqrt{576} = 24')}<p>The 7-24-25 triple.</p>`,
  },
  {
    id: 'b2-c03', blockId: 2, topic: 'Special right triangles', difficulty: 'easy', type: 'mc',
    prompt: `A 45-45-90 triangle has legs of length 5. What is the hypotenuse?`,
    choices: [T('5\\sqrt{2}'), T('10'), T('5\\sqrt{3}'), T('5')],
    answer: 0,
    solution: `<p>Hypotenuse = leg ${T('\\times \\sqrt{2} = 5\\sqrt{2}')}.</p>`,
  },
  {
    id: 'b2-c04', blockId: 2, topic: 'Special right triangles', difficulty: 'medium', type: 'mc',
    prompt: `A 30-60-90 triangle has hypotenuse 14. What is the length of the shorter leg?`,
    choices: [T('7'), T('7\\sqrt{3}'), T('7\\sqrt{2}'), T('14\\sqrt{3}')],
    answer: 0,
    solution: `<p>Short leg = half the hypotenuse ${T('= 7')}. ${T('7\\sqrt{3}')} is the longer leg.</p>`,
  },
  {
    id: 'b2-c05', blockId: 2, topic: 'Pythagorean theorem', difficulty: 'medium', type: 'numeric',
    prompt: `A 13-foot ladder reaches 12 feet up a vertical wall. Enter the distance from the foot of the ladder to the wall, in feet.`,
    answer: 5,
    solution: `<p>Ladder is the hypotenuse (13), height is a leg (12).</p>${D('d = \\sqrt{13^2 - 12^2} = \\sqrt{169 - 144} = \\sqrt{25} = 5')}`,
  },
  {
    id: 'b2-c06', blockId: 2, topic: 'Pythagorean theorem', difficulty: 'medium', type: 'mc',
    prompt: `A triangle has sides 8, 15 and 17. Which best describes it?`,
    choices: ['Right', 'Acute', 'Obtuse', 'Not a possible triangle'],
    answer: 0,
    solution: `${D('8^2 + 15^2 = 64 + 225 = 289 = 17^2')}<p>The squares match exactly, so it is a right triangle (the 8-15-17 triple).</p>`,
  },
  {
    id: 'b2-c07', blockId: 2, topic: 'Special right triangles', difficulty: 'medium', type: 'mc',
    prompt: `A square has a diagonal of length 8. What is the length of one side?`,
    choices: [T('4\\sqrt{2}'), T('8\\sqrt{2}'), T('4'), T('2\\sqrt{2}')],
    answer: 0,
    solution: `<p>Diagonal ${T('= s\\sqrt{2}')}, so ${T('s = 8 / \\sqrt{2} = 4\\sqrt{2}')}.</p><p>Check: ${T('(4\\sqrt{2})^2 + (4\\sqrt{2})^2 = 32 + 32 = 64 = 8^2')}.</p>`,
  },
  {
    id: 'b2-c08', blockId: 2, topic: 'Special right triangles', difficulty: 'medium', type: 'numeric',
    prompt: `In a 30-60-90 triangle, the shorter leg has length 6. Enter the length of the hypotenuse.`,
    answer: 12,
    solution: `<p>Hypotenuse = ${T('2 \\times')} short leg ${T('= 12')}. (The long leg would be ${T('6\\sqrt{3}')}.)</p>`,
  },
  {
    id: 'b2-c09', blockId: 2, topic: 'Special right triangles', difficulty: 'hard', type: 'mc',
    prompt: `An equilateral triangle has sides of length 10. What is its area?`,
    choices: [T('25\\sqrt{3}'), T('50\\sqrt{3}'), T('50'), T('100\\sqrt{3}')],
    answer: 0,
    solution: `<p>The height splits it into two 30-60-90 triangles: short leg 5, so height ${T('= 5\\sqrt{3}')}.</p>${D('\\text{Area} = \\tfrac{1}{2} \\cdot 10 \\cdot 5\\sqrt{3} = 25\\sqrt{3}')}<p>50 uses 10 as the height. ${T('50\\sqrt{3}')} forgets the one-half.</p>`,
  },
  {
    id: 'b2-c10', blockId: 2, topic: 'Pythagorean theorem', difficulty: 'hard', type: 'mc',
    prompt: `A rectangle has a diagonal of length 26 and one side of length 10. What is the perimeter of the rectangle?`,
    choices: [T('68'), T('34'), T('48'), T('60')],
    answer: 0,
    solution: `<p>The other side is a leg of a right triangle with hypotenuse 26 and leg 10.</p>${D('w = \\sqrt{26^2 - 10^2} = \\sqrt{676 - 100} = \\sqrt{576} = 24')}${D('\\text{Perimeter} = 2(10 + 24) = 68')}<p>34 is only half the perimeter (one length plus one width).</p>`,
  },
];

export default { lesson, practice, checkpoint };
