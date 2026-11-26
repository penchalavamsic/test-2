---
test_id: "LIMAS-SUD-1866"
title: "To verify configuration cards are present in a structured container"
module: "Floating License Configurations"
page: "Floating License Configurations"
section: "Card Collection"
control: "Card Container"
action: "Visibility"
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

Verify at least one configuration card is visible in its container when cards exist.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and on the Floating License Configurations page.
- The configuration count text indicates at least one configuration exists.

# Test Data

Use environment variables and the authenticated fixture. No hardcoded group names, card names, or counts.

# Steps and Expected Results

1. Action: Navigate to the Floating License Configurations page.
   Expected Result: Page loads successfully.

2. Action: Read the configuration count text.
   Expected Result: The count is greater than zero.

3. Action: Locate the card container element.
   Expected Result: The container is present and visible.

4. Action: Query visible configuration cards within the container.
   Expected Result: At least one configuration card is visible inside the container.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

When configurations exist, the card container is present and contains at least one visible card.

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