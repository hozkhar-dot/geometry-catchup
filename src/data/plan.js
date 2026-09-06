// The 14-week plan, transcribed from Geometry_Catchup_Plan.md.
// This file is the single source of truth for block names, weeks, topics,
// outbound links and checkpoint thresholds. Do not change thresholds here
// without changing the plan document first.

export const PLAN_START = '2026-09-08'; // Monday of Week 1
export const TOTAL_WEEKS = 14;
export const SESSIONS_PER_WEEK = 3;

const KHAN = 'https://www.khanacademy.org/math/geometry';
const KHAN_BASIC = 'https://www.khanacademy.org/math/basic-geo';

export const BLOCKS = [
  {
    id: 1,
    slug: 'foundations',
    title: 'Foundations',
    weeks: [1, 2],
    topics: [
      'Angle basics: complementary, supplementary, vertical angles',
      'Parallel lines cut by a transversal (alternate interior, corresponding angles)',
      'Angle sums: triangle (180°), polygon interior and exterior angles',
    ],
    links: [
      { label: 'Khan: Basic geometry and measurement (angle units)', url: KHAN_BASIC },
      { label: 'Khan: High school geometry, congruence intro topics', url: KHAN },
    ],
    checkpoint: null,
  },
  {
    id: 2,
    slug: 'triangles-1',
    title: 'Triangles I',
    weeks: [3, 4],
    topics: [
      'Pythagorean theorem, including word problems',
      'Special right triangles: 45-45-90 and 30-60-90',
      'Triangle inequality and side-angle relationships',
    ],
    links: [
      { label: 'Khan: Right triangles & trigonometry (first sections)', url: KHAN },
      { label: 'Khan: Pythagorean theorem units', url: KHAN_BASIC },
    ],
    checkpoint: {
      label: 'Checkpoint 1',
      description: '10 Pythagorean and special-triangle problems, timed',
      questions: 10,
      target: 8,
      timeLimitSec: 15 * 60,
    },
  },
  {
    id: 3,
    slug: 'triangles-2',
    title: 'Triangles II: similarity',
    weeks: [5, 6],
    topics: [
      'Congruent triangles (concept level, no proofs)',
      'Similar triangles: setting up and solving ratios',
      'Scale factors for lengths, areas, volumes',
    ],
    links: [
      { label: 'Khan: Congruence', url: KHAN },
      { label: 'Khan: Similarity', url: KHAN },
    ],
    checkpoint: null,
  },
  {
    id: 4,
    slug: 'right-triangle-trig',
    title: 'Right-triangle trigonometry',
    weeks: [7, 8],
    topics: [
      'SOH-CAH-TOA: sine, cosine, tangent as ratios',
      'Solving right triangles (find a side, find an angle)',
      'Angles of elevation and depression word problems',
    ],
    note: 'This block feeds directly into precalculus trig. If precalc reaches trig before Week 7, pull this block forward.',
    links: [
      { label: 'Khan: Right triangles & trigonometry', url: KHAN },
    ],
    checkpoint: {
      label: 'Checkpoint 2',
      description: '10 right-triangle trig problems',
      questions: 10,
      target: 7,
      timeLimitSec: 15 * 60,
    },
  },
  {
    id: 5,
    slug: 'circles',
    title: 'Circles',
    weeks: [9, 10],
    topics: [
      'Circumference and area',
      'Arc length and sector area',
      'Central and inscribed angles',
      'Tangent lines (radius is perpendicular to the tangent)',
      'Equation of a circle in the coordinate plane',
    ],
    links: [
      { label: 'Khan: Circles', url: KHAN },
      { label: 'Khan: Analytic geometry (circle equations)', url: KHAN },
    ],
    checkpoint: {
      label: 'Checkpoint 3',
      description: '10 circle problems',
      questions: 10,
      target: 7,
      timeLimitSec: 15 * 60,
    },
  },
  {
    id: 6,
    slug: 'coordinate-geometry',
    title: 'Coordinate geometry',
    weeks: [11],
    topics: [
      'Slope, parallel and perpendicular slopes',
      'Distance formula and midpoint formula',
      'Applying these to triangles and circles on the plane',
    ],
    links: [
      { label: 'Khan: Analytic geometry', url: KHAN },
    ],
    checkpoint: null,
  },
  {
    id: 7,
    slug: 'solid-geometry',
    title: 'Solid geometry',
    weeks: [12],
    topics: [
      'Volume: prisms, cylinders, pyramids, cones, spheres',
      'Surface area basics',
      'Density and unit-conversion word problems',
    ],
    links: [
      { label: 'Khan: Solid geometry', url: KHAN },
    ],
    checkpoint: null,
  },
  {
    id: 8,
    slug: 'mixed-review',
    title: 'Mixed review and testing',
    weeks: [13, 14],
    topics: [
      'Mixed problem sets across all blocks',
      'College Board Student Question Bank: Geometry and Trigonometry domain sets',
      'ACT practice geometry questions, timed',
      'Redo anything below 75 percent accuracy',
    ],
    links: [
      { label: 'Bluebook (College Board)', url: 'https://bluebook.collegeboard.org/' },
      { label: 'College Board Student Question Bank', url: 'https://satsuitequestionbank.collegeboard.org/' },
      { label: 'ACT practice', url: 'https://www.act.org/content/act/en/products-and-services/the-act/test-preparation.html' },
    ],
    checkpoint: {
      label: 'Checkpoint 4',
      description: '20 mixed questions, timed',
      questions: 20,
      target: 15, // 75%+
      timeLimitSec: 30 * 60,
    },
  },
];

export const CHECKPOINT_BLOCKS = BLOCKS.filter((b) => b.checkpoint).map((b) => b.id);

export function blockById(id) {
  return BLOCKS.find((b) => b.id === Number(id)) || null;
}

export function blockForWeek(week) {
  return BLOCKS.find((b) => b.weeks.includes(week)) || null;
}
