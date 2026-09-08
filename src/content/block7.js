// Block 7: Solid geometry. Volume of prisms, cylinders, pyramids, cones and
// spheres; surface area basics; density and unit-conversion word problems.
// No checkpoint in this block (the plan puts the next one in Block 8).
// All questions original. Math in data-tex attributes (KaTeX).

const T = (s) => `<span data-tex="${s}"></span>`;
const D = (s) => `<div data-tex-display="${s}"></div>`;

/* ---------- Diagrams ---------- */

// Rectangular prism in oblique view with length, width, height and the space diagonal.
const svgBox = `<svg viewBox="0 0 240 200" width="240" height="200" role="img" aria-label="A rectangular box drawn in perspective, labeled with length l along the bottom front edge, width w along the depth, and height h up the right side. A dashed space diagonal runs from the bottom front left corner to the top back right corner.">
  <path d="M 40 80 L 160 80 L 160 170 L 40 170 Z" fill="currentColor" opacity="0.08"/>
  <path d="M 40 80 L 80 50 L 200 50 L 160 80 Z" fill="currentColor" opacity="0.16"/>
  <path d="M 160 80 L 200 50 L 200 140 L 160 170 Z" fill="currentColor" opacity="0.12"/>
  <path d="M 40 80 L 160 80 L 160 170 L 40 170 Z" fill="none" stroke="currentColor" stroke-width="2"/>
  <path d="M 40 80 L 80 50 L 200 50 L 160 80" fill="none" stroke="currentColor" stroke-width="2"/>
  <path d="M 200 50 L 200 140 L 160 170" fill="none" stroke="currentColor" stroke-width="2"/>
  <path d="M 40 170 L 80 140 L 200 140 M 80 140 L 80 50" fill="none" stroke="currentColor" stroke-width="1.2" stroke-dasharray="4 3"/>
  <line x1="40" y1="170" x2="200" y2="50" stroke="currentColor" stroke-width="1.2" stroke-dasharray="6 3"/>
  <text x="96" y="188" font-size="13" fill="currentColor">l</text>
  <text x="186" y="166" font-size="13" fill="currentColor">w</text>
  <text x="208" y="100" font-size="13" fill="currentColor">h</text>
  <text x="112" y="104" font-size="13" fill="currentColor">d</text>
</svg>`;

// Cylinder with radius r and height h.
const svgCylinder = `<svg viewBox="0 0 200 220" width="200" height="220" role="img" aria-label="A cylinder standing upright, with its radius r drawn across the top circle and its height h marked along the side.">
  <path d="M 40 50 L 40 170 A 60 18 0 0 0 160 170 L 160 50" fill="currentColor" opacity="0.1"/>
  <ellipse cx="100" cy="50" rx="60" ry="18" fill="currentColor" opacity="0.18"/>
  <ellipse cx="100" cy="50" rx="60" ry="18" fill="none" stroke="currentColor" stroke-width="2"/>
  <path d="M 40 170 A 60 18 0 0 0 160 170" fill="none" stroke="currentColor" stroke-width="2"/>
  <path d="M 40 170 A 60 18 0 0 1 160 170" fill="none" stroke="currentColor" stroke-width="1.2" stroke-dasharray="4 3"/>
  <line x1="40" y1="50" x2="40" y2="170" stroke="currentColor" stroke-width="2"/>
  <line x1="160" y1="50" x2="160" y2="170" stroke="currentColor" stroke-width="2"/>
  <line x1="100" y1="50" x2="160" y2="50" stroke="currentColor" stroke-width="1.5"/>
  <circle cx="100" cy="50" r="2.5" fill="currentColor"/>
  <text x="126" y="44" font-size="13" fill="currentColor">r</text>
  <text x="168" y="116" font-size="13" fill="currentColor">h</text>
</svg>`;

// Cone with radius r, height h and slant height l; right angle at the center of the base.
const svgCone = `<svg viewBox="0 0 200 220" width="200" height="220" role="img" aria-label="A cone with its apex at the top. A dashed vertical height h drops from the apex to the center of the circular base, meeting the radius r at a right angle. The slanted side is labeled with the slant height.">
  <path d="M 40 170 L 100 30 L 160 170 A 60 18 0 0 1 40 170 Z" fill="currentColor" opacity="0.1"/>
  <path d="M 40 170 L 100 30 L 160 170" fill="none" stroke="currentColor" stroke-width="2"/>
  <path d="M 40 170 A 60 18 0 0 0 160 170" fill="none" stroke="currentColor" stroke-width="2"/>
  <path d="M 40 170 A 60 18 0 0 1 160 170" fill="none" stroke="currentColor" stroke-width="1.2" stroke-dasharray="4 3"/>
  <line x1="100" y1="30" x2="100" y2="170" stroke="currentColor" stroke-width="1.5" stroke-dasharray="5 4"/>
  <line x1="100" y1="170" x2="160" y2="170" stroke="currentColor" stroke-width="1.5"/>
  <path d="M 100 158 L 112 158 L 112 170" fill="none" stroke="currentColor" stroke-width="1.2"/>
  <circle cx="100" cy="170" r="2.5" fill="currentColor"/>
  <text x="86" y="104" font-size="13" fill="currentColor">h</text>
  <text x="126" y="186" font-size="13" fill="currentColor">r</text>
  <text x="140" y="100" font-size="13" fill="currentColor">slant</text>
</svg>`;

// Sphere with an equator and a radius.
const svgSphere = `<svg viewBox="0 0 200 200" width="200" height="200" role="img" aria-label="A sphere drawn as a circle with a dashed equator, its center marked, and a radius r drawn from the center to the surface.">
  <circle cx="100" cy="100" r="70" fill="currentColor" opacity="0.1"/>
  <circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" stroke-width="2"/>
  <path d="M 30 100 A 70 20 0 0 0 170 100" fill="none" stroke="currentColor" stroke-width="1.5"/>
  <path d="M 30 100 A 70 20 0 0 1 170 100" fill="none" stroke="currentColor" stroke-width="1.2" stroke-dasharray="4 3"/>
  <line x1="100" y1="100" x2="149.5" y2="50.5" stroke="currentColor" stroke-width="1.5"/>
  <circle cx="100" cy="100" r="3" fill="currentColor"/>
  <text x="130" y="72" font-size="13" fill="currentColor">r</text>
</svg>`;

// Net of a cylinder: two circles and a rectangle of width 2*pi*r and height h.
const svgCylNet = `<svg viewBox="0 0 320 190" width="320" height="190" role="img" aria-label="The net of a cylinder: two circles of radius r for the top and bottom, and a rectangle whose width is the circumference 2 pi r and whose height is h.">
  <circle cx="60" cy="52" r="30" fill="currentColor" opacity="0.15"/>
  <circle cx="60" cy="52" r="30" fill="none" stroke="currentColor" stroke-width="2"/>
  <line x1="60" y1="52" x2="90" y2="52" stroke="currentColor" stroke-width="1.5"/>
  <text x="70" y="47" font-size="12" fill="currentColor">r</text>
  <circle cx="60" cy="138" r="30" fill="currentColor" opacity="0.15"/>
  <circle cx="60" cy="138" r="30" fill="none" stroke="currentColor" stroke-width="2"/>
  <rect x="112" y="40" width="188" height="110" fill="currentColor" opacity="0.1"/>
  <rect x="112" y="40" width="188" height="110" fill="none" stroke="currentColor" stroke-width="2"/>
  <text x="206" y="172" text-anchor="middle" font-size="13" fill="currentColor">2πr</text>
  <text x="306" y="100" font-size="13" fill="currentColor">h</text>
  <text x="206" y="30" text-anchor="middle" font-size="12" fill="currentColor">side, unrolled</text>
</svg>`;

// Square pyramid with base side s, height h and slant height l on one face.
const svgPyramid = `<svg viewBox="0 0 240 210" width="240" height="210" role="img" aria-label="A square pyramid. A dashed height h drops from the apex to the center of the square base. A slant height runs from the apex down the middle of the front face to the midpoint of the front base edge.">
  <path d="M 40 160 L 170 175 L 210 130 L 100 120 Z" fill="currentColor" opacity="0.1"/>
  <path d="M 40 160 L 170 175 L 130 28 Z" fill="currentColor" opacity="0.16"/>
  <path d="M 170 175 L 210 130 L 130 28 Z" fill="currentColor" opacity="0.1"/>
  <path d="M 40 160 L 170 175 L 210 130" fill="none" stroke="currentColor" stroke-width="2"/>
  <path d="M 210 130 L 100 120 L 40 160 M 100 120 L 130 28" fill="none" stroke="currentColor" stroke-width="1.2" stroke-dasharray="4 3"/>
  <path d="M 40 160 L 130 28 L 170 175 M 130 28 L 210 130" fill="none" stroke="currentColor" stroke-width="2"/>
  <line x1="130" y1="28" x2="130" y2="146" stroke="currentColor" stroke-width="1.2" stroke-dasharray="4 3"/>
  <line x1="130" y1="28" x2="105" y2="167.5" stroke="currentColor" stroke-width="1.5"/>
  <circle cx="130" cy="146" r="2.5" fill="currentColor"/>
  <circle cx="105" cy="167.5" r="2.5" fill="currentColor"/>
  <text x="100" y="192" font-size="13" fill="currentColor">s</text>
  <text x="134" y="104" font-size="13" fill="currentColor">h</text>
  <text x="66" y="153" font-size="11" fill="currentColor">slant</text>
</svg>`;

/* ---------- Lesson ---------- */

const lesson = `
<p>Solid geometry is the 3D chapter: how much space a shape holds (<strong>volume</strong>) and how much material wraps it (<strong>surface area</strong>). The SAT gives you most of the volume formulas on its reference sheet; the ACT gives you none. So learn them here, and learn <em>why</em> they look the way they do, which is the part that makes them stick. The word problems at the end (density, unit conversion, filling a tank) are where the tests actually spend their points.</p>

<h3>1. Volume versus surface area, and their units</h3>
<p><strong>Volume</strong> counts how many unit cubes fit inside a solid. Its units are cubic: ${T('\\text{cm}^3')}, ${T('\\text{ft}^3')}, ${T('\\text{m}^3')}. <strong>Surface area</strong> is the total area of every face or curved surface, the amount of wrapping paper. Its units are square: ${T('\\text{cm}^2')}, ${T('\\text{ft}^2')}. If your answer to a volume question comes out in square units, you used the wrong formula.</p>

<h3>2. Prisms and cylinders: base times height</h3>
<figure class="q-diagram">${svgBox}</figure>
<p>A <strong>prism</strong> is a solid with two identical parallel ends (the <strong>bases</strong>) and flat sides: a box, a triangular Toblerone bar, a hexagonal pencil. A <strong>cylinder</strong> is the same idea with a circle as the base. All of them share one formula:</p>
${D('V = B \\cdot h \\qquad (B = \\text{area of the base}, \\; h = \\text{height})')}
<p>Why: picture stacking thin slices of the base on top of each other. Each slice has area ${T('B')}, and you stack them to a height ${T('h')}. The specific versions:</p>
<ul>
  <li><strong>Rectangular box:</strong> ${T('V = l \\cdot w \\cdot h')} (the base is a rectangle, area ${T('lw')}).</li>
  <li><strong>Cube:</strong> ${T('V = s^3')}.</li>
  <li><strong>Cylinder:</strong> ${T('V = \\pi r^2 h')} (the base is a circle, area ${T('\\pi r^2')}).</li>
  <li><strong>Triangular prism:</strong> ${T('V = (\\text{triangle area}) \\cdot \\text{length}')}.</li>
</ul>
<p>The height is always the distance <em>between</em> the two bases, at right angles to them. In a box any dimension can play the role of height, which is why ${T('lwh')} works in any order.</p>
<p><strong>Worked example 1.</strong> A cylinder has radius 3 and height 10. Find its volume.</p>
${D('V = \\pi (3)^2 (10) = 90\\pi \\approx 282.7')}
<p>The most common slip is squaring the diameter instead of the radius, exactly as in Block 5. If a problem gives a diameter of 6, the radius is 3.</p>
<p><strong>Worked example 2 (backwards).</strong> A cylinder with radius 5 has volume ${T('200\\pi')}. Find its height.</p>
${D('\\pi (5)^2 h = 200\\pi \\;\\Rightarrow\\; 25h = 200 \\;\\Rightarrow\\; h = 8')}
<p><strong>The space diagonal.</strong> The longest segment inside a box, corner to opposite corner, has length ${T('d = \\sqrt{l^2 + w^2 + h^2}')}. It is Pythagoras used twice: first across the floor (${T('\\sqrt{l^2 + w^2}')}), then up the height. A ${T('3 \\times 4 \\times 12')} box has diagonal ${T('\\sqrt{9 + 16 + 144} = \\sqrt{169} = 13')}. The tests use this for "will the rod fit in the box" questions.</p>

<h3>3. Pyramids and cones: one third of the prism</h3>
<figure class="q-diagram">${svgPyramid}</figure>
<figure class="q-diagram">${svgCone}</figure>
<p>A <strong>pyramid</strong> has one base and comes to a point; a <strong>cone</strong> is a pyramid with a circular base. Each holds exactly <strong>one third</strong> of the prism or cylinder with the same base and height:</p>
${D('V = \\tfrac{1}{3} B h \\qquad\\qquad V_{\\text{cone}} = \\tfrac{1}{3} \\pi r^2 h')}
<p>Why one third: three identical pyramids can be fitted together to fill a cube of the same base and height. You can also test it in the kitchen: a cone-shaped cup fills a same-size cylindrical cup exactly three times. Trust the 3.</p>
<p>Two heights show up in these solids, and mixing them up is the classic error:</p>
<ul>
  <li>The <strong>height</strong> ${T('h')} is the perpendicular distance from the apex to the base. It is what the volume formula wants.</li>
  <li>The <strong>slant height</strong> ${T('\\ell')} runs along the outside surface, from the apex to the edge of the base. In a cone, ${T('r')}, ${T('h')} and ${T('\\ell')} form a right triangle: ${T('r^2 + h^2 = \\ell^2')}. In a square pyramid the same triangle uses half the base side instead of ${T('r')}.</li>
</ul>
<p><strong>Worked example 3.</strong> A cone has radius 6 and slant height 10. Find its volume.</p>
<p>First the real height: ${T('h = \\sqrt{10^2 - 6^2} = \\sqrt{64} = 8')}. Then</p>
${D('V = \\tfrac{1}{3} \\pi (6)^2 (8) = \\tfrac{1}{3} \\pi (288) = 96\\pi')}
<p>Using 10 as the height gives ${T('120\\pi')}, the trap answer.</p>
<p><strong>Worked example 4.</strong> A square pyramid has base side 6 and height 5. Find its volume.</p>
${D('V = \\tfrac{1}{3} (6^2)(5) = \\tfrac{1}{3}(180) = 60')}

<h3>4. Spheres</h3>
<figure class="q-diagram">${svgSphere}</figure>
${D('V = \\tfrac{4}{3} \\pi r^3 \\qquad\\qquad SA = 4 \\pi r^2')}
<p>These two are pure memory work, but there is a sanity check for each. Volume: a sphere of radius ${T('r')} fits inside a cylinder of radius ${T('r')} and height ${T('2r')} (volume ${T('2\\pi r^3')}) and fills exactly two thirds of it, which gives ${T('\\tfrac{4}{3}\\pi r^3')}. Surface area: it is exactly four times the area of the circle you see when you look at the sphere, ${T('4 \\cdot \\pi r^2')}. Note the powers: volume uses ${T('r^3')} (cubic), surface area uses ${T('r^2')} (square). A sphere given by its <em>diameter</em> must be halved first, as always.</p>
<p><strong>Worked example 5.</strong> A sphere has radius 3. Find its volume and surface area.</p>
${D('V = \\tfrac{4}{3}\\pi(27) = 36\\pi \\qquad SA = 4\\pi(9) = 36\\pi')}
<p>Same number, different units: ${T('36\\pi')} cubic units of volume and ${T('36\\pi')} square units of surface. That coincidence only happens at ${T('r = 3')}.</p>
<p><strong>Worked example 6 (backwards).</strong> A sphere has surface area ${T('100\\pi')}. Find its volume.</p>
${D('4\\pi r^2 = 100\\pi \\;\\Rightarrow\\; r^2 = 25 \\;\\Rightarrow\\; r = 5 \\;\\Rightarrow\\; V = \\tfrac{4}{3}\\pi(125) = \\tfrac{500\\pi}{3}')}

<h3>5. Surface area basics</h3>
<figure class="q-diagram">${svgCylNet}</figure>
<p>Surface area is easiest when you imagine unfolding the solid into its <strong>net</strong> and adding up the flat pieces. You rarely need a formula; you need to count faces.</p>
<ul>
  <li><strong>Rectangular box:</strong> six rectangles in three matching pairs. ${T('SA = 2lw + 2lh + 2wh')}.</li>
  <li><strong>Cube:</strong> six identical squares. ${T('SA = 6s^2')}.</li>
  <li><strong>Cylinder:</strong> two circles plus the side. Unrolled, the side is a rectangle whose width is the circumference ${T('2\\pi r')} and whose height is ${T('h')} (see the net above). ${T('SA = 2\\pi r^2 + 2\\pi r h')}.</li>
  <li><strong>Square pyramid:</strong> the square base plus four triangles, each with base ${T('s')} and height equal to the <em>slant</em> height. ${T('SA = s^2 + 4 \\cdot \\tfrac{1}{2} s \\ell = s^2 + 2s\\ell')}.</li>
  <li><strong>Cone:</strong> the circular base plus the curved side, ${T('SA = \\pi r^2 + \\pi r \\ell')}. Slant height again, not height.</li>
  <li><strong>Sphere:</strong> ${T('4\\pi r^2')}.</li>
</ul>
<p>Watch for "open top" or "no lid" wording: a can with no lid has only one circle. Painting the outside of a box that sits on the floor covers five faces, not six.</p>
<p><strong>Worked example 7.</strong> A cylinder has radius 2 and height 7. Find its surface area.</p>
${D('SA = 2\\pi(2)^2 + 2\\pi(2)(7) = 8\\pi + 28\\pi = 36\\pi')}
<p>The ${T('28\\pi')} is the label wrapped around the can; the ${T('8\\pi')} is the two ends.</p>

<h3>6. Density and unit conversion</h3>
<p>These are the word problems that the tests build on top of the formulas.</p>
<p><strong>Density</strong> is mass per unit volume:</p>
${D('\\text{density} = \\frac{\\text{mass}}{\\text{volume}} \\qquad\\Rightarrow\\qquad \\text{mass} = \\text{density} \\times \\text{volume}')}
<p>Typical question: "a steel rod has this shape and density 7.9 g/cm³; find its mass." Compute the volume from the shape, then multiply. Keep the units matching: a density in g/cm³ needs a volume in cm³.</p>
<p><strong>Worked example 8.</strong> A solid metal block measures ${T('2 \\times 4 \\times 5')} cm and has mass 312 g. Find its density.</p>
${D('V = 40 \\text{ cm}^3, \\qquad \\text{density} = \\frac{312}{40} = 7.8 \\text{ g/cm}^3')}
<p><strong>Converting cubic units.</strong> The trap: 1 foot is 12 inches, but 1 cubic foot is <strong>not</strong> 12 cubic inches. A cubic foot is a ${T('12 \\times 12 \\times 12')} block of cubic inches, so ${T('1 \\text{ ft}^3 = 1728 \\text{ in}^3')}. Cube the conversion factor for volumes, square it for areas:</p>
<ul>
  <li>${T('1 \\text{ ft}^3 = 12^3 = 1728 \\text{ in}^3')}, and ${T('1 \\text{ ft}^2 = 144 \\text{ in}^2')}.</li>
  <li>${T('1 \\text{ m}^3 = 100^3 = 1{,}000{,}000 \\text{ cm}^3')}.</li>
  <li>${T('1 \\text{ yd}^3 = 27 \\text{ ft}^3')}.</li>
  <li>Liquids: ${T('1 \\text{ L} = 1000 \\text{ cm}^3')}, so ${T('1 \\text{ m}^3 = 1000 \\text{ L}')}. Also ${T('1 \\text{ mL} = 1 \\text{ cm}^3')}.</li>
</ul>
<p>The safest method is to convert the <em>lengths</em> first, then compute the volume, so the cubing happens on its own.</p>
<p><strong>Worked example 9.</strong> A rectangular tank is 2 m long, 1.5 m wide and 1 m deep. Water flows in at 25 liters per minute. How long does it take to fill?</p>
<p>Volume ${T('= 2 \\times 1.5 \\times 1 = 3 \\text{ m}^3 = 3000 \\text{ L}')}. Time ${T('= 3000 / 25 = 120')} minutes, two hours.</p>
<p><strong>Worked example 10.</strong> Convert a density of 2.7 g/cm³ to kg/m³.</p>
<p>Grams to kilograms divides by 1000; cm³ to m³ multiplies the count by 1,000,000 (there are a million cm³ in each m³). Net effect: multiply by 1000. ${T('2.7 \\text{ g/cm}^3 = 2700 \\text{ kg/m}^3')}. Sanity check: water is 1 g/cm³ and 1000 kg/m³, and this metal is 2.7 times denser than water either way.</p>

<h3>7. Scaling a solid (a reminder from Block 3)</h3>
<p>If every length of a solid is multiplied by ${T('k')}, its surface area is multiplied by ${T('k^2')} and its volume by ${T('k^3')}. Doubling the radius of a sphere makes its volume 8 times bigger. If only <em>some</em> dimensions change, go back to the formula: doubling a cone's radius and halving its height gives ${T('\\tfrac{1}{3}\\pi(2r)^2(h/2) = 2 \\cdot \\tfrac{1}{3}\\pi r^2 h')}, twice the volume, because the radius is squared and the height is not.</p>

<h3>How to attack a solid geometry problem</h3>
<ol>
  <li>Name the solid, then write its formula before touching the numbers. Base times height for prisms and cylinders; one third of that for pyramids and cones; ${T('\\tfrac{4}{3}\\pi r^3')} for spheres.</li>
  <li>Diameter given? Halve it. Slant height given? Find the real height with Pythagoras first.</li>
  <li>Surface area: unfold it and count faces. Check for open tops.</li>
  <li>Density: mass equals density times volume, units matching.</li>
  <li>Unit conversion: convert lengths before computing, or cube the factor. Never multiply a volume by 12 to go from cubic feet to cubic inches.</li>
  <li>Check the units of your answer: cubic for volume, square for area.</li>
</ol>
`;

/* ---------- Practice set (20) ---------- */

const practice = [
  {
    id: 'b7-p01', blockId: 7, topic: 'Prisms and cylinders', difficulty: 'easy', type: 'numeric',
    prompt: `A rectangular box measures 4 by 5 by 6. Enter its volume.`,
    answer: 120,
    solution: `${D('V = l \\cdot w \\cdot h = 4 \\cdot 5 \\cdot 6 = 120')}`,
  },
  {
    id: 'b7-p02', blockId: 7, topic: 'Prisms and cylinders', difficulty: 'easy', type: 'mc',
    diagram: svgCylinder,
    prompt: `A cylinder has radius 3 and height 10. What is its volume?`,
    choices: [T('90\\pi'), T('30\\pi'), T('60\\pi'), T('180\\pi')],
    answer: 0,
    solution: `${D('V = \\pi r^2 h = \\pi (3)^2 (10) = 90\\pi')}<p>${T('60\\pi')} is ${T('2\\pi r h')}, the curved surface area. ${T('30\\pi')} forgets to square the radius.</p>`,
  },
  {
    id: 'b7-p03', blockId: 7, topic: 'Spheres', difficulty: 'easy', type: 'mc',
    prompt: `A sphere has radius 3. What is its volume?`,
    choices: [T('36\\pi'), T('12\\pi'), T('9\\pi'), T('108\\pi')],
    answer: 0,
    solution: `${D('V = \\tfrac{4}{3}\\pi r^3 = \\tfrac{4}{3}\\pi(27) = 36\\pi')}<p>${T('12\\pi')} uses ${T('r^2')} instead of ${T('r^3')}; ${T('108\\pi')} forgets the ${T('\\tfrac{1}{3}')} in ${T('\\tfrac{4}{3}')}.</p>`,
  },
  {
    id: 'b7-p04', blockId: 7, topic: 'Pyramids and cones', difficulty: 'easy', type: 'numeric',
    prompt: `A cone has radius 4 and height 6. Its volume is ${T('k\\pi')}. Enter ${T('k')}.`,
    answer: 32,
    solution: `${D('V = \\tfrac{1}{3}\\pi r^2 h = \\tfrac{1}{3}\\pi(16)(6) = 32\\pi \\;\\Rightarrow\\; k = 32')}<p>Without the ${T('\\tfrac{1}{3}')} you get ${T('96\\pi')}, the cylinder with the same base and height.</p>`,
  },
  {
    id: 'b7-p05', blockId: 7, topic: 'Surface area', difficulty: 'easy', type: 'numeric',
    prompt: `Enter the surface area of a cube with side length 5.`,
    answer: 150,
    solution: `<p>Six square faces, each ${T('5^2 = 25')}.</p>${D('SA = 6 s^2 = 6(25) = 150')}<p>125 would be the volume.</p>`,
  },
  {
    id: 'b7-p06', blockId: 7, topic: 'Density and units', difficulty: 'easy', type: 'numeric',
    prompt: `A solid block has volume ${T('40 \\text{ cm}^3')} and mass 312 grams. Enter its density in ${T('\\text{g/cm}^3')}.`,
    answer: 7.8, tolerance: 0.05,
    solution: `${D('\\text{density} = \\frac{\\text{mass}}{\\text{volume}} = \\frac{312}{40} = 7.8 \\text{ g/cm}^3')}`,
  },
  {
    id: 'b7-p07', blockId: 7, topic: 'Pyramids and cones', difficulty: 'easy', type: 'mc',
    diagram: svgPyramid,
    prompt: `A square pyramid has a base with side length 6 and a height of 5. What is its volume?`,
    choices: [T('60'), T('180'), T('30'), T('90')],
    answer: 0,
    solution: `${D('V = \\tfrac{1}{3} B h = \\tfrac{1}{3}(36)(5) = 60')}<p>180 is the prism with the same base and height (no ${T('\\tfrac{1}{3}')}); 30 halves instead of thirding.</p>`,
  },
  {
    id: 'b7-p08', blockId: 7, topic: 'Prisms and cylinders', difficulty: 'medium', type: 'mc',
    prompt: `A triangular prism has a base that is a right triangle with legs 3 and 4. The prism is 10 units long. What is its volume?`,
    choices: [T('60'), T('120'), T('30'), T('70')],
    answer: 0,
    solution: `<p>Base area first: ${T('\\tfrac{1}{2}(3)(4) = 6')}. Then base times length.</p>${D('V = 6 \\cdot 10 = 60')}<p>120 forgets the ${T('\\tfrac{1}{2}')} in the triangle's area.</p>`,
  },
  {
    id: 'b7-p09', blockId: 7, topic: 'Prisms and cylinders', difficulty: 'medium', type: 'numeric',
    prompt: `A cylinder with radius 5 has volume ${T('200\\pi')}. Enter its height.`,
    answer: 8,
    solution: `${D('\\pi(5)^2 h = 200\\pi \\;\\Rightarrow\\; 25h = 200 \\;\\Rightarrow\\; h = 8')}`,
  },
  {
    id: 'b7-p10', blockId: 7, topic: 'Surface area', difficulty: 'medium', type: 'mc',
    prompt: `A closed cylinder has radius 2 and height 7. What is its total surface area?`,
    choices: [T('36\\pi'), T('28\\pi'), T('32\\pi'), T('18\\pi')],
    answer: 0,
    solution: `<p>Two circular ends plus the unrolled side.</p>${D('SA = 2\\pi r^2 + 2\\pi r h = 2\\pi(4) + 2\\pi(2)(7) = 8\\pi + 28\\pi = 36\\pi')}<p>${T('28\\pi')} is the side only; ${T('32\\pi')} counts only one end.</p>`,
  },
  {
    id: 'b7-p11', blockId: 7, topic: 'Density and units', difficulty: 'medium', type: 'numeric',
    prompt: `A container holds 3 cubic feet. Enter its volume in cubic inches.`,
    answer: 5184,
    solution: `<p>One cubic foot is a ${T('12 \\times 12 \\times 12')} block of cubic inches.</p>${D('3 \\text{ ft}^3 = 3 \\times 1728 = 5184 \\text{ in}^3')}<p>Multiplying by 12 (giving 36) is the classic error: the factor must be cubed for volume.</p>`,
  },
  {
    id: 'b7-p12', blockId: 7, topic: 'Pyramids and cones', difficulty: 'medium', type: 'numeric',
    diagram: svgCone,
    prompt: `A cone has radius 6 and slant height 10. Its volume is ${T('k\\pi')}. Enter ${T('k')}.`,
    answer: 96,
    solution: `<p>The formula needs the vertical height, not the slant height.</p>${D('h = \\sqrt{10^2 - 6^2} = 8, \\qquad V = \\tfrac{1}{3}\\pi(36)(8) = 96\\pi \\;\\Rightarrow\\; k = 96')}<p>Using 10 as the height gives 120.</p>`,
  },
  {
    id: 'b7-p13', blockId: 7, topic: 'Spheres', difficulty: 'medium', type: 'mc',
    prompt: `A sphere has surface area ${T('100\\pi')}. What is its volume?`,
    choices: [T('\\dfrac{500\\pi}{3}'), T('500\\pi'), T('125\\pi'), T('\\dfrac{100\\pi}{3}')],
    answer: 0,
    solution: `<p>Find the radius from the surface area first.</p>${D('4\\pi r^2 = 100\\pi \\;\\Rightarrow\\; r = 5 \\;\\Rightarrow\\; V = \\tfrac{4}{3}\\pi(125) = \\frac{500\\pi}{3}')}<p>${T('500\\pi')} drops the ${T('\\tfrac{1}{3}')}; ${T('\\tfrac{100\\pi}{3}')} uses ${T('r^2')} instead of ${T('r^3')}.</p>`,
  },
  {
    id: 'b7-p14', blockId: 7, topic: 'Density and units', difficulty: 'medium', type: 'numeric',
    prompt: `A solid steel rod is a cylinder with radius 1 cm and length 20 cm. Steel has density ${T('7.9 \\text{ g/cm}^3')}. Enter the mass of the rod in grams, rounded to the nearest gram.`,
    answer: 496, tolerance: 1.5,
    solution: `<p>Volume first, then mass equals density times volume.</p>${D('V = \\pi(1)^2(20) = 20\\pi \\approx 62.83 \\text{ cm}^3, \\qquad m = 7.9 \\times 62.83 \\approx 496 \\text{ g}')}`,
  },
  {
    id: 'b7-p15', blockId: 7, topic: 'Prisms and cylinders', difficulty: 'hard', type: 'numeric',
    diagram: svgBox,
    prompt: `A rectangular box measures 3 by 4 by 12. Enter the length of the longest straight rod that fits inside it (corner to opposite corner).`,
    answer: 13,
    solution: `<p>The space diagonal is Pythagoras twice: across the floor, then up.</p>${D('d = \\sqrt{3^2 + 4^2 + 12^2} = \\sqrt{9 + 16 + 144} = \\sqrt{169} = 13')}<p>Step by step: the floor diagonal is ${T('\\sqrt{9 + 16} = 5')}, and then ${T('\\sqrt{5^2 + 12^2} = 13')}.</p>`,
  },
  {
    id: 'b7-p16', blockId: 7, topic: 'Density and units', difficulty: 'hard', type: 'numeric',
    prompt: `A rectangular tank is 2 meters long, 1.5 meters wide and 1 meter deep. Water flows in at 25 liters per minute. Enter the number of minutes needed to fill the empty tank. (1 cubic meter is 1000 liters.)`,
    answer: 120,
    solution: `${D('V = 2 \\times 1.5 \\times 1 = 3 \\text{ m}^3 = 3000 \\text{ L}')}${D('\\text{time} = \\frac{3000}{25} = 120 \\text{ minutes}')}`,
  },
  {
    id: 'b7-p17', blockId: 7, topic: 'Pyramids and cones', difficulty: 'hard', type: 'mc',
    prompt: `The radius of a cone is doubled and its height is halved. What happens to its volume?`,
    choices: [`It doubles.`, `It stays the same.`, `It becomes four times as large.`, `It is halved.`],
    answer: 0,
    solution: `<p>Put the changes into the formula.</p>${D('\\tfrac{1}{3}\\pi (2r)^2 \\left(\\tfrac{h}{2}\\right) = \\tfrac{1}{3}\\pi \\cdot 4r^2 \\cdot \\tfrac{h}{2} = 2 \\cdot \\tfrac{1}{3}\\pi r^2 h')}<p>The radius is squared, so doubling it multiplies by 4; halving the height divides by 2. Net factor 2. "Stays the same" is the trap for anyone who thinks the changes cancel.</p>`,
  },
  {
    id: 'b7-p18', blockId: 7, topic: 'Spheres', difficulty: 'hard', type: 'numeric',
    prompt: `A sphere fits exactly inside a cube with side length 6, touching all six faces. Enter the volume of the space inside the cube that is not taken up by the sphere, rounded to one decimal place.`,
    answer: 102.9, tolerance: 0.2,
    solution: `<p>The sphere touches opposite faces, so its diameter is 6 and its radius is 3.</p>${D('V_{\\text{cube}} - V_{\\text{sphere}} = 6^3 - \\tfrac{4}{3}\\pi(3)^3 = 216 - 36\\pi \\approx 216 - 113.1 = 102.9')}`,
  },
  {
    id: 'b7-p19', blockId: 7, topic: 'Density and units', difficulty: 'hard', type: 'mc',
    prompt: `Aluminum has a density of ${T('2.7 \\text{ g/cm}^3')}. What is its density in ${T('\\text{kg/m}^3')}?`,
    choices: [T('2700'), T('2.7'), T('270'), T('2{,}700{,}000')],
    answer: 0,
    solution: `<p>There are ${T('1{,}000{,}000 \\text{ cm}^3')} in a cubic meter, so one cubic meter of aluminum has mass ${T('2.7 \\times 1{,}000{,}000 = 2{,}700{,}000')} grams. Divide by 1000 to get kilograms: 2700.</p>${D('2.7 \\text{ g/cm}^3 = 2700 \\text{ kg/m}^3')}<p>Sanity check: water is ${T('1 \\text{ g/cm}^3 = 1000 \\text{ kg/m}^3')}, and aluminum is 2.7 times denser.</p>`,
  },
  {
    id: 'b7-p20', blockId: 7, topic: 'Surface area', difficulty: 'hard', type: 'numeric',
    prompt: `A square pyramid has a base with side length 10 and a slant height of 13. Enter its total surface area (base included).`,
    answer: 360,
    solution: `<p>Base plus four triangular faces. Each triangle has base 10 and height equal to the slant height 13.</p>${D('SA = 10^2 + 4 \\cdot \\tfrac{1}{2}(10)(13) = 100 + 260 = 360')}<p>For the <em>volume</em> you would need the vertical height instead: ${T('\\sqrt{13^2 - 5^2} = 12')}, giving ${T('\\tfrac{1}{3}(100)(12) = 400')}. Surface area is the one that uses the slant height.</p>`,
  },
];

/* ---------- No checkpoint in Block 7 (per the plan) ---------- */

const checkpoint = [];

export default { lesson, practice, checkpoint };
