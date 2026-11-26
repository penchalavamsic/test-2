---
test_id: "LIMAS-SUD-1879"
title: "To verify deselecting one of two selected cards reduces count to 1"
module: "Floating License Configurations"
page: "Floating License Configurations"
section: "Multiple Selection"
control: "Card Checkbox"
action: "Partial Deselection"
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

Verify unchecking one card when two are selected reduces count to 1.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and on the Floating License Configurations page.
- At least two cards are visible (skip the test gracefully if fewer than 2 cards exist).

# Test Data

Use environment variables and the authenticated fixture. No hardcoded group names, card names, or counts.

# Steps and Expected Results

1. Action: Navigate to the Floating License Configurations page.
   Expected Result: Page loads and cards are visible.

2. Action: Query all visible card checkboxes. If fewer than 2 exist, skip the remainder of the test.
   Expected Result: At least two card checkboxes are available.

3. Action: Check the checkbox on the first visible card and on the second visible card.
   Expected Result: The selection toolbar shows a count of 2.

4. Action: Uncheck the checkbox on the first card.
   Expected Result: The selection toolbar count reduces to 1.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

Unchecking one of two selected cards reduces the selection toolbar count to 1.

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