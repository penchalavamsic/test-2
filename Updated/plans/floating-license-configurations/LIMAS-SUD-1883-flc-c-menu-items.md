---
test_id: "LIMAS-SUD-1883"
title: "To verify menu contains View Details Edit and Delete items"
module: "Floating License Configurations"
page: "Floating License Configurations"
section: "Card Menu Structure"
control: "Menu"
action: "Menu Items"
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

Verify the Actions menu contains "View Details", "Edit", and "Delete" items. Do not click Edit or Delete.

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
   Expected Result: The Actions menu opens.

3. Action: Inspect the menu items within the open menu.
   Expected Result: Menu contains a "View Details" item, an "Edit" item, and a "Delete" item.

4. Action: Verify none of these items are clicked during inspection.
   Expected Result: The menu remains open; no navigation or destructive action occurs.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

The Actions menu contains exactly the expected items: "View Details", "Edit", and "Delete".

# Classification

- Read-only
- Positive
- UI Validation

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not use static environment-specific data.
- Do not hardcode group names, card names, or counts.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending