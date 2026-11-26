---
test_id: "LIMAS-SUD-1887"
title: "To verify field labels are visually associated with values on card"
module: "Floating License Configurations"
page: "Floating License Configurations"
section: "Accessibility"
control: "Field Labels"
action: "Label-Value Association"
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

Verify Capacity, Checkout, Expiration, and Maintenance labels are visible on the page.

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

2. Action: Inspect the first visible card for the field labels "Capacity", "Checkout", "Expiration", and "Maintenance".
   Expected Result: Each of the four labels — "Capacity", "Checkout", "Expiration", and "Maintenance" — is visible within the card.

3. Action: Verify each label has an associated value element in close proximity.
   Expected Result: For each label, a corresponding value (text or element) is visually associated nearby on the card.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

All four field labels — Capacity, Checkout, Expiration, and Maintenance — are visible on each configuration card with associated values.

# Classification

- Read-only
- Positive
- Accessibility
- UI Validation

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not use static environment-specific data.
- Do not hardcode group names, card names, or counts.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending