---
test_id: "LIMAS-SUD-1885"
title: "To verify card checkbox has role checkbox and reports checked state"
module: "Floating License Configurations"
page: "Floating License Configurations"
section: "Accessibility"
control: "Card Checkbox"
action: "Role and State"
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

Verify the checkbox element has role="checkbox".

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

2. Action: Locate the checkbox element on the first visible card.
   Expected Result: The checkbox element is present and accessible.

3. Action: Inspect the role attribute of the checkbox element.
   Expected Result: The element has role="checkbox".

# Network Verification

No API verification needed for this plan.

# Expected Final Result

The card checkbox has role="checkbox", making it accessible to assistive technology.

# Classification

- Read-only
- Positive
- Accessibility

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not use static environment-specific data.
- Do not hardcode group names, card names, or counts.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending