---
test_id: "LIMAS-SUD-1867"
title: "To verify no duplicate configuration cards"
module: "Floating License Configurations"
page: "Floating License Configurations"
section: "Card Collection"
control: "Card Titles"
action: "Uniqueness"
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

Verify all visible card titles are unique (no duplicate cards).

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

2. Action: Collect the title text of every visible configuration card.
   Expected Result: A list of card title strings is returned.

3. Action: Check the title list for duplicate values.
   Expected Result: Every title in the list appears exactly once; there are no duplicates.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

All visible configuration card titles are unique; no two cards share the same title.

# Classification

- Read-only
- Positive
- Data Integrity

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not use static environment-specific data.
- Do not hardcode group names, card names, or counts.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending