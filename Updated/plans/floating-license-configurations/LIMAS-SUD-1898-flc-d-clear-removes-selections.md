---
test_id: "LIMAS-SUD-1898"
title: "Clear removes all selections and hides toolbar"
module: "Floating License Configurations"
page: "Floating License Configurations"
section: "Select Loaded and Clear"
control: "Clear Button"
action: "Clear all selections"
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

Verify that clicking Clear removes all card selections and hides the selection toolbar.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and on the Floating License Configurations page.
- A runtime group with configurations is selected.
- At least one configuration card is visible and selected.

# Test Data

Use environment variables and the authenticated fixture. No hardcoded group names, card names, or counts.

# Steps and Expected Results

1. Action: Navigate to the Floating License Configurations page and select a runtime group.
   Expected Result: Page loads and configuration cards are visible.

2. Action: Select the first visible card so the selection toolbar appears.
   Expected Result: Card is selected, toolbar is visible.

3. Action: Trigger the Clear action to remove all selections.
   Expected Result: Clear command executes.

4. Action: Wait briefly, then check the visibility of the selection toolbar.
   Expected Result: The selection toolbar is hidden (not visible).

# Network Verification

No API verification needed for this plan.

# Expected Final Result

Clear removes all selections and the selection toolbar returns to its hidden state.

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