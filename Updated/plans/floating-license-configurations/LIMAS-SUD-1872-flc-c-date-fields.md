---
test_id: "LIMAS-SUD-1872"
title: "To verify card displays Expiration and Maintenance dates"
module: "Floating License Configurations"
page: "Floating License Configurations"
section: "Card Structure"
control: "Date Fields"
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

Verify both Expiration and Maintenance date values are non-empty on the first visible card.

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

2. Action: Locate the Expiration field within the first visible card and read its value.
   Expected Result: The Expiration value is non-empty.

3. Action: Locate the Maintenance field within the first visible card and read its value.
   Expected Result: The Maintenance value is non-empty.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

The first card displays non-empty values for both the Expiration and Maintenance date fields.

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