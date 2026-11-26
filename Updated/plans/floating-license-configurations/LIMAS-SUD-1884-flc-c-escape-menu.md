---
test_id: "LIMAS-SUD-1884"
title: "To verify Escape key closes the card menu"
module: "Floating License Configurations"
page: "Floating License Configurations"
section: "Card Menu Structure"
control: "Menu"
action: "Escape Dismissal"
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

Verify pressing Escape closes the Actions menu.

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

2. Action: Click the Actions (three-dot) button on the first visible card.
   Expected Result: The Actions menu opens and is visible.

3. Action: Press the Escape key.
   Expected Result: The Actions menu closes and is no longer visible.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

Pressing the Escape key while the Actions menu is open dismisses the menu.

# Classification

- Read-only
- Positive
- UI Interaction
- Accessibility

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not use static environment-specific data.
- Do not hardcode group names, card names, or counts.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending