---
test_id: "LIMAS-SUD-1823"
title: "To verify clearing search restores the full group tree"
module: "Floating License Configurations"
page: "Floating License Configurations"
section: "Search Groups"
control: "Search Input"
action: "Search Clear"
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

Verify that clearing the search field restores the full unfiltered tree to its original item count.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and on the Floating License Configurations page showing the group-selection tree.

# Test Data

Use environment variables and the authenticated fixture. No static group names or counts.

# Steps and Expected Results

1. Action: Navigate to the Floating License Configurations group-selection page and verify the "Select a User Group" heading is visible.
   Expected Result: The group-selection heading is displayed and the tree contains visible items.

2. Action: Record the baseline count of visible tree items before any filtering.
   Expected Result: Baseline count is a positive integer captured at runtime.

3. Action: Type a search fragment (discovered from a visible group name) into the Group Search input.
   Expected Result: The filtered tree shows fewer or equal items compared to baseline.

4. Action: Clear the search input (e.g., via the clear button or by emptying the field).
   Expected Result: The search input is empty.

5. Action: Count the visible tree items and compare to the baseline count.
   Expected Result: The visible item count equals the baseline count recorded in step 2.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

Clearing the search field restores the full unfiltered tree with the same item count as the initial baseline.

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