# Star Wars React App

## Features

- Feature-based routing for entities: `films`, `people`, `planets`, `species`, `starships`, `vehicles`.
- Type-safe data handling via JSON schema → TypeScript type generation.
- Integrated visual styling inspired by Star Wars (customized `shadcn/ui` tokens).
- Optional/starfield background component integrated (third-party `galaxy` background).

## Quickstart — Local development

Prerequisites: Node.js (v16+) and npm installed.

1. Install dependencies

```powershell
npm install
```

2. Run the development server

```powershell
npm run dev
```

Open http://localhost:3000 in your browser.

## Scripts

- `npm run dev` — Starts the Next.js development server
- `npm run build` — Builds the production bundle
- `npm run start` — Runs the production server after `build`


Changes made via the v0.app interface are automatically pushed to this repository and redeployed by Vercel.

## Project Structure (high level)

- `app/` — Next.js app routes and pages, organized by feature
- `components/` — Reusable UI components (entity grid, detail view, UI primitives)
- `features/` — Feature-level containers (e.g., sidebar)
- `lib/` — Utilities and helpers (static params generation, search helpers)
- `types/` — TypeScript types generated from API schemas

