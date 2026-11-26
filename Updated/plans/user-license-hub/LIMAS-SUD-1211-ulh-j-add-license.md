# LIMAS-SUD-1211 — Add License dialog contains Profile combobox with Select profile default

## Test ID
LIMAS-SUD-1211

## Feature
User & License Hub — ULH-J Add License

## Description
Add License dialog contains Profile combobox with Select profile default

## Preconditions
- Logged in as SUPER_USER_ADMIN_USER
- Navigated to /users-licenses
- Specific Profile applied AND user explicitly selected (Add License prerequisite)

## Evidence
Live browser inspection via Playwright MCP on 2026-11-11.
Read-only structural inspection; no license created during MCP session.

## Key Findings
- Save is ENABLED immediately (not validity-driven)
- Profile-to-Role dependency: changing Profile clears Role
- Role combobox appears only after Profile selection
- Maintenance Date is optional
- Mutation gated behind TEST_ULH_ALLOW_LICENSE_MUTATION

## Plan Status
Reviewed

## Script Status
Generated

## Execution Status
Not Run

## Notes
- Runtime-derived values only
- No hardcoded emails, Hardware IDs, Profile names, Role values
- Cleanup must delete only the created license
- Mutation flags required for lifecycle and cleanup
