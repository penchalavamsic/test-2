---
test_id: "LIMAS-SUD-1821"
title: "To verify search input filters the group tree"
module: "Floating License Configurations"
page: "Floating License Configurations"
section: "Search Groups"
control: "Search Input"
action: "Filtering"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Floating License Configurations FLC-A"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/floating-license-configurations/floating-license-configurations-group-selection.spec.ts"
---

# Purpose

Verify that typing a search fragment into the Group Search input filters the visible tree items so that the filtered count does not exceed the baseline count.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and on the Floating License Configurations page showing the group-selection tree.

# Test Data

Use environment variables and the authenticated fixture. No static group names or IDs.

# Steps and Expected Results

1. Action: Navigate to the Floating License Configurations group-selection page and verify the "Select a User Group" heading is visible.
   Expected Result: The group-selection heading is displayed and the tree contains visible items.

2. Action: Record the baseline count of visible tree items before any filtering.
   Expected Result: Baseline count is a positive integer captured at runtime.

3. Action: Discover a runtime search fragment from the text of the first visible group name (e.g., first N characters of its label).
   Expected Result: A non-empty fragment string is captured.

4. Action: Type the captured fragment into the Group Search input.
   Expected Result: The search input reflects the typed fragment.

5. Action: Count the visible tree items after filtering and compare to the baseline count.
   Expected Result: The filtered count is greater than 0 and less than or equal to the baseline count.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

The Group Search input filters the tree such that the filtered item count is at most the baseline count, confirming the filtering behavior works.

# Classification

- Floating License Configurations FLC-A
- Positive

# Restrictions

- Do not hardcode group names, IDs, or counts. Discover all values at runtime.
- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not use static environment-specific data.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending