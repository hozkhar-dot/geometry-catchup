// Block 4: Right-triangle trigonometry. SOH-CAH-TOA, solving right triangles,
// angles of elevation and depression. Checkpoint 2 lives here.
// All questions original. Math in data-tex attributes (KaTeX).

const T = (s) => `<span data-tex="${s}"></span>`;
const D = (s) => `<div data-tex-display="${s}"></div>`;

/* ---------- Diagrams ---------- */

// Right triangle: angle at A (bottom-left), right angle at C (bottom-right), B on top.
// Labels: opp (vertical side BC), adj (bottom side AC), hyp (AB), ang (at A).
// The drawn angle at A is about 31 degrees, so most question uses carry a "not to scale" note.
const svgTri = ({ opp = '', adj = '', hyp = '', ang = '', note = 'Not drawn to scale' } = {}) => `<svg viewBox="0 0 310 200" width="310" height="200" role="img" aria-label="Right triangle with the right angle at the bottom right. The marked angle is at the bottom left. Side labels: ${adj || 'adjacent'} along the bottom, ${opp || 'opposite'} on the right, ${hyp || 'hypotenuse'} on the slanted side.">
  <polygon points="30,170 230,170 230,50" fill="none" stroke="currentColor" stroke-width="2"/>
  <rect x="214" y="154" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5"/>
  <path d="M 62 170 A 32 32 0 0 0 57.4 153.5" fill="none" stroke="currentColor" stroke-width="1.3"/>
  <text x="70" y="162" font-size="13" fill="currentColor">${ang}</text>
  <text x="130" y="190" text-anchor="middle" font-size="13" fill="currentColor">${adj}</text>
  <text x="246" y="115" font-size="13" fill="currentColor">${opp}</text>
  <text x="110" y="94" text-anchor="middle" font-size="13" fill="currentColor">${hyp}</text>
  ${note ? `<text x="306" y="196" text-anchor="end" font-size="11" fill="currentColor">${note}</text>` : ''}
</svg>`;

const svgElevation = `<svg viewBox="0 0 320 200" width="320" height="200" role="img" aria-label="An observer on the left looks up at the top of a building on the right. A dashed horizontal line runs from the observer's eye to the building; the angle between that line and the line of sight is the angle of elevation.">
  <line x1="10" y1="170" x2="310" y2="170" stroke="currentColor" stroke-width="2"/>
  <line x1="260" y1="30" x2="260" y2="170" stroke="currentColor" stroke-width="3"/>
  <circle cx="40" cy="150" r="4" fill="currentColor"/>
  <line x1="40" y1="150" x2="260" y2="150" stroke="currentColor" stroke-width="1.5" stroke-dasharray="6 4"/>
  <line x1="40" y1="150" x2="260" y2="30" stroke="currentColor" stroke-width="2"/>
  <path d="M 80 150 A 40 40 0 0 0 75.1 130.8" fill="none" stroke="currentColor" stroke-width="1.3"/>
  <text x="86" y="140" font-size="12" fill="currentColor">angle of elevation</text>
  <text x="150" y="188" text-anchor="middle" font-size="12" fill="currentColor">horizontal distance</text>
  <text x="268" y="100" font-size="12" fill="currentColor">height</text>
  <text x="16" y="146" font-size="12" fill="currentColor">eye</text>
</svg>`;

const svgDepression = `<svg viewBox="0 0 320 200" width="320" height="200" role="img" aria-label="An observer at the top of a cliff on the left looks down at a boat on the right. A dashed horizontal line extends from the top of the cliff; the angle between it and the line of sight is the angle of depression. The same angle appears at the boat, between the water and the line of sight.">
  <line x1="60" y1="30" x2="60" y2="170" stroke="currentColor" stroke-width="3"/>
  <line x1="10" y1="170" x2="310" y2="170" stroke="currentColor" stroke-width="2"/>
  <line x1="60" y1="30" x2="300" y2="30" stroke="currentColor" stroke-width="1.5" stroke-dasharray="6 4"/>
  <line x1="60" y1="30" x2="260" y2="170" stroke="currentColor" stroke-width="2"/>
  <path d="M 100 30 A 40 40 0 0 1 92.8 53" fill="none" stroke="currentColor" stroke-width="1.3"/>
  <text x="106" y="52" font-size="12" fill="currentColor">angle of depression</text>
  <path d="M 226 170 A 34 34 0 0 1 232.2 150.5" fill="none" stroke="currentColor" stroke-width="1.3"/>
  <text x="190" y="162" text-anchor="end" font-size="12" fill="currentColor">same angle</text>
  <text x="36" y="104" text-anchor="middle" font-size="12" fill="currentColor">cliff</text>
  <text x="262" y="188" font-size="12" fill="currentColor">boat</text>
</svg>`;

// Two observation points on the ground, 30 m apart, looking at the top of the same building.
const svgTwoStep = `<svg viewBox="0 0 320 200" width="320" height="200" role="img" aria-label="A building on the right. Two points on the ground to its left, 30 meters apart, each with a line of sight to the top of the building. The angle of elevation is 40 degrees from the farther point and 55 degrees from the nearer point. Not drawn to scale.">
  <line x1="10" y1="170" x2="310" y2="170" stroke="currentColor" stroke-width="2"/>
  <line x1="270" y1="30" x2="270" y2="170" stroke="currentColor" stroke-width="3"/>
  <line x1="30" y1="170" x2="270" y2="30" stroke="currentColor" stroke-width="1.8"/>
  <line x1="130" y1="170" x2="270" y2="30" stroke="currentColor" stroke-width="1.8"/>
  <circle cx="30" cy="170" r="3.5" fill="currentColor"/>
  <circle cx="130" cy="170" r="3.5" fill="currentColor"/>
  <text x="58" y="162" font-size="12" fill="currentColor">40°</text>
  <text x="152" y="162" font-size="12" fill="currentColor">55°</text>
  <text x="80" y="188" text-anchor="middle" font-size="12" fill="currentColor">30 m</text>
  <text x="200" y="188" text-anchor="middle" font-size="12" fill="currentColor">d</text>
  <text x="278" y="104" font-size="12" fill="currentColor">h</text>
  <text x="310" y="196" text-anchor="end" font-size="11" fill="currentColor">Not drawn to scale</text>
</svg>`;

/* ---------- Lesson ---------- */

const lesson = `
<p>Block 3 ended with a big idea: all right triangles with the same acute angle are similar, so their side ratios are identical no matter the size. Trigonometry gives those ratios names. Once you know one acute angle of a right triangle and one side, you can find everything else, and this is the tool precalculus builds on for the rest of the year.</p>

<h3>1. Naming the sides from the angle's point of view</h3>
<p>Pick one of the two acute angles and call it ${T('\\theta')} (theta). Then:</p>
<ul>
  <li>The <strong>hypotenuse</strong> is the side across from the right angle. It is always the longest side and never changes with your choice of angle.</li>
  <li>The <strong>opposite</strong> side is the one across from ${T('\\theta')}, the side ${T('\\theta')} does not touch.</li>
  <li>The <strong>adjacent</strong> side is the leg that touches ${T('\\theta')} (the one that is not the hypotenuse).</li>
</ul>
<figure class="q-diagram">${svgTri({ opp: 'opposite', adj: 'adjacent', hyp: 'hypotenuse', ang: 'θ', note: '' })}</figure>
<p>If you switch to the other acute angle, opposite and adjacent trade places. Always label the sides <em>from the angle you are using</em> before you write anything.</p>

<h3>2. The three ratios: SOH-CAH-TOA</h3>
${D('\\sin\\theta = \\frac{\\text{opposite}}{\\text{hypotenuse}} \\qquad \\cos\\theta = \\frac{\\text{adjacent}}{\\text{hypotenuse}} \\qquad \\tan\\theta = \\frac{\\text{opposite}}{\\text{adjacent}}')}
<p>Say it as <strong>SOH CAH TOA</strong>: Sine is Opposite over Hypotenuse, Cosine is Adjacent over Hypotenuse, Tangent is Opposite over Adjacent. These are pure numbers (a length divided by a length), and they depend only on the angle, which is exactly the similar-triangles fact from Block 3. Because the hypotenuse is the longest side, ${T('\\sin\\theta')} and ${T('\\cos\\theta')} are always between 0 and 1 for an acute angle; ${T('\\tan\\theta')} can be any positive number.</p>

<p><strong>Worked example 1.</strong> A right triangle has legs 6 and 8 and hypotenuse 10. For the angle ${T('\\theta')} opposite the side of length 6, find all three ratios.</p>
<p>Opposite 6, adjacent 8, hypotenuse 10: ${T('\\sin\\theta = 6/10 = 3/5')}, ${T('\\cos\\theta = 8/10 = 4/5')}, ${T('\\tan\\theta = 6/8 = 3/4')}. Notice ${T('\\tan\\theta = \\sin\\theta / \\cos\\theta')}; that is always true.</p>

<p><strong>Given one ratio, get the others.</strong> If ${T('\\sin\\theta = 5/13')}, draw the triangle: opposite 5, hypotenuse 13, so the adjacent leg is ${T('\\sqrt{13^2 - 5^2} = 12')} (Block 2). Then ${T('\\cos\\theta = 12/13')} and ${T('\\tan\\theta = 5/12')}. The SAT loves this move.</p>

<h3>3. Exact values from the special triangles</h3>
<p>The 45-45-90 and 30-60-90 triangles from Block 2 give exact ratios you should know cold:</p>
<div class="table-wrap"><table class="topic-table">
  <thead><tr><th>${T('\\theta')}</th><th>${T('\\sin\\theta')}</th><th>${T('\\cos\\theta')}</th><th>${T('\\tan\\theta')}</th></tr></thead>
  <tbody>
    <tr><td>${T('30^\\circ')}</td><td>${T('\\tfrac{1}{2}')}</td><td>${T('\\tfrac{\\sqrt{3}}{2}')}</td><td>${T('\\tfrac{1}{\\sqrt{3}} = \\tfrac{\\sqrt{3}}{3}')}</td></tr>
    <tr><td>${T('45^\\circ')}</td><td>${T('\\tfrac{\\sqrt{2}}{2}')}</td><td>${T('\\tfrac{\\sqrt{2}}{2}')}</td><td>${T('1')}</td></tr>
    <tr><td>${T('60^\\circ')}</td><td>${T('\\tfrac{\\sqrt{3}}{2}')}</td><td>${T('\\tfrac{1}{2}')}</td><td>${T('\\sqrt{3}')}</td></tr>
  </tbody>
</table></div>
<p>Where they come from: in the 30-60-90 triangle with sides ${T('1, \\sqrt{3}, 2')}, the side opposite ${T('30^\\circ')} is 1 and the hypotenuse is 2, so ${T('\\sin 30^\\circ = 1/2')}. In the 45-45-90 triangle with sides ${T('1, 1, \\sqrt{2}')}, ${T('\\tan 45^\\circ = 1/1 = 1')}. If you forget a value, redraw the triangle; it takes ten seconds.</p>

<h3>4. Finding a missing side</h3>
<p>Three steps, every time:</p>
<ol>
  <li>From the given angle, label the side you know and the side you want as opposite, adjacent or hypotenuse.</li>
  <li>Pick the ratio that uses exactly those two sides (SOH, CAH or TOA).</li>
  <li>Write the equation and solve. Calculator in <strong>degree mode</strong>. Round only at the very end.</li>
</ol>

<p><strong>Worked example 2.</strong> In a right triangle, one acute angle is ${T('35^\\circ')} and the hypotenuse is 20. Find the side opposite the ${T('35^\\circ')} angle.</p>
<p>Opposite and hypotenuse: use sine.</p>
${D('\\sin 35^\\circ = \\frac{x}{20} \\;\\Rightarrow\\; x = 20 \\sin 35^\\circ \\approx 20(0.5736) \\approx 11.5')}

<p><strong>Worked example 3 (unknown on the bottom).</strong> The side opposite a ${T('28^\\circ')} angle is 9. Find the hypotenuse.</p>
${D('\\sin 28^\\circ = \\frac{9}{h} \\;\\Rightarrow\\; h = \\frac{9}{\\sin 28^\\circ} \\approx \\frac{9}{0.4695} \\approx 19.2')}
<p>When the unknown is in the denominator, you <em>divide</em> by the ratio. Multiplying by mistake gives ${T('9 \\sin 28^\\circ \\approx 4.2')}, which is smaller than the leg, impossible for a hypotenuse. A quick size check catches this: the hypotenuse must be the longest side.</p>

<p><strong>Worked example 4.</strong> The side adjacent to a ${T('62^\\circ')} angle is 5. Find the opposite side.</p>
${D('\\tan 62^\\circ = \\frac{x}{5} \\;\\Rightarrow\\; x = 5 \\tan 62^\\circ \\approx 5(1.8807) \\approx 9.4')}

<h3>5. Finding a missing angle</h3>
<p>If you know two sides, form the ratio and undo it with the <strong>inverse</strong> function on your calculator: ${T('\\sin^{-1}')}, ${T('\\cos^{-1}')} or ${T('\\tan^{-1}')} (also written arcsin, arccos, arctan). The inverse takes a ratio and returns the angle.</p>
<p><strong>Worked example 5.</strong> A right triangle has legs 7 (opposite ${T('\\theta')}) and 10 (adjacent). Find ${T('\\theta')}.</p>
${D('\\tan\\theta = \\frac{7}{10} = 0.7 \\;\\Rightarrow\\; \\theta = \\tan^{-1}(0.7) \\approx 35.0^\\circ')}
<p>Check that the answer makes sense: the opposite leg is shorter than the adjacent one, so the angle should be under ${T('45^\\circ')}. It is. Note that ${T('\\sin^{-1}')} is <em>not</em> ${T('1/\\sin')}; it is the button that reverses sine.</p>

<h3>6. The cofunction rule</h3>
<p>The two acute angles of a right triangle add to ${T('90^\\circ')}. The side opposite one of them is adjacent to the other, so the sine of one angle equals the cosine of the other:</p>
${D('\\sin\\theta = \\cos(90^\\circ - \\theta) \\qquad\\text{and}\\qquad \\cos\\theta = \\sin(90^\\circ - \\theta)')}
<p>So ${T('\\sin 40^\\circ = \\cos 50^\\circ')}, and if a problem says ${T('\\sin A = \\cos B')} for acute angles, then ${T('A + B = 90^\\circ')}. This appears on the SAT in disguise almost every time.</p>

<h3>7. Angles of elevation and depression</h3>
<p>An <strong>angle of elevation</strong> is measured upward from the horizontal to your line of sight (looking up at a building, a kite, a plane). An <strong>angle of depression</strong> is measured downward from the horizontal (looking down from a cliff or a tower at a boat). Both are always measured from a <em>horizontal</em> line, never from the vertical wall or pole.</p>
<figure class="q-diagram">${svgElevation}</figure>
<figure class="q-diagram">${svgDepression}</figure>
<p>The key trick with depression: the horizontal line at the top and the ground are parallel, so the angle of depression equals the angle of elevation measured from the other end (alternate interior angles, Block 1). In practice, put the angle at the ground point inside the triangle and solve as usual.</p>

<p><strong>Worked example 6.</strong> From a point 40 feet from the base of a tree, the angle of elevation to the top is ${T('32^\\circ')}. How tall is the tree?</p>
${D('\\tan 32^\\circ = \\frac{h}{40} \\;\\Rightarrow\\; h = 40 \\tan 32^\\circ \\approx 40(0.6249) \\approx 25.0 \\text{ ft}')}

<p><strong>Worked example 7.</strong> From the top of a 50-meter cliff, the angle of depression to a boat is ${T('18^\\circ')}. How far is the boat from the base of the cliff?</p>
<p>Move the ${T('18^\\circ')} to the boat (alternate interior angles). Opposite is the cliff (50), adjacent is the distance ${T('d')}.</p>
${D('\\tan 18^\\circ = \\frac{50}{d} \\;\\Rightarrow\\; d = \\frac{50}{\\tan 18^\\circ} \\approx \\frac{50}{0.3249} \\approx 153.9 \\text{ m}')}

<h3>How to attack a trig problem</h3>
<ol>
  <li>Draw the right triangle and mark the right angle. For word problems the ground or wall is usually one leg.</li>
  <li>From the given angle, label opposite, adjacent and hypotenuse.</li>
  <li>Choose the one ratio that links what you know to what you want.</li>
  <li>Solve; divide when the unknown is on the bottom. Degree mode. Check the size makes sense.</li>
</ol>
<p>The most common test errors: calculator in radian mode, measuring an angle of depression from the vertical, and multiplying when you should divide.</p>
`;

/* ---------- Practice set (20) ---------- */

const practice = [
  {
    id: 'b4-p01', blockId: 4, topic: 'Trig ratios', difficulty: 'easy', type: 'mc',
    diagram: svgTri({ opp: '3', adj: '4', hyp: '5', ang: 'θ' }),
    prompt: `In the right triangle shown, the side opposite ${T('\\theta')} is 3, the adjacent side is 4 and the hypotenuse is 5. What is ${T('\\sin\\theta')}?`,
    choices: [T('\\dfrac{3}{5}'), T('\\dfrac{4}{5}'), T('\\dfrac{3}{4}'), T('\\dfrac{5}{3}')],
    answer: 0,
    solution: `<p>SOH: sine is opposite over hypotenuse.</p>${D('\\sin\\theta = \\frac{3}{5}')}<p>${T('4/5')} is the cosine and ${T('3/4')} is the tangent.</p>`,
  },
  {
    id: 'b4-p02', blockId: 4, topic: 'Trig ratios', difficulty: 'easy', type: 'mc',
    prompt: `In the same 3-4-5 right triangle, with ${T('\\theta')} opposite the side of length 3, what is ${T('\\tan\\theta')}?`,
    choices: [T('\\dfrac{3}{4}'), T('\\dfrac{4}{3}'), T('\\dfrac{3}{5}'), T('\\dfrac{4}{5}')],
    answer: 0,
    solution: `<p>TOA: tangent is opposite over adjacent.</p>${D('\\tan\\theta = \\frac{3}{4}')}<p>${T('4/3')} is the tangent of the <em>other</em> acute angle.</p>`,
  },
  {
    id: 'b4-p03', blockId: 4, topic: 'Trig ratios', difficulty: 'easy', type: 'numeric',
    prompt: `A right triangle has legs 8 and 15 and hypotenuse 17. Angle ${T('A')} is opposite the leg of length 8. Enter ${T('\\cos A')} as a fraction or decimal.`,
    answer: 15 / 17,
    solution: `<p>CAH: cosine is adjacent over hypotenuse. The leg adjacent to ${T('A')} is 15.</p>${D('\\cos A = \\frac{15}{17} \\approx 0.882')}`,
  },
  {
    id: 'b4-p04', blockId: 4, topic: 'Special angles', difficulty: 'easy', type: 'mc',
    prompt: `What is the exact value of ${T('\\sin 30^\\circ')}?`,
    choices: [T('\\dfrac{1}{2}'), T('\\dfrac{\\sqrt{3}}{2}'), T('\\dfrac{\\sqrt{2}}{2}'), T('1')],
    answer: 0,
    solution: `<p>In the 30-60-90 triangle with sides ${T('1, \\sqrt{3}, 2')}, the side opposite ${T('30^\\circ')} is 1 and the hypotenuse is 2.</p>${D('\\sin 30^\\circ = \\frac{1}{2}')}<p>${T('\\sqrt{3}/2')} is ${T('\\cos 30^\\circ')} (and ${T('\\sin 60^\\circ')}).</p>`,
  },
  {
    id: 'b4-p05', blockId: 4, topic: 'Special angles', difficulty: 'easy', type: 'mc',
    prompt: `What is the exact value of ${T('\\tan 45^\\circ')}?`,
    choices: [T('1'), T('\\sqrt{2}'), T('\\dfrac{\\sqrt{2}}{2}'), T('\\dfrac{1}{2}')],
    answer: 0,
    solution: `<p>A 45-45-90 triangle has equal legs, so opposite over adjacent is ${T('1/1')}.</p>${D('\\tan 45^\\circ = 1')}<p>${T('\\sqrt{2}/2')} is the sine and cosine of ${T('45^\\circ')}, not the tangent.</p>`,
  },
  {
    id: 'b4-p06', blockId: 4, topic: 'Finding a side', difficulty: 'easy', type: 'numeric',
    diagram: svgTri({ opp: 'x', hyp: '20', ang: '35°' }),
    prompt: `In the right triangle shown, the hypotenuse is 20 and one acute angle is ${T('35^\\circ')}. Enter the length of the side opposite the ${T('35^\\circ')} angle, rounded to one decimal place.`,
    answer: 11.5, tolerance: 0.15,
    solution: `<p>Opposite and hypotenuse: sine.</p>${D('\\sin 35^\\circ = \\frac{x}{20} \\;\\Rightarrow\\; x = 20 \\sin 35^\\circ \\approx 20(0.5736) \\approx 11.5')}`,
  },
  {
    id: 'b4-p07', blockId: 4, topic: 'Cofunctions', difficulty: 'easy', type: 'mc',
    prompt: `${T('\\sin 40^\\circ')} is equal to the cosine of which angle?`,
    choices: [T('50^\\circ'), T('40^\\circ'), T('140^\\circ'), T('130^\\circ')],
    answer: 0,
    solution: `<p>Sine of an angle equals cosine of its complement.</p>${D('\\sin 40^\\circ = \\cos(90^\\circ - 40^\\circ) = \\cos 50^\\circ')}<p>${T('140^\\circ')} is the supplement, which is the wrong pairing.</p>`,
  },
  {
    id: 'b4-p08', blockId: 4, topic: 'Finding a side', difficulty: 'medium', type: 'numeric',
    prompt: `In a right triangle the hypotenuse is 12 and one acute angle is ${T('62^\\circ')}. Enter the length of the leg adjacent to the ${T('62^\\circ')} angle, rounded to one decimal place.`,
    answer: 5.6, tolerance: 0.15,
    solution: `<p>Adjacent and hypotenuse: cosine.</p>${D('\\cos 62^\\circ = \\frac{x}{12} \\;\\Rightarrow\\; x = 12 \\cos 62^\\circ \\approx 12(0.4695) \\approx 5.6')}<p>Using sine gives 10.6, the leg <em>opposite</em> the angle.</p>`,
  },
  {
    id: 'b4-p09', blockId: 4, topic: 'Finding a side', difficulty: 'medium', type: 'mc',
    diagram: svgTri({ opp: '9', hyp: 'h', ang: '28°' }),
    prompt: `The side opposite a ${T('28^\\circ')} angle in a right triangle is 9. What is the hypotenuse, to one decimal place?`,
    choices: [T('19.2'), T('4.2'), T('7.9'), T('16.9')],
    answer: 0,
    solution: `<p>Opposite and hypotenuse: sine, with the unknown on the bottom.</p>${D('\\sin 28^\\circ = \\frac{9}{h} \\;\\Rightarrow\\; h = \\frac{9}{\\sin 28^\\circ} \\approx \\frac{9}{0.4695} \\approx 19.2')}<p>4.2 is ${T('9 \\sin 28^\\circ')} (multiplying instead of dividing); it is shorter than the leg, so it cannot be a hypotenuse. 16.9 is ${T('9 / \\tan 28^\\circ')}, the other leg.</p>`,
  },
  {
    id: 'b4-p10', blockId: 4, topic: 'Finding an angle', difficulty: 'medium', type: 'numeric',
    prompt: `A right triangle has legs 7 and 10. Enter the measure of the angle opposite the leg of length 7, rounded to the nearest degree.`,
    answer: 35, tolerance: 0.6,
    solution: `<p>Opposite 7, adjacent 10: tangent, then the inverse.</p>${D('\\tan\\theta = \\frac{7}{10} \\;\\Rightarrow\\; \\theta = \\tan^{-1}(0.7) \\approx 35^\\circ')}<p>Sanity check: the opposite leg is shorter than the adjacent one, so the angle should be under ${T('45^\\circ')}.</p>`,
  },
  {
    id: 'b4-p11', blockId: 4, topic: 'Finding an angle', difficulty: 'medium', type: 'mc',
    prompt: `In a right triangle the hypotenuse is 13 and the leg adjacent to angle ${T('\\theta')} is 5. What is ${T('\\theta')}, to the nearest degree?`,
    choices: [T('67^\\circ'), T('23^\\circ'), T('21^\\circ'), T('45^\\circ')],
    answer: 0,
    solution: `<p>Adjacent and hypotenuse: cosine.</p>${D('\\cos\\theta = \\frac{5}{13} \\;\\Rightarrow\\; \\theta = \\cos^{-1}\\!\\left(\\frac{5}{13}\\right) \\approx 67^\\circ')}<p>${T('23^\\circ')} is ${T('\\sin^{-1}(5/13)')}, the other acute angle. The adjacent leg is short compared with the hypotenuse, so the angle must be large.</p>`,
  },
  {
    id: 'b4-p12', blockId: 4, topic: 'Elevation and depression', difficulty: 'medium', type: 'numeric',
    prompt: `From a point on level ground 40 feet from the base of a tree, the angle of elevation to the top of the tree is ${T('32^\\circ')}. Enter the height of the tree in feet, rounded to one decimal place.`,
    answer: 25, tolerance: 0.15,
    solution: `<p>The tree is opposite the angle, the 40 feet is adjacent: tangent.</p>${D('\\tan 32^\\circ = \\frac{h}{40} \\;\\Rightarrow\\; h = 40 \\tan 32^\\circ \\approx 40(0.6249) \\approx 25.0')}`,
  },
  {
    id: 'b4-p13', blockId: 4, topic: 'Finding a side', difficulty: 'medium', type: 'mc',
    prompt: `A 14-foot ladder leans against a wall, making a ${T('70^\\circ')} angle with the ground. How high up the wall does it reach, to one decimal place?`,
    choices: [T('13.2 \\text{ ft}'), T('4.8 \\text{ ft}'), T('38.5 \\text{ ft}'), T('5.1 \\text{ ft}')],
    answer: 0,
    solution: `<p>The ladder is the hypotenuse and the height on the wall is opposite the ${T('70^\\circ')} angle: sine.</p>${D('h = 14 \\sin 70^\\circ \\approx 14(0.9397) \\approx 13.2')}<p>4.8 is ${T('14 \\cos 70^\\circ')}, the distance from the wall to the foot of the ladder. 38.5 is ${T('14 \\tan 70^\\circ')}, longer than the ladder itself, which is impossible.</p>`,
  },
  {
    id: 'b4-p14', blockId: 4, topic: 'Elevation and depression', difficulty: 'medium', type: 'numeric',
    prompt: `From the top of a 50-meter cliff, the angle of depression to a boat is ${T('18^\\circ')}. Enter the distance from the base of the cliff to the boat, in meters, rounded to one decimal place.`,
    answer: 153.9, tolerance: 0.5,
    solution: `<p>The angle of depression at the top equals the angle of elevation at the boat (alternate interior angles). At the boat: opposite is the cliff (50), adjacent is the distance.</p>${D('\\tan 18^\\circ = \\frac{50}{d} \\;\\Rightarrow\\; d = \\frac{50}{\\tan 18^\\circ} \\approx \\frac{50}{0.3249} \\approx 153.9')}<p>Multiplying instead (${T('50 \\tan 18^\\circ \\approx 16.2')}) is the trap.</p>`,
  },
  {
    id: 'b4-p15', blockId: 4, topic: 'Finding a side', difficulty: 'hard', type: 'mc',
    prompt: `A guy wire runs from the top of a 30-foot pole to a point on the ground, making a ${T('55^\\circ')} angle with the ground. How long is the wire, to one decimal place?`,
    choices: [T('36.6 \\text{ ft}'), T('24.6 \\text{ ft}'), T('42.8 \\text{ ft}'), T('21.0 \\text{ ft}')],
    answer: 0,
    solution: `<p>The pole (30) is opposite the ${T('55^\\circ')} angle and the wire is the hypotenuse: sine, unknown on the bottom.</p>${D('\\sin 55^\\circ = \\frac{30}{w} \\;\\Rightarrow\\; w = \\frac{30}{\\sin 55^\\circ} \\approx \\frac{30}{0.8192} \\approx 36.6')}<p>24.6 is ${T('30 \\sin 55^\\circ')}, shorter than the pole, so it cannot be the hypotenuse. 21.0 is the ground distance ${T('30 / \\tan 55^\\circ')}.</p>`,
  },
  {
    id: 'b4-p16', blockId: 4, topic: 'Elevation and depression', difficulty: 'hard', type: 'numeric',
    diagram: svgTwoStep,
    prompt: `From a point on level ground, the angle of elevation to the top of a building is ${T('40^\\circ')}. After walking 30 meters straight toward the building, the angle of elevation is ${T('55^\\circ')}. Enter the height of the building in meters, rounded to one decimal place.`,
    answer: 61, tolerance: 0.5,
    solution: `<p>Let ${T('h')} be the height and ${T('d')} the distance from the nearer point to the building. Two tangent equations:</p>${D('\\tan 55^\\circ = \\frac{h}{d} \\qquad \\tan 40^\\circ = \\frac{h}{d + 30}')}<p>So ${T('h = d \\tan 55^\\circ')} and ${T('h = (d + 30)\\tan 40^\\circ')}. Set them equal:</p>${D('d \\tan 55^\\circ = d \\tan 40^\\circ + 30 \\tan 40^\\circ \\;\\Rightarrow\\; d = \\frac{30 \\tan 40^\\circ}{\\tan 55^\\circ - \\tan 40^\\circ} \\approx \\frac{25.17}{1.4281 - 0.8391} \\approx 42.7')}${D('h = 42.7 \\tan 55^\\circ \\approx 61.0 \\text{ m}')}<p>Keep full calculator precision until the last step; rounding ${T('d')} early can shift the answer by a few tenths.</p>`,
  },
  {
    id: 'b4-p17', blockId: 4, topic: 'Cofunctions', difficulty: 'hard', type: 'mc',
    prompt: `For acute angles, ${T('\\sin(2x + 10)^\\circ = \\cos(3x - 5)^\\circ')}. What is ${T('x')}?`,
    choices: [T('17'), T('15'), T('19'), T('3')],
    answer: 0,
    solution: `<p>If the sine of one acute angle equals the cosine of another, the angles are complementary.</p>${D('(2x + 10) + (3x - 5) = 90 \\;\\Rightarrow\\; 5x + 5 = 90 \\;\\Rightarrow\\; x = 17')}<p>Check: ${T('\\sin 44^\\circ = \\cos 46^\\circ')}. ✓ Setting the angles equal (${T('2x + 10 = 3x - 5')}, giving 15) is the trap.</p>`,
  },
  {
    id: 'b4-p18', blockId: 4, topic: 'Trig ratios', difficulty: 'hard', type: 'numeric',
    prompt: `In a right triangle, ${T('\\sin A = 0.6')}. Enter the exact value of ${T('\\tan A')} as a fraction or decimal.`,
    answer: 0.75,
    solution: `<p>${T('\\sin A = 0.6 = 3/5')}: opposite 3, hypotenuse 5. The adjacent leg is ${T('\\sqrt{25 - 9} = 4')}.</p>${D('\\tan A = \\frac{3}{4} = 0.75')}<p>No calculator angle needed; the 3-4-5 triangle does it.</p>`,
  },
  {
    id: 'b4-p19', blockId: 4, topic: 'Finding a side', difficulty: 'hard', type: 'mc',
    prompt: `An isosceles triangle has two sides of length 10 and a vertex angle of ${T('40^\\circ')} between them. What is the length of the third side, to one decimal place?`,
    choices: [T('6.8'), T('3.4'), T('9.4'), T('18.8')],
    answer: 0,
    solution: `<p>Drop the altitude from the vertex. It bisects the ${T('40^\\circ')} angle and the base, making two right triangles with hypotenuse 10 and a ${T('20^\\circ')} angle at the top. Half the base is opposite that angle.</p>${D('\\tfrac{1}{2}\\text{base} = 10 \\sin 20^\\circ \\approx 3.42 \\;\\Rightarrow\\; \\text{base} \\approx 6.8')}<p>3.4 stops at half the base. 9.4 uses cosine, which gives the altitude instead.</p>`,
  },
  {
    id: 'b4-p20', blockId: 4, topic: 'Elevation and depression', difficulty: 'hard', type: 'numeric',
    prompt: `An airplane is flying at an altitude of 3,000 feet. The angle of depression from the plane to the near end of a runway is ${T('12^\\circ')}. Enter the horizontal ground distance from the plane to that point, in feet, rounded to the nearest foot.`,
    answer: 14114, tolerance: 10,
    solution: `<p>Move the ${T('12^\\circ')} to the runway end (alternate interior angles). The altitude is opposite, the ground distance is adjacent.</p>${D('\\tan 12^\\circ = \\frac{3000}{d} \\;\\Rightarrow\\; d = \\frac{3000}{\\tan 12^\\circ} \\approx \\frac{3000}{0.2126} \\approx 14{,}114 \\text{ ft}')}<p>A small angle of depression means a long, shallow approach, so the distance should be much larger than the altitude. It is.</p>`,
  },
];

/* ---------- Checkpoint 2 (10, timed, right-triangle trig) ---------- */

const checkpoint = [
  {
    id: 'b4-c01', blockId: 4, topic: 'Trig ratios', difficulty: 'easy', type: 'mc',
    prompt: `A right triangle has legs 5 and 12 and hypotenuse 13. For the angle ${T('\\theta')} opposite the leg of length 5, what is ${T('\\cos\\theta')}?`,
    choices: [T('\\dfrac{12}{13}'), T('\\dfrac{5}{13}'), T('\\dfrac{5}{12}'), T('\\dfrac{13}{12}')],
    answer: 0,
    solution: `<p>Cosine is adjacent over hypotenuse. The leg adjacent to ${T('\\theta')} is 12.</p>${D('\\cos\\theta = \\frac{12}{13}')}`,
  },
  {
    id: 'b4-c02', blockId: 4, topic: 'Finding a side', difficulty: 'easy', type: 'numeric',
    prompt: `In a right triangle the hypotenuse is 10 and one acute angle is ${T('25^\\circ')}. Enter the length of the side opposite the ${T('25^\\circ')} angle, rounded to one decimal place.`,
    answer: 4.2, tolerance: 0.15,
    solution: `${D('x = 10 \\sin 25^\\circ \\approx 10(0.4226) \\approx 4.2')}`,
  },
  {
    id: 'b4-c03', blockId: 4, topic: 'Special angles', difficulty: 'easy', type: 'mc',
    prompt: `What is the exact value of ${T('\\sin 60^\\circ')}?`,
    choices: [T('\\dfrac{\\sqrt{3}}{2}'), T('\\dfrac{1}{2}'), T('\\dfrac{\\sqrt{2}}{2}'), T('\\sqrt{3}')],
    answer: 0,
    solution: `<p>In the 30-60-90 triangle with sides ${T('1, \\sqrt{3}, 2')}, the side opposite ${T('60^\\circ')} is ${T('\\sqrt{3}')} and the hypotenuse is 2.</p>${D('\\sin 60^\\circ = \\frac{\\sqrt{3}}{2}')}`,
  },
  {
    id: 'b4-c04', blockId: 4, topic: 'Finding a side', difficulty: 'medium', type: 'numeric',
    prompt: `In a right triangle the hypotenuse is 15 and one acute angle is ${T('48^\\circ')}. Enter the length of the leg adjacent to the ${T('48^\\circ')} angle, rounded to one decimal place.`,
    answer: 10, tolerance: 0.15,
    solution: `<p>Adjacent and hypotenuse: cosine.</p>${D('x = 15 \\cos 48^\\circ \\approx 15(0.6691) \\approx 10.0')}`,
  },
  {
    id: 'b4-c05', blockId: 4, topic: 'Finding an angle', difficulty: 'medium', type: 'mc',
    prompt: `In a right triangle the side opposite angle ${T('\\theta')} is 6 and the hypotenuse is 10. What is ${T('\\theta')}, to the nearest degree?`,
    choices: [T('37^\\circ'), T('53^\\circ'), T('31^\\circ'), T('59^\\circ')],
    answer: 0,
    solution: `${D('\\sin\\theta = \\frac{6}{10} = 0.6 \\;\\Rightarrow\\; \\theta = \\sin^{-1}(0.6) \\approx 37^\\circ')}<p>${T('53^\\circ')} is the other acute angle (${T('\\cos^{-1} 0.6')}). ${T('31^\\circ')} comes from using ${T('\\tan^{-1}')} on the same ratio.</p>`,
  },
  {
    id: 'b4-c06', blockId: 4, topic: 'Elevation and depression', difficulty: 'medium', type: 'numeric',
    prompt: `From a point 80 feet from the base of a building, the angle of elevation to the roof is ${T('27^\\circ')}. Enter the height of the building in feet, rounded to one decimal place.`,
    answer: 40.8, tolerance: 0.15,
    solution: `<p>Height is opposite, ground distance is adjacent: tangent.</p>${D('h = 80 \\tan 27^\\circ \\approx 80(0.5095) \\approx 40.8')}`,
  },
  {
    id: 'b4-c07', blockId: 4, topic: 'Cofunctions', difficulty: 'medium', type: 'mc',
    prompt: `${T('\\cos 25^\\circ')} is equal to the sine of which angle?`,
    choices: [T('65^\\circ'), T('25^\\circ'), T('155^\\circ'), T('115^\\circ')],
    answer: 0,
    solution: `${D('\\cos 25^\\circ = \\sin(90^\\circ - 25^\\circ) = \\sin 65^\\circ')}`,
  },
  {
    id: 'b4-c08', blockId: 4, topic: 'Finding a side', difficulty: 'hard', type: 'mc',
    prompt: `The side opposite a ${T('38^\\circ')} angle in a right triangle is 11. What is the hypotenuse, to one decimal place?`,
    choices: [T('17.9'), T('6.8'), T('8.6'), T('14.1')],
    answer: 0,
    solution: `<p>Sine with the unknown on the bottom.</p>${D('h = \\frac{11}{\\sin 38^\\circ} \\approx \\frac{11}{0.6157} \\approx 17.9')}<p>6.8 is ${T('11 \\sin 38^\\circ')}, which is shorter than the leg and so cannot be a hypotenuse. 14.1 is the other leg, ${T('11 / \\tan 38^\\circ')}.</p>`,
  },
  {
    id: 'b4-c09', blockId: 4, topic: 'Elevation and depression', difficulty: 'hard', type: 'numeric',
    prompt: `From the top of a 60-meter lighthouse, the angle of depression to a ship is ${T('22^\\circ')}. Enter the horizontal distance from the lighthouse to the ship, in meters, rounded to one decimal place.`,
    answer: 148.5, tolerance: 0.5,
    solution: `<p>The angle of depression equals the angle of elevation at the ship. Opposite is 60, adjacent is the distance.</p>${D('d = \\frac{60}{\\tan 22^\\circ} \\approx \\frac{60}{0.4040} \\approx 148.5')}`,
  },
  {
    id: 'b4-c10', blockId: 4, topic: 'Trig ratios', difficulty: 'hard', type: 'mc',
    prompt: `In a right triangle, ${T('\\tan A = \\dfrac{2}{3}')} and the leg opposite ${T('A')} has length 8. What is the length of the hypotenuse?`,
    choices: [T('4\\sqrt{13}'), T('2\\sqrt{13}'), T('\\sqrt{13}'), T('20')],
    answer: 0,
    solution: `<p>${T('\\tan A = \\text{opp}/\\text{adj} = 2/3')}. With opposite 8, the adjacent leg is 12 (scale factor 4).</p>${D('c = \\sqrt{8^2 + 12^2} = \\sqrt{64 + 144} = \\sqrt{208} = \\sqrt{16 \\cdot 13} = 4\\sqrt{13} \\approx 14.4')}<p>20 is ${T('8 + 12')}, adding instead of using the Pythagorean theorem.</p>`,
  },
];

export default { lesson, practice, checkpoint };
