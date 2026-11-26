---
test_id: "LIMAS-SUD-1880"
title: "To verify selection persists after search that keeps the card visible"
module: "Floating License Configurations"
page: "Floating License Configurations"
section: "Search and Filter Interaction"
control: "Search Input"
action: "Selection Persistence"
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

Verify a checked card remains checked after applying a search that matches it.

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

2. Action: Get the title text of the first visible card and check its checkbox.
   Expected Result: The card is selected and the selection toolbar appears with count 1.

3. Action: Type a substring of the selected card's title into the search input so the card remains visible.
   Expected Result: The selected card is still visible in the results.

4. Action: Verify the selected card's checkbox is still checked.
   Expected Result: The checkbox checked state remains true and the selection toolbar count is 1.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

A checked card remains checked after applying a search that matches it, and the selection toolbar count is unchanged.

# Classification

- Read-only
- Positive
- UI Interaction

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not use static environment-specific data.
- Do not hardcode group names, card names, or counts.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending