---
test_id: "LIMAS-SUD-1032"
title: "To verify the functionality of \"User & License Hub\" → \"User Filters\" → \"Group Filter\" → \"Clear Resets Group Selection In Dialog\""
module: "User & License Hub"
page: "User & License Hub"
section: "User Filters"
control: "Group Filter"
action: "Clear Resets Group Selection In Dialog"
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

Verify that clicking Clear in the filter dialog resets the group selection to "All Groups" without closing the dialog or applying the change — the user must still click Select.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Filter dialog open with a non-All-Groups option selected.

# Test Data

Use a runtime-known group name selected in the dialog.

# Steps and Expected Results

1. Action: Navigate to User & License Hub, open Filters dialog.
   Expected Result: Dialog visible.

2. Action: Select a group, then click Clear.
   Expected Result: Selection resets to "All Groups"; dialog remains open.

3. Action: Verify no GET request was triggered by Clear alone.
   Expected Result: No new GET request fires; user list unchanged.

# Network Verification

No API request triggered by Clear alone.

# Expected Final Result

Clear resets the in-dialog selection without applying it — Select is still required.

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

- Live UI observation via Playwright MCP: Clear button resets selection but dialog stays open; Select required to apply.