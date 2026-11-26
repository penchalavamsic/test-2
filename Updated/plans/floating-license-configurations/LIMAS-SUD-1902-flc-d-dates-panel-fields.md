---
test_id: "LIMAS-SUD-1902"
title: "Dates panel contains Expiration Date and Maintenance Date inputs"
module: "Floating License Configurations"
page: "Floating License Configurations"
section: "Dates Panel"
control: "Dates Panel Fields"
action: "Verify date input fields"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Floating License Configurations FLC-D"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/floating-license-configurations/floating-license-configurations-bulk-actions.spec.ts"
---

# Purpose

Verify the Dates panel contains visible input fields for Expiration Date and Maintenance Date.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and on the Floating License Configurations page.
- A runtime group with configurations is selected.
- A configuration card is selected so the selection toolbar is visible.

# Test Data

Use environment variables and the authenticated fixture. No hardcoded group names, card names, or counts.

# Steps and Expected Results

1. Action: Navigate to the Floating License Configurations page and select a runtime group.
   Expected Result: Page loads and configuration cards are visible.

2. Action: Select the first visible card to activate the selection toolbar.
   Expected Result: Selection toolbar appears.

3. Action: Open the Dates panel.
   Expected Result: Dates panel opens.

4. Action: Assert that the Expiration Date input field is visible.
   Expected Result: Expiration Date input is visible within the panel.

5. Action: Assert that the Maintenance Date input field is visible.
   Expected Result: Maintenance Date input is visible within the panel.

6. Action: Close the Dates panel and clear all card selections.
   Expected Result: Panel closes and selections are cleared.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

The Dates panel contains both Expiration Date and Maintenance Date input fields.

# Classification

- Read-only
- Positive
- UI Interaction

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not use static environment-specific data.
- Do not hardcode group names, card names, or counts.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending