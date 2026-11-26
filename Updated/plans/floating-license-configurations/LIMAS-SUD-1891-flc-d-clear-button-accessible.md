---
test_id: "LIMAS-SUD-1891"
title: "Clear button is accessible with role and focus indicator"
module: "Floating License Configurations"
page: "Floating License Configurations"
section: "Selection Toolbar Structure"
control: "Clear Button"
action: "Verify accessible name and focus"
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

Verify the Clear button in the selection toolbar is visible, has an accessible name, and supports keyboard focus.

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

3. Action: Assert that the Clear button is visible.
   Expected Result: Clear button is visible in the toolbar.

4. Action: Assert that the Clear button has an accessible name of "Clear".
   Expected Result: Accessible name equals "Clear".

5. Action: Programmatically focus the Clear button.
   Expected Result: The button receives focus.

6. Action: Clear all card selections to restore state.
   Expected Result: All cards are deselected.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

The Clear button is visible, has the accessible name "Clear", and accepts keyboard focus.

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