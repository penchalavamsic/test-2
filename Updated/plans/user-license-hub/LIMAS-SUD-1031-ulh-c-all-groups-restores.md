---
test_id: "LIMAS-SUD-1031"
title: "To verify the functionality of \"User & License Hub\" → \"User Filters\" → \"Group Filter\" → \"All Groups Restores Full List\""
module: "User & License Hub"
page: "User & License Hub"
section: "User Filters"
control: "Group Filter"
action: "All Groups Restores Full List"
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

Verify that selecting "All Groups" after a group filter is active restores the full user list — the GET request includes the complete `groupids` list and the Filters badge is removed.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- A group filter is active.

# Test Data

Use environment variables and the authenticated fixture. Apply a group filter first at runtime.

# Steps and Expected Results

1. Action: Navigate to User & License Hub, apply a group filter.
   Expected Result: Filtered list visible; Filters badge shows 1.

2. Action: Open Filters dialog, select "All Groups", click Select.
   Expected Result: Dialog closes; GET fires with full groupids list.

3. Action: Verify pagination and badge.
   Expected Result: Pagination returns to default range; Filters badge count is 0; full user list visible.

# Network Verification

- Request URL: `/api/users/f`
- HTTP Method: GET
- Expected Status: 200
- Payload Presence: `groupids={comma-separated full list}`, `page=0`
- Visible UI Result: Full list restored, no badge

# Expected Final Result

Selecting "All Groups" restores the complete unfiltered user list.

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

- Live UI observation via Playwright MCP: "All Groups" → full groupids → "Showing 1–20 of 1823".