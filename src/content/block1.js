// Block 1: Foundations. Angles, parallel lines, angle sums.
// All questions original. Math in data-tex attributes (KaTeX).

const T = (s) => `<span data-tex="${s}"></span>`;
const D = (s) => `<div data-tex-display="${s}"></div>`;

/* ---------- Diagrams ---------- */

const svgVertical = `<svg viewBox="0 0 320 200" width="320" height="200" role="img" aria-label="Two lines crossing at point O, forming four angles labeled 1, 2, 3, 4">
  <line x1="20" y1="40" x2="300" y2="160" stroke="currentColor" stroke-width="2"/>
  <line x1="20" y1="160" x2="300" y2="40" stroke="currentColor" stroke-width="2"/>
  <circle cx="160" cy="100" r="3" fill="currentColor"/>
  <text x="166" y="92" font-size="13" fill="currentColor">O</text>
  <text x="160" y="60" text-anchor="middle" font-size="15" fill="currentColor">1</text>
  <text x="235" y="105" text-anchor="middle" font-size="15" fill="currentColor">2</text>
  <text x="160" y="150" text-anchor="middle" font-size="15" fill="currentColor">3</text>
  <text x="85" y="105" text-anchor="middle" font-size="15" fill="currentColor">4</text>
</svg>`;

const svgTransversal = (labels) => `<svg viewBox="0 0 340 240" width="340" height="240" role="img" aria-label="Two parallel horizontal lines cut by a slanted transversal, eight angles labeled">
  <line x1="20" y1="70" x2="320" y2="70" stroke="currentColor" stroke-width="2"/>
  <line x1="20" y1="170" x2="320" y2="170" stroke="currentColor" stroke-width="2"/>
  <line x1="100" y1="225" x2="240" y2="15" stroke="currentColor" stroke-width="2"/>
  <text x="300" y="62" font-size="12" fill="currentColor">m</text>
  <text x="300" y="162" font-size="12" fill="currentColor">n</text>
  <text x="240" y="14" font-size="12" fill="currentColor">t</text>
  <text x="190" y="58" text-anchor="middle" font-size="14" fill="currentColor">${labels[0]}</text>
  <text x="232" y="62" text-anchor="middle" font-size="14" fill="currentColor">${labels[1]}</text>
  <text x="232" y="92" text-anchor="middle" font-size="14" fill="currentColor">${labels[2]}</text>
  <text x="178" y="92" text-anchor="middle" font-size="14" fill="currentColor">${labels[3]}</text>
  <text x="124" y="158" text-anchor="middle" font-size="14" fill="currentColor">${labels[4]}</text>
  <text x="166" y="162" text-anchor="middle" font-size="14" fill="currentColor">${labels[5]}</text>
  <text x="166" y="192" text-anchor="middle" font-size="14" fill="currentColor">${labels[6]}</text>
  <text x="112" y="192" text-anchor="middle" font-size="14" fill="currentColor">${labels[7]}</text>
</svg>`;

const svgExterior = (a, b, ext) => `<svg viewBox="0 0 340 200" width="340" height="200" role="img" aria-label="Triangle with one side extended, showing an exterior angle">
  <polygon points="60,160 220,160 150,50" fill="none" stroke="currentColor" stroke-width="2"/>
  <line x1="220" y1="160" x2="320" y2="160" stroke="currentColor" stroke-width="2" stroke-dasharray="6 4"/>
  <text x="150" y="42" text-anchor="middle" font-size="13" fill="currentColor">${a}</text>
  <text x="78" y="152" font-size="13" fill="currentColor">${b}</text>
  <text x="240" y="140" font-size="13" fill="currentColor">${ext}</text>
  <text x="46" y="178" font-size="12" fill="currentColor">A</text>
  <text x="216" y="180" font-size="12" fill="currentColor">C</text>
  <text x="146" y="36" font-size="12" fill="currentColor" opacity="0">B</text>
</svg>`;

const svgZigzag = `<svg viewBox="0 0 320 220" width="320" height="220" role="img" aria-label="Two parallel horizontal lines with a bent path between them: point A on the top line, point P between the lines, point B on the bottom line. Not to scale.">
  <line x1="20" y1="40" x2="300" y2="40" stroke="currentColor" stroke-width="2"/>
  <line x1="20" y1="180" x2="300" y2="180" stroke="currentColor" stroke-width="2"/>
  <polyline points="90,40 200,110 100,180" fill="none" stroke="currentColor" stroke-width="2"/>
  <text x="80" y="32" font-size="13" fill="currentColor">A</text>
  <text x="208" y="114" font-size="13" fill="currentColor">P</text>
  <text x="88" y="200" font-size="13" fill="currentColor">B</text>
  <text x="118" y="58" font-size="13" fill="currentColor">35°</text>
  <text x="112" y="172" font-size="13" fill="currentColor">50°</text>
  <text x="172" y="114" font-size="13" fill="currentColor">?</text>
  <text x="300" y="212" text-anchor="end" font-size="11" fill="currentColor">Not drawn to scale</text>
</svg>`;

const svgPentagon = `<svg viewBox="0 0 260 250" width="260" height="250" role="img" aria-label="Regular pentagon ABCDE with diagonal AC drawn">
  <polygon points="130,25 230,98 192,215 68,215 30,98" fill="none" stroke="currentColor" stroke-width="2"/>
  <line x1="130" y1="25" x2="192" y2="215" stroke="currentColor" stroke-width="1.5" stroke-dasharray="6 4"/>
  <text x="130" y="16" text-anchor="middle" font-size="13" fill="currentColor">A</text>
  <text x="242" y="102" font-size="13" fill="currentColor">B</text>
  <text x="198" y="232" font-size="13" fill="currentColor">C</text>
  <text x="50" y="232" font-size="13" fill="currentColor">D</text>
  <text x="10" y="102" font-size="13" fill="currentColor">E</text>
</svg>`;

/* ---------- Lesson ---------- */

const lesson = `
<p>Geometry starts with angles, and almost every angle problem on a test comes down to two facts: angles that make a straight line add up to ${T('180^\\circ')}, and angles in a triangle add up to ${T('180^\\circ')}. Everything in this block is a way of using those two facts quickly.</p>

<h3>1. Naming angles and measuring them</h3>
<p>An angle is two rays sharing an endpoint (the vertex). We measure it in degrees. A full turn is ${T('360^\\circ')}, a straight line is ${T('180^\\circ')}, and a square corner is ${T('90^\\circ')}, called a <strong>right angle</strong> and marked with a small square in diagrams. An angle less than ${T('90^\\circ')} is <strong>acute</strong>; between ${T('90^\\circ')} and ${T('180^\\circ')} it is <strong>obtuse</strong>.</p>

<h3>2. Pairs of angles you must recognize on sight</h3>
<ul>
  <li><strong>Complementary:</strong> two angles that add to ${T('90^\\circ')}. If one is ${T('x')}, the other is ${T('90 - x')}.</li>
  <li><strong>Supplementary:</strong> two angles that add to ${T('180^\\circ')}. If one is ${T('x')}, the other is ${T('180 - x')}.</li>
  <li><strong>Linear pair:</strong> two angles side by side that together make a straight line. A linear pair is always supplementary. This is the most-used fact in the block.</li>
  <li><strong>Vertical angles:</strong> when two lines cross, the angles opposite each other (across the crossing point) are equal.</li>
</ul>
<figure class="q-diagram">${svgVertical}</figure>
<p>In the figure, ${T('\\angle 1')} and ${T('\\angle 3')} are vertical angles, so they are equal. So are ${T('\\angle 2')} and ${T('\\angle 4')}. Why? ${T('\\angle 1')} and ${T('\\angle 2')} make a straight line, so ${T('\\angle 1 = 180^\\circ - \\angle 2')}. But ${T('\\angle 3')} and ${T('\\angle 2')} also make a straight line, so ${T('\\angle 3 = 180^\\circ - \\angle 2')}. Same expression, same value. Vertical angles are equal because both are the supplement of the same neighbor.</p>
<p>A memory trick: "C, S, L, V" for Complementary (Corner, 90), Supplementary (Straight, 180), Linear pair (also 180), Vertical (equal).</p>

<p><strong>Worked example 1.</strong> Two lines cross. One of the angles formed is ${T('(3x + 12)^\\circ')} and the angle opposite it is ${T('75^\\circ')}. Find ${T('x')}.</p>
<p>Opposite angles at a crossing are vertical, so they are equal: ${T('3x + 12 = 75')}, giving ${T('3x = 63')} and ${T('x = 21')}. If the problem had said the two angles were <em>next to each other</em>, they would be a linear pair and you would write ${T('3x + 12 + 75 = 180')} instead. Read which one it is before you write the equation.</p>

<h3>3. Parallel lines cut by a transversal</h3>
<p>Two lines are <strong>parallel</strong> if they never meet (in diagrams they carry matching arrowheads, or the problem says so). A third line that crosses both is called a <strong>transversal</strong>. It creates eight angles, and they come in only two sizes: every angle is either equal to angle 1 below or supplementary to it.</p>
<figure class="q-diagram">${svgTransversal(['1', '2', '3', '4', '5', '6', '7', '8'])}</figure>
<p>The names, using the figure (${T('m \\parallel n')}, transversal ${T('t')}):</p>
<ul>
  <li><strong>Corresponding angles</strong> sit in the same position at each crossing: ${T('\\angle 1')} and ${T('\\angle 5')}, ${T('\\angle 2')} and ${T('\\angle 6')}, and so on. They are <strong>equal</strong>. (Slide the top crossing down onto the bottom one; the angles land on top of each other.)</li>
  <li><strong>Alternate interior angles</strong> are between the parallel lines, on opposite sides of the transversal: ${T('\\angle 4')} and ${T('\\angle 6')}, ${T('\\angle 3')} and ${T('\\angle 5')}. They are <strong>equal</strong>. They form a Z shape.</li>
  <li><strong>Alternate exterior angles</strong> are outside the parallel lines, on opposite sides: ${T('\\angle 1')} and ${T('\\angle 7')}, ${T('\\angle 2')} and ${T('\\angle 8')}. <strong>Equal.</strong></li>
  <li><strong>Same-side interior angles</strong> (also called consecutive interior) are between the lines on the same side of the transversal: ${T('\\angle 4')} and ${T('\\angle 5')}, ${T('\\angle 3')} and ${T('\\angle 6')}. They are <strong>supplementary</strong>. They form a C or U shape.</li>
</ul>
<p>You do not need to memorize all four names to solve problems. Use this shortcut: at a parallel-line crossing, <strong>every acute angle equals every other acute angle, every obtuse angle equals every other obtuse angle, and an acute plus an obtuse makes ${T('180^\\circ')}</strong>. The names matter only when a question asks for them by name, which the SAT and ACT rarely do. Also note the rule runs backwards: if a pair of corresponding or alternate angles is equal, the lines must be parallel.</p>

<p><strong>Worked example 2.</strong> Lines ${T('m')} and ${T('n')} are parallel. Angle 2 is ${T('(2x + 40)^\\circ')} and angle 8 is ${T('(4x - 10)^\\circ')}. Find angle 2.</p>
<p>Angles 2 and 8 are alternate exterior angles, so they are equal: ${T('2x + 40 = 4x - 10')}, so ${T('50 = 2x')} and ${T('x = 25')}. Then angle 2 is ${T('2(25) + 40 = 90^\\circ')}. Always finish by computing the angle the question asked for, not just ${T('x')}. A common wrong answer is 25.</p>

<h3>4. Angles in a triangle</h3>
<p>The three interior angles of any triangle add to ${T('180^\\circ')}. Here is why: draw a line through one vertex parallel to the opposite side. The two angles that line makes with the triangle's sides are alternate interior angles with the two far angles of the triangle, so the three angles at the vertex, which make a straight line, are copies of the triangle's three angles.</p>
${D('\\angle A + \\angle B + \\angle C = 180^\\circ')}
<p>Two consequences you will use constantly:</p>
<ul>
  <li>In a <strong>right triangle</strong>, the two non-right angles are complementary (they add to ${T('90^\\circ')}).</li>
  <li>In an <strong>isosceles triangle</strong> (two equal sides), the two angles opposite the equal sides, called base angles, are equal. In an <strong>equilateral triangle</strong> every angle is ${T('60^\\circ')}.</li>
</ul>
<p><strong>Exterior angle theorem.</strong> Extend one side of a triangle. The angle between the extension and the next side is an <strong>exterior angle</strong>, and it equals the sum of the two interior angles that are not next to it (the "remote" interior angles).</p>
<figure class="q-diagram">${svgExterior('B', 'A', 'exterior')}</figure>
${D('\\text{exterior angle at } C = \\angle A + \\angle B')}
<p>Why: the exterior angle and ${T('\\angle C')} make a straight line, so exterior ${T('= 180^\\circ - \\angle C')}. And ${T('\\angle A + \\angle B = 180^\\circ - \\angle C')} as well. This theorem saves a step every time it applies.</p>

<p><strong>Worked example 3.</strong> A triangle has angles ${T('x^\\circ')}, ${T('(2x)^\\circ')} and ${T('(x + 20)^\\circ')}. Find the largest angle.</p>
<p>Sum to 180: ${T('x + 2x + x + 20 = 180')}, so ${T('4x = 160')} and ${T('x = 40')}. The angles are ${T('40^\\circ')}, ${T('80^\\circ')} and ${T('60^\\circ')}. Largest: ${T('80^\\circ')}.</p>

<h3>5. Angles in any polygon</h3>
<p>A polygon with ${T('n')} sides can be cut into ${T('n - 2')} triangles by drawing all diagonals from one vertex (try it on a pentagon: three triangles). Each triangle contributes ${T('180^\\circ')}, so:</p>
${D('\\text{sum of interior angles} = (n - 2)\\cdot 180^\\circ')}
<p>Triangle 180, quadrilateral 360, pentagon 540, hexagon 720, octagon 1080. A <strong>regular</strong> polygon has all sides and all angles equal, so each interior angle is ${T('\\dfrac{(n-2)\\cdot 180^\\circ}{n}')}.</p>
<p>Exterior angles are simpler. Walk around any polygon, turning at each corner; you make one full turn in total, so <strong>the exterior angles of any polygon add to ${T('360^\\circ')}</strong>, no matter how many sides. For a regular polygon each exterior angle is ${T('360^\\circ / n')}, and interior plus exterior at any vertex is ${T('180^\\circ')}. Often the exterior route is faster.</p>

<p><strong>Worked example 4.</strong> Each interior angle of a regular polygon is ${T('156^\\circ')}. How many sides?</p>
<p>Exterior angle is ${T('180 - 156 = 24^\\circ')}. Number of sides is ${T('360 / 24 = 15')}. (Solving ${T('(n-2)180/n = 156')} gives the same answer with more algebra.)</p>

<p><strong>Worked example 5.</strong> The interior angles of a pentagon are ${T('100^\\circ')}, ${T('110^\\circ')}, ${T('120^\\circ')}, ${T('x^\\circ')} and ${T('(x + 10)^\\circ')}. Find ${T('x')}.</p>
<p>A pentagon's angles add to ${T('(5-2)\\cdot 180 = 540^\\circ')}. So ${T('330 + 2x + 10 = 540')}, giving ${T('2x = 200')} and ${T('x = 100')}.</p>

<h3>How to attack an angle problem</h3>
<ol>
  <li>Mark every right angle, every pair of parallel lines, and every pair of equal sides the problem gives you.</li>
  <li>Fill in angles you can get for free: linear pairs (180), vertical angles (equal), parallel-line pairs (equal or 180).</li>
  <li>Write one equation from a triangle sum, a straight line, or a polygon sum.</li>
  <li>Solve, then answer the question actually asked (the angle, not ${T('x')}).</li>
</ol>
<p>Diagrams on the SAT and ACT are often labeled "not drawn to scale." Trust the numbers, not your eyes.</p>
`;

/* ---------- Practice set (20) ---------- */

const practice = [
  {
    id: 'b1-p01', blockId: 1, topic: 'Angle basics', difficulty: 'easy', type: 'mc',
    prompt: `An angle measures ${T('37^\\circ')}. What is the measure of its complement?`,
    choices: [T('53^\\circ'), T('143^\\circ'), T('63^\\circ'), T('47^\\circ')],
    answer: 0,
    solution: `<p>Complementary angles add to ${T('90^\\circ')}.</p>${D('90^\\circ - 37^\\circ = 53^\\circ')}<p>${T('143^\\circ')} is the supplement (180 minus 37), the most common mix-up.</p>`,
  },
  {
    id: 'b1-p02', blockId: 1, topic: 'Angle basics', difficulty: 'easy', type: 'numeric',
    prompt: `Two angles are supplementary. One measures ${T('104^\\circ')}. Enter the measure of the other, in degrees.`,
    answer: 76,
    solution: `<p>Supplementary means they add to ${T('180^\\circ')}.</p>${D('180 - 104 = 76')}`,
  },
  {
    id: 'b1-p03', blockId: 1, topic: 'Angle basics', difficulty: 'easy', type: 'mc',
    prompt: `Two lines intersect. One angle measures ${T('(3x + 10)^\\circ')} and the angle directly opposite it measures ${T('52^\\circ')}. What is ${T('x')}?`,
    choices: [T('14'), T('42'), T('39'), T('62')],
    answer: 0,
    solution: `<p>Angles directly opposite each other at a crossing are vertical angles, so they are equal.</p>${D('3x + 10 = 52 \\;\\Rightarrow\\; 3x = 42 \\;\\Rightarrow\\; x = 14')}<p>Choosing 42 means you forgot to divide by 3. Choosing 39 comes from wrongly treating them as supplementary.</p>`,
  },
  {
    id: 'b1-p04', blockId: 1, topic: 'Angle basics', difficulty: 'easy', type: 'mc',
    prompt: `Two angles form a linear pair. Their measures are ${T('(2x)^\\circ')} and ${T('(x + 30)^\\circ')}. What is ${T('x')}?`,
    choices: [T('50'), T('30'), T('20'), T('60')],
    answer: 0,
    solution: `<p>A linear pair makes a straight line, so the angles add to ${T('180^\\circ')}.</p>${D('2x + (x + 30) = 180 \\;\\Rightarrow\\; 3x = 150 \\;\\Rightarrow\\; x = 50')}<p>Setting them equal (${T('2x = x + 30')}) gives 30, but linear pairs are supplementary, not equal.</p>`,
  },
  {
    id: 'b1-p05', blockId: 1, topic: 'Parallel lines', difficulty: 'easy', type: 'mc',
    diagram: svgTransversal(['118°', '', '', '', '', '', 'x', '']),
    prompt: `Lines ${T('m')} and ${T('n')} are parallel. The angle marked ${T('118^\\circ')} is at the top crossing. What is the measure of the angle marked ${T('x')} at the bottom crossing?`,
    choices: [T('118^\\circ'), T('62^\\circ'), T('28^\\circ'), T('72^\\circ')],
    answer: 0,
    solution: `<p>The ${T('118^\\circ')} angle is above line ${T('m')} on the left of the transversal. The angle ${T('x')} is below line ${T('n')} on the right. Those are alternate exterior angles, so they are equal: ${T('x = 118^\\circ')}.</p><p>Shortcut: both angles are obtuse, and at parallel-line crossings all obtuse angles are equal. ${T('62^\\circ')} would be the answer if ${T('x')} were one of the acute angles.</p>`,
  },
  {
    id: 'b1-p06', blockId: 1, topic: 'Angle basics', difficulty: 'easy', type: 'numeric',
    prompt: `The measure of an angle is twice the measure of its complement. Enter the measure of the angle, in degrees.`,
    answer: 60,
    solution: `<p>Let the complement be ${T('c')}. The angle is ${T('2c')}, and together they make ${T('90^\\circ')}.</p>${D('2c + c = 90 \\;\\Rightarrow\\; c = 30')}<p>The angle is ${T('2(30) = 60^\\circ')}. Entering 30 answers the wrong question (the complement).</p>`,
  },
  {
    id: 'b1-p07', blockId: 1, topic: 'Angle basics', difficulty: 'easy', type: 'numeric',
    prompt: `A triangle has angles measuring ${T('48^\\circ')} and ${T('71^\\circ')}. Enter the measure of the third angle, in degrees.`,
    answer: 61,
    solution: `<p>Triangle angles add to ${T('180^\\circ')}.</p>${D('180 - 48 - 71 = 61')}`,
  },
  {
    id: 'b1-p08', blockId: 1, topic: 'Parallel lines', difficulty: 'medium', type: 'mc',
    prompt: `Two parallel lines are cut by a transversal. A pair of alternate interior angles measure ${T('(4x - 8)^\\circ')} and ${T('(2x + 26)^\\circ')}. What is ${T('x')}?`,
    choices: [T('17'), T('27'), T('9'), T('34')],
    answer: 0,
    solution: `<p>Alternate interior angles between parallel lines are equal.</p>${D('4x - 8 = 2x + 26 \\;\\Rightarrow\\; 2x = 34 \\;\\Rightarrow\\; x = 17')}<p>Check: ${T('4(17) - 8 = 60')} and ${T('2(17) + 26 = 60')}. Same-side interior angles would be supplementary and give 27, but these are alternate.</p>`,
  },
  {
    id: 'b1-p09', blockId: 1, topic: 'Parallel lines', difficulty: 'medium', type: 'numeric',
    prompt: `Two parallel lines are cut by a transversal. One of a pair of same-side interior angles is three times the other. Enter the measure of the smaller angle, in degrees.`,
    answer: 45,
    solution: `<p>Same-side interior angles between parallel lines are supplementary. Let the smaller be ${T('x')}; the larger is ${T('3x')}.</p>${D('x + 3x = 180 \\;\\Rightarrow\\; x = 45')}<p>The angles are ${T('45^\\circ')} and ${T('135^\\circ')}.</p>`,
  },
  {
    id: 'b1-p10', blockId: 1, topic: 'Triangle angles', difficulty: 'medium', type: 'mc',
    prompt: `The angles of a triangle are in the ratio ${T('2 : 3 : 5')}. What is the measure of the largest angle?`,
    choices: [T('90^\\circ'), T('54^\\circ'), T('36^\\circ'), T('100^\\circ')],
    answer: 0,
    solution: `<p>Write the angles as ${T('2k')}, ${T('3k')}, ${T('5k')}.</p>${D('2k + 3k + 5k = 180 \\;\\Rightarrow\\; 10k = 180 \\;\\Rightarrow\\; k = 18')}<p>Largest angle: ${T('5(18) = 90^\\circ')}. So this is a right triangle. ${T('54^\\circ')} and ${T('36^\\circ')} are the other two angles.</p>`,
  },
  {
    id: 'b1-p11', blockId: 1, topic: 'Triangle angles', difficulty: 'medium', type: 'mc',
    diagram: svgExterior('68°', '43°', 'x'),
    prompt: `In the triangle shown, side ${T('AC')} is extended past ${T('C')}. Two interior angles measure ${T('43^\\circ')} (at ${T('A')}) and ${T('68^\\circ')} (at the top vertex). What is the exterior angle ${T('x')} at ${T('C')}?`,
    choices: [T('111^\\circ'), T('69^\\circ'), T('137^\\circ'), T('25^\\circ')],
    answer: 0,
    solution: `<p>An exterior angle equals the sum of the two remote interior angles.</p>${D('x = 43^\\circ + 68^\\circ = 111^\\circ')}<p>Longer route: the interior angle at ${T('C')} is ${T('180 - 43 - 68 = 69^\\circ')}, and the exterior angle is its supplement, ${T('180 - 69 = 111^\\circ')}. Choosing ${T('69^\\circ')} stops one step early.</p>`,
  },
  {
    id: 'b1-p12', blockId: 1, topic: 'Triangle angles', difficulty: 'medium', type: 'numeric',
    prompt: `An isosceles triangle has a vertex angle of ${T('34^\\circ')} (the angle between the two equal sides). Enter the measure of each base angle, in degrees.`,
    answer: 73,
    solution: `<p>The two base angles are equal. Call each one ${T('b')}.</p>${D('34 + 2b = 180 \\;\\Rightarrow\\; 2b = 146 \\;\\Rightarrow\\; b = 73')}`,
  },
  {
    id: 'b1-p13', blockId: 1, topic: 'Polygon angles', difficulty: 'medium', type: 'mc',
    prompt: `What is the sum of the interior angles of a hexagon?`,
    choices: [T('720^\\circ'), T('540^\\circ'), T('900^\\circ'), T('1080^\\circ')],
    answer: 0,
    solution: `<p>A hexagon has 6 sides.</p>${D('(n - 2)\\cdot 180^\\circ = 4 \\cdot 180^\\circ = 720^\\circ')}<p>${T('540^\\circ')} is a pentagon, ${T('900^\\circ')} a heptagon, ${T('1080^\\circ')} an octagon.</p>`,
  },
  {
    id: 'b1-p14', blockId: 1, topic: 'Polygon angles', difficulty: 'medium', type: 'numeric',
    prompt: `Enter the measure of each interior angle of a regular decagon (10 sides), in degrees.`,
    answer: 144,
    solution: `<p>Fast route through exterior angles: each exterior angle of a regular decagon is ${T('360 / 10 = 36^\\circ')}, so each interior angle is ${T('180 - 36 = 144^\\circ')}.</p><p>Direct route: ${T('(10 - 2)\\cdot 180 / 10 = 1440 / 10 = 144')}.</p>`,
  },
  {
    id: 'b1-p15', blockId: 1, topic: 'Polygon angles', difficulty: 'hard', type: 'mc',
    prompt: `Each exterior angle of a regular polygon measures ${T('24^\\circ')}. How many sides does the polygon have?`,
    choices: [T('15'), T('12'), T('18'), T('24')],
    answer: 0,
    solution: `<p>The exterior angles of any polygon add to ${T('360^\\circ')}, and in a regular polygon they are all equal.</p>${D('n = \\frac{360}{24} = 15')}`,
  },
  {
    id: 'b1-p16', blockId: 1, topic: 'Polygon angles', difficulty: 'hard', type: 'mc',
    prompt: `The interior angles of a polygon add up to ${T('1620^\\circ')}. How many sides does it have?`,
    choices: [T('11'), T('9'), T('10'), T('12')],
    answer: 0,
    solution: `${D('(n - 2)\\cdot 180 = 1620 \\;\\Rightarrow\\; n - 2 = 9 \\;\\Rightarrow\\; n = 11')}<p>Choosing 9 forgets to add the 2 back.</p>`,
  },
  {
    id: 'b1-p17', blockId: 1, topic: 'Triangle angles', difficulty: 'hard', type: 'numeric',
    prompt: `The angles of a triangle measure ${T('x^\\circ')}, ${T('(2x + 15)^\\circ')} and ${T('(3x - 3)^\\circ')}. Enter the measure of the largest angle, in degrees.`,
    answer: 81,
    solution: `${D('x + (2x + 15) + (3x - 3) = 180 \\;\\Rightarrow\\; 6x + 12 = 180 \\;\\Rightarrow\\; x = 28')}<p>The angles are ${T('28^\\circ')}, ${T('71^\\circ')} and ${T('81^\\circ')}. Check: ${T('28 + 71 + 81 = 180')}. The largest is ${T('81^\\circ')}. Entering 28 answers for ${T('x')}, not the angle.</p>`,
  },
  {
    id: 'b1-p18', blockId: 1, topic: 'Parallel lines', difficulty: 'hard', type: 'mc',
    diagram: svgZigzag,
    prompt: `The two horizontal lines are parallel. Point ${T('A')} is on the top line, ${T('B')} on the bottom line, and ${T('P')} is between them. The angle at ${T('A')} between the top line and ${T('AP')} is ${T('35^\\circ')}; the angle at ${T('B')} between the bottom line and ${T('BP')} is ${T('50^\\circ')}. What is ${T('\\angle APB')}?`,
    choices: [T('85^\\circ'), T('95^\\circ'), T('15^\\circ'), T('105^\\circ')],
    answer: 0,
    solution: `<p>Draw a third line through ${T('P')} parallel to the other two. It splits ${T('\\angle APB')} into two parts.</p><p>The upper part is an alternate interior angle with the ${T('35^\\circ')} angle at ${T('A')}, so it is ${T('35^\\circ')}. The lower part is alternate interior with the ${T('50^\\circ')} at ${T('B')}, so it is ${T('50^\\circ')}.</p>${D('\\angle APB = 35^\\circ + 50^\\circ = 85^\\circ')}<p>This "add the two angles" pattern is worth remembering; it shows up on the SAT.</p>`,
  },
  {
    id: 'b1-p19', blockId: 1, topic: 'Polygon angles', difficulty: 'hard', type: 'numeric',
    prompt: `The sum of the interior angles of a polygon is four times the sum of its exterior angles. Enter the number of sides.`,
    answer: 10,
    solution: `<p>Exterior angles of any polygon add to ${T('360^\\circ')}, so the interior sum is ${T('4 \\cdot 360 = 1440^\\circ')}.</p>${D('(n - 2)\\cdot 180 = 1440 \\;\\Rightarrow\\; n - 2 = 8 \\;\\Rightarrow\\; n = 10')}`,
  },
  {
    id: 'b1-p20', blockId: 1, topic: 'Polygon angles', difficulty: 'hard', type: 'mc',
    diagram: svgPentagon,
    prompt: `${T('ABCDE')} is a regular pentagon and ${T('AC')} is a diagonal. What is the measure of ${T('\\angle BAC')}?`,
    choices: [T('36^\\circ'), T('72^\\circ'), T('54^\\circ'), T('108^\\circ')],
    answer: 0,
    solution: `<p>Each interior angle of a regular pentagon is ${T('(5-2)\\cdot 180 / 5 = 108^\\circ')}, so ${T('\\angle ABC = 108^\\circ')}.</p><p>Triangle ${T('ABC')} has ${T('AB = BC')} (sides of the pentagon), so it is isosceles and its base angles ${T('\\angle BAC')} and ${T('\\angle BCA')} are equal.</p>${D('\\angle BAC = \\frac{180 - 108}{2} = 36^\\circ')}<p>${T('108^\\circ')} is the full interior angle; ${T('72^\\circ')} is the angle ${T('CAE')} left over, not the one asked for.</p>`,
  },
];

export default { lesson, practice, checkpoint: [] };
