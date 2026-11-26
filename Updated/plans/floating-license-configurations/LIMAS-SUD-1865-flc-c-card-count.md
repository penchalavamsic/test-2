---
test_id: "LIMAS-SUD-1865"
title: "To verify configuration count matches visible card count"
module: "Floating License Configurations"
page: "Floating License Configurations"
section: "Card Collection"
control: "Card Count"
action: "Count Synchronization"
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

Verify the configuration count text number equals the visible card count.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and on the Floating License Configurations page.

# Test Data

Use environment variables and the authenticated fixture. No hardcoded group names, card names, or counts.

# Steps and Expected Results

1. Action: Navigate to the Floating License Configurations page.
   Expected Result: Page loads and the configuration count text element is visible.

2. Action: Read the numeric value from the configuration count text.
   Expected Result: The count text contains a numeric value (≥ 0).

3. Action: Query all visible configuration cards in the card container.
   Expected Result: A list of visible card elements is returned.

4. Action: Compare the count text number to the length of the visible card list.
   Expected Result: The two numbers are equal.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

The configuration count text displays a number that exactly matches the count of visible cards on screen.

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