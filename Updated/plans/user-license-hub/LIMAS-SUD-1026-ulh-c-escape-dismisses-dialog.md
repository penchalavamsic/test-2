---
test_id: "LIMAS-SUD-1026"
title: "To verify the functionality of \"User & License Hub\" → \"User Filters\" → \"Filter Dialog\" → \"Escape Dismisses Dialog\""
module: "User & License Hub"
page: "User & License Hub"
section: "User Filters"
control: "Filter Dialog"
action: "Escape Dismisses Dialog"
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

Verify that pressing Escape dismisses the filter dialog and returns aria-expanded on the Filters button to "false".

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is navigated to User & License Hub with filter dialog open.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to User & License Hub, open Filters dialog.
   Expected Result: Dialog visible; aria-expanded="true".

2. Action: Press Escape.
   Expected Result: Dialog is hidden; aria-expanded returns to "false".

3. Action: Verify no filter was applied.
   Expected Result: User list unchanged; Filters button shows no badge.

# Network Verification

No API requests triggered by Escape dismissal (without Select).

# Expected Final Result

Escape dismisses the dialog and restores the button state without applying any filter changes.

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

- Live UI observation via Playwright MCP: Escape dismisses dialog; outside click also dismisses without applying.