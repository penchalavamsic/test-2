---
test_id: "LIMAS-SUD-1029"
title: "To verify the functionality of \"User & License Hub\" → \"User Filters\" → \"Group Filter\" → \"Group Options Include All Groups\""
module: "User & License Hub"
page: "User & License Hub"
section: "User Filters"
control: "Group Filter"
action: "Group Options Include All Groups"
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

Verify that the group filter listbox contains "All Groups" as the first option and that it is selected by default when no group filter is active.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is navigated to User & License Hub.

# Test Data

Use environment variables and the authenticated fixture; read option texts at runtime.

# Steps and Expected Results

1. Action: Navigate to User & License Hub, open Filters dialog.
   Expected Result: Dialog visible.

2. Action: Read all group option texts from the listbox.
   Expected Result: "All Groups" is the first option; the list contains additional group names.

3. Action: Verify "All Groups" has the selected state.
   Expected Result: "All Groups" option has aria-selected="true" or equivalent visual indicator.

# Network Verification

No API requests.

# Expected Final Result

"All Groups" is present and selected by default; group list is populated.

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

- Live UI observation via Playwright MCP: listbox with 50+ group options, "All Groups" first and selected.