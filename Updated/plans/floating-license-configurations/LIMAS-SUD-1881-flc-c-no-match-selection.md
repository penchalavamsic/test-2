---
test_id: "LIMAS-SUD-1881"
title: "To verify hidden card due to no-match search clears visible selection"
module: "Floating License Configurations"
page: "Floating License Configurations"
section: "Search and Filter Interaction"
control: "Search Input"
action: "No-Match Selection"
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

Verify selection count is 0 when a selected card is hidden by a no-match search. Clear search afterwards.

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

2. Action: Check the checkbox on the first visible card.
   Expected Result: The selection toolbar appears with count 1.

3. Action: Type a search string known to not match any visible card title into the search input.
   Expected Result: The selected card is hidden from view.

4. Action: Verify the selection state.
   Expected Result: The selection toolbar either is hidden or shows a count of 0.

5. Action: Clear the search input.
   Expected Result: The page returns to its original state with all cards visible.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

When a selected card is hidden by a no-match search, the selection count is 0 or the toolbar is hidden. Clearing the search restores normal visibility.

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