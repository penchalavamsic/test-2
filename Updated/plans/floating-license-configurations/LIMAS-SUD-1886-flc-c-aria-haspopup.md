---
test_id: "LIMAS-SUD-1886"
title: "To verify Actions button has aria-haspopup menu"
module: "Floating License Configurations"
page: "Floating License Configurations"
section: "Accessibility"
control: "Actions Button"
action: "Aria Attribute"
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

Verify the Actions button has aria-haspopup="menu".

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

2. Action: Locate the Actions (three-dot) button on the first visible card.
   Expected Result: The Actions button is present.

3. Action: Inspect the aria-haspopup attribute on the Actions button.
   Expected Result: The attribute is aria-haspopup="menu".

# Network Verification

No API verification needed for this plan.

# Expected Final Result

The Actions button has aria-haspopup="menu", correctly communicating to assistive technology that it triggers a menu popup.

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