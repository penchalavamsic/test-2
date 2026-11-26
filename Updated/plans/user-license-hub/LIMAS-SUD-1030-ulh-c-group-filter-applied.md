---
test_id: "LIMAS-SUD-1030"
title: "To verify the functionality of \"User & License Hub\" → \"User Filters\" → \"Group Filter\" → \"Selecting Group Filters User List\""
module: "User & License Hub"
page: "User & License Hub"
section: "User Filters"
control: "Group Filter"
action: "Selecting Group Filters User List"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
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

Verify that selecting a group from the filter dialog and clicking Select triggers a GET request with `groupids={singleGroupId}`, resets page to 0, and shows only users from that group.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is navigated to User & License Hub.

# Test Data

Use a runtime-known group name from the listbox options (not "All Groups").

# Steps and Expected Results

1. Action: Navigate to User & License Hub, wait for load.
   Expected Result: Default list loaded with full groupids in URL.

2. Action: Open Filters dialog, select a group (not "All Groups"), click Select.
   Expected Result: Dialog closes; Filters button shows badge count of 1.

3. Action: Capture the GET request that fires after Select.
   Expected Result: Request includes `groupids={singleGroupId}` and `page=0`.

4. Action: Verify visible cards.
   Expected Result: All visible cards show the selected group name; pagination reflects the smaller result set.

# Network Verification

- Request URL: `/api/users/f`
- HTTP Method: GET
- Expected Status: 200
- Payload Presence: `groupids={singleId}`, `page=0`
- Visible UI Result: Only users in the selected group; pagination updated

# Expected Final Result

Group filter correctly restricts the user list to the selected group with a single-group-ID request.

# Classification

- Read-only
- Positive
- API

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode group names or IDs.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Live UI observation via Playwright MCP: "Autosar" → `groupids=72` → "Showing 1–14 of 14".