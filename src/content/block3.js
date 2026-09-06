// Block 3: Triangles II. Congruence (concept level), similarity, scale factors.
// All questions original. Math in data-tex attributes (KaTeX).

const T = (s) => `<span data-tex="${s}"></span>`;
const D = (s) => `<div data-tex-display="${s}"></div>`;

/* ---------- Diagrams ---------- */

// Two congruent triangles with matching tick marks (drawn to scale: same shape and size).
const svgCongruent = `<svg viewBox="0 0 360 170" width="360" height="170" role="img" aria-label="Two congruent triangles ABC and DEF with matching tick marks on corresponding sides">
  <polygon points="20,140 140,140 60,40" fill="none" stroke="currentColor" stroke-width="2"/>
  <polygon points="200,140 320,140 240,40" fill="none" stroke="currentColor" stroke-width="2"/>
  <!-- tick marks: AB one tick, BC two ticks, CA three ticks (and same on DEF) -->
  <line x1="78" y1="135" x2="82" y2="145" stroke="currentColor" stroke-width="2"/>
  <line x1="258" y1="135" x2="262" y2="145" stroke="currentColor" stroke-width="2"/>
  <line x1="98" y1="86" x2="108" y2="94" stroke="currentColor" stroke-width="2"/>
  <line x1="102" y1="82" x2="112" y2="90" stroke="currentColor" stroke-width="2"/>
  <line x1="278" y1="86" x2="288" y2="94" stroke="currentColor" stroke-width="2"/>
  <line x1="282" y1="82" x2="292" y2="90" stroke="currentColor" stroke-width="2"/>
  <line x1="36" y1="94" x2="46" y2="98" stroke="currentColor" stroke-width="2"/>
  <line x1="38" y1="88" x2="48" y2="92" stroke="currentColor" stroke-width="2"/>
  <line x1="40" y1="82" x2="50" y2="86" stroke="currentColor" stroke-width="2"/>
  <line x1="216" y1="94" x2="226" y2="98" stroke="currentColor" stroke-width="2"/>
  <line x1="218" y1="88" x2="228" y2="92" stroke="currentColor" stroke-width="2"/>
  <line x1="220" y1="82" x2="230" y2="86" stroke="currentColor" stroke-width="2"/>
  <text x="10" y="158" font-size="13" fill="currentColor">A</text>
  <text x="136" y="158" font-size="13" fill="currentColor">B</text>
  <text x="54" y="32" font-size="13" fill="currentColor">C</text>
  <text x="190" y="158" font-size="13" fill="currentColor">D</text>
  <text x="316" y="158" font-size="13" fill="currentColor">E</text>
  <text x="234" y="32" font-size="13" fill="currentColor">F</text>
</svg>`;

// Triangle ABC with DE parallel to BC. Labels: [AD, DB, AE, EC, DE, BC]. Drawn to scale for AD:DB = 2:3.
const svgParallel = (l, note = '') => `<svg viewBox="0 0 320 230" width="320" height="230" role="img" aria-label="Triangle ABC with point D on side AB and point E on side AC, segment DE parallel to BC">
  <polygon points="150,30 40,200 300,200" fill="none" stroke="currentColor" stroke-width="2"/>
  <line x1="106" y1="98" x2="210" y2="98" stroke="currentColor" stroke-width="2"/>
  <!-- parallel arrows on DE and BC -->
  <polyline points="152,93 160,98 152,103" fill="none" stroke="currentColor" stroke-width="1.5"/>
  <polyline points="166,195 174,200 166,205" fill="none" stroke="currentColor" stroke-width="1.5"/>
  <text x="150" y="22" text-anchor="middle" font-size="13" fill="currentColor">A</text>
  <text x="28" y="214" font-size="13" fill="currentColor">B</text>
  <text x="298" y="214" font-size="13" fill="currentColor">C</text>
  <text x="92" y="102" font-size="13" fill="currentColor">D</text>
  <text x="216" y="102" font-size="13" fill="currentColor">E</text>
  <text x="112" y="62" text-anchor="end" font-size="13" fill="currentColor">${l[0]}</text>
  <text x="62" y="156" text-anchor="end" font-size="13" fill="currentColor">${l[1]}</text>
  <text x="190" y="62" font-size="13" fill="currentColor">${l[2]}</text>
  <text x="268" y="156" font-size="13" fill="currentColor">${l[3]}</text>
  <text x="158" y="116" text-anchor="middle" font-size="13" fill="currentColor">${l[4]}</text>
  <text x="170" y="220" text-anchor="middle" font-size="13" fill="currentColor">${l[5]}</text>
  ${note ? `<text x="316" y="228" text-anchor="end" font-size="11" fill="currentColor">${note}</text>` : ''}
</svg>`;

// Bow-tie: AB parallel to CD, segments AD and BC crossing at E. Drawn to scale for AB:CD = 2:3.
const svgBowtie = (l) => `<svg viewBox="0 0 260 230" width="260" height="230" role="img" aria-label="Segments AD and BC cross at point E. AB is parallel to CD, forming two triangles that share the vertex E">
  <line x1="80" y1="50" x2="160" y2="50" stroke="currentColor" stroke-width="2"/>
  <line x1="60" y1="190" x2="180" y2="190" stroke="currentColor" stroke-width="2"/>
  <line x1="80" y1="50" x2="180" y2="190" stroke="currentColor" stroke-width="2"/>
  <line x1="160" y1="50" x2="60" y2="190" stroke="currentColor" stroke-width="2"/>
  <polyline points="116,45 124,50 116,55" fill="none" stroke="currentColor" stroke-width="1.5"/>
  <polyline points="116,185 124,190 116,195" fill="none" stroke="currentColor" stroke-width="1.5"/>
  <circle cx="120" cy="106" r="3" fill="currentColor"/>
  <text x="66" y="44" font-size="13" fill="currentColor">A</text>
  <text x="164" y="44" font-size="13" fill="currentColor">B</text>
  <text x="46" y="206" font-size="13" fill="currentColor">C</text>
  <text x="182" y="206" font-size="13" fill="currentColor">D</text>
  <text x="128" y="104" font-size="13" fill="currentColor">E</text>
  <text x="120" y="36" text-anchor="middle" font-size="13" fill="currentColor">${l[0]}</text>
  <text x="120" y="212" text-anchor="middle" font-size="13" fill="currentColor">${l[1]}</text>
  <text x="86" y="86" text-anchor="end" font-size="13" fill="currentColor">${l[2]}</text>
  <text x="162" y="156" font-size="13" fill="currentColor">${l[3]}</text>
</svg>`;

// Right triangle ACB (right angle at C) with altitude CD to the hypotenuse. Drawn to scale for AD = 4, DB = 9, CD = 6.
const svgAltitude = `<svg viewBox="0 0 320 200" width="320" height="200" role="img" aria-label="Right triangle with the right angle at C on top and hypotenuse AB along the bottom; altitude from C meets AB at D">
  <polygon points="30,170 290,170 110,50" fill="none" stroke="currentColor" stroke-width="2"/>
  <line x1="110" y1="50" x2="110" y2="170" stroke="currentColor" stroke-width="1.5" stroke-dasharray="5 4"/>
  <rect x="110" y="156" width="12" height="14" fill="none" stroke="currentColor" stroke-width="1.2"/>
  <path d="M 103.3 60 L 113.3 66.7 L 120 56.7" fill="none" stroke="currentColor" stroke-width="1.2"/>
  <text x="18" y="186" font-size="13" fill="currentColor">A</text>
  <text x="288" y="186" font-size="13" fill="currentColor">B</text>
  <text x="104" y="42" font-size="13" fill="currentColor">C</text>
  <text x="104" y="186" font-size="13" fill="currentColor">D</text>
  <text x="70" y="188" text-anchor="middle" font-size="13" fill="currentColor">4</text>
  <text x="200" y="188" text-anchor="middle" font-size="13" fill="currentColor">9</text>
  <text x="122" y="118" font-size="13" fill="currentColor">h</text>
</svg>`;

// Triangle ABC with D on AB and E on AC where angle ADE equals angle ACB (the "flipped" similar triangle).
// Drawn to scale for AD = 4, AE = 6, AC = 12, AB = 18.
const svgFlip = `<svg viewBox="0 0 280 190" width="280" height="190" role="img" aria-label="Triangle ABC with D on AB and E on AC. Segment DE is drawn. Angle ADE is marked equal to angle ACB with single arcs. Not drawn parallel to BC.">
  <polygon points="150,30 78,155 208,107" fill="none" stroke="currentColor" stroke-width="2"/>
  <line x1="134" y1="58" x2="179" y2="68" stroke="currentColor" stroke-width="2"/>
  <path d="M 139 49.3 A 10 10 0 0 1 143.8 60.2" fill="none" stroke="currentColor" stroke-width="1.3"/>
  <path d="M 200.8 97.4 A 12 12 0 0 0 196.7 111.2" fill="none" stroke="currentColor" stroke-width="1.3"/>
  <text x="150" y="22" text-anchor="middle" font-size="13" fill="currentColor">A</text>
  <text x="64" y="168" font-size="13" fill="currentColor">B</text>
  <text x="214" y="112" font-size="13" fill="currentColor">C</text>
  <text x="118" y="64" font-size="13" fill="currentColor">D</text>
  <text x="182" y="80" font-size="13" fill="currentColor">E</text>
  <text x="132" y="44" text-anchor="end" font-size="12" fill="currentColor">4</text>
  <text x="170" y="46" font-size="12" fill="currentColor">6</text>
  <text x="204" y="84" font-size="12" fill="currentColor">6</text>
  <text x="96" y="110" text-anchor="end" font-size="12" fill="currentColor">?</text>
</svg>`;

/* ---------- Lesson ---------- */

const lesson = `
<p>Block 2 was about one triangle at a time. This block is about two triangles at once: when are they the same, when are they the same <em>shape</em>, and how do you use that to find a missing length. Similar triangles are the tool behind shadow problems, map scales, and, in Block 4, all of trigonometry.</p>

<h3>1. Congruent triangles: same shape, same size</h3>
<p>Two triangles are <strong>congruent</strong> (symbol ${T('\\cong')}) if one can be placed exactly on top of the other, possibly after flipping or turning it. All three pairs of sides match and all three pairs of angles match. The parts that match are called <strong>corresponding parts</strong>.</p>
<figure class="q-diagram">${svgCongruent}</figure>
<p>The order of the letters is the whole message. Writing ${T('\\triangle ABC \\cong \\triangle DEF')} says that ${T('A')} matches ${T('D')}, ${T('B')} matches ${T('E')} and ${T('C')} matches ${T('F')}. So ${T('AB = DE')}, ${T('BC = EF')}, ${T('CA = FD')}, and ${T('\\angle A = \\angle D')}, and so on. Never read the letters loosely; ${T('\\triangle ABC \\cong \\triangle EFD')} would mean something different.</p>
<p>You do not need all six facts to know two triangles are congruent. Any one of these <strong>shortcuts</strong> is enough:</p>
<ul>
  <li><strong>SSS</strong>: three sides equal to three sides.</li>
  <li><strong>SAS</strong>: two sides and the angle <em>between</em> them.</li>
  <li><strong>ASA</strong>: two angles and the side <em>between</em> them.</li>
  <li><strong>AAS</strong>: two angles and a side not between them (works because the third angle is forced by the ${T('180^\\circ')} sum).</li>
  <li><strong>HL</strong>: right triangles only, hypotenuse and one leg (this is SSA that happens to work, because the right angle fixes everything).</li>
</ul>
<p>Two combinations do <strong>not</strong> work. <strong>AAA</strong> (three angles) gives the same shape but not the same size: a small and a large equilateral triangle share all their angles. <strong>SSA</strong> (two sides and an angle not between them) can fit two different triangles, so it proves nothing. Tests like to offer SSA as a trap.</p>

<p><strong>Worked example 1.</strong> ${T('\\triangle PQR \\cong \\triangle XYZ')}. ${T('PQ = 7')}, ${T('QR = 11')}, ${T('\\angle P = 40^\\circ')}, ${T('\\angle Q = 65^\\circ')}. Find ${T('YZ')} and ${T('\\angle Z')}.</p>
<p>Match letters by position: ${T('Q \\to Y')}, ${T('R \\to Z')}, so ${T('YZ = QR = 11')}. ${T('\\angle Z')} matches ${T('\\angle R = 180 - 40 - 65 = 75^\\circ')}. Notice that ${T('PQ = 7')} was not needed; tests include extra numbers on purpose.</p>

<h3>2. Similar triangles: same shape, any size</h3>
<p>Two triangles are <strong>similar</strong> (symbol ${T('\\sim')}) if one is an enlarged or shrunk copy of the other. Two things are true at once:</p>
<ul>
  <li>Corresponding <strong>angles are equal</strong>.</li>
  <li>Corresponding <strong>sides are proportional</strong>: every side of the second triangle is the matching side of the first multiplied by the same number, the <strong>scale factor</strong> ${T('k')}.</li>
</ul>
${D('\\triangle ABC \\sim \\triangle DEF \\quad\\Longrightarrow\\quad \\frac{DE}{AB} = \\frac{EF}{BC} = \\frac{FD}{CA} = k')}
<p>The shortcut you will use nearly every time is <strong>AA</strong>: if two angles of one triangle equal two angles of another, the triangles are similar. (The third angles must match too, since all three add to ${T('180^\\circ')}.) There are also SSS similarity (all three side ratios equal) and SAS similarity (two side ratios equal and the included angles equal), but AA does most of the work on tests.</p>

<p><strong>How to set up the ratio without mistakes.</strong> Corresponding sides sit across from corresponding angles. Find a pair of equal angles; the sides opposite them are a matching pair. Then write each fraction as <em>big triangle over small triangle</em> (or small over big, as long as every fraction goes the same way).</p>

<p><strong>Worked example 2.</strong> ${T('\\triangle ABC \\sim \\triangle DEF')} with ${T('AB = 6')}, ${T('BC = 8')}, ${T('DE = 15')}. Find ${T('EF')}.</p>
<p>${T('AB')} matches ${T('DE')} (first two letters of each), and ${T('BC')} matches ${T('EF')}. Scale factor from the first triangle to the second: ${T('k = 15/6 = 2.5')}. So ${T('EF = 8 \\cdot 2.5 = 20')}. As a proportion: ${T('\\dfrac{EF}{8} = \\dfrac{15}{6}')}, cross-multiply, ${T('6 \\cdot EF = 120')}, ${T('EF = 20')}.</p>

<h3>3. The two pictures that hide similar triangles</h3>
<p><strong>Picture 1: a line parallel to one side.</strong> In triangle ${T('ABC')}, draw ${T('DE')} parallel to ${T('BC')}. Then ${T('\\angle ADE = \\angle ABC')} and ${T('\\angle AED = \\angle ACB')} (corresponding angles, Block 1), so ${T('\\triangle ADE \\sim \\triangle ABC')} by AA. The small triangle at the top is a shrunk copy of the whole triangle.</p>
<figure class="q-diagram">${svgParallel(['AD', 'DB', 'AE', 'EC', 'DE', 'BC'])}</figure>
<p>Two different proportions come out of this picture, and mixing them up is the number one error in this block.</p>
<ul>
  <li><strong>Whole triangle to small triangle:</strong> ${T('\\dfrac{AD}{AB} = \\dfrac{AE}{AC} = \\dfrac{DE}{BC}')}. Note ${T('AB')} is the <em>whole</em> side, ${T('AD + DB')}, not the piece ${T('DB')}.</li>
  <li><strong>Piece to piece (the side-splitter rule):</strong> ${T('\\dfrac{AD}{DB} = \\dfrac{AE}{EC}')}. A parallel line cuts the two sides in the same ratio. This ratio does <em>not</em> extend to ${T('DE/BC')}; the parallel segments are only in the whole-to-small proportion.</li>
</ul>

<p><strong>Worked example 3.</strong> In the figure, ${T('AD = 6')}, ${T('DB = 4')}, ${T('DE = 9')}. Find ${T('BC')}.</p>
<p>${T('DE')} and ${T('BC')} are the parallel pair, so use whole-to-small: ${T('\\dfrac{DE}{BC} = \\dfrac{AD}{AB} = \\dfrac{6}{10}')}. Then ${T('\\dfrac{9}{BC} = \\dfrac{6}{10}')}, so ${T('6 \\cdot BC = 90')} and ${T('BC = 15')}. Using ${T('6/4')} instead of ${T('6/10')} gives 6, the classic wrong answer.</p>

<p><strong>Picture 2: the bow-tie.</strong> When ${T('AB \\parallel CD')} and segments ${T('AD')} and ${T('BC')} cross at ${T('E')}, the two triangles ${T('ABE')} and ${T('DCE')} are similar: the angles at ${T('E')} are vertical (equal), and ${T('\\angle A = \\angle D')} are alternate interior angles. The two triangles point in opposite directions, so match carefully: ${T('A \\to D')}, ${T('B \\to C')}, ${T('E \\to E')}.</p>
<figure class="q-diagram">${svgBowtie(['AB', 'CD', 'AE', 'ED'])}</figure>
${D('\\frac{AB}{DC} = \\frac{AE}{DE} = \\frac{BE}{CE}')}

<p><strong>Indirect measurement (shadows).</strong> At the same moment, the sun's rays hit everything at the same angle, so a person and their shadow form a right triangle similar to the one formed by a tree and its shadow. <strong>Worked example 4.</strong> A 5-foot person casts a 3-foot shadow while a flagpole casts a 21-foot shadow. Height of the pole? ${T('\\dfrac{\\text{pole}}{21} = \\dfrac{5}{3}')}, so pole ${T('= 35')} feet. Always pair height with height and shadow with shadow.</p>

<h3>4. Scale factors for lengths, areas and volumes</h3>
<p>If every length is multiplied by ${T('k')}, then:</p>
${D('\\text{lengths} \\times k, \\qquad \\text{areas} \\times k^2, \\qquad \\text{volumes} \\times k^3')}
<p>Why: area is a length times a length (base times height), so it picks up two factors of ${T('k')}; volume is three lengths multiplied, so three factors. Perimeter is a plain length and scales by ${T('k')}. This applies to any similar figures, not only triangles: two squares, two circles, two boxes.</p>
<p><strong>Worked example 5.</strong> Two similar triangles have sides in the ratio ${T('2 : 5')}. The smaller has area 12. Area of the larger?</p>
<p>${T('k = 5/2')}, so areas are in the ratio ${T('k^2 = 25/4')}. Larger area ${T('= 12 \\cdot 25/4 = 75')}.</p>
<p><strong>Worked example 6 (backwards).</strong> The areas of two similar triangles are 36 and 100. The smaller has perimeter 30. Perimeter of the larger?</p>
<p>Area ratio ${T('100/36')}, so the length ratio is the square root: ${T('k = 10/6 = 5/3')}. Perimeter ${T('= 30 \\cdot 5/3 = 50')}. Going from area to length means taking a square root; going from length to area means squaring.</p>

<h3>5. Bonus picture: the altitude in a right triangle</h3>
<p>Draw the altitude from the right angle of a right triangle to the hypotenuse. It splits the triangle into two smaller right triangles, and all three triangles are similar to each other (each small one shares an acute angle with the big one, plus a right angle: AA). One consequence is worth knowing:</p>
<figure class="q-diagram">${svgAltitude}</figure>
${D('h^2 = AD \\cdot DB \\qquad\\text{(the altitude is the geometric mean of the two pieces)}')}
<p>In the figure ${T('h^2 = 4 \\cdot 9 = 36')}, so ${T('h = 6')}. It comes from ${T('\\triangle ADC \\sim \\triangle CDB')}: ${T('\\dfrac{AD}{h} = \\dfrac{h}{DB}')}.</p>

<h3>How to attack a similarity problem</h3>
<ol>
  <li>Decide which two triangles are involved. Redraw them separately, both pointing the same way, if the picture overlaps.</li>
  <li>Match the vertices using equal angles (parallel lines and vertical angles are the usual sources).</li>
  <li>Write one proportion, big over small on both sides. Use whole sides unless the problem is explicitly piece-to-piece.</li>
  <li>Cross-multiply and solve. For areas use ${T('k^2')}, for volumes ${T('k^3')}.</li>
</ol>
`;

/* ---------- Practice set (20) ---------- */

const practice = [
  {
    id: 'b3-p01', blockId: 3, topic: 'Congruent triangles', difficulty: 'easy', type: 'mc',
    prompt: `${T('\\triangle ABC \\cong \\triangle XYZ')}. ${T('AB = 7')}, ${T('BC = 9')} and ${T('CA = 12')}. What is ${T('YZ')}?`,
    choices: [T('9'), T('7'), T('12'), 'Cannot be determined'],
    answer: 0,
    solution: `<p>Match letters by position: ${T('B \\to Y')} and ${T('C \\to Z')}, so ${T('YZ')} corresponds to ${T('BC')}.</p>${D('YZ = BC = 9')}<p>Congruent triangles have equal corresponding sides, so the value is fully determined.</p>`,
  },
  {
    id: 'b3-p02', blockId: 3, topic: 'Congruent triangles', difficulty: 'easy', type: 'mc',
    prompt: `Two triangles have two pairs of equal sides, and the angles <em>between</em> those sides are also equal. Which shortcut proves the triangles congruent?`,
    choices: ['SAS', 'SSA', 'ASA', 'AAA'],
    answer: 0,
    solution: `<p>Two sides with the included angle is <strong>SAS</strong>.</p><p>SSA (angle not between the sides) is not a valid shortcut. ASA needs two angles. AAA gives similarity, not congruence.</p>`,
  },
  {
    id: 'b3-p03', blockId: 3, topic: 'Similar triangles', difficulty: 'easy', type: 'numeric',
    prompt: `${T('\\triangle ABC \\sim \\triangle DEF')}. ${T('AB = 4')}, ${T('DE = 10')} and ${T('BC = 6')}. Enter the length of ${T('EF')}.`,
    answer: 15,
    solution: `<p>${T('AB')} matches ${T('DE')}, so the scale factor is ${T('10/4 = 2.5')}. ${T('BC')} matches ${T('EF')}.</p>${D('EF = 6 \\cdot 2.5 = 15')}`,
  },
  {
    id: 'b3-p04', blockId: 3, topic: 'Similar triangles', difficulty: 'easy', type: 'mc',
    prompt: `One triangle has angles ${T('40^\\circ')}, ${T('60^\\circ')} and ${T('80^\\circ')}. Another has angles ${T('80^\\circ')}, ${T('40^\\circ')} and ${T('60^\\circ')}. Which statement is true?`,
    choices: ['They are similar by AA', 'They are similar only if a pair of sides is equal', 'They are not similar because the angles are listed in a different order', 'They must be congruent'],
    answer: 0,
    solution: `<p>Both triangles have the same three angles. Two matching pairs are enough for <strong>AA similarity</strong>; the order they are listed in is irrelevant.</p><p>Equal angles say nothing about size, so congruence cannot be concluded.</p>`,
  },
  {
    id: 'b3-p05', blockId: 3, topic: 'Similar triangles', difficulty: 'easy', type: 'numeric',
    prompt: `${T('\\triangle PQR \\sim \\triangle STU')}. ${T('\\angle P = 35^\\circ')} and ${T('\\angle Q = 80^\\circ')}. Enter the measure of ${T('\\angle U')}, in degrees.`,
    answer: 65,
    solution: `<p>${T('U')} is the third letter, so it matches ${T('R')}. Similar triangles have equal corresponding angles.</p>${D('\\angle U = \\angle R = 180 - 35 - 80 = 65^\\circ')}`,
  },
  {
    id: 'b3-p06', blockId: 3, topic: 'Scale factors', difficulty: 'easy', type: 'mc',
    prompt: `Every side of a triangle is multiplied by 3. By what factor is its area multiplied?`,
    choices: [T('9'), T('3'), T('6'), T('27')],
    answer: 0,
    solution: `<p>Area is a length times a length, so it picks up the scale factor twice.</p>${D('k^2 = 3^2 = 9')}<p>3 would be the factor for perimeter; 27 would be the factor for volume.</p>`,
  },
  {
    id: 'b3-p07', blockId: 3, topic: 'Similar triangles', difficulty: 'easy', type: 'numeric',
    prompt: `A triangle has sides 5, 7 and 9. A similar triangle has shortest side 15. Enter the length of its longest side.`,
    answer: 27,
    solution: `<p>Shortest matches shortest: ${T('k = 15/5 = 3')}. Longest matches longest.</p>${D('9 \\cdot 3 = 27')}`,
  },
  {
    id: 'b3-p08', blockId: 3, topic: 'Similar triangles', difficulty: 'medium', type: 'mc',
    prompt: `A 5-foot-tall person casts a 2-foot shadow. At the same moment a tree casts a 14-foot shadow. How tall is the tree, in feet?`,
    choices: [T('35'), T('5.6'), T('17'), T('28')],
    answer: 0,
    solution: `<p>The sun's angle is the same for both, so the two right triangles are similar. Pair height with height, shadow with shadow.</p>${D('\\frac{\\text{tree}}{14} = \\frac{5}{2} \\;\\Rightarrow\\; \\text{tree} = 35')}<p>5.6 comes from flipping one ratio (${T('14 \\cdot 2 / 5')}). 17 adds instead of scaling.</p>`,
  },
  {
    id: 'b3-p09', blockId: 3, topic: 'Similar triangles', difficulty: 'medium', type: 'mc',
    diagram: svgParallel(['4', '6', '6', 'x', '', '']),
    prompt: `In the figure, ${T('DE \\parallel BC')}. ${T('AD = 4')}, ${T('DB = 6')} and ${T('AE = 6')}. What is ${T('EC')}?`,
    choices: [T('9'), T('4'), T('15'), T('6')],
    answer: 0,
    solution: `<p>A line parallel to one side splits the other two sides in the same ratio (side-splitter).</p>${D('\\frac{AD}{DB} = \\frac{AE}{EC} \\;\\Rightarrow\\; \\frac{4}{6} = \\frac{6}{EC} \\;\\Rightarrow\\; 4 \\cdot EC = 36 \\;\\Rightarrow\\; EC = 9')}<p>15 is the whole side ${T('AC')} (from ${T('AD/AB = AE/AC')}), not the piece asked for. Subtracting 6 from it also gives 9.</p>`,
  },
  {
    id: 'b3-p10', blockId: 3, topic: 'Similar triangles', difficulty: 'medium', type: 'numeric',
    diagram: svgParallel(['5', '10', '', '', '4', '?'], 'Not drawn to scale'),
    prompt: `In the figure, ${T('DE \\parallel BC')}. ${T('AD = 5')}, ${T('DB = 10')} and ${T('DE = 4')}. Enter the length of ${T('BC')}.`,
    answer: 12,
    solution: `<p>${T('DE')} and ${T('BC')} are the parallel pair, so use the whole side ${T('AB = 5 + 10 = 15')}, not the piece ${T('DB')}.</p>${D('\\frac{DE}{BC} = \\frac{AD}{AB} \\;\\Rightarrow\\; \\frac{4}{BC} = \\frac{5}{15} \\;\\Rightarrow\\; BC = 12')}<p>Using ${T('5/10')} gives 8, the most common wrong answer.</p>`,
  },
  {
    id: 'b3-p11', blockId: 3, topic: 'Scale factors', difficulty: 'medium', type: 'mc',
    prompt: `Two similar triangles have perimeters 24 and 36. The shortest side of the smaller triangle is 6. What is the shortest side of the larger triangle?`,
    choices: [T('9'), T('18'), T('4'), T('12')],
    answer: 0,
    solution: `<p>Perimeter is a length, so it scales by ${T('k')} directly.</p>${D('k = \\frac{36}{24} = \\frac{3}{2} \\;\\Rightarrow\\; 6 \\cdot \\frac{3}{2} = 9')}<p>18 is the difference of the perimeters and 12 is twice 6; neither is a scaling.</p>`,
  },
  {
    id: 'b3-p12', blockId: 3, topic: 'Scale factors', difficulty: 'medium', type: 'numeric',
    prompt: `The areas of two similar triangles are 16 and 49. Enter the ratio of a side of the smaller triangle to the corresponding side of the larger, as a fraction or decimal.`,
    answer: 4 / 7,
    solution: `<p>Area ratio is ${T('k^2')}, so the length ratio is the square root.</p>${D('\\sqrt{\\frac{16}{49}} = \\frac{4}{7} \\approx 0.571')}`,
  },
  {
    id: 'b3-p13', blockId: 3, topic: 'Congruent triangles', difficulty: 'medium', type: 'mc',
    prompt: `Two triangles have all three pairs of angles equal. Which statement <em>must</em> be true?`,
    choices: ['They are similar, but not necessarily congruent', 'They are congruent', 'Their corresponding sides are equal', 'Their perimeters are equal'],
    answer: 0,
    solution: `<p>Three equal angles (AAA) fix the shape but not the size: think of a small and a large equilateral triangle. So the triangles are similar, and congruence would need at least one matching side.</p>`,
  },
  {
    id: 'b3-p14', blockId: 3, topic: 'Scale factors', difficulty: 'medium', type: 'numeric',
    prompt: `Two similar triangles have a scale factor of ${T('2 : 5')}. The larger has area 75. Enter the area of the smaller.`,
    answer: 12,
    solution: `<p>Areas scale by ${T('k^2 = (2/5)^2 = 4/25')}.</p>${D('75 \\cdot \\frac{4}{25} = 12')}<p>Using ${T('2/5')} instead of ${T('4/25')} gives 30, the trap.</p>`,
  },
  {
    id: 'b3-p15', blockId: 3, topic: 'Scale factors', difficulty: 'hard', type: 'mc',
    prompt: `Two similar solids have corresponding lengths in the ratio ${T('2 : 3')}. The smaller solid has volume 40. What is the volume of the larger?`,
    choices: [T('135'), T('60'), T('90'), T('270')],
    answer: 0,
    solution: `<p>Volume scales by ${T('k^3')}.</p>${D('40 \\cdot \\left(\\frac{3}{2}\\right)^3 = 40 \\cdot \\frac{27}{8} = 135')}<p>60 uses ${T('k')} and 90 uses ${T('k^2')}; both are one power short.</p>`,
  },
  {
    id: 'b3-p16', blockId: 3, topic: 'Similar triangles', difficulty: 'hard', type: 'mc',
    diagram: svgAltitude,
    prompt: `In right triangle ${T('ACB')}, the right angle is at ${T('C')} and ${T('CD')} is the altitude to the hypotenuse. ${T('AD = 4')} and ${T('DB = 9')}. What is ${T('h = CD')}?`,
    choices: [T('6'), T('6.5'), T('13'), T('\\sqrt{13}')],
    answer: 0,
    solution: `<p>The altitude creates two right triangles similar to each other: ${T('\\triangle ADC \\sim \\triangle CDB')}. Matching the legs:</p>${D('\\frac{AD}{CD} = \\frac{CD}{DB} \\;\\Rightarrow\\; h^2 = 4 \\cdot 9 = 36 \\;\\Rightarrow\\; h = 6')}<p>6.5 is half the hypotenuse (the median, not the altitude). 13 is the whole hypotenuse.</p>`,
  },
  {
    id: 'b3-p17', blockId: 3, topic: 'Similar triangles', difficulty: 'hard', type: 'numeric',
    diagram: svgBowtie(['8', '12', '6', '?']),
    prompt: `In the figure, ${T('AB \\parallel CD')} and segments ${T('AD')} and ${T('BC')} cross at ${T('E')}. ${T('AB = 8')}, ${T('CD = 12')} and ${T('AE = 6')}. Enter the length of ${T('ED')}.`,
    answer: 9,
    solution: `<p>${T('\\triangle ABE \\sim \\triangle DCE')}: vertical angles at ${T('E')}, alternate interior angles at ${T('A')} and ${T('D')}. Match ${T('A \\to D')}, ${T('B \\to C')}.</p>${D('\\frac{AE}{DE} = \\frac{AB}{DC} \\;\\Rightarrow\\; \\frac{6}{DE} = \\frac{8}{12} \\;\\Rightarrow\\; 8 \\cdot DE = 72 \\;\\Rightarrow\\; DE = 9')}<p>Matching ${T('A')} with ${T('C')} instead gives 4, which is wrong because the triangles point in opposite directions.</p>`,
  },
  {
    id: 'b3-p18', blockId: 3, topic: 'Similar triangles', difficulty: 'hard', type: 'mc',
    prompt: `${T('\\triangle ABC \\sim \\triangle DEF')}. ${T('AB = x + 2')}, ${T('DE = 12')}, ${T('BC = 6')} and ${T('EF = 9')}. What is ${T('x')}?`,
    choices: [T('6'), T('8'), T('4'), T('10')],
    answer: 0,
    solution: `<p>${T('AB \\leftrightarrow DE')} and ${T('BC \\leftrightarrow EF')}.</p>${D('\\frac{x + 2}{12} = \\frac{6}{9} \\;\\Rightarrow\\; 9(x + 2) = 72 \\;\\Rightarrow\\; x + 2 = 8 \\;\\Rightarrow\\; x = 6')}<p>8 is ${T('AB')} itself, not ${T('x')}. Answer the question asked.</p>`,
  },
  {
    id: 'b3-p19', blockId: 3, topic: 'Scale factors', difficulty: 'hard', type: 'numeric',
    prompt: `The areas of two similar triangles are in the ratio ${T('9 : 25')}. The perimeter of the larger triangle is 40. Enter the perimeter of the smaller triangle.`,
    answer: 24,
    solution: `<p>From areas to lengths, take the square root: ${T('k = \\sqrt{9/25} = 3/5')}. Perimeter scales by ${T('k')}.</p>${D('40 \\cdot \\frac{3}{5} = 24')}<p>Using ${T('9/25')} directly gives 14.4, which is the trap.</p>`,
  },
  {
    id: 'b3-p20', blockId: 3, topic: 'Similar triangles', difficulty: 'hard', type: 'mc',
    diagram: svgFlip,
    prompt: `In triangle ${T('ABC')}, ${T('D')} is on ${T('AB')} and ${T('E')} is on ${T('AC')} so that ${T('\\angle ADE = \\angle ACB')}. ${T('AD = 4')}, ${T('AE = 6')} and ${T('EC = 6')}. What is ${T('DB')}?`,
    choices: [T('14'), T('4'), T('18'), T('8')],
    answer: 0,
    solution: `<p>The triangles share ${T('\\angle A')}, and ${T('\\angle ADE = \\angle ACB')}, so by AA ${T('\\triangle ADE \\sim \\triangle ACB')}. Read the order carefully: ${T('D \\to C')} and ${T('E \\to B')}, so ${T('DE')} is <em>not</em> parallel to ${T('BC')}.</p>${D('\\frac{AD}{AC} = \\frac{AE}{AB} \\;\\Rightarrow\\; \\frac{4}{12} = \\frac{6}{AB} \\;\\Rightarrow\\; AB = 18')}${D('DB = AB - AD = 18 - 4 = 14')}<p>Treating it as the parallel-line picture (${T('AD/AB = AE/AC')}) gives ${T('AB = 8')} and ${T('DB = 4')}, both wrong. 18 is ${T('AB')}, not ${T('DB')}.</p>`,
  },
];

export default { lesson, practice, checkpoint: [] };
