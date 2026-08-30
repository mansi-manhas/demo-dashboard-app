# Demo Dashboard

A sample dashboard app built with Vite + React + TypeScript, MUI, and the
`@mansi-manhas/*` private component packages (components-ui, navigation-ui,
user-profile-ui, auth-ui).

## Getting started

```bash
npm install
npm run dev      # start the dev server at http://localhost:5173
npm run build    # type-check and build for production
npm run preview  # preview the production build
```

This is a demo build with no backend: `LoginForm` accepts any email/password
and just simulates a network round-trip (see `src/auth/AuthContext.tsx`).
Profile and settings changes are held in memory only.

## Structure

- `src/auth/` — mock auth context + route guard
- `src/layouts/DashboardLayout.tsx` — shell using `Navbar` + `Sidebar` from `navigation-ui`
- `src/pages/` — Login, Dashboard, Profile, Settings
- `src/theme.ts` — MUI theme

## Notes on the private packages

`navigation-ui`, `user-profile-ui`, and `auth-ui` v3.0.1 were published with
an unresolved `"@mansi-manhas/components-ui": "workspace:*"` dependency,
which npm can't resolve outside an actual npm workspace. This was worked
around via `overrides` in `package.json`. The `workspace:*` reference was
fixed at the source in v3.0.2 (now depends on the real published
`components-ui@3.0.1`), so this project has been bumped to v3.0.2 for all
three packages and the `overrides` workaround has been removed.
