---
test_id: "LIMAS-SUD-1869"
title: "To verify card displays configuration title"
module: "Floating License Configurations"
page: "Floating License Configurations"
section: "Card Structure"
control: "Card Title"
action: "Title Display"
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

Verify the first visible card's title is visible and present in the card title list.

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

2. Action: Collect all visible card titles into a list.
   Expected Result: A non-empty list of title strings is returned.

3. Action: Read the title element from the first visible card.
   Expected Result: The title is visible and its text content is non-empty.

4. Action: Verify the first card's title appears in the collected title list.
   Expected Result: The first card's title is present in the list.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

The first card displays a non-empty title that is also present in the full card title list.

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