---
test_id: "LIMAS-SUD-1862"
title: "To verify Refresh preserves visible configuration cards"
module: "Floating License Configurations"
page: "Floating License Configurations"
section: "Refresh"
control: "Refresh Button"
action: "Card Preservation"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Floating License Configurations FLC-B"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/floating-license-configurations/floating-license-configurations-list-controls.spec.ts"
---

# Purpose

Verify the number of visible configuration cards remains the same after clicking Refresh.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and on the Floating License Configurations group-selection page showing the group-selection tree.

# Test Data

Use environment variables and the authenticated fixture. No static card counts.

# Steps and Expected Results

1. Action: Navigate to the Floating License Configurations group-selection page, select a runtime leaf group, and confirm the configuration list loads.
   Expected Result: The configuration list view is displayed with at least one visible configuration card.

2. Action: Count the number of visible configuration cards at runtime.
   Expected Result: A positive integer count is captured.

3. Action: Click the Refresh button.
   Expected Result: The page refreshes.

4. Action: Count the visible configuration cards again and compare with the value from step 2.
   Expected Result: The visible card count remains the same (exact match).

# Network Verification

No API verification needed for this plan.

# Expected Final Result

The count of visible configuration cards is unchanged after clicking Refresh.

# Classification

- Floating License Configurations FLC-B
- Positive

# Restrictions

- Do not hardcode group names, configuration names, IDs, or counts. Discover all values at runtime.
- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not use static environment-specific data.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending