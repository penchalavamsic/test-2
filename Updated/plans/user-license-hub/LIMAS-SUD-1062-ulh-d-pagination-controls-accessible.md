---
test_id: "LIMAS-SUD-1062"
title: "To verify the functionality of \"User & License Hub\" → \"User List\" → \"Pagination\" → \"Pagination Controls Accessible\""
module: "User & License Hub"
page: "User & License Hub"
section: "User List"
control: "Pagination"
action: "Pagination Controls Accessible"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
classification: "Read-only"
test_type: "Accessibility"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/user-license-hub/user-license-hub-pagination-accessibility.spec.ts"
---

# Purpose

Verify pagination controls have appropriate ARIA semantics: Previous/Next are buttons with accessible names, the combobox has role="combobox", options have role="option", disabled states are communicated via the disabled attribute, and pagination text is present (though observed as plain generic text without ARIA announcement markup).

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is navigated to User & License Hub with user data loaded.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Verify Previous button has button role and accessible name "Previous".
   Expected Result: Role is "button"; accessible name is "Previous".

2. Action: Verify Next button has button role and accessible name "Next".
   Expected Result: Role is "button"; accessible name is "Next".

3. Action: Verify disabled Previous has the disabled attribute.
   Expected Result: Previous button has `disabled` attribute (HTML boolean or aria-disabled).

4. Action: Verify rows-per-page combobox has role="combobox".
   Expected Result: Combobox element found with role="combobox".

5. Action: Verify available options have role="option" when the listbox is open.
   Expected Result: Each option element has role="option".

6. Action: Verify pagination summary text is present but not wrapped in an ARIA live region (observed as plain text).
   Expected Result: Text exists but no aria-live="polite" or role="status" wrapping it.

# Network Verification

No API requests triggered by accessibility checks.

# Expected Final Result

Pagination controls meet minimum accessibility requirements for roles and names; pagination summary lacks live-region announcements.

# Classification

- Read-only
- Accessibility

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode accessible names beyond "Previous" and "Next".

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Live UI observation via Playwright MCP: buttons with "Previous"/"Next" accessible names, combobox role, disabled attribute, no aria-live region.