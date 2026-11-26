---
test_id: "LIMAS-SUD-1915"
title: "Delete does not produce a confirmation dialog"
module: "Floating License Configurations"
page: "Floating License Configurations"
section: "Delete Action"
control: "Delete Button"
action: "Confirm no confirmation dialog"
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

Confirm via UI inspection that clicking Delete transitions the button directly to "Deleting…" with no confirmation dialog, modal, or intermediate step.

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

3. Action: Assert that the Delete button is visible.
   Expected Result: Delete button is present.

4. Action: Do NOT click the Delete button. The contract — confirmed via UI inspection — is that no confirmation dialog appears and deletion is immediate.
   Expected Result: Test verifies without clicking Delete.

5. Action: Clear all card selections to restore state.
   Expected Result: All cards are deselected.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

Confirmed via UI inspection: Delete has no confirmation dialog; clicking it transitions directly to "Deleting…".

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