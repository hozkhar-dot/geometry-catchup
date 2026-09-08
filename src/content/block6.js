// Block 6: Coordinate geometry. Slope, parallel and perpendicular lines,
// distance and midpoint, and applying them to triangles and circles on the
// plane. No checkpoint in this block (the plan puts the next one in Block 8).
// All questions original. Math in data-tex attributes (KaTeX).

const T = (s) => `<span data-tex="${s}"></span>`;
const D = (s) => `<div data-tex-display="${s}"></div>`;

/* ---------- Diagrams ---------- */

// Slope as rise over run: line through (1, 2) and (4, 8). Scale 22 px per unit, origin at (30, 205).
const svgSlope = `<svg viewBox="0 0 260 230" width="260" height="230" role="img" aria-label="A line on coordinate axes through the points (1, 2) and (4, 8). A dashed horizontal run of 3 and a dashed vertical rise of 6 form a staircase step between the two points.">
  <g stroke="currentColor" stroke-width="0.5" opacity="0.25">
    ${[1,2,3,4,5,6,7,8,9].map((i) => `<line x1="${30 + 22 * i}" y1="7" x2="${30 + 22 * i}" y2="205"/>`).join('')}
    ${[1,2,3,4,5,6,7,8,9].map((i) => `<line x1="30" y1="${205 - 22 * i}" x2="250" y2="${205 - 22 * i}"/>`).join('')}
  </g>
  <line x1="20" y1="205" x2="252" y2="205" stroke="currentColor" stroke-width="1.5"/>
  <line x1="30" y1="215" x2="30" y2="4" stroke="currentColor" stroke-width="1.5"/>
  <text x="244" y="222" font-size="12" fill="currentColor">x</text>
  <text x="14" y="14" font-size="12" fill="currentColor">y</text>
  <line x1="41" y1="183" x2="129" y2="7" stroke="currentColor" stroke-width="2"/>
  <line x1="52" y1="161" x2="118" y2="161" stroke="currentColor" stroke-width="1.5" stroke-dasharray="5 4"/>
  <line x1="118" y1="161" x2="118" y2="29" stroke="currentColor" stroke-width="1.5" stroke-dasharray="5 4"/>
  <circle cx="52" cy="161" r="3.5" fill="currentColor"/>
  <circle cx="118" cy="29" r="3.5" fill="currentColor"/>
  <text x="56" y="180" font-size="12" fill="currentColor">(1, 2)</text>
  <text x="126" y="26" font-size="12" fill="currentColor">(4, 8)</text>
  <text x="76" y="156" font-size="12" fill="currentColor">run 3</text>
  <text x="124" y="100" font-size="12" fill="currentColor">rise 6</text>
</svg>`;

// Perpendicular lines with slopes 2 and -1/2 crossing at (4, 4). Scale 22, origin (20, 200).
const svgPerp = `<svg viewBox="0 0 240 220" width="240" height="220" role="img" aria-label="Two lines crossing at right angles on coordinate axes. The steep line has slope 2 and the shallow line has slope negative one half. A small square marks the right angle where they cross.">
  <line x1="10" y1="200" x2="232" y2="200" stroke="currentColor" stroke-width="1.5"/>
  <line x1="20" y1="212" x2="20" y2="8" stroke="currentColor" stroke-width="1.5"/>
  <text x="224" y="216" font-size="12" fill="currentColor">x</text>
  <text x="6" y="16" font-size="12" fill="currentColor">y</text>
  <line x1="64" y1="200" x2="152" y2="24" stroke="currentColor" stroke-width="2"/>
  <line x1="20" y1="68" x2="196" y2="156" stroke="currentColor" stroke-width="2"/>
  <path d="M 112.5 103.1 L 121.4 107.6 L 116.9 116.5" fill="none" stroke="currentColor" stroke-width="1.2"/>
  <circle cx="108" cy="112" r="3" fill="currentColor"/>
  <text x="156" y="30" font-size="12" fill="currentColor">slope 2</text>
  <text x="150" y="176" font-size="12" fill="currentColor">slope −1/2</text>
</svg>`;

// Distance between (1, 1) and (4, 5) as the hypotenuse of a right triangle. Scale 28, origin (30, 200).
const svgDistance = `<svg viewBox="0 0 240 220" width="240" height="220" role="img" aria-label="Points A at (1, 1) and B at (4, 5) joined by a segment. Dashed legs of length 3 (horizontal) and 4 (vertical) meet at a right angle below B, forming a 3-4-5 right triangle.">
  <line x1="15" y1="200" x2="232" y2="200" stroke="currentColor" stroke-width="1.5"/>
  <line x1="30" y1="212" x2="30" y2="8" stroke="currentColor" stroke-width="1.5"/>
  <text x="224" y="216" font-size="12" fill="currentColor">x</text>
  <text x="16" y="16" font-size="12" fill="currentColor">y</text>
  <line x1="58" y1="172" x2="142" y2="60" stroke="currentColor" stroke-width="2"/>
  <line x1="58" y1="172" x2="142" y2="172" stroke="currentColor" stroke-width="1.5" stroke-dasharray="5 4"/>
  <line x1="142" y1="172" x2="142" y2="60" stroke="currentColor" stroke-width="1.5" stroke-dasharray="5 4"/>
  <rect x="132" y="162" width="10" height="10" fill="none" stroke="currentColor" stroke-width="1.2"/>
  <circle cx="58" cy="172" r="3.5" fill="currentColor"/>
  <circle cx="142" cy="60" r="3.5" fill="currentColor"/>
  <text x="40" y="190" font-size="12" fill="currentColor">A (1, 1)</text>
  <text x="148" y="58" font-size="12" fill="currentColor">B (4, 5)</text>
  <text x="90" y="188" font-size="12" fill="currentColor">4 − 1 = 3</text>
  <text x="148" y="122" font-size="12" fill="currentColor">5 − 1 = 4</text>
  <text x="80" y="110" font-size="13" fill="currentColor">d</text>
</svg>`;

// Triangle P(-1, 0), Q(3, 3), R(7, 0). Scale 22; px = 50 + 22x, py = 150 - 22y. Drawn to scale.
const svgTri = `<svg viewBox="0 0 240 180" width="240" height="180" role="img" aria-label="Triangle with vertices P at (negative 1, 0), Q at (3, 3) and R at (7, 0) drawn on coordinate axes. P and R sit on the x-axis; Q is above the midpoint of PR.">
  <line x1="10" y1="150" x2="232" y2="150" stroke="currentColor" stroke-width="1.5"/>
  <line x1="50" y1="172" x2="50" y2="20" stroke="currentColor" stroke-width="1.5"/>
  <text x="226" y="146" font-size="12" fill="currentColor">x</text>
  <text x="36" y="28" font-size="12" fill="currentColor">y</text>
  <path d="M 28 150 L 116 84 L 204 150 Z" fill="currentColor" opacity="0.12"/>
  <path d="M 28 150 L 116 84 L 204 150 Z" fill="none" stroke="currentColor" stroke-width="2"/>
  <line x1="116" y1="84" x2="116" y2="150" stroke="currentColor" stroke-width="1.2" stroke-dasharray="4 3"/>
  <circle cx="28" cy="150" r="3" fill="currentColor"/>
  <circle cx="116" cy="84" r="3" fill="currentColor"/>
  <circle cx="204" cy="150" r="3" fill="currentColor"/>
  <text x="2" y="168" font-size="12" fill="currentColor">P(−1, 0)</text>
  <text x="104" y="76" font-size="12" fill="currentColor">Q(3, 3)</text>
  <text x="196" y="168" font-size="12" fill="currentColor">R(7, 0)</text>
</svg>`;

// Right isosceles triangle A(1, 1), B(4, 5), C(8, 2) for the practice question. Scale 22, origin (20, 190). To scale.
const svgTriB = `<svg viewBox="0 0 240 200" width="240" height="200" role="img" aria-label="Triangle with vertices A at (1, 1), B at (4, 5) and C at (8, 2) drawn on coordinate axes.">
  <line x1="10" y1="190" x2="232" y2="190" stroke="currentColor" stroke-width="1.5"/>
  <line x1="20" y1="198" x2="20" y2="8" stroke="currentColor" stroke-width="1.5"/>
  <text x="226" y="184" font-size="12" fill="currentColor">x</text>
  <text x="6" y="16" font-size="12" fill="currentColor">y</text>
  <path d="M 42 168 L 108 80 L 196 146 Z" fill="currentColor" opacity="0.12"/>
  <path d="M 42 168 L 108 80 L 196 146 Z" fill="none" stroke="currentColor" stroke-width="2"/>
  <circle cx="42" cy="168" r="3" fill="currentColor"/>
  <circle cx="108" cy="80" r="3" fill="currentColor"/>
  <circle cx="196" cy="146" r="3" fill="currentColor"/>
  <text x="28" y="186" font-size="12" fill="currentColor">A(1, 1)</text>
  <text x="96" y="72" font-size="12" fill="currentColor">B(4, 5)</text>
  <text x="192" y="164" font-size="12" fill="currentColor">C(8, 2)</text>
</svg>`;

// Circle center (2, 1), radius 5, with the tangent at (5, 5). Scale 16, origin (60, 180). To scale.
const svgCircleTangent = `<svg viewBox="0 0 240 260" width="240" height="260" role="img" aria-label="A circle with center (2, 1) and radius 5 on coordinate axes. A radius is drawn to the point (5, 5) on the circle, and the tangent line at that point crosses the radius at a right angle.">
  <line x1="10" y1="164" x2="232" y2="164" stroke="currentColor" stroke-width="1.5"/>
  <line x1="60" y1="252" x2="60" y2="10" stroke="currentColor" stroke-width="1.5"/>
  <text x="224" y="180" font-size="12" fill="currentColor">x</text>
  <text x="46" y="18" font-size="12" fill="currentColor">y</text>
  <circle cx="92" cy="164" r="80" fill="none" stroke="currentColor" stroke-width="2"/>
  <circle cx="92" cy="164" r="3" fill="currentColor"/>
  <line x1="92" y1="164" x2="140" y2="100" stroke="currentColor" stroke-width="1.5"/>
  <line x1="84" y1="58" x2="196" y2="142" stroke="currentColor" stroke-width="2"/>
  <path d="M 134 108 L 142 114 L 148 106" fill="none" stroke="currentColor" stroke-width="1.2"/>
  <circle cx="140" cy="100" r="3" fill="currentColor"/>
  <text x="96" y="180" font-size="12" fill="currentColor">(2, 1)</text>
  <text x="144" y="96" font-size="12" fill="currentColor">(5, 5)</text>
  <text x="66" y="126" font-size="12" fill="currentColor">r = 5</text>
  <text x="174" y="154" font-size="12" fill="currentColor">tangent</text>
</svg>`;

/* ---------- Lesson ---------- */

const lesson = `
<p>Coordinate geometry takes the shapes from Blocks 1 to 5 and puts them on a grid, so that instead of measuring you compute. There are only four tools: slope, the distance formula, the midpoint formula, and the equation of a line. Triangles and circles on the plane are just those four tools applied. The SAT likes this block because it is algebra wearing a geometry costume, and you already have the algebra.</p>

<h3>1. Reading the plane</h3>
<p>A point is ${T('(x, y)')}: how far right (or left, if negative), then how far up (or down). Two points with the same ${T('y')} lie on a horizontal line, and the distance between them is just the difference of their ${T('x')} values: from ${T('(-3, 5)')} to ${T('(2, 5)')} is ${T('2 - (-3) = 5')} units. Same idea vertically. Nearly every formula below is built from these horizontal and vertical differences, so always subtract in the <strong>same order</strong> for ${T('x')} and for ${T('y')}: second point minus first point, both times.</p>

<h3>2. Slope</h3>
<figure class="q-diagram">${svgSlope}</figure>
<p>Slope measures steepness: how much a line rises for each unit it runs to the right.</p>
${D('m = \\frac{\\text{rise}}{\\text{run}} = \\frac{y_2 - y_1}{x_2 - x_1}')}
<p>Positive slope goes uphill left to right, negative goes downhill. A <strong>horizontal</strong> line has slope 0 (no rise). A <strong>vertical</strong> line has <strong>undefined</strong> slope (run is 0, and you cannot divide by 0). Slope 2 is steeper than slope ${T('\\tfrac{1}{2}')}; slope ${T('-3')} is steeper than slope ${T('-1')}. Which point you call "first" does not matter as long as you are consistent: ${T('\\frac{8 - 2}{4 - 1}')} and ${T('\\frac{2 - 8}{1 - 4}')} are both ${T('2')}.</p>
<p><strong>Worked example 1.</strong> Find the slope of the line through ${T('(1, 2)')} and ${T('(4, 8)')}.</p>
${D('m = \\frac{8 - 2}{4 - 1} = \\frac{6}{3} = 2')}
<p>In the figure, that is the staircase: run 3, rise 6. Every step of 1 to the right climbs 2.</p>

<h3>3. Parallel and perpendicular</h3>
<figure class="q-diagram">${svgPerp}</figure>
<p><strong>Parallel lines have the same slope.</strong> Same steepness, never meet.</p>
<p><strong>Perpendicular lines have slopes that multiply to ${T('-1')}.</strong> Equivalently, one slope is the <strong>negative reciprocal</strong> of the other: flip the fraction and change the sign. Slope ${T('2')} pairs with ${T('-\\tfrac{1}{2}')}; slope ${T('\\tfrac{3}{4}')} pairs with ${T('-\\tfrac{4}{3}')}.</p>
<p>Why the negative reciprocal: a line with slope ${T('\\tfrac{b}{a}')} follows the arrow "run ${T('a')}, rise ${T('b')}". Turn that arrow a quarter turn and it becomes "run ${T('-b')}, rise ${T('a')}", whose slope is ${T('\\tfrac{a}{-b} = -\\tfrac{a}{b}')}. Flipped and negated.</p>
<p>The one exception: a horizontal line (slope 0) and a vertical line (undefined slope) are perpendicular, but you cannot multiply their slopes. Just know that pair.</p>
<p><strong>Worked example 2.</strong> A line has slope ${T('\\tfrac{3}{4}')}. What is the slope of a line perpendicular to it?</p>
<p>Flip to ${T('\\tfrac{4}{3}')}, negate: ${T('-\\tfrac{4}{3}')}. Check: ${T('\\tfrac{3}{4} \\cdot \\left(-\\tfrac{4}{3}\\right) = -1')}.</p>
<p><strong>Worked example 3.</strong> Is the line through ${T('(1, 1)')} and ${T('(4, 3)')} perpendicular to the line through ${T('(2, 5)')} and ${T('(4, 2)')}?</p>
<p>First slope ${T('\\frac{3 - 1}{4 - 1} = \\frac{2}{3}')}. Second slope ${T('\\frac{2 - 5}{4 - 2} = -\\frac{3}{2}')}. Product ${T('\\tfrac{2}{3} \\cdot \\left(-\\tfrac{3}{2}\\right) = -1')}. Yes.</p>

<h3>4. Writing the equation of a line</h3>
<p>You know these from algebra; here is how geometry uses them.</p>
${D('y = mx + b \\qquad\\qquad y - y_1 = m(x - x_1)')}
<p>The first is slope-intercept (${T('b')} is where the line crosses the ${T('y')}-axis). The second, point-slope, is the one to reach for when you have a slope and any point. To write a line <strong>through a given point, parallel or perpendicular to a given line</strong>: read the given line's slope, adjust it (same for parallel, negative reciprocal for perpendicular), then plug the point into point-slope.</p>
<p>If a line is written ${T('Ax + By = C')}, solve for ${T('y')} to see its slope, or use the shortcut ${T('m = -\\tfrac{A}{B}')}. For ${T('3x + 4y = 8')}, ${T('m = -\\tfrac{3}{4}')}.</p>
<p><strong>Worked example 4.</strong> Write the equation of the line through ${T('(4, -1)')} that is perpendicular to ${T('y = \\tfrac{1}{2}x + 3')}.</p>
<p>Given slope ${T('\\tfrac{1}{2}')}, so the perpendicular slope is ${T('-2')}. Point-slope with ${T('(4, -1)')}:</p>
${D('y - (-1) = -2(x - 4) \\;\\Rightarrow\\; y + 1 = -2x + 8 \\;\\Rightarrow\\; y = -2x + 7')}
<p>Check by plugging the point in: ${T('-2(4) + 7 = -1')}. Good.</p>

<h3>5. The distance formula</h3>
<figure class="q-diagram">${svgDistance}</figure>
<p>The distance between two points is the hypotenuse of a right triangle whose legs are the horizontal and vertical differences. That is all the distance formula is: Pythagoras with the legs written out.</p>
${D('d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}')}
<p><strong>Worked example 5.</strong> Find the distance from ${T('(1, 1)')} to ${T('(4, 5)')}.</p>
${D('d = \\sqrt{(4 - 1)^2 + (5 - 1)^2} = \\sqrt{9 + 16} = \\sqrt{25} = 5')}
<p>A 3-4-5 triangle, as the figure shows. Three habits: squaring removes signs, so subtraction order cannot hurt you here; simplify radicals (${T('\\sqrt{50} = 5\\sqrt{2}')}, and the answer choices will be written that way); and a distance is never negative.</p>

<h3>6. The midpoint formula</h3>
<p>The midpoint is the average of the two points, coordinate by coordinate:</p>
${D('M = \\left( \\frac{x_1 + x_2}{2}, \\; \\frac{y_1 + y_2}{2} \\right)')}
<p><strong>Worked example 6.</strong> Midpoint of ${T('(-2, 3)')} and ${T('(6, -1)')}: ${T('\\left(\\tfrac{-2 + 6}{2}, \\tfrac{3 + (-1)}{2}\\right) = (2, 1)')}.</p>
<p><strong>Worked example 7 (backwards).</strong> ${T('M(3, -2)')} is the midpoint of ${T('AB')} and ${T('A = (-1, 4)')}. Find ${T('B')}.</p>
<p>If ${T('M')} is the average of ${T('A')} and ${T('B')}, then ${T('B = 2M - A')} in each coordinate: ${T('x_B = 2(3) - (-1) = 7')} and ${T('y_B = 2(-2) - 4 = -8')}. So ${T('B = (7, -8)')}. Check: the average of ${T('-1')} and ${T('7')} is ${T('3')}, and the average of ${T('4')} and ${T('-8')} is ${T('-2')}.</p>

<h3>7. Triangles on the plane</h3>
<figure class="q-diagram">${svgTri}</figure>
<p>Three things the tests ask about a triangle given by its vertices.</p>
<ul>
  <li><strong>What kind of triangle is it?</strong> Compute all three side lengths with the distance formula. Two equal sides: isosceles. To test for a right angle, either check whether the two shorter sides squared add to the longest squared (Block 2), or check whether two sides have perpendicular slopes (this block). Both work; use whichever is faster with the numbers you have.</li>
  <li><strong>Area.</strong> If one side is horizontal or vertical, its length and the height are read straight off the coordinates, then ${T('\\tfrac{1}{2} \\cdot \\text{base} \\cdot \\text{height}')}. Otherwise use the <strong>box method</strong>: draw the smallest rectangle that contains the triangle, and subtract the right triangles in the corners.</li>
  <li><strong>Perimeter.</strong> Add the three distances.</li>
</ul>
<p><strong>Worked example 8.</strong> ${T('P(-1, 0)')}, ${T('Q(3, 3)')}, ${T('R(7, 0)')}. Classify the triangle and find its area.</p>
<p>${T('PQ = \\sqrt{4^2 + 3^2} = 5')}, ${T('QR = \\sqrt{4^2 + (-3)^2} = 5')}, ${T('PR = 8')} (both on the ${T('x')}-axis). Isosceles. Right angle? ${T('5^2 + 5^2 = 50 \\neq 64')}, so no. Area: base ${T('PR = 8')} lies on the axis and ${T('Q')} is 3 units above it, so ${T('A = \\tfrac{1}{2}(8)(3) = 12')}.</p>
<p><strong>Worked example 9 (box method).</strong> Find the area of the triangle with vertices ${T('(0, 0)')}, ${T('(2, 4)')}, ${T('(6, 1)')}.</p>
<p>No side is horizontal or vertical. The enclosing box runs from ${T('x = 0')} to ${T('6')} and ${T('y = 0')} to ${T('4')}: area ${T('24')}. The three corner right triangles have legs 2 and 4 (area 4), legs 4 and 3 (area 6), and legs 6 and 1 (area 3).</p>
${D('A = 24 - 4 - 6 - 3 = 11')}

<h3>8. Circles on the plane</h3>
<figure class="q-diagram">${svgCircleTangent}</figure>
<p>From Block 5, a circle with center ${T('(h, k)')} and radius ${T('r')} is ${T('(x - h)^2 + (y - k)^2 = r^2')}. This block adds three moves.</p>
<ul>
  <li><strong>Center and one point on the circle.</strong> The radius is the distance from the center to that point. Then write the equation.</li>
  <li><strong>Is a point inside, on, or outside?</strong> Compare its distance from the center with ${T('r')}. Faster: plug the point into the left side of the equation and compare with ${T('r^2')}.</li>
  <li><strong>The tangent at a point.</strong> The tangent is perpendicular to the radius drawn to that point (Block 5), so its slope is the negative reciprocal of the radius's slope. A line tangent to the circle sits exactly ${T('r')} away from the center; for horizontal and vertical lines that distance is a single coordinate difference.</li>
</ul>
<p><strong>Worked example 10.</strong> A circle has center ${T('(2, -3)')} and passes through ${T('(5, 1)')}. Write its equation.</p>
<p>${T('r = \\sqrt{(5 - 2)^2 + (1 - (-3))^2} = \\sqrt{9 + 16} = 5')}, so ${T('(x - 2)^2 + (y + 3)^2 = 25')}.</p>
<p><strong>Worked example 11.</strong> The point ${T('(5, 5)')} lies on the circle with center ${T('(2, 1)')}. Find the slope of the tangent line at ${T('(5, 5)')}.</p>
<p>Radius slope: ${T('\\frac{5 - 1}{5 - 2} = \\frac{4}{3}')}. Tangent slope: ${T('-\\tfrac{3}{4}')}. If asked for the full line, point-slope through ${T('(5, 5)')}: ${T('y - 5 = -\\tfrac{3}{4}(x - 5)')}. That is the figure above.</p>

<h3>How to attack a coordinate problem</h3>
<ol>
  <li>Sketch it, even roughly. A picture catches sign errors and tells you which tool applies.</li>
  <li>Slope questions: rise over run, same subtraction order. Parallel means equal slopes; perpendicular means negative reciprocals.</li>
  <li>Length questions: distance formula (Pythagoras). Simplify the radical.</li>
  <li>"Halfway" or "bisect" questions: midpoint, average each coordinate. Unknown endpoint: ${T('2M - A')}.</li>
  <li>Triangles: compute the three sides, then classify, then area by base-height or the box method.</li>
  <li>Circles: find the radius first (usually a distance), then the equation. Tangent slope is perpendicular to the radius slope.</li>
</ol>
`;

/* ---------- Practice set (20) ---------- */

const practice = [
  {
    id: 'b6-p01', blockId: 6, topic: 'Slope', difficulty: 'easy', type: 'mc',
    prompt: `What is the slope of the line through ${T('(1, 2)')} and ${T('(4, 8)')}?`,
    choices: [T('2'), T('\\tfrac{1}{2}'), T('-2'), T('6')],
    answer: 0,
    solution: `${D('m = \\frac{8 - 2}{4 - 1} = \\frac{6}{3} = 2')}<p>${T('\\tfrac{1}{2}')} is run over rise, upside down. 6 is the rise alone.</p>`,
  },
  {
    id: 'b6-p02', blockId: 6, topic: 'Distance', difficulty: 'easy', type: 'numeric',
    prompt: `Enter the distance between ${T('(1, 1)')} and ${T('(4, 5)')}.`,
    answer: 5,
    solution: `${D('d = \\sqrt{(4 - 1)^2 + (5 - 1)^2} = \\sqrt{9 + 16} = 5')}<p>A 3-4-5 right triangle.</p>`,
  },
  {
    id: 'b6-p03', blockId: 6, topic: 'Midpoint', difficulty: 'easy', type: 'mc',
    prompt: `What is the midpoint of the segment from ${T('(-2, 3)')} to ${T('(6, -1)')}?`,
    choices: [T('(2, 1)'), T('(4, 2)'), T('(-4, 2)'), T('(2, -1)')],
    answer: 0,
    solution: `<p>Average each coordinate.</p>${D('\\left(\\frac{-2 + 6}{2}, \\frac{3 + (-1)}{2}\\right) = (2, 1)')}<p>${T('(4, 2)')} forgets to divide by 2. ${T('(-4, 2)')} subtracts the ${T('x')} values instead of adding.</p>`,
  },
  {
    id: 'b6-p04', blockId: 6, topic: 'Parallel and perpendicular', difficulty: 'easy', type: 'mc',
    prompt: `A line has slope ${T('\\tfrac{3}{4}')}. What is the slope of a line perpendicular to it?`,
    choices: [T('-\\tfrac{4}{3}'), T('\\tfrac{4}{3}'), T('-\\tfrac{3}{4}'), T('\\tfrac{3}{4}')],
    answer: 0,
    solution: `<p>Negative reciprocal: flip and change the sign.</p>${D('\\tfrac{3}{4} \\cdot \\left(-\\tfrac{4}{3}\\right) = -1')}<p>${T('\\tfrac{4}{3}')} flips without the sign change; ${T('-\\tfrac{3}{4}')} changes the sign without flipping.</p>`,
  },
  {
    id: 'b6-p05', blockId: 6, topic: 'Slope', difficulty: 'easy', type: 'numeric',
    prompt: `Enter the slope of the line through ${T('(-3, 5)')} and ${T('(2, 5)')}.`,
    answer: 0,
    solution: `${D('m = \\frac{5 - 5}{2 - (-3)} = \\frac{0}{5} = 0')}<p>Both points have the same ${T('y')}, so the line is horizontal. Horizontal lines have slope 0; it is vertical lines whose slope is undefined.</p>`,
  },
  {
    id: 'b6-p06', blockId: 6, topic: 'Parallel and perpendicular', difficulty: 'easy', type: 'mc',
    prompt: `Which line is parallel to ${T('y = 2x - 5')}?`,
    choices: [T('y = 2x + 1'), T('y = -2x - 5'), T('y = -\\tfrac{1}{2}x + 3'), T('y = \\tfrac{1}{2}x - 5')],
    answer: 0,
    solution: `<p>Parallel lines have the same slope, 2. The intercept can be anything.</p><p>${T('y = -\\tfrac{1}{2}x + 3')} is <em>perpendicular</em> (negative reciprocal). The other two share neither slope nor a perpendicular slope.</p>`,
  },
  {
    id: 'b6-p07', blockId: 6, topic: 'Distance', difficulty: 'easy', type: 'numeric',
    prompt: `Enter the distance between ${T('(-2, -3)')} and ${T('(4, 5)')}.`,
    answer: 10,
    solution: `${D('d = \\sqrt{(4 - (-2))^2 + (5 - (-3))^2} = \\sqrt{6^2 + 8^2} = \\sqrt{100} = 10')}<p>Subtracting a negative adds. A 6-8-10 triangle.</p>`,
  },
  {
    id: 'b6-p08', blockId: 6, topic: 'Midpoint', difficulty: 'medium', type: 'mc',
    prompt: `${T('M(3, -2)')} is the midpoint of segment ${T('AB')}, and ${T('A = (-1, 4)')}. What are the coordinates of ${T('B')}?`,
    choices: [T('(7, -8)'), T('(1, 1)'), T('(4, -6)'), T('(-5, 10)')],
    answer: 0,
    solution: `<p>The midpoint is the average, so ${T('B = 2M - A')} coordinate by coordinate.</p>${D('x_B = 2(3) - (-1) = 7, \\qquad y_B = 2(-2) - 4 = -8')}<p>Check: the midpoint of ${T('(-1, 4)')} and ${T('(7, -8)')} is ${T('(3, -2)')}. ${T('(1, 1)')} is the midpoint of ${T('A')} and ${T('M')}; ${T('(4, -6)')} is the step from ${T('A')} to ${T('M')}, not the endpoint; ${T('(-5, 10)')} goes the wrong direction.</p>`,
  },
  {
    id: 'b6-p09', blockId: 6, topic: 'Parallel and perpendicular', difficulty: 'medium', type: 'numeric',
    prompt: `The line through ${T('(2, k)')} and ${T('(5, 1)')} is perpendicular to a line with slope ${T('\\tfrac{3}{2}')}. Enter ${T('k')}.`,
    answer: 3,
    solution: `<p>The perpendicular slope is ${T('-\\tfrac{2}{3}')}. Set the slope of the given points equal to it.</p>${D('\\frac{1 - k}{5 - 2} = -\\frac{2}{3} \\;\\Rightarrow\\; 1 - k = -2 \\;\\Rightarrow\\; k = 3')}<p>Check: from ${T('(2, 3)')} to ${T('(5, 1)')} is run 3, rise ${T('-2')}.</p>`,
  },
  {
    id: 'b6-p10', blockId: 6, topic: 'Distance', difficulty: 'medium', type: 'mc',
    prompt: `What is the distance between ${T('(2, -1)')} and ${T('(-3, 4)')}?`,
    choices: [T('5\\sqrt{2}'), T('10'), T('5'), T('\\sqrt{10}')],
    answer: 0,
    solution: `${D('d = \\sqrt{(-3 - 2)^2 + (4 - (-1))^2} = \\sqrt{25 + 25} = \\sqrt{50} = 5\\sqrt{2}')}<p>10 adds the legs instead of using Pythagoras; ${T('\\sqrt{10}')} forgets to square them.</p>`,
  },
  {
    id: 'b6-p11', blockId: 6, topic: 'Slope', difficulty: 'medium', type: 'mc',
    prompt: `A line passes through ${T('(0, 4)')} and ${T('(6, 0)')}. Which is its equation?`,
    choices: [T('y = -\\tfrac{2}{3}x + 4'), T('y = -\\tfrac{3}{2}x + 4'), T('y = \\tfrac{2}{3}x + 4'), T('y = -\\tfrac{2}{3}x + 6')],
    answer: 0,
    solution: `<p>Slope ${T('\\frac{0 - 4}{6 - 0} = -\\frac{4}{6} = -\\frac{2}{3}')}. The line crosses the ${T('y')}-axis at ${T('(0, 4)')}, so ${T('b = 4')}.</p>${D('y = -\\tfrac{2}{3}x + 4')}<p>Check ${T('(6, 0)')}: ${T('-\\tfrac{2}{3}(6) + 4 = 0')}. The intercept 6 is the ${T('x')}-intercept, not ${T('b')}.</p>`,
  },
  {
    id: 'b6-p12', blockId: 6, topic: 'Triangles on the plane', difficulty: 'medium', type: 'numeric',
    prompt: `A triangle has vertices ${T('(0, 0)')}, ${T('(6, 0)')} and ${T('(2, 5)')}. Enter its area.`,
    answer: 15,
    solution: `<p>The side from ${T('(0, 0)')} to ${T('(6, 0)')} is horizontal with length 6, and the third vertex is 5 units above it.</p>${D('A = \\tfrac{1}{2}(6)(5) = 15')}<p>The height is the vertical distance to the base line, no matter where along it the vertex sits.</p>`,
  },
  {
    id: 'b6-p13', blockId: 6, topic: 'Circles on the plane', difficulty: 'medium', type: 'mc',
    prompt: `A circle has center ${T('(2, -3)')} and passes through ${T('(5, 1)')}. Which is its equation?`,
    choices: [T('(x - 2)^2 + (y + 3)^2 = 25'), T('(x + 2)^2 + (y - 3)^2 = 25'), T('(x - 2)^2 + (y + 3)^2 = 5'), T('(x - 5)^2 + (y - 1)^2 = 25')],
    answer: 0,
    solution: `<p>Radius is the distance from the center to the point.</p>${D('r = \\sqrt{(5 - 2)^2 + (1 + 3)^2} = \\sqrt{9 + 16} = 5 \\;\\Rightarrow\\; r^2 = 25')}<p>Center ${T('(2, -3)')} gives ${T('(x - 2)')} and ${T('(y + 3)')}. The right side is ${T('r^2')}, not ${T('r')}. The last choice puts the center at the point on the circle.</p>`,
  },
  {
    id: 'b6-p14', blockId: 6, topic: 'Parallel and perpendicular', difficulty: 'medium', type: 'mc',
    prompt: `Which is the equation of the line through ${T('(4, -1)')} that is perpendicular to ${T('y = \\tfrac{1}{2}x + 3')}?`,
    choices: [T('y = -2x + 7'), T('y = \\tfrac{1}{2}x - 3'), T('y = -2x - 1'), T('y = 2x - 9')],
    answer: 0,
    solution: `<p>Perpendicular slope: ${T('-2')}. Point-slope through ${T('(4, -1)')}:</p>${D('y + 1 = -2(x - 4) \\;\\Rightarrow\\; y = -2x + 7')}<p>Check: ${T('-2(4) + 7 = -1')}. ${T('y = -2x - 1')} has the right slope but uses ${T('-1')} as the intercept instead of plugging in the point.</p>`,
  },
  {
    id: 'b6-p15', blockId: 6, topic: 'Triangles on the plane', difficulty: 'hard', type: 'mc',
    diagram: svgTriB,
    prompt: `Triangle ${T('ABC')} has vertices ${T('A(1, 1)')}, ${T('B(4, 5)')} and ${T('C(8, 2)')}. Which statement is true?`,
    choices: [
      `${T('ABC')} is an isosceles right triangle with the right angle at ${T('B')}.`,
      `${T('ABC')} is equilateral.`,
      `${T('ABC')} is a right triangle with the right angle at ${T('A')}.`,
      `${T('ABC')} is scalene with no right angle.`,
    ],
    answer: 0,
    solution: `<p>Sides: ${T('AB = \\sqrt{3^2 + 4^2} = 5')}, ${T('BC = \\sqrt{4^2 + 3^2} = 5')}, ${T('AC = \\sqrt{7^2 + 1^2} = \\sqrt{50}')}. Two equal sides, so isosceles.</p><p>Right angle: ${T('5^2 + 5^2 = 50 = AC^2')}, so the angle opposite ${T('AC')}, which is at ${T('B')}, is ${T('90^\\circ')}. Slopes confirm it: ${T('AB')} has slope ${T('\\tfrac{4}{3}')} and ${T('BC')} has slope ${T('-\\tfrac{3}{4}')}, product ${T('-1')}.</p>`,
  },
  {
    id: 'b6-p16', blockId: 6, topic: 'Midpoint', difficulty: 'hard', type: 'numeric',
    prompt: `Parallelogram ${T('ABCD')} has vertices ${T('A(1, 2)')}, ${T('B(5, 3)')} and ${T('C(7, 7)')}, listed in order around the shape. The diagonals of a parallelogram bisect each other. Enter the ${T('x')}-coordinate of ${T('D')}.`,
    answer: 3,
    solution: `<p>The diagonals ${T('AC')} and ${T('BD')} share the same midpoint.</p>${D('\\text{midpoint of } AC = \\left(\\tfrac{1 + 7}{2}, \\tfrac{2 + 7}{2}\\right) = (4, 4.5)')}<p>So ${T('D = 2(4, 4.5) - B = (8 - 5, 9 - 3) = (3, 6)')}. The ${T('x')}-coordinate is 3.</p><p>Check with slopes: ${T('AB')} and ${T('DC')} both have slope ${T('\\tfrac{1}{4}')}, and ${T('AD')} and ${T('BC')} both have slope 2. Opposite sides parallel, as they should be.</p>`,
  },
  {
    id: 'b6-p17', blockId: 6, topic: 'Circles on the plane', difficulty: 'hard', type: 'mc',
    prompt: `The point ${T('(3, 4)')} lies on the circle ${T('x^2 + y^2 = 25')}. What is the slope of the line tangent to the circle at that point?`,
    choices: [T('-\\tfrac{3}{4}'), T('\\tfrac{4}{3}'), T('\\tfrac{3}{4}'), T('-\\tfrac{4}{3}')],
    answer: 0,
    solution: `<p>The center is the origin. The radius to ${T('(3, 4)')} has slope ${T('\\tfrac{4 - 0}{3 - 0} = \\tfrac{4}{3}')}. The tangent is perpendicular to that radius, so its slope is the negative reciprocal, ${T('-\\tfrac{3}{4}')}.</p><p>${T('\\tfrac{4}{3}')} is the radius's slope, not the tangent's.</p>`,
  },
  {
    id: 'b6-p18', blockId: 6, topic: 'Distance', difficulty: 'hard', type: 'numeric',
    prompt: `The point ${T('(k, 2)')} is 5 units from ${T('(1, -2)')}, and ${T('k > 0')}. Enter ${T('k')}.`,
    answer: 4,
    solution: `<p>Set the distance formula equal to 5 and square both sides.</p>${D('(k - 1)^2 + (2 - (-2))^2 = 25 \\;\\Rightarrow\\; (k - 1)^2 + 16 = 25 \\;\\Rightarrow\\; (k - 1)^2 = 9')}<p>So ${T('k - 1 = \\pm 3')}, giving ${T('k = 4')} or ${T('k = -2')}. The positive one is 4.</p>`,
  },
  {
    id: 'b6-p19', blockId: 6, topic: 'Circles on the plane', difficulty: 'hard', type: 'numeric',
    prompt: `A circle has center ${T('(1, 2)')}, and the line ${T('y = 6')} is tangent to it. The area of the circle is ${T('k\\pi')}. Enter ${T('k')}.`,
    answer: 16,
    solution: `<p>A tangent line is exactly one radius away from the center. The line ${T('y = 6')} is horizontal, so its distance from ${T('(1, 2)')} is the vertical gap ${T('6 - 2 = 4')}. Radius 4.</p>${D('A = \\pi r^2 = 16\\pi \\;\\Rightarrow\\; k = 16')}<p>The point of tangency is ${T('(1, 6)')}, directly above the center, and the radius to it is vertical, perpendicular to the horizontal tangent.</p>`,
  },
  {
    id: 'b6-p20', blockId: 6, topic: 'Triangles on the plane', difficulty: 'hard', type: 'numeric',
    prompt: `Triangle ${T('ABC')} has vertices ${T('A(0, 0)')}, ${T('B(6, 0)')} and ${T('C(2, 4)')}. A median joins a vertex to the midpoint of the opposite side. Enter the length of the median from ${T('C')}, rounded to one decimal place.`,
    answer: 4.1, tolerance: 0.15,
    solution: `<p>Midpoint of ${T('AB')}: ${T('(3, 0)')}. Distance from ${T('C(2, 4)')} to ${T('(3, 0)')}:</p>${D('\\sqrt{(3 - 2)^2 + (0 - 4)^2} = \\sqrt{1 + 16} = \\sqrt{17} \\approx 4.1')}`,
  },
];

/* ---------- No checkpoint in Block 6 (per the plan) ---------- */

const checkpoint = [];

export default { lesson, practice, checkpoint };
