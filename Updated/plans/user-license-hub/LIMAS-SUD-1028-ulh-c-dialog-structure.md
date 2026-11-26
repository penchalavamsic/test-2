---
test_id: "LIMAS-SUD-1028"
title: "To verify the functionality of \"User & License Hub\" → \"User Filters\" → \"Filter Dialog\" → \"Dialog Contains User Group Section\""
module: "User & License Hub"
page: "User & License Hub"
section: "User Filters"
control: "Filter Dialog"
action: "Dialog Contains User Group Section"
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

Verify the structure of the filter dialog: it contains a User Group section with a combobox, a listbox named "Suggestions" containing `role="group"` wrapping `role="option"` elements, and Clear/Select buttons.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is navigated to User & License Hub with filter dialog open.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to User & License Hub, open Filters dialog.
   Expected Result: Dialog visible.

2. Action: Verify dialog child elements.
   Expected Result: A combobox exists; a listbox with name "Suggestions" exists; options are wrapped in a `role="group"` element; "All Groups" is the first option.

3. Action: Verify action buttons.
   Expected Result: "Clear" button and "Select" button are present.

# Network Verification

No API requests.

# Expected Final Result

Filter dialog has the correct ARIA structure: combobox, listbox "Suggestions", grouped options, Clear and Select buttons.

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

- Live UI observation via Playwright MCP: combobox + listbox "Suggestions" + role="group" wrapping options + Clear/Select buttons.