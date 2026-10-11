# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Config repo for a Raspberry Pi home server (LAN host `192.168.1.55`), not a single application. Three independent pieces:

- Root [docker-compose.yml](docker-compose.yml): Portainer (`9000`, `9443`) and Caddy (`80`, `443`). Its volumes use absolute paths under `/home/lg/services/...` on the Pi, so it is meant to run from there, not from this checkout.
- [caddyReverseProxy/config/Caddyfile](caddyReverseProxy/config/Caddyfile): reverse-proxy rules for `*.lan` names (`tls internal` for HTTPS ones). Backends are `192.168.1.55:<port>`.
- [main-dashboard/](main-dashboard/): React + Vite + Vitest landing page of redirect buttons to the other apps. It has its own `docker-compose.yml`, separate from the root one.

## Host port map (avoid collisions)

`80/443` Caddy, `9000/9443` Portainer, `8080` AdGuard (per Caddyfile), `8081` sito2 (per Caddyfile), `8082` main-dashboard.

## main-dashboard

Run from `main-dashboard/`:

```
npm run dev                         # Vite dev server on :5173
npm run build                       # tsc --noEmit + vite build (type-check is part of build)
npm test                            # vitest run
npx vitest run src/App.test.tsx     # single test file
npx vitest run -t "omits the default"   # single test by name
npm run test:coverage
docker compose up -d --build        # serves on http://<host>:8082
```

No linter is configured.

Architecture: the app list is data in `src/config/apps.ts` (type in `src/types.ts`). `App.tsx` maps it to `AppButton` links. Links are built at runtime from `window.location.hostname` plus the app's `protocol`/`port` (`utils/buildAppUrl.ts`), so the same build works by IP or hostname. Adding an app means adding one entry, with no other code change. Styling is plain CSS in `src/styles.css` using the "Minimalist Dark" tokens (slate + amber `#F59E0B`, Space Grotesk/Inter self-hosted via `@fontsource`); keep new UI on those CSS variables.

Deploy: `dist/` is tracked in git and the Dockerfile only copies it into nginx (no `npm ci` on the Pi, it was far too slow). Run `npm run build` and commit `dist/` after every change to the app.

npm gotcha: the machine's default npm registry is an AWS CodeArtifact one with an expired token. Install with `npm i --registry https://registry.npmjs.org/ ...` so the lockfile keeps public URLs (the Docker build runs `npm ci`).

## Repo notes

- `portainer/data/` (database, keys, certs) is tracked in git. Don't edit it, and be careful about adding more runtime data.
