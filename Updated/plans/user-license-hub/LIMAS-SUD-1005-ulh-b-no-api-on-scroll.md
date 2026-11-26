---
test_id: "LIMAS-SUD-1005"
title: "To verify the functionality of \"User & License Hub\" → \"User List\" → \"Scrolling\" → \"No API Request On User-Panel Scroll\""
module: "User & License Hub"
page: "User & License Hub"
section: "User List"
control: "Scrolling"
action: "No API Request On User-Panel Scroll"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Read-only"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/user-license-hub/user-license-hub-panel-scrolling.spec.ts"
---

# Purpose

Verify that scrolling the user panel does not trigger any additional API requests to LIMAS endpoints.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is navigated to User & License Hub with user cards loaded.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to User & License Hub, wait for load.
   Expected Result: Initial API requests complete.

2. Action: Monitor network for new LIMAS API requests.
   Expected Result: No new requests to any `/api/` path.

3. Action: Scroll the user panel.
   Expected Result: No new LIMAS API request is triggered by the scroll.

# Network Verification

- Expected: 0 additional requests to `/api/` paths after initial load, before and during scroll.

# Expected Final Result

User-panel scrolling is client-side only — no API requests are sent.

# Classification

- Read-only
- Positive
- API

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode user names, emails, groups, or scroll offsets.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Live UI observation via Playwright MCP: scrolling does not trigger additional API requests.