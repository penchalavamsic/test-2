---
test_id: "LIMAS-SUD-1870"
title: "To verify card displays Capacity field with total and available"
module: "Floating License Configurations"
page: "Floating License Configurations"
section: "Card Structure"
control: "Capacity Field"
action: "Field Display"
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

Verify the Capacity label is visible on the first card and the value contains "total" and "available".

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

2. Action: Locate the Capacity field within the first visible card.
   Expected Result: A label element with text "Capacity" is visible.

3. Action: Read the value text associated with the Capacity label.
   Expected Result: The value text is non-empty and contains both the substring "total" and the substring "available".

# Network Verification

No API verification needed for this plan.

# Expected Final Result

The first card displays a visible Capacity label whose value includes the words "total" and "available".

# Classification

- Read-only
- Positive
- UI Structure

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not use static environment-specific data.
- Do not hardcode group names, card names, or counts.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending