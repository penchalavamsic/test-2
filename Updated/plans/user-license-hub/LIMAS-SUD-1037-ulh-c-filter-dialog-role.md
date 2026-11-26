---
test_id: "LIMAS-SUD-1037"
title: "To verify the functionality of \"User & License Hub\" → \"User Filters\" → \"Accessibility\" → \"Filter Dialog Has Role Dialog\""
module: "User & License Hub"
page: "User & License Hub"
section: "User Filters"
control: "Accessibility"
action: "Filter Dialog Has Role Dialog"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
classification: "Read-only"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/user-license-hub/user-license-hub-search-filter-accessibility.spec.ts"
---

# Purpose

Verify that the filter popup is exposed as `role="dialog"` with a heading — meeting basic accessibility requirements for modal dialogs.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is navigated to User & License Hub.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to User & License Hub, open Filters dialog.
   Expected Result: A dialog appears.

2. Action: Verify the dialog role and heading.
   Expected Result: The dialog has `role="dialog"` and contains a heading element.

3. Action: Verify the Filters button has `aria-haspopup="dialog"`.
   Expected Result: The button's aria-haspopup attribute confirms it opens a dialog.

# Network Verification

No API requests.

# Expected Final Result

Filter popup meets dialog role requirements: `role="dialog"`, heading present, `aria-haspopup="dialog"` on trigger.

# Classification

- Read-only
- Positive
- Accessibility

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode group names.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Live UI observation via Playwright MCP: dialog role, heading "Filter Users" h4, aria-haspopup="dialog" on button.