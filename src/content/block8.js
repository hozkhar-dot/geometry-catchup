// Block 8: Mixed review and testing. No new lesson: a game plan for the two
// weeks, a one-page formula recap, and two 20-question mixed sets drawing on
// Blocks 1-7. Set A is timed practice (feedback per question); Set B is
// Checkpoint 4 (20 questions, 30 minutes, target 15, per the plan).
// Topic labels reuse the earlier blocks' names so Review groups them together.
// All questions original. Math in data-tex attributes (KaTeX).

const T = (s) => `<span data-tex="${s}"></span>`;
const D = (s) => `<div data-tex-display="${s}"></div>`;

/* ---------- Game plan (shown where other blocks show a lesson) ---------- */

const lesson = `
<p>There is nothing new to learn in this block. The job for these two weeks is to make everything from Blocks 1 to 7 fast and mixed, the way the tests serve it: a circle question, then a trig question, then a volume question, with no heading telling you which chapter you are in. Three kinds of work, in this order.</p>

<h3>1. Mixed Set A (this site, timed)</h3>
<p>Twenty original questions across all seven blocks with a 30-minute countdown. You still get feedback and a worked solution after each answer, so treat it as a rehearsal with the clock on. Anything you miss goes to Review automatically. After the set, open Review and use the topic health table: <strong>redo the practice set of any block sitting below 75 percent</strong> before moving on. The plan is explicit about this: falling a week behind is fine, skipping a shaky block is not.</p>

<h3>2. Official questions (external)</h3>
<p>The links at the bottom of this page go to the real thing. In the College Board Student Question Bank, filter to the <strong>Geometry and Trigonometry</strong> domain and work sets of 10 to 15 with a timer. For the ACT, do the geometry questions from a practice test under time. Official questions are never copied into this site; that is why the links exist. Note which topics feel slow, then come back to Review and retry them here.</p>

<h3>3. Checkpoint 4 (this site, Mixed Set B)</h3>
<p>Twenty fresh mixed questions, 30 minutes, no feedback until the end. Target: <strong>15 of 20</strong>. If you land under it, the summary shows which topics cost you; repeat those blocks' practice sets and retake. Passing this checkpoint is the finish line of the 14 weeks.</p>

<h3>One-page recap</h3>
<p>Everything below was explained in its own block. This is the memory jog, not the lesson.</p>
<div class="table-wrap">
<table class="topic-table">
  <thead><tr><th scope="col">Block</th><th scope="col">What to remember</th></tr></thead>
  <tbody>
    <tr><td>1 Foundations</td><td>Complementary ${T('90^\\circ')}, supplementary ${T('180^\\circ')}, vertical angles equal. Parallel lines: corresponding and alternate angles equal, same-side interior add to ${T('180^\\circ')}. Triangle ${T('180^\\circ')}. Polygon interior sum ${T('180(n - 2)')}, exterior angles always total ${T('360^\\circ')}.</td></tr>
    <tr><td>2 Triangles I</td><td>${T('a^2 + b^2 = c^2')}. Triples 3-4-5, 5-12-13, 8-15-17, 7-24-25. 45-45-90: ${T('x, x, x\\sqrt{2}')}. 30-60-90: ${T('x, x\\sqrt{3}, 2x')}. Any two sides add to more than the third; the biggest angle faces the longest side.</td></tr>
    <tr><td>3 Similarity</td><td>Two equal angles make triangles similar; corresponding sides share one ratio ${T('k')}. Areas scale by ${T('k^2')}, volumes by ${T('k^3')}. Congruent means ${T('k = 1')}.</td></tr>
    <tr><td>4 Trig</td><td>SOH-CAH-TOA. Side: multiply or divide by the ratio. Angle: inverse function. Elevation looks up, depression looks down, both measured from the horizontal. Calculator in degrees.</td></tr>
    <tr><td>5 Circles</td><td>${T('C = 2\\pi r')}, ${T('A = \\pi r^2')}. Arc and sector are ${T('\\theta / 360')} of the whole. Inscribed angle is half its arc; a diameter makes a right angle. Radius meets tangent at ${T('90^\\circ')}. ${T('(x - h)^2 + (y - k)^2 = r^2')}; complete the square when expanded.</td></tr>
    <tr><td>6 Coordinates</td><td>Slope rise over run. Parallel: same slope. Perpendicular: negative reciprocal. Distance is Pythagoras; midpoint is the average. Tangent to a circle is perpendicular to the radius.</td></tr>
    <tr><td>7 Solids</td><td>Prism and cylinder ${T('V = Bh')}. Pyramid and cone ${T('\\tfrac{1}{3}Bh')}, using the real height, not the slant. Sphere ${T('\\tfrac{4}{3}\\pi r^3')}, surface ${T('4\\pi r^2')}. Cube the factor when converting cubic units. Mass equals density times volume.</td></tr>
  </tbody>
</table>
</div>
<p>Halve any diameter before you start. Simplify radicals. Check the units of your answer. Sketch when a diagram is missing.</p>
`;

/* ---------- Mixed Set A: timed practice (20) ---------- */

const practice = [
  {
    id: 'b8-v01', blockId: 8, topic: 'Angle basics', difficulty: 'easy', type: 'mc',
    prompt: `Two angles are supplementary, and one is four times the other. What is the measure of the smaller angle?`,
    choices: [T('36^\\circ'), T('45^\\circ'), T('144^\\circ'), T('18^\\circ')],
    answer: 0,
    solution: `${D('x + 4x = 180^\\circ \\;\\Rightarrow\\; 5x = 180^\\circ \\;\\Rightarrow\\; x = 36^\\circ')}<p>${T('144^\\circ')} is the larger angle; ${T('18^\\circ')} comes from using ${T('90^\\circ')} (complementary) instead of ${T('180^\\circ')}.</p>`,
  },
  {
    id: 'b8-v02', blockId: 8, topic: 'Pythagorean theorem', difficulty: 'easy', type: 'numeric',
    prompt: `A right triangle has legs 9 and 12. Enter the length of the hypotenuse.`,
    answer: 15,
    solution: `${D('c = \\sqrt{9^2 + 12^2} = \\sqrt{81 + 144} = \\sqrt{225} = 15')}<p>A 3-4-5 triple scaled by 3.</p>`,
  },
  {
    id: 'b8-v03', blockId: 8, topic: 'Circumference and area', difficulty: 'easy', type: 'mc',
    prompt: `A circle has diameter 14. What is its area?`,
    choices: [T('49\\pi'), T('196\\pi'), T('14\\pi'), T('28\\pi')],
    answer: 0,
    solution: `<p>Radius first: ${T('r = 7')}.</p>${D('A = \\pi r^2 = 49\\pi')}<p>${T('196\\pi')} squares the diameter; ${T('14\\pi')} is the circumference.</p>`,
  },
  {
    id: 'b8-v04', blockId: 8, topic: 'Slope', difficulty: 'easy', type: 'numeric',
    prompt: `Enter the slope of the line through ${T('(2, 3)')} and ${T('(6, 11)')}.`,
    answer: 2,
    solution: `${D('m = \\frac{11 - 3}{6 - 2} = \\frac{8}{4} = 2')}`,
  },
  {
    id: 'b8-v05', blockId: 8, topic: 'Trig ratios', difficulty: 'easy', type: 'mc',
    prompt: `A right triangle has legs 5 and 12 and hypotenuse 13. Angle ${T('A')} is opposite the leg of length 5. What is ${T('\\sin A')}?`,
    choices: [T('\\dfrac{5}{13}'), T('\\dfrac{12}{13}'), T('\\dfrac{5}{12}'), T('\\dfrac{13}{5}')],
    answer: 0,
    solution: `<p>Sine is opposite over hypotenuse.</p>${D('\\sin A = \\frac{5}{13}')}<p>${T('\\tfrac{12}{13}')} is ${T('\\cos A')}; ${T('\\tfrac{5}{12}')} is ${T('\\tan A')}.</p>`,
  },
  {
    id: 'b8-v06', blockId: 8, topic: 'Surface area', difficulty: 'easy', type: 'numeric',
    prompt: `A cube has volume 64. Enter its surface area.`,
    answer: 96,
    solution: `<p>Edge length: ${T('s^3 = 64 \\Rightarrow s = 4')}.</p>${D('SA = 6s^2 = 6(16) = 96')}`,
  },
  {
    id: 'b8-v07', blockId: 8, topic: 'Parallel lines', difficulty: 'easy', type: 'mc',
    prompt: `Two parallel lines are cut by a transversal. One of the interior angles measures ${T('68^\\circ')}. What is the measure of the interior angle on the same side of the transversal?`,
    choices: [T('112^\\circ'), T('68^\\circ'), T('22^\\circ'), T('158^\\circ')],
    answer: 0,
    solution: `<p>Same-side interior angles are supplementary.</p>${D('180^\\circ - 68^\\circ = 112^\\circ')}<p>${T('68^\\circ')} would be the <em>alternate</em> interior angle, on the opposite side of the transversal.</p>`,
  },
  {
    id: 'b8-v08', blockId: 8, topic: 'Special right triangles', difficulty: 'medium', type: 'mc',
    prompt: `An isosceles right triangle has hypotenuse 10. What is the length of each leg?`,
    choices: [T('5\\sqrt{2}'), T('10\\sqrt{2}'), T('5'), T('5\\sqrt{3}')],
    answer: 0,
    solution: `<p>In a 45-45-90 triangle the hypotenuse is leg times ${T('\\sqrt{2}')}.</p>${D('x\\sqrt{2} = 10 \\;\\Rightarrow\\; x = \\frac{10}{\\sqrt{2}} = 5\\sqrt{2}')}<p>${T('10\\sqrt{2}')} multiplies instead of dividing.</p>`,
  },
  {
    id: 'b8-v09', blockId: 8, topic: 'Similar triangles', difficulty: 'medium', type: 'numeric',
    prompt: `At the same time of day, a person 6 feet tall casts a 4-foot shadow and a tree casts a 30-foot shadow. Enter the height of the tree in feet.`,
    answer: 45,
    solution: `<p>The sun makes similar triangles: height over shadow is the same ratio for both.</p>${D('\\frac{h}{30} = \\frac{6}{4} \\;\\Rightarrow\\; h = 30 \\cdot 1.5 = 45')}`,
  },
  {
    id: 'b8-v10', blockId: 8, topic: 'Arcs and sectors', difficulty: 'medium', type: 'mc',
    prompt: `A circle has radius 10. What is the length of an arc with central angle ${T('72^\\circ')}?`,
    choices: [T('4\\pi'), T('20\\pi'), T('2\\pi'), T('10\\pi')],
    answer: 0,
    solution: `<p>${T('72/360 = 1/5')} of the circumference.</p>${D('\\frac{1}{5} \\cdot 2\\pi(10) = 4\\pi')}<p>${T('20\\pi')} is the sector <em>area</em> (${T('\\tfrac{1}{5} \\cdot 100\\pi')}).</p>`,
  },
  {
    id: 'b8-v11', blockId: 8, topic: 'Distance', difficulty: 'medium', type: 'numeric',
    prompt: `Enter the distance between ${T('(-1, 4)')} and ${T('(5, -4)')}.`,
    answer: 10,
    solution: `${D('d = \\sqrt{(5 - (-1))^2 + (-4 - 4)^2} = \\sqrt{36 + 64} = 10')}`,
  },
  {
    id: 'b8-v12', blockId: 8, topic: 'Finding a side', difficulty: 'medium', type: 'numeric',
    prompt: `In a right triangle, one acute angle is ${T('40^\\circ')} and the hypotenuse is 15. Enter the length of the side opposite the ${T('40^\\circ')} angle, rounded to one decimal place.`,
    answer: 9.6, tolerance: 0.15,
    solution: `<p>Opposite and hypotenuse: sine.</p>${D('x = 15 \\sin 40^\\circ \\approx 15(0.6428) \\approx 9.6')}`,
  },
  {
    id: 'b8-v13', blockId: 8, topic: 'Polygon angles', difficulty: 'medium', type: 'mc',
    prompt: `What is the measure of each interior angle of a regular hexagon?`,
    choices: [T('120^\\circ'), T('60^\\circ'), T('135^\\circ'), T('108^\\circ')],
    answer: 0,
    solution: `<p>Interior sum ${T('180(6 - 2) = 720^\\circ')}, shared by six equal angles.</p>${D('720^\\circ / 6 = 120^\\circ')}<p>Or: each exterior angle is ${T('360/6 = 60^\\circ')}, and interior is ${T('180 - 60 = 120^\\circ')}. ${T('108^\\circ')} is a pentagon, ${T('135^\\circ')} an octagon.</p>`,
  },
  {
    id: 'b8-v14', blockId: 8, topic: 'Pyramids and cones', difficulty: 'medium', type: 'numeric',
    prompt: `A cone has radius 3 and height 4. Its volume is ${T('k\\pi')}. Enter ${T('k')}.`,
    answer: 12,
    solution: `${D('V = \\tfrac{1}{3}\\pi r^2 h = \\tfrac{1}{3}\\pi(9)(4) = 12\\pi \\;\\Rightarrow\\; k = 12')}<p>The slant height of this cone is 5 (a 3-4-5 triangle), but volume uses the height 4.</p>`,
  },
  {
    id: 'b8-v15', blockId: 8, topic: 'Central and inscribed angles', difficulty: 'hard', type: 'mc',
    prompt: `${T('AB')} is a diameter of a circle and ${T('C')} is a point on the circle. If ${T('\\angle CAB = 35^\\circ')}, what is ${T('\\angle CBA')}?`,
    choices: [T('55^\\circ'), T('35^\\circ'), T('70^\\circ'), T('45^\\circ')],
    answer: 0,
    solution: `<p>The angle at ${T('C')} is inscribed in a semicircle, so it is ${T('90^\\circ')}. The triangle's angles add to ${T('180^\\circ')}.</p>${D('\\angle CBA = 180^\\circ - 90^\\circ - 35^\\circ = 55^\\circ')}<p>${T('70^\\circ')} is the central angle on arc ${T('CB')}, not the answer asked.</p>`,
  },
  {
    id: 'b8-v16', blockId: 8, topic: 'Equation of a circle', difficulty: 'hard', type: 'numeric',
    prompt: `Enter the radius of the circle ${T('x^2 + y^2 - 4x + 6y - 3 = 0')}.`,
    answer: 4,
    solution: `<p>Complete the square: add ${T('(-4/2)^2 = 4')} and ${T('(6/2)^2 = 9')} to both sides.</p>${D('(x - 2)^2 + (y + 3)^2 = 3 + 4 + 9 = 16 \\;\\Rightarrow\\; r = 4')}`,
  },
  {
    id: 'b8-v17', blockId: 8, topic: 'Elevation and depression', difficulty: 'hard', type: 'numeric',
    prompt: `From the top of a 50-meter cliff, the angle of depression to a boat is ${T('20^\\circ')}. Enter the horizontal distance from the base of the cliff to the boat, in meters, rounded to one decimal place.`,
    answer: 137.4, tolerance: 0.5,
    solution: `<p>The angle of depression from the top equals the angle of elevation from the boat (alternate interior angles), so in the right triangle the cliff is opposite the ${T('20^\\circ')} angle and the distance is adjacent.</p>${D('\\tan 20^\\circ = \\frac{50}{d} \\;\\Rightarrow\\; d = \\frac{50}{\\tan 20^\\circ} \\approx \\frac{50}{0.3640} \\approx 137.4')}`,
  },
  {
    id: 'b8-v18', blockId: 8, topic: 'Scale factors', difficulty: 'hard', type: 'mc',
    prompt: `Two similar solids have surface areas 36 and 81. What is the ratio of the smaller volume to the larger volume?`,
    choices: [T('\\dfrac{8}{27}'), T('\\dfrac{4}{9}'), T('\\dfrac{2}{3}'), T('\\dfrac{16}{81}')],
    answer: 0,
    solution: `<p>Areas scale by ${T('k^2')}, so ${T('k^2 = 36/81 = 4/9')} and ${T('k = 2/3')}. Volumes scale by ${T('k^3')}.</p>${D('\\left(\\tfrac{2}{3}\\right)^3 = \\frac{8}{27}')}<p>${T('\\tfrac{4}{9}')} is the area ratio, ${T('\\tfrac{2}{3}')} the length ratio.</p>`,
  },
  {
    id: 'b8-v19', blockId: 8, topic: 'Triangles on the plane', difficulty: 'hard', type: 'numeric',
    prompt: `Triangle ${T('ABC')} has vertices ${T('A(2, 1)')}, ${T('B(6, 4)')} and ${T('C(3, 8)')}. Enter its area.`,
    answer: 12.5,
    solution: `<p>${T('AB = \\sqrt{4^2 + 3^2} = 5')} and ${T('BC = \\sqrt{3^2 + 4^2} = 5')}. Slopes: ${T('AB')} is ${T('\\tfrac{3}{4}')}, ${T('BC')} is ${T('-\\tfrac{4}{3}')}, product ${T('-1')}, so the angle at ${T('B')} is right.</p>${D('A = \\tfrac{1}{2}(5)(5) = 12.5')}<p>The box method gives the same: box ${T('4 \\times 7 = 28')} minus corner triangles ${T('6 + 6 + 3.5')}.</p>`,
  },
  {
    id: 'b8-v20', blockId: 8, topic: 'Density and units', difficulty: 'hard', type: 'numeric',
    prompt: `A cylindrical tank with radius 1 meter and height 2 meters is full of water. Water has density ${T('1000 \\text{ kg/m}^3')}. Enter the mass of the water in kilograms, rounded to the nearest kilogram.`,
    answer: 6283, tolerance: 5,
    solution: `${D('V = \\pi(1)^2(2) = 2\\pi \\approx 6.283 \\text{ m}^3, \\qquad m = 1000 \\times 6.283 \\approx 6283 \\text{ kg}')}`,
  },
];

/* ---------- Mixed Set B: Checkpoint 4 (20, timed, target 15) ---------- */

const checkpoint = [
  {
    id: 'b8-m01', blockId: 8, topic: 'Angle basics', difficulty: 'easy', type: 'numeric',
    prompt: `Two vertical angles measure ${T('(3x + 10)^\\circ')} and ${T('70^\\circ')}. Enter ${T('x')}.`,
    answer: 20,
    solution: `<p>Vertical angles are equal.</p>${D('3x + 10 = 70 \\;\\Rightarrow\\; x = 20')}`,
  },
  {
    id: 'b8-m02', blockId: 8, topic: 'Pythagorean theorem', difficulty: 'easy', type: 'mc',
    prompt: `A right triangle has hypotenuse 25 and one leg 7. What is the other leg?`,
    choices: [T('24'), T('18'), T('\\sqrt{674}'), T('26')],
    answer: 0,
    solution: `${D('b = \\sqrt{25^2 - 7^2} = \\sqrt{625 - 49} = \\sqrt{576} = 24')}<p>${T('\\sqrt{674}')} adds instead of subtracting; the hypotenuse is the longest side.</p>`,
  },
  {
    id: 'b8-m03', blockId: 8, topic: 'Circumference and area', difficulty: 'easy', type: 'numeric',
    prompt: `A circle has circumference ${T('12\\pi')}. Its area is ${T('k\\pi')}. Enter ${T('k')}.`,
    answer: 36,
    solution: `${D('2\\pi r = 12\\pi \\;\\Rightarrow\\; r = 6 \\;\\Rightarrow\\; A = 36\\pi')}`,
  },
  {
    id: 'b8-m04', blockId: 8, topic: 'Midpoint', difficulty: 'easy', type: 'mc',
    prompt: `What is the midpoint of the segment from ${T('(3, -5)')} to ${T('(-7, 9)')}?`,
    choices: [T('(-2, 2)'), T('(-4, 4)'), T('(5, -7)'), T('(-2, -2)')],
    answer: 0,
    solution: `${D('\\left(\\frac{3 + (-7)}{2}, \\frac{-5 + 9}{2}\\right) = (-2, 2)')}<p>${T('(-4, 4)')} forgets to halve; ${T('(5, -7)')} subtracts instead of adding.</p>`,
  },
  {
    id: 'b8-m05', blockId: 8, topic: 'Trig ratios', difficulty: 'easy', type: 'mc',
    prompt: `In a right triangle, ${T('\\tan A = \\dfrac{3}{4}')}. What is ${T('\\sin A')}?`,
    choices: [T('\\dfrac{3}{5}'), T('\\dfrac{4}{5}'), T('\\dfrac{4}{3}'), T('\\dfrac{3}{4}')],
    answer: 0,
    solution: `<p>Tangent ${T('3/4')} means opposite 3, adjacent 4, so the hypotenuse is 5 (a 3-4-5 triangle).</p>${D('\\sin A = \\frac{\\text{opposite}}{\\text{hypotenuse}} = \\frac{3}{5}')}<p>${T('\\tfrac{4}{5}')} is ${T('\\cos A')}.</p>`,
  },
  {
    id: 'b8-m06', blockId: 8, topic: 'Spheres', difficulty: 'easy', type: 'mc',
    prompt: `A sphere has radius 6. What is its volume?`,
    choices: [T('288\\pi'), T('144\\pi'), T('864\\pi'), T('36\\pi')],
    answer: 0,
    solution: `${D('V = \\tfrac{4}{3}\\pi(6)^3 = \\tfrac{4}{3}\\pi(216) = 288\\pi')}<p>${T('144\\pi')} is the surface area ${T('4\\pi r^2')}; ${T('864\\pi')} drops the ${T('\\tfrac{1}{3}')}.</p>`,
  },
  {
    id: 'b8-m07', blockId: 8, topic: 'Triangle angles', difficulty: 'easy', type: 'numeric',
    prompt: `Two angles of a triangle measure ${T('48^\\circ')} and ${T('67^\\circ')}. Enter the third angle, in degrees.`,
    answer: 65,
    solution: `${D('180^\\circ - 48^\\circ - 67^\\circ = 65^\\circ')}`,
  },
  {
    id: 'b8-m08', blockId: 8, topic: 'Special right triangles', difficulty: 'medium', type: 'mc',
    prompt: `In a 30-60-90 triangle the shorter leg is 4. What is the longer leg?`,
    choices: [T('4\\sqrt{3}'), T('8'), T('2\\sqrt{3}'), T('4\\sqrt{2}')],
    answer: 0,
    solution: `<p>Sides are ${T('x, x\\sqrt{3}, 2x')} with ${T('x = 4')}.</p>${D('\\text{longer leg} = 4\\sqrt{3}')}<p>8 is the hypotenuse.</p>`,
  },
  {
    id: 'b8-m09', blockId: 8, topic: 'Similar triangles', difficulty: 'medium', type: 'numeric',
    prompt: `A triangle has sides 6, 8 and 10. A similar triangle has shortest side 9. Enter the length of its longest side.`,
    answer: 15,
    solution: `<p>Scale factor ${T('9/6 = 1.5')}.</p>${D('10 \\times 1.5 = 15')}`,
  },
  {
    id: 'b8-m10', blockId: 8, topic: 'Arcs and sectors', difficulty: 'medium', type: 'numeric',
    prompt: `A sector of a circle with radius 6 has area ${T('15\\pi')}. Enter its central angle, in degrees.`,
    answer: 150,
    solution: `<p>Whole circle: ${T('36\\pi')}. The sector is ${T('15/36 = 5/12')} of it.</p>${D('\\frac{5}{12} \\cdot 360^\\circ = 150^\\circ')}`,
  },
  {
    id: 'b8-m11', blockId: 8, topic: 'Parallel and perpendicular', difficulty: 'medium', type: 'mc',
    prompt: `What is the slope of a line perpendicular to ${T('3x + 2y = 6')}?`,
    choices: [T('\\dfrac{2}{3}'), T('-\\dfrac{3}{2}'), T('\\dfrac{3}{2}'), T('-\\dfrac{2}{3}')],
    answer: 0,
    solution: `<p>Solve for ${T('y')}: ${T('y = -\\tfrac{3}{2}x + 3')}, slope ${T('-\\tfrac{3}{2}')}. The perpendicular slope is the negative reciprocal.</p>${D('-\\frac{1}{-3/2} = \\frac{2}{3}')}<p>${T('-\\tfrac{3}{2}')} is the given line's own slope.</p>`,
  },
  {
    id: 'b8-m12', blockId: 8, topic: 'Finding an angle', difficulty: 'medium', type: 'numeric',
    prompt: `In a right triangle, the leg opposite angle ${T('A')} is 7 and the leg adjacent to it is 10. Enter the measure of ${T('A')} in degrees, rounded to the nearest degree.`,
    answer: 35, tolerance: 0.6,
    solution: `<p>Opposite and adjacent: tangent, then the inverse.</p>${D('A = \\tan^{-1}\\left(\\frac{7}{10}\\right) \\approx 35^\\circ')}`,
  },
  {
    id: 'b8-m13', blockId: 8, topic: 'Polygon angles', difficulty: 'medium', type: 'mc',
    prompt: `Each exterior angle of a regular polygon measures ${T('24^\\circ')}. How many sides does it have?`,
    choices: [T('15'), T('12'), T('24'), T('18')],
    answer: 0,
    solution: `<p>Exterior angles of any polygon add to ${T('360^\\circ')}.</p>${D('n = \\frac{360}{24} = 15')}`,
  },
  {
    id: 'b8-m14', blockId: 8, topic: 'Surface area', difficulty: 'medium', type: 'numeric',
    prompt: `A closed cylinder has radius 3 and height 5. Its total surface area is ${T('k\\pi')}. Enter ${T('k')}.`,
    answer: 48,
    solution: `${D('SA = 2\\pi r^2 + 2\\pi r h = 2\\pi(9) + 2\\pi(3)(5) = 18\\pi + 30\\pi = 48\\pi')}`,
  },
  {
    id: 'b8-m15', blockId: 8, topic: 'Tangents', difficulty: 'hard', type: 'mc',
    prompt: `A tangent from point ${T('P')} touches a circle with center ${T('O')} at ${T('T')}. ${T('PT = 15')} and ${T('OP = 17')}. What is the radius of the circle?`,
    choices: [T('8'), T('16'), T('2'), T('4')],
    answer: 0,
    solution: `<p>The radius ${T('OT')} is perpendicular to the tangent, so ${T('OP')} is the hypotenuse.</p>${D('r = \\sqrt{17^2 - 15^2} = \\sqrt{289 - 225} = \\sqrt{64} = 8')}<p>16 is the diameter; 2 is ${T('17 - 15')}, which is not how right triangles work.</p>`,
  },
  {
    id: 'b8-m16', blockId: 8, topic: 'Equation of a circle', difficulty: 'hard', type: 'mc',
    prompt: `A circle has center ${T('(-2, 5)')} and is tangent to the ${T('x')}-axis. Which is its equation?`,
    choices: [T('(x + 2)^2 + (y - 5)^2 = 25'), T('(x - 2)^2 + (y + 5)^2 = 25'), T('(x + 2)^2 + (y - 5)^2 = 4'), T('(x + 2)^2 + (y - 5)^2 = 5')],
    answer: 0,
    solution: `<p>Tangent to the ${T('x')}-axis means the radius equals the center's distance from that axis: ${T('r = 5')}. Center ${T('(-2, 5)')} gives ${T('(x + 2)')} and ${T('(y - 5)')}; the right side is ${T('r^2 = 25')}.</p><p>4 uses the ${T('x')}-coordinate; 5 forgets to square.</p>`,
  },
  {
    id: 'b8-m17', blockId: 8, topic: 'Elevation and depression', difficulty: 'hard', type: 'numeric',
    prompt: `A 20-foot ladder leans against a wall, making a ${T('65^\\circ')} angle with the ground. Enter how high up the wall the ladder reaches, in feet, rounded to one decimal place.`,
    answer: 18.1, tolerance: 0.15,
    solution: `<p>The height is opposite the ${T('65^\\circ')} angle and the ladder is the hypotenuse: sine.</p>${D('h = 20 \\sin 65^\\circ \\approx 20(0.9063) \\approx 18.1')}`,
  },
  {
    id: 'b8-m18', blockId: 8, topic: 'Scale factors', difficulty: 'hard', type: 'numeric',
    prompt: `Two similar triangles have areas 25 and 100. The perimeter of the larger triangle is 60. Enter the perimeter of the smaller triangle.`,
    answer: 30,
    solution: `<p>Area ratio ${T('25/100 = 1/4')}, so the length ratio is ${T('k = 1/2')}. Perimeters are lengths, so they scale by ${T('k')}.</p>${D('60 \\times \\tfrac{1}{2} = 30')}<p>Dividing the perimeter by 4 (giving 15) applies the area ratio to a length.</p>`,
  },
  {
    id: 'b8-m19', blockId: 8, topic: 'Circles on the plane', difficulty: 'hard', type: 'numeric',
    prompt: `The point ${T('(7, y)')} lies on the circle with center ${T('(3, 2)')} and radius 5, and ${T('y > 2')}. Enter ${T('y')}.`,
    answer: 5,
    solution: `<p>Plug into the circle's equation.</p>${D('(7 - 3)^2 + (y - 2)^2 = 25 \\;\\Rightarrow\\; (y - 2)^2 = 9 \\;\\Rightarrow\\; y = 5 \\text{ or } -1')}<p>The condition ${T('y > 2')} picks 5. A 3-4-5 triangle again.</p>`,
  },
  {
    id: 'b8-m20', blockId: 8, topic: 'Pyramids and cones', difficulty: 'hard', type: 'numeric',
    prompt: `A square pyramid has base side 8 and slant height 5. Enter its volume.`,
    answer: 64,
    solution: `<p>The slant height, half the base side, and the height form a right triangle: ${T('h = \\sqrt{5^2 - 4^2} = 3')}.</p>${D('V = \\tfrac{1}{3}(8^2)(3) = \\tfrac{1}{3}(192) = 64')}<p>Using 5 as the height gives ${T('\\tfrac{320}{3}')}, the trap.</p>`,
  },
];

export default {
  lesson,
  lessonTitle: 'How to use this block',
  practiceLabel: 'Mixed Set A (timed practice)',
  practiceTimeLimitSec: 30 * 60,
  checkpointNote: 'Mixed Set B, fresh questions.',
  practice,
  checkpoint,
};
