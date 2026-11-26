## System User Dashboard — Authentication Reuse Fix

### Implementation History

| Phase | Date | Description |
|-------|------|-------------|
| 1 | 2026-11-21 | Removed repeated per-test Keycloak login calls |
| 2 | 2026-11-21 | Fixed invalid saved auth state (sessionStorage capture + redirect wait) |
| 3 | 2026-11-21 | Auth expiry protection, preflight validation, controlled recovery, report classification |
| 4 | 2026-11-23 | Consolidate mixed fixtures onto one shared saved-state path; SSO-aware login helper; process-boundary regeneration with remaining-test resume |

### Phase 4 — Mixed Fixture Consolidation

#### Root Cause

The SUD test suite had two separate authentication fixtures running concurrently:

| Fixture | Specs | Auth method |
|---------|-------|-------------|
| `tests/fixtures/base.ts` | **506** specs | Saved-state: restores `sessionStorage`, navigates to `/system-user-dashboard`, sign-in guard, heading check. Has auth guard, sentinel, and batch-stop logic. |
| `tests/fixtures/authenticated-test.ts` | **342** specs | Legacy per-test login: calls `performKeycloakLogin()` in the fixture, enters credentials before every test. No auth guard. No regeneration awareness. |

This caused:
- **506 specs** using the saved-state path hit auth guard correctly
- **342 specs** calling `performKeycloakLogin()` from `authenticated-test.ts` — these were the ones that timed out at `tests/helpers/auth.ts:61` because the old `performKeycloakLogin()` waited only for the Keycloak auth URL and could not handle SSO redirects
- No spec used `@playwright/test` directly (verified: 0 matches)

#### Final Single-Fixture Design

All 848 SUD specs now resolve to one implementation: `tests/fixtures/base.ts`.

- `base.ts` exposes two fixture shapes: `page` (standard) and `authenticatedPage: { url }` (legacy compatibility)
- `authenticated-test.ts` is a pure re-export shim: `export { test, expect, AuthBlockedError } from './base'`
- The shared `bootstrapAuthenticatedDashboard()` function is the single code path for both
- 342 specs that destructure `authenticatedPage` continue to work without import changes
- No SUD functional spec calls `performKeycloakLogin()` (verified: 0 matches in `tests/system-user-dashboard/`)

#### performKeycloakLogin() — SSO-Aware

The helper now handles both post-click outcomes via `Promise.race`:

1. **Credential page displayed** → fill credentials, submit, wait for dashboard
2. **Existing Keycloak SSO session** → redirects directly through `/auth/callback` → wait for dashboard

No arbitrary sleeps. Timeouts are explicit (15s for each branch race, 30s for final redirect).
This helper remains limited to `auth.setup.ts` and authentication-suite coverage only.

#### Regeneration — Process Boundary

The runner script (`scripts/run-tests-with-report.ps1`) now implements:

1. On auth-block detection, backs up segment-1 results (`results-segment-1.json`, `junit-segment-1.xml`, `html-report-segment-1`, `test-results-segment-1`)
2. Identifies passed Test IDs from segment-1 JSON results
3. Regenerates auth via a fresh `npx playwright test` process (auth-setup + auth-smoke)
4. Builds a remaining-test manifest (`.auth/.resume-manifest.json`)
5. Starts a new Playwright process with `--grep` restricted to remaining Test IDs — never re-runs passed tests
6. Merges segment-1 passes with segment-2 results into a single `results.json`
7. Rebuilds stats: each functional Test ID appears exactly once in the merged report
8. Allows only ONE regeneration and resume cycle per batch
9. If regeneration fails, stops the batch and classifies remaining tests as auth-blocked
10. Records `regenerated: true` and `resumedTestCount` in `run-metadata.json` and `run-summary.txt`

### Files Changed (Phase 4)

| File | Change |
|------|--------|
| `tests/fixtures/base.ts` | Added `PROFILE` constant, parameterized `loadSessionStorageInit()`, extracted shared `bootstrapAuthenticatedDashboard()`, added `authenticatedPage` compatibility fixture, exported `SystemUserDashboardFixtures` type, removed duplicate sentinel logic |
| `tests/fixtures/authenticated-test.ts` | Replaced 41-line fixture implementation with a 13-line re-export shim. No `performKeycloakLogin()` call. Delegates entirely to `base.ts`. |
| `tests/helpers/auth.ts` | Rewrote `performKeycloakLogin()`: SSO-aware `Promise.race` between credential-page and `/auth/callback` redirect outcomes. Added `expect` import. Added final dashboard heading confirmation. |
| `scripts/run-tests-with-report.ps1` | Replaced mid-batch recovery (lines 432-463) with process-boundary regeneration: backs up segment-1, identifies passed tests, regenerates auth in a fresh process, builds remaining-test manifest, launches fresh Playwright process with `--grep` for remaining tests, merges segment-1 + segment-2 JSON, rebuilds stats, adds regeneration metadata fields |

### Static Validation (Phase 4)

- **TypeScript**: Zero new errors in changed files (`fixtures/base.ts`, `fixtures/authenticated-test.ts`, `helpers/auth.ts`)
- **PowerShell**: Syntax validated — no parse errors in `run-tests-with-report.ps1`
- **Playwright test listing**: SUD-PL-02 resolves 35 tests under `[system-user-dashboard]` project, with `auth-setup` + `auth-smoke` as dependencies
- **Fixture resolution**: Every SUD spec resolves to the single shared saved-state fixture
- **No SUD spec calls `performKeycloakLogin()`**: Verified — 0 matches in `tests/system-user-dashboard/`
- **No SUD functional fixture enters credentials**: `base.ts` never reads `.env` credentials
- **SSO-aware login helper**: `performKeycloakLogin()` supports both credential-page and direct-SSO outcomes
- **Process-boundary regeneration**: Runner launches a new `npx playwright test` process for resume, never modifies auth files while workers are active
- **Only one regeneration per batch**: The `regenerationAttempted` flag and sentinel removal prevent double-recovery
- **Remaining-test selection**: Passed Test IDs are extracted from segment-1 JSON; resume `--grep` excludes them
- **Merged report**: Each of the 46 functional tests in SUD-PL-02 (35 in SUD-PL-02 specifically) counted exactly once
- **Auth-blocked vs functional failures**: `AuthBlockedError` is the fixture's exit class; runner reports auth-blocked separately
- **No credential/token leakage**: No secret values in `run-summary.txt`, `run-metadata.json`, or `results.json`

### Dependency Chain (unchanged)

```
auth-setup (generates .auth/<profile>.json + .session.json)
    ↓
auth-smoke (validates state: navigates to dashboard, confirms no redirect)
    ↓
system-user-dashboard (runs SUD tests with valid auth state)
```

### Recovery Flow (updated for Phase 4)

```
1. Script preflight: check expiry → if expired, regenerate → validate with auth-smoke
2. Batch runs → fixture detects sign-in redirect → writes .needs-regeneration sentinel → throws AuthBlockedError
3. Playwright process exits → script backs up segment-1 results
4. Script identifies passed Test IDs from segment-1 JSON
5. Script regenerates auth (fresh npx process) → validates via auth-smoke
6. Script builds remaining-test manifest → launches NEW Playwright process with --grep for remaining tests
7. Segment-2 completes → script merges segment-1 passes + segment-2 results into one results.json
8. If regeneration fails → remaining tests classified as Infrastructure Blocked
9. Report: auth-blocked tests shown separately, not counted as functional failures
10. Metadata records: regenerated=true, resumedTestCount=N
```

### State File Structure (unchanged)

After `auth-setup`, `.auth/<profile>.meta.json` contains:
```json
{
  "generatedAt": "2026-11-21T...",
  "profile": "SUPER_USER_ADMIN_USER",
  "baseURL": "http://localhost:8091",
  "tokenExpiry": "2026-11-21T...",
  "tokenExpiryMs": 1732220000000,
  "sessionKeys": 1,
  ...
}
```
