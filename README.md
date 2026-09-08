# Geometry Catch-Up

Private, single-student study site for closing a missing geometry year in 14 weeks.
Static site: Vite + vanilla JS, KaTeX bundled locally, no backend, no accounts, no analytics.
Progress lives in the browser (localStorage) with JSON export/import as backup.

- Plan: `Geometry_Catchup_Plan.md` (content backbone; the plan data lives in `src/data/plan.js`)
- Build brief: `Claude_Code_Build_Brief_Geometry_Program.md`

## Develop

```
npm install
npm run dev
```

## Working from another computer

Everything lives in the GitHub repo `hozkhar-dot/geometry-catchup`; nothing is local-only.
On any Mac with Node 22 and an SSH key registered with GitHub:

```
git clone git@github.com:hozkhar-dot/geometry-catchup.git ~/Documents/geometry-catchup
cd ~/Documents/geometry-catchup && npm install
```

Then open Claude Code in that folder. The project state and next-session prompt live in the
knowledge base at `memory/projects/geometry-catchup.md`; Claude reads it at the start of each session.
Push to `main` from any machine deploys the site. Pull before starting a session on a second machine.

## Content checks

```
node scripts-validate.mjs
```

Structural checks on all 8 blocks: ids, choices, answer indexes, difficulty ramp, KaTeX parses, rounded answers carry a `tolerance`.

## Deploy

Pushing to `main` builds and deploys to GitHub Pages via `.github/workflows/deploy.yml`.

## Build order status

1. Scaffold: done (dashboard shell, routing, progress module, deploy pipeline)
2. Quiz player: done
3. Blocks 1-2 content: done (independently re-solved, 50/50 keys verified)
4. Blocks 3-5 content: done (awaiting independent re-solve QC)
5. Blocks 6-7 content + review page: done (Block 6 coordinate geometry, Block 7 solid geometry, no checkpoints per the plan; Review page gained a topic health table, per-topic retry, miss history)
6. Block 8, dashboard polish, mobile pass, final deploy: done (Block 8 = game plan + one-page recap + Mixed Set A timed practice + Checkpoint 4 as Mixed Set B; dashboard shows per-block progress bars, overall totals, and a Review nudge; mobile pass at 375px)
