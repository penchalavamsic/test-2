# LIMAS-SUD-1183 — Download does not navigate away from users-licenses route

## Test ID
LIMAS-SUD-1183

## Feature
User & License Hub — ULH-I Download License

## Description
Download does not navigate away from users-licenses route

## Preconditions
- Logged in as SUPER_USER_ADMIN_USER
- Navigated to /users-licenses
- License panel visible

## Evidence
Live browser inspection via Playwright MCP on 2026-11-11.
Only read-only operations; no data changed.

## Plan Status
Reviewed

## Script Status
Generated

## Execution Status
Not Run

## Notes
- Runtime-derived values only
- No hardcoded emails, Hardware IDs, Profile names
- Download contract: GET /api/license/enc/i/{userEmail}
- File format: JSON with .xml extension, base64-encoded license
- Prerequisite: specific Profile applied + user explicitly selected
