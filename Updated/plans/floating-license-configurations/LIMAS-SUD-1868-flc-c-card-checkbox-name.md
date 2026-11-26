---
test_id: "LIMAS-SUD-1868"
title: "To verify card has selection checkbox with accessible name"
module: "Floating License Configurations"
page: "Floating License Configurations"
section: "Card Structure"
control: "Card Checkbox"
action: "Accessible Name"
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

Verify the first visible card's checkbox has accessible name "Select {name}" where {name} is the card's title.

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

2. Action: Read the title text from the first visible card.
   Expected Result: A non-empty title string is returned.

3. Action: Locate the checkbox within the first card and read its accessible name.
   Expected Result: The accessible name equals "Select " followed by the card's title.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

The first card's selection checkbox has an accessible name of "Select {card-title}".

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