---
test_id: "LIMAS-SUD-1916"
title: "Full restore to clean state after bulk-actions exploration"
module: "Floating License Configurations"
page: "Floating License Configurations"
section: "Safe Restoration"
control: "Restore"
action: "Full restoration"
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

Verify that after exploring bulk actions (selecting cards and opening/closing panels), a full restore returns the page to a clean state with no toolbar or panels visible.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and on the Floating License Configurations page.
- A runtime group with configurations is selected.

# Test Data

Use environment variables and the authenticated fixture. No hardcoded group names, card names, or counts.

# Steps and Expected Results

1. Action: Navigate to the Floating License Configurations page and select a runtime group.
   Expected Result: Page loads and configuration cards are visible.

2. Action: Create a dirty state: select a card, open the Dates panel, then close it.
   Expected Result: Card is selected, toolbar is visible, Dates panel was opened and closed.

3. Action: Perform a full restore and clear all card selections.
   Expected Result: Restore and clear operations complete.

4. Action: Wait briefly, then assert the selection toolbar is not visible.
   Expected Result: Selection toolbar is hidden.

5. Action: Assert the Dates panel is not visible.
   Expected Result: Dates panel is hidden.

6. Action: Assert the Capacity panel is not visible.
   Expected Result: Capacity panel is hidden.

7. Action: Assert that the page heading is visible.
   Expected Result: The main Floating License Configurations heading is present.

8. Action: Assert that the user group summary panel is visible.
   Expected Result: The summary panel is present and visible.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

The page is fully restored to a clean state with no selection toolbar, no panels, and the main heading and summary panel visible.

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