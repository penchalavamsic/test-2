---
test_id: "LIMAS-SUD-1875"
title: "To verify exactly one card is counted as selected when selecting individually"
module: "Floating License Configurations"
page: "Floating License Configurations"
section: "Individual Selection"
control: "Selection Toolbar"
action: "Selection Count"
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

Verify the selection count displayed in the toolbar is 1 after selecting exactly one card individually.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and on the Floating License Configurations page.
- At least one card is visible.
- No cards are currently selected.

# Test Data

Use environment variables and the authenticated fixture. No hardcoded group names, card names, or counts.

# Steps and Expected Results

1. Action: Navigate to the Floating License Configurations page.
   Expected Result: Page loads and cards are visible. No selection toolbar is present.

2. Action: Check the checkbox on the first visible card.
   Expected Result: The checkbox becomes checked. The selection toolbar appears.

3. Action: Read the selection count text from the selection toolbar.
   Expected Result: The selection count indicates exactly 1 card is selected.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

Selecting one card individually causes the selection toolbar to display a count of 1.

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