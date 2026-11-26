---
test_id: "LIMAS-SUD-1058"
title: "To verify the functionality of \"User & License Hub\" → \"User List\" → \"Pagination\" → \"Selected User Always Visible\""
module: "User & License Hub"
page: "User & License Hub"
section: "User List"
control: "Pagination"
action: "Selected User Always Visible"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Read-only"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/user-license-hub/user-license-hub-pagination-selection-sync.spec.ts"
---

# Purpose

Verify the auto-selected user after any page transition is always a member of the currently visible page — their h3 text appears in the list of visible user card names.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is navigated to User & License Hub with user data loaded.
- Total pages > 1.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: On page 1, get the selected user's name and verify it is among the visible card names.
   Expected Result: Selected user name appears in the visible h3 texts.

2. Action: Click Next. Get the new selected user's name and visible card names.
   Expected Result: New selected user name appears in the page 2 visible h3 texts.

3. Action: Click Previous. Get the selected user's name and visible card names.
   Expected Result: Selected user name appears in the page 1 visible h3 texts.

4. Action: Change page size to a different value and verify again.
   Expected Result: Selected user name is among the visible h3 texts after size change.

# Network Verification

GET requests with appropriate page/size parameters; no POST/PUT/PATCH/DELETE.

# Expected Final Result

The auto-selected user is always a visible member of the current page.

# Classification

- Read-only
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode user names.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Live UI observation via Playwright MCP: selected user always a member of the visible page after transitions.