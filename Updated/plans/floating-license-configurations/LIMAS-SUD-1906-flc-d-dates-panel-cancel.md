---
test_id: "LIMAS-SUD-1906"
title: "Cancel closes Dates panel and leaves selections unchanged"
module: "Floating License Configurations"
page: "Floating License Configurations"
section: "Dates Panel"
control: "Cancel Button"
action: "Cancel dates panel"
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

Verify that clicking Cancel in the Dates panel closes the panel while preserving the current card selections.

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

2. Action: Select the first visible card to activate the selection toolbar (selection count = 1).
   Expected Result: Card is selected, toolbar is visible.

3. Action: Open the Dates panel, then trigger Cancel to close it.
   Expected Result: Cancel command executes.

4. Action: Wait briefly, then assert the Dates panel is no longer visible.
   Expected Result: The Dates panel is not visible.

5. Action: Read the selection count.
   Expected Result: The selection count is still 1 — no cards were deselected.

6. Action: Clear all card selections to restore state.
   Expected Result: All cards are deselected.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

Cancel closes the Dates panel without affecting the current card selections.

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