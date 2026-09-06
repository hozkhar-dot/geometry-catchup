// Five dummy questions used only to exercise the quiz player (session 2).
// They are deliberately trivial. Real content starts in session 3.

export const DUMMY_BLOCK = {
  id: 'demo',
  title: 'Quiz player demo',
  checkpoint: { label: 'Demo checkpoint', description: '5 demo questions, timed', questions: 5, target: 4, timeLimitSec: 3 * 60 },
};

export const DUMMY_QUESTIONS = [
  {
    id: 'demo-q1',
    blockId: 'demo',
    topic: 'Angle basics',
    difficulty: 'easy',
    type: 'mc',
    prompt: 'Two angles are complementary. One measures <span data-tex="35^\\circ"></span>. What is the other?',
    choices: ['<span data-tex="45^\\circ"></span>', '<span data-tex="55^\\circ"></span>', '<span data-tex="145^\\circ"></span>', '<span data-tex="65^\\circ"></span>'],
    answer: 1,
    solution: '<p>Complementary angles add to <span data-tex="90^\\circ"></span>.</p><p><span data-tex-display="90^\\circ - 35^\\circ = 55^\\circ"></span></p><p>The <span data-tex="145^\\circ"></span> choice is the supplementary trap (180 minus 35).</p>',
  },
  {
    id: 'demo-q2',
    blockId: 'demo',
    topic: 'Angle basics',
    difficulty: 'easy',
    type: 'numeric',
    prompt: 'Two angles are supplementary. One measures <span data-tex="112^\\circ"></span>. Enter the measure of the other, in degrees.',
    answer: 68,
    solution: '<p>Supplementary angles add to <span data-tex="180^\\circ"></span>, so <span data-tex="180 - 112 = 68"></span>.</p>',
  },
  {
    id: 'demo-q3',
    blockId: 'demo',
    topic: 'Pythagorean theorem',
    difficulty: 'medium',
    type: 'mc',
    diagram: `<svg viewBox="0 0 220 160" width="220" height="160" role="img" aria-label="Right triangle with legs 6 and 8 and hypotenuse c">
      <polygon points="20,140 180,140 20,20" fill="none" stroke="currentColor" stroke-width="2"/>
      <rect x="20" y="124" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5"/>
      <text x="100" y="156" text-anchor="middle" font-size="14" fill="currentColor">8</text>
      <text x="8" y="85" text-anchor="middle" font-size="14" fill="currentColor">6</text>
      <text x="112" y="76" text-anchor="middle" font-size="14" fill="currentColor">c</text>
    </svg>`,
    prompt: 'A right triangle has legs of length 6 and 8. What is the length of the hypotenuse <span data-tex="c"></span>?',
    choices: ['<span data-tex="10"></span>', '<span data-tex="14"></span>', '<span data-tex="\\sqrt{28}"></span>', '<span data-tex="100"></span>'],
    answer: 0,
    solution: '<p>Pythagorean theorem: <span data-tex="a^2 + b^2 = c^2"></span>.</p><p><span data-tex-display="6^2 + 8^2 = 36 + 64 = 100"></span></p><p><span data-tex="c = \\sqrt{100} = 10"></span>. Forgetting the square root gives 100; adding the legs gives 14.</p>',
  },
  {
    id: 'demo-q4',
    blockId: 'demo',
    topic: 'Circles',
    difficulty: 'medium',
    type: 'numeric',
    prompt: 'A circle has diameter 10. What is its area? Give your answer as a multiple of <span data-tex="\\pi"></span> (enter just the number in front of <span data-tex="\\pi"></span>).',
    answer: 25,
    solution: '<p>The radius is half the diameter: <span data-tex="r = 5"></span>.</p><p><span data-tex-display="A = \\pi r^2 = 25\\pi"></span></p><p>Using the diameter instead of the radius gives <span data-tex="100\\pi"></span>, a common slip.</p>',
  },
  {
    id: 'demo-q5',
    blockId: 'demo',
    topic: 'Right-triangle trigonometry',
    difficulty: 'hard',
    type: 'mc',
    prompt: 'In a right triangle, the side opposite angle <span data-tex="\\theta"></span> is 3 and the hypotenuse is 5. What is <span data-tex="\\sin\\theta"></span>?',
    choices: ['<span data-tex="\\tfrac{3}{4}"></span>', '<span data-tex="\\tfrac{4}{5}"></span>', '<span data-tex="\\tfrac{3}{5}"></span>', '<span data-tex="\\tfrac{5}{3}"></span>'],
    answer: 2,
    solution: '<p>SOH: sine is opposite over hypotenuse.</p><p><span data-tex-display="\\sin\\theta = \\frac{3}{5}"></span></p><p><span data-tex="\\tfrac{4}{5}"></span> is the cosine (the other leg is 4). <span data-tex="\\tfrac{3}{4}"></span> is the tangent.</p>',
  },
];
