---
test_id: "LIMAS-SUD-1913"
title: "Reopening Capacity panel after Cancel shows form in default state"
module: "Floating License Configurations"
page: "Floating License Configurations"
section: "Capacity Panel"
control: "Cancel and Reopen"
action: "Verify state preservation"
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

Verify that reopening the Capacity panel after canceling shows the form with its original default values preserved.

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

3. Action: Open the Capacity panel and capture the current values of Number of Licenses and Max Checkout Time inputs.
   Expected Result: Both values are recorded.

4. Action: Cancel/close the Capacity panel.
   Expected Result: Panel closes.

5. Action: Wait briefly, then reopen the Capacity panel and capture the values again.
   Expected Result: Panel reopens.

6. Action: Assert that the Number of Licenses value matches the previously recorded value.
   Expected Result: Number of Licenses value is unchanged.

7. Action: Assert that the Max Checkout Time value matches the previously recorded value.
   Expected Result: Max Checkout Time value is unchanged.

8. Action: Close the Capacity panel and clear all card selections.
   Expected Result: Panel closes and selections are cleared.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

The Capacity panel form returns to its original default state when reopened after a Cancel.

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