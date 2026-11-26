---
test_id: "LIMAS-SUD-1896"
title: "Select loaded selects all visible loaded configuration cards"
module: "Floating License Configurations"
page: "Floating License Configurations"
section: "Select Loaded and Clear"
control: "Select Loaded Button"
action: "Select all loaded"
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

Verify that clicking Select Loaded selects every visible loaded configuration card.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and on the Floating License Configurations page.
- A runtime group with configurations is selected.
- At least one configuration card is visible.

# Test Data

Use environment variables and the authenticated fixture. No hardcoded group names, card names, or counts.

# Steps and Expected Results

1. Action: Navigate to the Floating License Configurations page and select a runtime group.
   Expected Result: Page loads. Visible card count is obtained.

2. Action: If no cards are visible, exit the test early.
   Expected Result: Test exits cleanly with no failure.

3. Action: Select a single card first to activate the selection toolbar, then click the Select Loaded button.
   Expected Result: The Select Loaded button is clickable and the toolbar is active.

4. Action: Wait briefly, then read the selection count.
   Expected Result: The selection count equals the total number of visible cards.

5. Action: Clear all card selections to restore state.
   Expected Result: All cards are deselected.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

Select Loaded selects every visible loaded card, and the selection count matches the visible card count.

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