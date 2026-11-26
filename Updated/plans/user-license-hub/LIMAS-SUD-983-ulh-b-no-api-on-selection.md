---
test_id: "LIMAS-SUD-983"
title: "To verify the functionality of \"User & License Hub\" → \"User List\" → \"Selection\" → \"No API Request On Selection\""
module: "User & License Hub"
page: "User & License Hub"
section: "User List"
control: "Selection"
action: "No API Request On Selection"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Read-only"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/user-license-hub/user-license-hub-user-selection.spec.ts"
---

# Purpose

Verify that changing user selection is entirely client-side — no API request is sent to any LIMAS endpoint.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is navigated to User & License Hub with user cards loaded.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to User & License Hub, wait for load.
   Expected Result: Initial API requests complete.

2. Action: Monitor network for LIMAS API requests (excluding Keycloak token endpoints).
   Expected Result: No new LIMAS API requests appear after initial load.

3. Action: Click a different user card.
   Expected Result: No new LIMAS API request is sent (no GET, POST, PUT, PATCH, DELETE to any `/api/` path).

# Network Verification

- Request URL: Any `/api/` path (excluding `/auth/`)
- Expected: 0 additional requests after initial load, before and after selection click.

# Expected Final Result

User selection is a purely client-side operation — license data is embedded in the initial user-list response and requires no additional network requests.

# Classification

- Read-only
- Positive
- API

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode user names, emails, groups, or card indexes.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Live UI observation via Playwright MCP: 0 additional LIMAS API requests on selection change; only Keycloak token refreshes occur.