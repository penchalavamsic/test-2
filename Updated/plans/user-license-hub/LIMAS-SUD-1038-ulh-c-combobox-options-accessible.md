---
test_id: "LIMAS-SUD-1038"
title: "To verify the functionality of \"User & License Hub\" → \"User Filters\" → \"Accessibility\" → \"Group Combobox And Options Accessible\""
module: "User & License Hub"
page: "User & License Hub"
section: "User Filters"
control: "Accessibility"
action: "Group Combobox And Options Accessible"
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

Verify that the group filter controls have proper ARIA roles: combobox for the group selector, listbox with name "Suggestions", options with `role="option"`, grouped under `role="group"`, and Clear/Select buttons with accessible names.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Filter dialog is open.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Open Filters dialog.
   Expected Result: Dialog visible.

2. Action: Verify the combobox has role="combobox".
   Expected Result: Group control is a combobox.

3. Action: Verify the listbox and its options.
   Expected Result: Listbox has name "Suggestions"; options have role="option" and are inside a role="group" element.

4. Action: Verify Clear and Select button names.
   Expected Result: "Clear" and "Select" buttons are present with accessible names.

5. Action: Verify the search input accessibility remains as documented in ULH-A (no accessible name, placeholder-only).
   Expected Result: Search input has no accessible name — only placeholder.

# Network Verification

No API requests.

# Expected Final Result

Group filter controls have correct ARIA semantics; search input accessibility gap persists.

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

- Live UI observation via Playwright MCP: combobox + listbox "Suggestions" + role="group" wrapping options + Clear/Select buttons; search input no accessible name.