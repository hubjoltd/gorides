# GoRides India

A polished landing page for a Bengaluru travel service focused on airport transfers and outstation journeys, with Gmail and WhatsApp enquiry actions.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/gorides-india/src/App.tsx` — single-page landing page and enquiry flow
- `artifacts/gorides-india/src/index.css` — theme tokens, typography, motion, and shared visual utilities
- `artifacts/gorides-india/vite.config.ts` — Vite app configuration and artifact routing

## Architecture decisions

- Presentation-first single-page app with no backend dependency.
- Enquiry form validates client-side, then prepares the same enquiry text for Gmail compose and WhatsApp.
- Phone number and email live as easy-to-edit constants near the top of `src/App.tsx`.
- The page keeps the service offering intentionally focused on Outstation and Airport Services.

## Product

- Responsive GoRides India marketing page for Bengaluru-based travel.
- Two service paths: Outstation and Airport Services.
- Route and vehicle prompts feed into the enquiry form.
- Contact actions include phone, email, Gmail compose, WhatsApp, and a floating WhatsApp shortcut.

## User preferences

- The visual direction should stay classy, warm, mobile-friendly, and focused rather than adding unrelated services.

## Gotchas

- The email address and phone number are currently editable demo contact details; update them in `artifacts/gorides-india/src/App.tsx` before publishing.
- Manual Vite builds require `PORT` and `BASE_PATH`; managed preview workflows provide them automatically.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
