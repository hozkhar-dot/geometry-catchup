// Block 5: Circles. Circumference and area, arcs and sectors, central and
// inscribed angles, tangents, equation of a circle. Checkpoint 3 lives here.
// All questions original. Math in data-tex attributes (KaTeX).

const T = (s) => `<span data-tex="${s}"></span>`;
const D = (s) => `<div data-tex-display="${s}"></div>`;

/* ---------- Diagrams ---------- */

const svgParts = `<svg viewBox="0 0 300 220" width="300" height="220" role="img" aria-label="A circle with center O showing a radius, a diameter, a chord, and a tangent line touching the circle at one point">
  <circle cx="130" cy="120" r="80" fill="none" stroke="currentColor" stroke-width="2"/>
  <circle cx="130" cy="120" r="3" fill="currentColor"/>
  <text x="136" y="116" font-size="13" fill="currentColor">O</text>
  <line x1="50" y1="120" x2="210" y2="120" stroke="currentColor" stroke-width="1.5"/>
  <text x="150" y="136" font-size="12" fill="currentColor">diameter</text>
  <line x1="130" y1="120" x2="199.3" y2="80" stroke="currentColor" stroke-width="1.5"/>
  <text x="172" y="110" font-size="12" fill="currentColor">radius</text>
  <line x1="54.8" y1="147.4" x2="170" y2="189.3" stroke="currentColor" stroke-width="1.5"/>
  <text x="96" y="182" font-size="12" fill="currentColor">chord</text>
  <line x1="40" y1="40" x2="220" y2="40" stroke="currentColor" stroke-width="1.5"/>
  <circle cx="130" cy="40" r="3" fill="currentColor"/>
  <text x="228" y="44" font-size="12" fill="currentColor">tangent</text>
</svg>`;

// Sector with central angle theta (drawn at 60 degrees).
const svgSector = `<svg viewBox="0 0 260 220" width="260" height="220" role="img" aria-label="A circle with a shaded sector cut out by a central angle theta. The curved edge of the sector is the arc.">
  <circle cx="130" cy="110" r="80" fill="none" stroke="currentColor" stroke-width="2"/>
  <path d="M 130 110 L 210 110 A 80 80 0 0 0 170 40.7 Z" fill="currentColor" opacity="0.15"/>
  <path d="M 130 110 L 210 110 A 80 80 0 0 0 170 40.7 Z" fill="none" stroke="currentColor" stroke-width="2"/>
  <circle cx="130" cy="110" r="3" fill="currentColor"/>
  <text x="152" y="104" font-size="13" fill="currentColor">θ</text>
  <text x="160" y="84" font-size="12" fill="currentColor">sector</text>
  <text x="214" y="70" font-size="12" fill="currentColor">arc</text>
  <text x="138" y="128" font-size="12" fill="currentColor">r</text>
</svg>`;

// Central angle AOB and inscribed angle ACB on the same arc AB. Drawn to scale: central 120, inscribed 60.
const svgInscribed = `<svg viewBox="0 0 300 240" width="300" height="240" role="img" aria-label="Circle with center O. Points A and B on the circle near the bottom, point C at the top. The central angle AOB and the inscribed angle ACB both open onto arc AB.">
  <circle cx="150" cy="120" r="90" fill="none" stroke="currentColor" stroke-width="2"/>
  <path d="M 72.1 165 A 90 90 0 0 0 227.9 165" fill="none" stroke="currentColor" stroke-width="4" opacity="0.5"/>
  <circle cx="150" cy="120" r="3" fill="currentColor"/>
  <line x1="150" y1="120" x2="72.1" y2="165" stroke="currentColor" stroke-width="1.5"/>
  <line x1="150" y1="120" x2="227.9" y2="165" stroke="currentColor" stroke-width="1.5"/>
  <line x1="150" y1="30" x2="72.1" y2="165" stroke="currentColor" stroke-width="1.5"/>
  <line x1="150" y1="30" x2="227.9" y2="165" stroke="currentColor" stroke-width="1.5"/>
  <text x="150" y="22" text-anchor="middle" font-size="13" fill="currentColor">C</text>
  <text x="56" y="176" font-size="13" fill="currentColor">A</text>
  <text x="232" y="176" font-size="13" fill="currentColor">B</text>
  <text x="156" y="114" font-size="13" fill="currentColor">O</text>
  <text x="150" y="150" text-anchor="middle" font-size="12" fill="currentColor">central</text>
  <text x="176" y="48" font-size="12" fill="currentColor">inscribed</text>
</svg>`;

// Tangent from external point P touching at T. Drawn to scale for radius 70, PT 120.
const svgTangent = `<svg viewBox="0 0 280 220" width="280" height="220" role="img" aria-label="Circle with center O. A line from external point P touches the circle at T. The radius OT meets the tangent at a right angle. Segment OP is also drawn.">
  <circle cx="110" cy="120" r="70" fill="none" stroke="currentColor" stroke-width="2"/>
  <circle cx="110" cy="120" r="3" fill="currentColor"/>
  <line x1="110" y1="120" x2="159.5" y2="70.5" stroke="currentColor" stroke-width="1.5"/>
  <line x1="159.5" y1="70.5" x2="244.4" y2="155.4" stroke="currentColor" stroke-width="2"/>
  <line x1="110" y1="120" x2="244.4" y2="155.4" stroke="currentColor" stroke-width="1.5" stroke-dasharray="5 4"/>
  <path d="M 152.4 77.6 L 159.5 84.7 L 166.6 77.6" fill="none" stroke="currentColor" stroke-width="1.2"/>
  <text x="96" y="136" font-size="13" fill="currentColor">O</text>
  <text x="158" y="62" font-size="13" fill="currentColor">T</text>
  <text x="250" y="162" font-size="13" fill="currentColor">P</text>
  <text x="120" y="92" font-size="12" fill="currentColor">r</text>
</svg>`;

// Chord AB with the perpendicular from the center. Drawn to scale for r = 10, chord 12, distance 8.
const svgChord = `<svg viewBox="0 0 280 220" width="280" height="220" role="img" aria-label="Circle with center O and a horizontal chord AB below the center. A dashed segment from O meets the chord at right angles at its midpoint M.">
  <circle cx="140" cy="110" r="80" fill="none" stroke="currentColor" stroke-width="2"/>
  <circle cx="140" cy="110" r="3" fill="currentColor"/>
  <line x1="92" y1="174" x2="188" y2="174" stroke="currentColor" stroke-width="2"/>
  <line x1="140" y1="110" x2="140" y2="174" stroke="currentColor" stroke-width="1.5" stroke-dasharray="5 4"/>
  <line x1="140" y1="110" x2="92" y2="174" stroke="currentColor" stroke-width="1.5"/>
  <rect x="140" y="162" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.2"/>
  <text x="146" y="106" font-size="13" fill="currentColor">O</text>
  <text x="80" y="190" font-size="13" fill="currentColor">A</text>
  <text x="190" y="190" font-size="13" fill="currentColor">B</text>
  <text x="136" y="192" font-size="13" fill="currentColor">M</text>
  <text x="104" y="136" font-size="12" fill="currentColor">10</text>
  <text x="140" y="208" text-anchor="middle" font-size="12" fill="currentColor">12</text>
  <text x="146" y="146" font-size="12" fill="currentColor">?</text>
</svg>`;

// Circle on coordinate axes, center (h, k), radius r.
const svgCoord = `<svg viewBox="0 0 240 220" width="240" height="220" role="img" aria-label="A circle drawn on coordinate axes with its center marked (h, k) and a radius r drawn to a point (x, y) on the circle">
  <line x1="20" y1="160" x2="230" y2="160" stroke="currentColor" stroke-width="1.5"/>
  <line x1="60" y1="210" x2="60" y2="10" stroke="currentColor" stroke-width="1.5"/>
  <text x="222" y="176" font-size="12" fill="currentColor">x</text>
  <text x="46" y="18" font-size="12" fill="currentColor">y</text>
  <circle cx="135" cy="95" r="50" fill="none" stroke="currentColor" stroke-width="2"/>
  <circle cx="135" cy="95" r="3" fill="currentColor"/>
  <text x="120" y="114" font-size="12" fill="currentColor">(h, k)</text>
  <line x1="135" y1="95" x2="175" y2="65" stroke="currentColor" stroke-width="1.5"/>
  <text x="150" y="74" font-size="12" fill="currentColor">r</text>
  <circle cx="175" cy="65" r="2.5" fill="currentColor"/>
  <text x="180" y="60" font-size="12" fill="currentColor">(x, y)</text>
</svg>`;

/* ---------- Lesson ---------- */

const lesson = `
<p>Circles are the second-largest geometry topic on the SAT after triangles, and most circle questions are really two formulas plus a handful of angle rules. This block covers all of them, ending with the circle's equation on the coordinate plane, which is where the SAT most often hides one.</p>

<h3>1. The vocabulary</h3>
<figure class="q-diagram">${svgParts}</figure>
<ul>
  <li><strong>Radius</strong> ${T('r')}: from the center to any point on the circle. Every radius of a circle is the same length.</li>
  <li><strong>Diameter</strong> ${T('d')}: across the circle through the center. ${T('d = 2r')}. It is the longest chord.</li>
  <li><strong>Chord</strong>: any segment joining two points on the circle.</li>
  <li><strong>Arc</strong>: a piece of the circle between two points. Measured either by its length or by its angle at the center (a full circle is ${T('360^\\circ')}).</li>
  <li><strong>Tangent</strong>: a line that touches the circle at exactly one point.</li>
  <li><strong>Sector</strong>: a pizza slice, the region between two radii and the arc between them.</li>
</ul>
<p>The single most common error in this block is <strong>using the diameter where the formula wants the radius</strong>. When a problem gives a diameter, write ${T('r = d/2')} before anything else.</p>

<h3>2. Circumference and area</h3>
${D('C = 2\\pi r = \\pi d \\qquad\\qquad A = \\pi r^2')}
<p>Where ${T('\\pi')} comes from: for every circle, the distance around divided by the distance across is the same number, about 3.14159. That is the definition of ${T('\\pi')}, and it makes ${T('C = \\pi d')} true by definition. For area, imagine slicing the circle into many thin wedges and laying them alternately point-up and point-down: they form a near-rectangle with height ${T('r')} and width half the circumference, ${T('\\pi r')}. Area ${T('= r \\cdot \\pi r = \\pi r^2')}.</p>
<p>Leave answers in terms of ${T('\\pi')} unless the question asks for a decimal. Multiple-choice answers on the SAT are usually written as ${T('12\\pi')}, not 37.7.</p>

<p><strong>Worked example 1.</strong> A circle has diameter 10. Find its circumference and area.</p>
<p>${T('r = 5')}. ${T('C = 2\\pi(5) = 10\\pi')}, and ${T('A = \\pi(5)^2 = 25\\pi')}. Using 10 in the area formula gives ${T('100\\pi')}, four times too big.</p>

<p><strong>Worked example 2 (backwards).</strong> A circle has circumference ${T('16\\pi')}. Find its area.</p>
<p>${T('2\\pi r = 16\\pi')}, so ${T('r = 8')} and ${T('A = 64\\pi')}. Most "find the area from the circumference" problems are just "find ${T('r')} first."</p>

<h3>3. Arc length and sector area</h3>
<figure class="q-diagram">${svgSector}</figure>
<p>An arc or sector is a <strong>fraction of the whole circle</strong>, and the fraction is the central angle over ${T('360^\\circ')}. Multiply that fraction by the whole circumference or the whole area:</p>
${D('\\text{arc length} = \\frac{\\theta}{360^\\circ} \\cdot 2\\pi r \\qquad\\qquad \\text{sector area} = \\frac{\\theta}{360^\\circ} \\cdot \\pi r^2')}
<p>Same idea both times: a ${T('90^\\circ')} sector is a quarter of the circle, a ${T('60^\\circ')} sector is a sixth, a ${T('120^\\circ')} sector is a third.</p>

<p><strong>Worked example 3.</strong> Radius 9, central angle ${T('60^\\circ')}. Find the arc length and the sector area.</p>
<p>Fraction ${T('= 60/360 = 1/6')}. Arc ${T('= \\tfrac{1}{6} \\cdot 18\\pi = 3\\pi')}. Sector ${T('= \\tfrac{1}{6} \\cdot 81\\pi = \\tfrac{27\\pi}{2}')}. Arc length is a length (uses ${T('2\\pi r')}); sector area is an area (uses ${T('\\pi r^2')}). Do not mix them.</p>

<p><strong>Worked example 4 (backwards).</strong> A sector of a circle with radius 12 has arc length ${T('5\\pi')}. Find the central angle.</p>
${D('\\frac{\\theta}{360} \\cdot 24\\pi = 5\\pi \\;\\Rightarrow\\; \\frac{\\theta}{360} = \\frac{5}{24} \\;\\Rightarrow\\; \\theta = 75^\\circ')}

<p><strong>Radians, a preview for precalculus.</strong> A <strong>radian</strong> measures an angle by the arc it cuts on a circle of radius 1. A full turn is ${T('2\\pi')} radians, so ${T('180^\\circ = \\pi')} radians. To convert, multiply degrees by ${T('\\pi/180')}: ${T('90^\\circ = \\pi/2')}, ${T('60^\\circ = \\pi/3')}, ${T('45^\\circ = \\pi/4')}, ${T('30^\\circ = \\pi/6')}. In radians the arc formula becomes simply ${T('s = r\\theta')} and the sector area ${T('\\tfrac{1}{2} r^2 \\theta')}. The SAT asks a radian conversion now and then; precalc uses radians constantly, so get comfortable with them here. And check your calculator is in the right mode for whichever unit the problem uses.</p>

<h3>4. Central and inscribed angles</h3>
<figure class="q-diagram">${svgInscribed}</figure>
<p>A <strong>central angle</strong> has its vertex at the center; its measure equals the measure of the arc it cuts off (that is what "arc measure" means). An <strong>inscribed angle</strong> has its vertex <em>on</em> the circle, with both sides being chords. The rule:</p>
${D('\\text{inscribed angle} = \\tfrac{1}{2} \\cdot \\text{arc it opens onto} = \\tfrac{1}{2} \\cdot \\text{central angle on the same arc}')}
<p>In the figure, ${T('\\angle ACB = \\tfrac{1}{2} \\angle AOB')}. Three consequences you will use:</p>
<ul>
  <li><strong>Angle in a semicircle.</strong> If ${T('AB')} is a diameter, any inscribed angle ${T('\\angle ACB')} is ${T('\\tfrac{1}{2}(180^\\circ) = 90^\\circ')}. A triangle with a diameter as one side is a right triangle, and Block 2 takes over.</li>
  <li><strong>Same arc, same angle.</strong> All inscribed angles opening onto the same arc are equal.</li>
  <li><strong>Inscribed quadrilateral.</strong> If all four vertices of a quadrilateral lie on a circle, opposite angles add to ${T('180^\\circ')} (each pair opens onto arcs that together make the whole circle).</li>
</ul>

<p><strong>Worked example 5.</strong> Points ${T('A')}, ${T('B')} and ${T('C')} lie on a circle with center ${T('O')}. ${T('\\angle ACB = 35^\\circ')}. Find ${T('\\angle AOB')}.</p>
<p>Central is twice inscribed: ${T('\\angle AOB = 70^\\circ')}. Going the other way (given ${T('\\angle AOB = 70^\\circ')}, find the inscribed angle) means halving.</p>

<p><strong>Worked example 6.</strong> ${T('AB')} is a diameter and ${T('C')} is on the circle with ${T('AC = 6')} and ${T('BC = 8')}. Find the radius.</p>
<p>The angle at ${T('C')} is ${T('90^\\circ')}, so ${T('AB = \\sqrt{36 + 64} = 10')} is the diameter and ${T('r = 5')}.</p>

<h3>5. Tangent lines</h3>
<figure class="q-diagram">${svgTangent}</figure>
<p>Two facts:</p>
<ul>
  <li><strong>A radius drawn to the point of tangency is perpendicular to the tangent.</strong> So ${T('\\angle OTP = 90^\\circ')} in the figure, and ${T('\\triangle OTP')} is a right triangle with ${T('OP')} as its hypotenuse. Almost every tangent problem is a Pythagorean problem in disguise.</li>
  <li><strong>Two tangents from the same outside point are equal in length.</strong> If ${T('PA')} and ${T('PB')} both touch the circle, ${T('PA = PB')}.</li>
</ul>
<p><strong>Worked example 7.</strong> A tangent from ${T('P')} touches the circle at ${T('T')}. The radius is 5 and ${T('PT = 12')}. Find ${T('OP')}.</p>
${D('OP^2 = 5^2 + 12^2 = 169 \\;\\Rightarrow\\; OP = 13')}
<p>Related fact: a radius (or diameter) perpendicular to a chord bisects it. So to find the distance from the center to a chord, drop the perpendicular and use half the chord as one leg and the radius as the hypotenuse.</p>

<h3>6. The equation of a circle</h3>
<figure class="q-diagram">${svgCoord}</figure>
<p>A circle is the set of points at distance ${T('r')} from the center ${T('(h, k)')}. By the distance formula (Pythagoras on the coordinate plane), a point ${T('(x, y)')} is on the circle exactly when:</p>
${D('(x - h)^2 + (y - k)^2 = r^2')}
<p>Read the center and radius straight off the equation, watching signs: ${T('(x - 3)^2 + (y + 2)^2 = 16')} has center ${T('(3, -2)')} (the opposite of the signs inside) and radius ${T('\\sqrt{16} = 4')}, not 16. A circle centered at the origin is ${T('x^2 + y^2 = r^2')}.</p>

<p><strong>Worked example 8 (expanded form).</strong> Find the center and radius of ${T('x^2 + y^2 - 6x + 4y - 12 = 0')}.</p>
<p>Group and complete the square on each variable. Half of ${T('-6')} is ${T('-3')}, squared 9; half of 4 is 2, squared 4. Add both to both sides:</p>
${D('(x^2 - 6x + 9) + (y^2 + 4y + 4) = 12 + 9 + 4 \\;\\Rightarrow\\; (x - 3)^2 + (y + 2)^2 = 25')}
<p>Center ${T('(3, -2)')}, radius 5. The SAT gives circles in this expanded form regularly; completing the square is the whole trick.</p>

<p><strong>Worked example 9.</strong> The endpoints of a diameter are ${T('(-1, 2)')} and ${T('(5, 10)')}. Write the circle's equation.</p>
<p>Center is the midpoint: ${T('\\left(\\tfrac{-1 + 5}{2}, \\tfrac{2 + 10}{2}\\right) = (2, 6)')}. Radius is half the diameter: the distance between the endpoints is ${T('\\sqrt{6^2 + 8^2} = 10')}, so ${T('r = 5')}. Equation: ${T('(x - 2)^2 + (y - 6)^2 = 25')}.</p>

<h3>How to attack a circle problem</h3>
<ol>
  <li>Find the radius first. If you were given a diameter, circumference or area, convert.</li>
  <li>Arc or sector: multiply the whole by ${T('\\theta / 360')}. Length formulas for lengths, area formulas for areas.</li>
  <li>Angles: central equals its arc, inscribed is half. A diameter makes a right angle. Tangent meets radius at ${T('90^\\circ')}.</li>
  <li>Equation: center is the opposite of the signs in the parentheses, radius is the square root of the right side. Expanded form means complete the square.</li>
</ol>
`;

/* ---------- Practice set (20) ---------- */

const practice = [
  {
    id: 'b5-p01', blockId: 5, topic: 'Circumference and area', difficulty: 'easy', type: 'mc',
    prompt: `A circle has radius 6. What is its circumference?`,
    choices: [T('12\\pi'), T('36\\pi'), T('6\\pi'), T('24\\pi')],
    answer: 0,
    solution: `${D('C = 2\\pi r = 2\\pi(6) = 12\\pi')}<p>${T('36\\pi')} is the area, not the circumference.</p>`,
  },
  {
    id: 'b5-p02', blockId: 5, topic: 'Circumference and area', difficulty: 'easy', type: 'numeric',
    prompt: `A circle has diameter 10. Its area is ${T('k\\pi')}. Enter ${T('k')}.`,
    answer: 25,
    solution: `<p>Radius first: ${T('r = 10/2 = 5')}.</p>${D('A = \\pi r^2 = 25\\pi \\;\\Rightarrow\\; k = 25')}<p>Squaring the diameter gives 100, the classic mistake.</p>`,
  },
  {
    id: 'b5-p03', blockId: 5, topic: 'Arcs and sectors', difficulty: 'easy', type: 'mc',
    prompt: `A circle has radius 9. What is the length of an arc with a central angle of ${T('60^\\circ')}?`,
    choices: [T('3\\pi'), T('\\dfrac{27\\pi}{2}'), T('6\\pi'), T('9\\pi')],
    answer: 0,
    solution: `<p>${T('60^\\circ')} is one sixth of the circle.</p>${D('\\frac{60}{360} \\cdot 2\\pi(9) = \\frac{1}{6} \\cdot 18\\pi = 3\\pi')}<p>${T('27\\pi/2')} is the sector <em>area</em>.</p>`,
  },
  {
    id: 'b5-p04', blockId: 5, topic: 'Central and inscribed angles', difficulty: 'easy', type: 'mc',
    prompt: `An inscribed angle opens onto an arc of ${T('80^\\circ')}. What is the measure of the inscribed angle?`,
    choices: [T('40^\\circ'), T('80^\\circ'), T('160^\\circ'), T('20^\\circ')],
    answer: 0,
    solution: `<p>An inscribed angle is half the arc it opens onto.</p>${D('\\tfrac{1}{2}(80^\\circ) = 40^\\circ')}<p>${T('80^\\circ')} would be the central angle on that arc.</p>`,
  },
  {
    id: 'b5-p05', blockId: 5, topic: 'Arcs and sectors', difficulty: 'easy', type: 'numeric',
    prompt: `A circle has radius 4. The area of a sector with central angle ${T('90^\\circ')} is ${T('k\\pi')}. Enter ${T('k')}.`,
    answer: 4,
    solution: `<p>A ${T('90^\\circ')} sector is a quarter of the circle.</p>${D('\\frac{1}{4} \\cdot \\pi(4)^2 = \\frac{16\\pi}{4} = 4\\pi \\;\\Rightarrow\\; k = 4')}`,
  },
  {
    id: 'b5-p06', blockId: 5, topic: 'Tangents', difficulty: 'easy', type: 'mc',
    diagram: svgTangent,
    prompt: `In the figure, ${T('PT')} is tangent to the circle at ${T('T')}. The radius ${T('OT = 5')} and ${T('PT = 12')}. What is ${T('OP')}?`,
    choices: [T('13'), T('17'), T('7'), T('\\sqrt{119}')],
    answer: 0,
    solution: `<p>The radius meets the tangent at a right angle, so ${T('\\triangle OTP')} is right with hypotenuse ${T('OP')}.</p>${D('OP = \\sqrt{5^2 + 12^2} = \\sqrt{169} = 13')}<p>${T('\\sqrt{119}')} comes from subtracting instead of adding; ${T('OP')} is the hypotenuse, so add.</p>`,
  },
  {
    id: 'b5-p07', blockId: 5, topic: 'Equation of a circle', difficulty: 'easy', type: 'mc',
    prompt: `What are the center and radius of the circle ${T('(x - 3)^2 + (y + 2)^2 = 16')}?`,
    choices: [`Center ${T('(3, -2)')}, radius 4`, `Center ${T('(-3, 2)')}, radius 4`, `Center ${T('(3, -2)')}, radius 16`, `Center ${T('(-3, 2)')}, radius 16`],
    answer: 0,
    solution: `<p>Compare with ${T('(x - h)^2 + (y - k)^2 = r^2')}. The center is the opposite of the signs inside: ${T('(3, -2)')}. The radius is ${T('\\sqrt{16} = 4')}, not 16.</p>`,
  },
  {
    id: 'b5-p08', blockId: 5, topic: 'Circumference and area', difficulty: 'medium', type: 'numeric',
    prompt: `A circle has circumference ${T('20\\pi')}. Its area is ${T('k\\pi')}. Enter ${T('k')}.`,
    answer: 100,
    solution: `<p>Find the radius first.</p>${D('2\\pi r = 20\\pi \\;\\Rightarrow\\; r = 10 \\;\\Rightarrow\\; A = \\pi(10)^2 = 100\\pi')}`,
  },
  {
    id: 'b5-p09', blockId: 5, topic: 'Arcs and sectors', difficulty: 'medium', type: 'mc',
    prompt: `A circle has radius 6. What is the area of a sector with central angle ${T('120^\\circ')}?`,
    choices: [T('12\\pi'), T('4\\pi'), T('36\\pi'), T('24\\pi')],
    answer: 0,
    solution: `<p>${T('120^\\circ')} is a third of the circle.</p>${D('\\frac{1}{3} \\cdot \\pi(6)^2 = \\frac{36\\pi}{3} = 12\\pi')}<p>${T('4\\pi')} is the arc length (${T('\\tfrac{1}{3} \\cdot 12\\pi')}). ${T('36\\pi')} is the whole circle.</p>`,
  },
  {
    id: 'b5-p10', blockId: 5, topic: 'Central and inscribed angles', difficulty: 'medium', type: 'numeric',
    prompt: `Points ${T('A')}, ${T('B')} and ${T('C')} lie on a circle, and ${T('AB')} is a diameter. ${T('AC = 6')} and ${T('BC = 8')}. Enter the length of ${T('AB')}.`,
    answer: 10,
    solution: `<p>An angle inscribed in a semicircle is a right angle, so ${T('\\angle C = 90^\\circ')} and ${T('AB')} is the hypotenuse.</p>${D('AB = \\sqrt{6^2 + 8^2} = 10')}`,
  },
  {
    id: 'b5-p11', blockId: 5, topic: 'Central and inscribed angles', difficulty: 'medium', type: 'mc',
    prompt: `Quadrilateral ${T('ABCD')} has all four vertices on a circle. ${T('\\angle A = 95^\\circ')}. What is ${T('\\angle C')}?`,
    choices: [T('85^\\circ'), T('95^\\circ'), T('265^\\circ'), T('190^\\circ')],
    answer: 0,
    solution: `<p>Opposite angles of an inscribed quadrilateral are supplementary.</p>${D('\\angle C = 180^\\circ - 95^\\circ = 85^\\circ')}<p>Why: ${T('\\angle A')} and ${T('\\angle C')} open onto arcs that together make the full ${T('360^\\circ')}, and each angle is half its arc.</p>`,
  },
  {
    id: 'b5-p12', blockId: 5, topic: 'Arcs and sectors', difficulty: 'medium', type: 'numeric',
    prompt: `A circle has radius 12. An arc has length ${T('5\\pi')}. Enter the central angle of the arc, in degrees.`,
    answer: 75,
    solution: `${D('\\frac{\\theta}{360} \\cdot 2\\pi(12) = 5\\pi \\;\\Rightarrow\\; \\frac{\\theta}{360} = \\frac{5}{24} \\;\\Rightarrow\\; \\theta = 75^\\circ')}`,
  },
  {
    id: 'b5-p13', blockId: 5, topic: 'Tangents', difficulty: 'medium', type: 'mc',
    prompt: `From an outside point ${T('P')}, two tangents touch a circle at ${T('A')} and ${T('B')}. ${T('PA = 2x + 3')} and ${T('PB = 4x - 7')}. What is ${T('PA')}?`,
    choices: [T('13'), T('5'), T('10'), T('26')],
    answer: 0,
    solution: `<p>Two tangents from the same outside point are equal.</p>${D('2x + 3 = 4x - 7 \\;\\Rightarrow\\; 10 = 2x \\;\\Rightarrow\\; x = 5 \\;\\Rightarrow\\; PA = 2(5) + 3 = 13')}<p>5 is ${T('x')}, not ${T('PA')}.</p>`,
  },
  {
    id: 'b5-p14', blockId: 5, topic: 'Equation of a circle', difficulty: 'medium', type: 'numeric',
    prompt: `Enter the radius of the circle ${T('x^2 + y^2 - 6x + 4y - 12 = 0')}.`,
    answer: 5,
    solution: `<p>Complete the square: add ${T('(-6/2)^2 = 9')} and ${T('(4/2)^2 = 4')} to both sides.</p>${D('(x - 3)^2 + (y + 2)^2 = 12 + 9 + 4 = 25 \\;\\Rightarrow\\; r = 5')}`,
  },
  {
    id: 'b5-p15', blockId: 5, topic: 'Arcs and sectors', difficulty: 'medium', type: 'mc',
    prompt: `Convert ${T('150^\\circ')} to radians.`,
    choices: [T('\\dfrac{5\\pi}{6}'), T('\\dfrac{5\\pi}{3}'), T('\\dfrac{\\pi}{6}'), T('\\dfrac{3\\pi}{4}')],
    answer: 0,
    solution: `<p>Multiply by ${T('\\pi / 180')}.</p>${D('150 \\cdot \\frac{\\pi}{180} = \\frac{150\\pi}{180} = \\frac{5\\pi}{6}')}<p>Check: ${T('5\\pi/6')} is a bit less than ${T('\\pi')} (${T('180^\\circ')}), which fits ${T('150^\\circ')}.</p>`,
  },
  {
    id: 'b5-p16', blockId: 5, topic: 'Arcs and sectors', difficulty: 'hard', type: 'mc',
    prompt: `A circle has radius 8. What is the length of an arc with central angle ${T('\\dfrac{3\\pi}{4}')} radians?`,
    choices: [T('6\\pi'), T('24\\pi'), T('3\\pi'), T('12\\pi')],
    answer: 0,
    solution: `<p>In radians, arc length is ${T('s = r\\theta')}.</p>${D('s = 8 \\cdot \\frac{3\\pi}{4} = 6\\pi')}<p>Same answer the degree way: ${T('3\\pi/4 = 135^\\circ')}, and ${T('\\tfrac{135}{360} \\cdot 16\\pi = 6\\pi')}. ${T('24\\pi')} is the sector area, ${T('\\tfrac{1}{2} r^2 \\theta')}.</p>`,
  },
  {
    id: 'b5-p17', blockId: 5, topic: 'Tangents', difficulty: 'hard', type: 'numeric',
    diagram: svgChord,
    prompt: `A circle with center ${T('O')} has radius 10. Chord ${T('AB')} has length 12. Enter the distance from ${T('O')} to the chord.`,
    answer: 8,
    solution: `<p>The perpendicular from the center bisects the chord, so ${T('AM = 6')}. ${T('\\triangle OMA')} is right with hypotenuse ${T('OA = 10')}.</p>${D('OM = \\sqrt{10^2 - 6^2} = \\sqrt{64} = 8')}<p>A 6-8-10 triangle. Using the full chord length 12 as a leg is the trap.</p>`,
  },
  {
    id: 'b5-p18', blockId: 5, topic: 'Equation of a circle', difficulty: 'hard', type: 'mc',
    prompt: `The endpoints of a diameter of a circle are ${T('(-1, 2)')} and ${T('(5, 10)')}. Which is the equation of the circle?`,
    choices: [T('(x - 2)^2 + (y - 6)^2 = 25'), T('(x + 2)^2 + (y + 6)^2 = 25'), T('(x - 2)^2 + (y - 6)^2 = 100'), T('(x - 2)^2 + (y - 6)^2 = 5')],
    answer: 0,
    solution: `<p>Center is the midpoint of the diameter: ${T('(2, 6)')}. The diameter's length is ${T('\\sqrt{6^2 + 8^2} = 10')}, so ${T('r = 5')} and ${T('r^2 = 25')}.</p>${D('(x - 2)^2 + (y - 6)^2 = 25')}<p>100 uses the diameter as the radius; 5 forgets to square.</p>`,
  },
  {
    id: 'b5-p19', blockId: 5, topic: 'Arcs and sectors', difficulty: 'hard', type: 'numeric',
    prompt: `A sector of a circle with radius 9 has area ${T('27\\pi')}. Enter its central angle, in degrees.`,
    answer: 120,
    solution: `<p>The whole circle has area ${T('81\\pi')}, so the sector is ${T('27/81 = 1/3')} of it.</p>${D('\\frac{\\theta}{360} = \\frac{1}{3} \\;\\Rightarrow\\; \\theta = 120^\\circ')}`,
  },
  {
    id: 'b5-p20', blockId: 5, topic: 'Tangents', difficulty: 'hard', type: 'mc',
    prompt: `A tangent from point ${T('P')} touches a circle at ${T('T')}, with ${T('PT = 24')}. The distance from ${T('P')} to the center is 26. What is the diameter of the circle?`,
    choices: [T('20'), T('10'), T('5'), T('50')],
    answer: 0,
    solution: `<p>The radius to ${T('T')} is perpendicular to the tangent, so ${T('r^2 + 24^2 = 26^2')}.</p>${D('r = \\sqrt{676 - 576} = \\sqrt{100} = 10 \\;\\Rightarrow\\; \\text{diameter} = 20')}<p>10 is the radius; the question asks for the diameter.</p>`,
  },
];

/* ---------- Checkpoint 3 (10, timed, circles) ---------- */

const checkpoint = [
  {
    id: 'b5-c01', blockId: 5, topic: 'Circumference and area', difficulty: 'easy', type: 'mc',
    prompt: `A circle has radius 7. What is its area?`,
    choices: [T('49\\pi'), T('14\\pi'), T('7\\pi'), T('98\\pi')],
    answer: 0,
    solution: `${D('A = \\pi r^2 = 49\\pi')}<p>${T('14\\pi')} is the circumference.</p>`,
  },
  {
    id: 'b5-c02', blockId: 5, topic: 'Circumference and area', difficulty: 'easy', type: 'numeric',
    prompt: `A circle has diameter 18. Its circumference is ${T('k\\pi')}. Enter ${T('k')}.`,
    answer: 18,
    solution: `${D('C = \\pi d = 18\\pi \\;\\Rightarrow\\; k = 18')}<p>Equivalently ${T('2\\pi r')} with ${T('r = 9')}.</p>`,
  },
  {
    id: 'b5-c03', blockId: 5, topic: 'Arcs and sectors', difficulty: 'easy', type: 'mc',
    prompt: `A circle has radius 8. What is the length of an arc with central angle ${T('45^\\circ')}?`,
    choices: [T('2\\pi'), T('8\\pi'), T('4\\pi'), T('\\pi')],
    answer: 0,
    solution: `<p>${T('45^\\circ')} is one eighth of the circle.</p>${D('\\frac{1}{8} \\cdot 2\\pi(8) = \\frac{16\\pi}{8} = 2\\pi')}<p>${T('8\\pi')} is the sector area.</p>`,
  },
  {
    id: 'b5-c04', blockId: 5, topic: 'Central and inscribed angles', difficulty: 'medium', type: 'mc',
    prompt: `An inscribed angle opens onto an arc of ${T('110^\\circ')}. What is the inscribed angle?`,
    choices: [T('55^\\circ'), T('110^\\circ'), T('220^\\circ'), T('125^\\circ')],
    answer: 0,
    solution: `${D('\\tfrac{1}{2}(110^\\circ) = 55^\\circ')}`,
  },
  {
    id: 'b5-c05', blockId: 5, topic: 'Arcs and sectors', difficulty: 'medium', type: 'numeric',
    prompt: `A circle has radius 3. The area of a sector with central angle ${T('240^\\circ')} is ${T('k\\pi')}. Enter ${T('k')}.`,
    answer: 6,
    solution: `<p>${T('240/360 = 2/3')} of the circle.</p>${D('\\frac{2}{3} \\cdot \\pi(3)^2 = \\frac{2}{3} \\cdot 9\\pi = 6\\pi \\;\\Rightarrow\\; k = 6')}`,
  },
  {
    id: 'b5-c06', blockId: 5, topic: 'Tangents', difficulty: 'medium', type: 'mc',
    prompt: `${T('PT')} is tangent to a circle with center ${T('O')} at ${T('T')}. ${T('OT = 6')} and ${T('PT = 8')}. What is ${T('OP')}?`,
    choices: [T('10'), T('14'), T('2\\sqrt{7}'), T('100')],
    answer: 0,
    solution: `<p>Radius and tangent are perpendicular, so ${T('OP')} is the hypotenuse of a 6-8-10 right triangle.</p>${D('OP = \\sqrt{36 + 64} = 10')}`,
  },
  {
    id: 'b5-c07', blockId: 5, topic: 'Equation of a circle', difficulty: 'medium', type: 'mc',
    prompt: `What are the center and radius of ${T('(x + 1)^2 + (y - 4)^2 = 36')}?`,
    choices: [`Center ${T('(-1, 4)')}, radius 6`, `Center ${T('(1, -4)')}, radius 6`, `Center ${T('(-1, 4)')}, radius 36`, `Center ${T('(1, -4)')}, radius 18`],
    answer: 0,
    solution: `<p>${T('(x + 1)')} means ${T('h = -1')}; ${T('(y - 4)')} means ${T('k = 4')}. Radius ${T('= \\sqrt{36} = 6')}.</p>`,
  },
  {
    id: 'b5-c08', blockId: 5, topic: 'Central and inscribed angles', difficulty: 'hard', type: 'numeric',
    prompt: `${T('AB')} is a diameter of a circle and ${T('C')} is a point on the circle. ${T('AB = 26')} and ${T('AC = 10')}. Enter the length of ${T('BC')}.`,
    answer: 24,
    solution: `<p>The angle at ${T('C')} is inscribed in a semicircle, so it is ${T('90^\\circ')} and ${T('AB')} is the hypotenuse.</p>${D('BC = \\sqrt{26^2 - 10^2} = \\sqrt{576} = 24')}`,
  },
  {
    id: 'b5-c09', blockId: 5, topic: 'Central and inscribed angles', difficulty: 'hard', type: 'mc',
    prompt: `Quadrilateral ${T('ABCD')} is inscribed in a circle. ${T('\\angle B = 112^\\circ')}. What is ${T('\\angle D')}?`,
    choices: [T('68^\\circ'), T('112^\\circ'), T('224^\\circ'), T('56^\\circ')],
    answer: 0,
    solution: `<p>Opposite angles of an inscribed quadrilateral add to ${T('180^\\circ')}.</p>${D('\\angle D = 180^\\circ - 112^\\circ = 68^\\circ')}`,
  },
  {
    id: 'b5-c10', blockId: 5, topic: 'Equation of a circle', difficulty: 'hard', type: 'numeric',
    prompt: `Enter the radius of the circle ${T('x^2 + y^2 + 8x - 2y + 8 = 0')}.`,
    answer: 3,
    solution: `<p>Complete the square: add ${T('(8/2)^2 = 16')} and ${T('(-2/2)^2 = 1')} to both sides after moving the 8 across.</p>${D('(x + 4)^2 + (y - 1)^2 = -8 + 16 + 1 = 9 \\;\\Rightarrow\\; r = 3')}`,
  },
];

export default { lesson, practice, checkpoint };
