---
test_id: "LIMAS-SUD-1027"
title: "To verify the functionality of \"User & License Hub\" → \"User Filters\" → \"Filter Dialog\" → \"Outside Click Dismisses Without Apply\""
module: "User & License Hub"
page: "User & License Hub"
section: "User Filters"
control: "Filter Dialog"
action: "Outside Click Dismisses Without Apply"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
classification: "Read-only"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/user-license-hub/user-license-hub-user-filters-dialog.spec.ts"
---

# Purpose

Verify that clicking outside the filter dialog dismisses it without applying any in-dialog selection — the user list remains unchanged.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is navigated to User & License Hub with filter dialog open.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to User & License Hub, open Filters dialog.
   Expected Result: Dialog visible.

2. Action: Select a group option inside the dialog (do not click Select), then click outside the dialog on the backdrop.
   Expected Result: Dialog closes; user list unchanged; no GET request with the new group filter is triggered.

3. Action: Re-open the dialog and verify the previous selection is not persisted.
   Expected Result: Dialog reopens; "All Groups" or the currently applied group is selected — not the one that was clicked before outside-dismissal.

# Network Verification

No API request with the unapplied group filter is sent.

# Expected Final Result

Outside click dismisses the dialog and discards unapplied selections.

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

- Live UI observation via Playwright MCP: clicking outside dialog dismisses it without applying selection.