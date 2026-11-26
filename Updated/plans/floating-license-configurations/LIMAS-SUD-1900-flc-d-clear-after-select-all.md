---
test_id: "LIMAS-SUD-1900"
title: "Clear from after Select loaded restores no-selection state"
module: "Floating License Configurations"
page: "Floating License Configurations"
section: "Select Loaded and Clear"
control: "Clear Button"
action: "Clear after select all"
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

Verify that after using Select Loaded, clicking Clear restores a clean no-selection state with zero count.

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
   Expected Result: Page loads and configuration cards are visible.

2. Action: Select the first visible card, then click Select Loaded to select all visible cards.
   Expected Result: All cards are selected.

3. Action: Trigger Clear to remove all selections.
   Expected Result: Clear command executes.

4. Action: Wait briefly, then read the selection count.
   Expected Result: The selection count is 0.

5. Action: Check the selection toolbar visibility.
   Expected Result: The selection toolbar is hidden.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

After Select Loaded followed by Clear, the selection count is 0 and the toolbar is hidden.

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