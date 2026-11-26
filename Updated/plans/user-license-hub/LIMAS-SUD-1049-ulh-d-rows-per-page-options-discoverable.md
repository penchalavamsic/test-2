---
test_id: "LIMAS-SUD-1049"
title: "To verify the functionality of \"User & License Hub\" → \"User List\" → \"Pagination\" → \"Rows Per Page Options Discoverable\""
module: "User & License Hub"
page: "User & License Hub"
section: "User List"
control: "Pagination"
action: "Rows Per Page Options Discoverable"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Read-only"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/user-license-hub/user-license-hub-page-size.spec.ts"
---

# Purpose

Verify the rows-per-page combobox has role="combobox" and contains discoverable options (at minimum the currently selected value). Discover options dynamically — do not hardcode expected values like 10, 20, 25, 50, 100.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is navigated to User & License Hub with user data loaded.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Verify the combobox has role="combobox" and is visible.
   Expected Result: Combobox exists and is visible.

2. Action: Discover the available option values dynamically by opening the combobox and reading all option elements.
   Expected Result: At least 2 options are available; the current size is among them.

3. Action: Read the current selected size from the combobox text content.
   Expected Result: The selected size is a positive integer and matches one of the available options.

# Network Verification

No API verification needed for this structure check.

# Expected Final Result

Rows-per-page options are discoverable at runtime without hardcoded values.

# Classification

- Read-only
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode the list of page sizes.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Live UI observation via Playwright MCP: combobox with role="combobox", options 10/20/25 (initial), later 10/20/25/50/100 depending on context.