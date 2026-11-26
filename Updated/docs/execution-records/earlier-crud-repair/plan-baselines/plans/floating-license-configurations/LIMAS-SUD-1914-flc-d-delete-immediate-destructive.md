---
test_id: "LIMAS-SUD-1914"
title: "Delete button triggers immediate destructive action with no confirmation"
module: "Floating License Configurations"
page: "Floating License Configurations"
section: "Delete Action"
control: "Delete Button"
action: "Document immediate destructive behavior"
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

Document that the Delete button triggers an immediate destructive action with no confirmation dialog — the Delete button itself is never clicked during this test.

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

3. Action: Assert that the Delete button is visible and has accessible name "Delete".
   Expected Result: Delete button is present with the correct accessible name.

4. Action: Do NOT click the Delete button. The contract verified via UI inspection is that the button has no confirmation dialog and clicking it starts deletion immediately.
   Expected Result: Test verifies the button's presence and accessible name without triggering any destructive action.

5. Action: Clear all card selections to restore state.
   Expected Result: All cards are deselected.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

Delete button is present with accessible name "Delete". No destructive action is triggered in this test.

# Classification

- Read-only
- Positive
- UI Interaction

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not use static environment-specific data.
- Do not hardcode group names, card names, or counts.
- Delete button must never be clicked during this test.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending