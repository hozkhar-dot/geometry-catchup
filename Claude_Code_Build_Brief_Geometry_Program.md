# Build Brief: Geometry Catch-Up Study Site

Instructions for building a personal study dashboard with Claude Code. Written to be handed to Claude Code section by section. Companion document: `Geometry_Catchup_Plan.md` (the 14-week plan; keep it in the project folder, since it is the content backbone).

## 1. What you are building, in one paragraph

A private, single-student study website for a high-school junior closing a missing geometry year in 14 weeks. It presents the 8 blocks of the catch-up plan as an interactive course: short lessons, worked examples, original practice questions with instant feedback and step-by-step solutions, timed checkpoint quizzes, and a progress dashboard. No accounts, no backend, no database: progress lives in the browser (localStorage) with a JSON export/import button as backup. Deployed as a static site she can open from any device.

## 2. Ground rules

* Static site only. Plain HTML/CSS/JavaScript or a lightweight Vite + vanilla JS setup. No servers, no logins, no external database, no analytics, no trackers.
* All practice questions must be original, written for this project. Never copy questions from the SAT, ACT, PSAT, Khan Academy, or any prep book. Official practice happens on the official platforms; this site links out to them where relevant.
* Every question ships with a worked solution, not just an answer letter: the steps a good tutor would write.
* No personal data in the code or content. No name, school, or scores in the repository. The site can say "your progress," never who "you" is.
* Math rendering: use KaTeX (bundled locally, not from a CDN at runtime) for clean notation. Diagrams as inline SVG, drawn to scale where the problem depends on it, deliberately not to scale (and labeled so) where the test would do the same.
* Mobile-friendly. She will use a laptop mostly, but everything must work on a phone.
* Accessible defaults: readable font sizes, high contrast, keyboard navigation for the quiz player.

## 3. Site structure

Home (dashboard) → 8 block pages → quiz player → review page.

Dashboard: the 14-week plan as a visual timeline; per-block mastery (not started / in progress / passed checkpoint); streak of study days this week against the 3-sessions-per-week target; the four checkpoint scores; a "what to do today" card that picks the next task automatically.

Block pages (8): each block from the plan becomes one page with (a) a lesson: concise explanation with 3-5 worked examples, written for a smart student who has precalculus algebra but zero geometry vocabulary; (b) a practice set: 15-20 original questions, mixed difficulty, instant feedback per question, solution revealed after answering; (c) the checkpoint quiz where the plan defines one: 10 questions, timed, score recorded to the dashboard.

Quiz player: one shared component. Multiple choice (4 options) plus some numeric-entry questions; a visible countdown timer for checkpoints and an optional stopwatch for practice; per-question time tracking so the review page can flag slow topics; end-of-quiz summary with per-topic accuracy.

Review page: every question ever missed, grouped by topic, with a "retry missed questions" button. This is the spaced-review mechanism; keep it simple (a missed question leaves the list after being answered correctly twice, at least a day apart).

Links out: each block page links to the matching Khan Academy units (from the plan document) and, in Block 8, to Bluebook and College Board's Student Question Bank for official material.

## 4. Content specification

Content comes from `Geometry_Catchup_Plan.md`: 8 blocks, their topics, and their checkpoint definitions. Per block, Claude Code should write: one lesson (600-900 words, formulas in KaTeX, one SVG diagram minimum), 15-20 original practice questions with distractors that reflect real mistakes (sign errors, using diameter for radius, degrees/radians confusion in Block 4), and full worked solutions. Difficulty ramp inside each set: first third easy, middle third moderate, final third test-level.

Block 8 is different: no new lesson; two 20-question timed mixed sets drawing on all previous blocks, plus the outbound links to official practice.

## 5. Build order (one Claude Code session each, roughly)

1. Scaffold: project structure, dashboard shell, routing between pages, localStorage progress module with export/import, deploy pipeline working end to end with placeholder content. Deploy on day one, even empty.
2. Quiz player: build and test the shared quiz component with 5 dummy questions before writing real content.
3. Blocks 1-2 content, wired into the quiz player. Stop and review quality here (see section 6) before mass-producing.
4. Blocks 3-5 content.
5. Blocks 6-7 content, plus the review page.
6. Block 8, dashboard polish, mobile pass, final deploy.

Resist building everything in one giant session. Content quality drops when generated in bulk, and the Block 1-2 review checkpoint is where you calibrate.

## 6. Quality control (the owner's job, not Claude Code's)

* After Blocks 1-2 are built, verify 10 questions by hand: work them yourself or run them past the answer. Also ask Claude Code, in a fresh session, to "independently re-solve every question in Block 1 and report any answer-key mismatches." Independent re-solving catches most content errors.
* Check one diagram per block for accuracy (angles that look like what they claim to be).
* Have her use Block 1 for a week before the rest is built. Her feedback on lesson tone and question difficulty is worth more than any spec.
* Checkpoint thresholds and pacing stay as defined in the plan document; if Claude Code proposes changing them, decline.

## 7. Deployment and access

Simplest good option: a GitHub private repo + GitHub Pages (Pages from a private repo requires a paid plan) or a free Vercel/Netlify account deploying from the repo. The URL will be obscure but public; that is acceptable because the site contains no personal data, only geometry. If you want it truly private, Vercel supports password protection on paid tiers, or keep it simple: the obscurity of an unlisted URL is fine for a geometry course. She bookmarks the URL on laptop and phone; progress is per-device (localStorage), so tell her to pick one primary device, and use the export/import backup if she switches.

**Decision (session 1, 2026-09-06):** public GitHub repo + GitHub Pages via Actions. The account is on the free plan, and the repository contains geometry only.

## 8. Session prompts

For each later session, open with: "Read the two .md files. We completed session N; today is session N+1 from the build order."

## 9. What this site is, and is not

It is the structured practice layer: her daily working environment, progress record, and the thing that makes the 14 weeks feel like a course instead of a pile of links. It is not a replacement for Khan Academy's instruction videos (linked from each block) or for official SAT/ACT questions (linked in Block 8). Keep that division; it is what keeps the content both legal and good.
