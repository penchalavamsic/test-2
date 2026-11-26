---
test_id: "LIMAS-SUD-1033"
title: "To verify the functionality of \"User & License Hub\" → \"User Filters\" → \"Group Filter\" → \"Filters Badge Reflects Active Group\""
module: "User & License Hub"
page: "User & License Hub"
section: "User Filters"
control: "Group Filter"
action: "Filters Badge Reflects Active Group"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
classification: "Read-only"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/user-license-hub/user-license-hub-user-group-filter.spec.ts"
---

# Purpose

Verify that when a group filter is applied, the Filters button shows "Filters N" where N matches the number of active filters (1 for a single group selection), and the badge is removed when no filter is active.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is navigated to User & License Hub.

# Test Data

Use a runtime-known group name.

# Steps and Expected Results

1. Action: Navigate to User & License Hub, wait for load.
   Expected Result: Filters button shows "Filters" with no badge count.

2. Action: Apply a group filter via the dialog.
   Expected Result: Filters button shows "Filters 1".

3. Action: Remove the group filter by selecting "All Groups".
   Expected Result: Filters button returns to "Filters" with no badge.

# Network Verification

No separate verification needed — badge state is purely visual.

# Expected Final Result

Filters badge count accurately tracks the active filter state.

# Classification

- Read-only
- Positive
- Visual

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode group names.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Live UI observation via Playwright MCP: "Filters 1" when group active, "Filters" when none.