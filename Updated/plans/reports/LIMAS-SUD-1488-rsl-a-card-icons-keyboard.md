---
test_id: "LIMAS-SUD-1488"
title: "To verify the functionality of \"Reports\" → \"Report-Type Cards\" → \"Cards\" → \"Have descriptions, icons, and keyboard accessibility\""
module: "Reports"
page: "Reports"
section: "Report-Type Cards"
control: "Cards"
action: "Have descriptions, icons, and keyboard accessibility"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Reports Standard Licenses RSL-A"
test_type: "Accessibility"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/reports/reports-standard-licenses-shell.spec.ts"
---

# Purpose

Verify that the Standard Licenses card contains a decorative SVG icon, a visible description, and a `tabindex="0"` attribute for keyboard accessibility.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to the Reports page.

# Test Data

Use environment variables and the `standardLicensesCard` locator. Description text: "Standard and deleted license records".

# Steps and Expected Results

1. Action: Navigate to the Reports page.
   Expected Result: Standard Licenses card is visible.

2. Action: Locate the SVG child of the Standard Licenses card and assert it is visible.
   Expected Result: The card contains a visible SVG icon.

3. Action: Assert that the card contains the description text "Standard and deleted license records".
   Expected Result: The description is visible.

4. Action: Assert the card's `tabindex` attribute.
   Expected Result: `tabindex` is "0", confirming keyboard focusability.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

The Standard Licenses card includes an SVG icon, a description, and is keyboard-focusable via `tabindex="0"`.

# Classification

- Read-only
- Accessibility

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not repeat data-changing submissions.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Live UI observation via Playwright MCP