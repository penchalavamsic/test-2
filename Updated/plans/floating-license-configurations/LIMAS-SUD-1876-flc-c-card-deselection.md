---
test_id: "LIMAS-SUD-1876"
title: "To verify deselecting a card clears its checkbox state"
module: "Floating License Configurations"
page: "Floating License Configurations"
section: "Individual Selection"
control: "Card Checkbox"
action: "Deselection"
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

Verify unchecking a card's checkbox sets checked=false.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and on the Floating License Configurations page.
- At least one card is visible.
- A card is currently selected (checked).

# Test Data

Use environment variables and the authenticated fixture. No hardcoded group names, card names, or counts.

# Steps and Expected Results

1. Action: Navigate to the Floating License Configurations page.
   Expected Result: Page loads and cards are visible.

2. Action: Check the checkbox on the first visible card.
   Expected Result: The checkbox checked state becomes true.

3. Action: Uncheck the checkbox on the same card.
   Expected Result: The checkbox checked state becomes false.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

Unchecking a selected card's checkbox returns its checked state to false.

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