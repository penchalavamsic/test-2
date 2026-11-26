---
test_id: "LIMAS-SUD-155"
title: 'To verify the functionality of "System User Dashboard" → "Approve Form" → "Required Fields" → "Asterisk Indicators Are Visual-Only (Accessibility)"'
module: "system-user-dashboard"
page: "/system-user-dashboard"
section: "Approve Form"
control: "Required field indicators (asterisk)"
action: "Verify asterisk (*) has no aria-required equivalent"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P3"
classification: "Read-only"
test_type: "Accessibility"
automation_candidate: true
plan_status: "reviewed"
script_status: "generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/system-user-dashboard/LIMAS-SUD-155-required-indicators-visual-only.spec.ts"
---

# Purpose

Verify that required fields in the Approve form use asterisk (*) characters as visual-only indicators without corresponding aria-required attributes or other accessible equivalents, and document this as an accessibility gap.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The user is authenticated on `/system-user-dashboard`.
- At least one pending license request with an Approve button exists.

# Test Data

None.

# Steps and Expected Results

1. Action: Navigate to the dashboard, wait for full render, click the Pending License Requests card, and open the Approve form by clicking the first Approve button.
   Expected Result: The Approve form is visible with required field labels ending in "*".

2. Action: Inspect the User Group combobox for aria-required.
   Expected Result: The combobox does not have `aria-required="true"`.

3. Action: Inspect the Profile combobox for aria-required.
   Expected Result: The combobox does not have `aria-required="true"`.

4. Action: Inspect the Expiration Date field for aria-required.
   Expected Result: The Expiration Date field does not have `aria-required="true"`.

5. Action: Close the form via Cancel.
   Expected Result: The form closes and returns to the table view.

# Expected Final Result

Required fields are indicated only by the visual asterisk (*) character with no aria-required attribute, creating an accessibility gap for screen-reader users.

# Classification

- Read-only
- Accessibility

# Restrictions

- Do not include credentials, tokens, cookies, authorization codes, or sensitive payloads.
- Do not repeat data-changing submissions.
- Do not manually navigate to simulate a successful result.
- Do not use static environment-specific data.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending