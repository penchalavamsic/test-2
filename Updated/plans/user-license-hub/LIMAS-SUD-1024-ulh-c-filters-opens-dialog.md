---
test_id: "LIMAS-SUD-1024"
title: "To verify the functionality of \"User & License Hub\" → \"User Filters\" → \"Filter Dialog\" → \"Filters Button Opens Dialog\""
module: "User & License Hub"
page: "User & License Hub"
section: "User Filters"
control: "Filter Dialog"
action: "Filters Button Opens Dialog"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
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

Verify that clicking the Filters button opens a dialog with role="dialog" and sets aria-expanded to "true" on the button.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is navigated to User & License Hub.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to User & License Hub, wait for load.
   Expected Result: Filters button visible with aria-expanded="false".

2. Action: Click the Filters button.
   Expected Result: A dialog with role="dialog" appears.

3. Action: Verify the button state.
   Expected Result: Filters button aria-expanded="true".

# Network Verification

No additional API requests triggered by dialog open alone.

# Expected Final Result

Filters button correctly opens the dialog and updates its aria-expanded state.

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

- Live UI observation via Playwright MCP: Filters button click → dialog opens, aria-expanded="true".