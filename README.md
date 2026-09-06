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

## Deploy

Pushing to `main` builds and deploys to GitHub Pages via `.github/workflows/deploy.yml`.

## Build order status

1. Scaffold: done (dashboard shell, routing, progress module, deploy pipeline)
2. Quiz player: pending
3. Blocks 1-2 content: pending
4. Blocks 3-5 content: pending
5. Blocks 6-7 content + review page: pending
6. Block 8, dashboard polish, mobile pass, final deploy: pending
