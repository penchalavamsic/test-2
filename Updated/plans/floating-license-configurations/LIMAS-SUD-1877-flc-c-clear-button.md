---
test_id: "LIMAS-SUD-1877"
title: "To verify Clear button in selection toolbar deselects all and hides toolbar"
module: "Floating License Configurations"
page: "Floating License Configurations"
section: "Individual Selection"
control: "Clear Button"
action: "Clear All"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Floating License Configurations FLC-C"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/floating-license-configurations/floating-license-configurations-cards.spec.ts"
---

# Purpose

Verify clicking Clear in the selection toolbar unchecks the selected card and hides the toolbar.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and on the Floating License Configurations page.
- At least one card is visible.

# Test Data

Use environment variables and the authenticated fixture. No hardcoded group names, card names, or counts.

# Steps and Expected Results

1. Action: Navigate to the Floating License Configurations page.
   Expected Result: Page loads and cards are visible.

2. Action: Check the checkbox on the first visible card.
   Expected Result: The selection toolbar becomes visible showing a count of 1 and a Clear button.

3. Action: Click the Clear button in the selection toolbar.
   Expected Result: The selected card is unchecked. The selection toolbar is no longer visible.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

Clicking Clear in the selection toolbar unchecks the selected card and hides the toolbar completely.

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