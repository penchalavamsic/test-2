---
test_id: "LIMAS-SUD-981"
title: "To verify the functionality of \"User & License Hub\" → \"User List\" → \"Selection\" → \"Selection Does Not Change Route\""
module: "User & License Hub"
page: "User & License Hub"
section: "User List"
control: "Selection"
action: "Selection Does Not Change Route"
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

Verify that selecting a different user card does not change the browser route — it stays on `/users-licenses`.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is navigated to User & License Hub.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to User & License Hub, wait for load.
   Expected Result: URL contains `/users-licenses`.

2. Action: Click a different user card to select it.
   Expected Result: URL remains `/users-licenses` — no route change or navigation event.

# Network Verification

No navigation requests (no page-level GET, no redirect).

# Expected Final Result

User selection is a client-side operation that does not change the URL.

# Classification

- Read-only
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode user names, emails, groups, or card indexes.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Live UI observation via Playwright MCP: route stays `/users-licenses` on selection change.