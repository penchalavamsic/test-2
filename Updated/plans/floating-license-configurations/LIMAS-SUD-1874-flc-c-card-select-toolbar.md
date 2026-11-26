---
test_id: "LIMAS-SUD-1874"
title: "To verify selecting a card shows checked checkbox and selection toolbar"
module: "Floating License Configurations"
page: "Floating License Configurations"
section: "Individual Selection"
control: "Card Checkbox"
action: "Check and Toolbar"
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

Verify checking a card's checkbox sets checked=true and the selection toolbar becomes visible.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and on the Floating License Configurations page.
- At least one card is visible.
- No cards are currently selected (no selection toolbar visible).

# Test Data

Use environment variables and the authenticated fixture. No hardcoded group names, card names, or counts.

# Steps and Expected Results

1. Action: Navigate to the Floating License Configurations page.
   Expected Result: Page loads and cards are visible. No selection toolbar is present.

2. Action: Locate the checkbox on the first visible card and check it.
   Expected Result: The checkbox checked state becomes true.

3. Action: Verify the selection toolbar is now present and visible.
   Expected Result: The selection toolbar element is visible on the page.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

Checking a card's checkbox sets its checked state to true and causes the selection toolbar to appear.

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