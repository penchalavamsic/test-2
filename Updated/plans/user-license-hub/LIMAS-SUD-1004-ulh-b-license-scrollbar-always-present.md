---
test_id: "LIMAS-SUD-1004"
title: "To verify the functionality of \"User & License Hub\" → \"License List\" → \"Scrolling\" → \"License Panel Scrollbar Exists Even When Not Needed\""
module: "User & License Hub"
page: "User & License Hub"
section: "License List"
control: "Scrolling"
action: "License Panel Scrollbar Exists Even When Not Needed"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P3"
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

Verify that the license panel scroll container uses `overflow-y: auto` even when all license cards fit without scrolling.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is navigated to User & License Hub with user and license cards loaded.
- Select a user with few enough licenses that all cards fit in the panel.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to User & License Hub, wait for load.
   Expected Result: First user auto-selected with {runtimeLicenseCount} licenses.

2. Action: Verify the license card container's `overflow-y` style.
   Expected Result: `overflow-y` is `auto` — the scrollbar region exists as part of the layout.

3. Action: Verify scrollHeight equals clientHeight (no overflow needed).
   Expected Result: `scrollHeight === clientHeight` — no actual scrolling needed, but container is scroll-ready.

# Network Verification

No API requests.

# Expected Final Result

The license panel always has `overflow-y: auto`, providing a scroll region even when all cards fit.

# Classification

- Read-only
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode user names, emails, groups, or license counts.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Live UI observation via Playwright MCP: overflow-y-auto on license grid container; scrollbar region exists even when 3 cards fit.