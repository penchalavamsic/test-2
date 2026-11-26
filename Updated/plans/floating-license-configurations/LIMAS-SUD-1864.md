---
test_id: "LIMAS-SUD-1864"
title: "To verify safe restoration of configuration list to clean state"
module: "Floating License Configurations"
page: "Floating License Configurations"
section: "Safe Restoration"
control: "Configuration List"
action: "State Restoration"
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

Verify that after applying a filter, calling restoreConfigurationListState clears filter chips, closes the filters panel, and returns to a clean state with the heading and group summary visible.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and on the Floating License Configurations group-selection page showing the group-selection tree.

# Test Data

Use environment variables and the authenticated fixture. No static filter values or group names.

# Steps and Expected Results

1. Action: Navigate to the Floating License Configurations group-selection page, select a runtime leaf group, and confirm the configuration list loads.
   Expected Result: The configuration list view is displayed with heading and group summary visible.

2. Action: Open the filters panel, select the "Available" radio under Checkout Availability, and click Apply Filters.
   Expected Result: A "Checkout: Available" filter chip appears on the page.

3. Action: Call the restoreConfigurationListState helper to return the configuration list to a clean state.
   Expected Result: The helper runs without errors.

4. Action: Verify no filter chips are visible on the page.
   Expected Result: No filter chips remain.

5. Action: Verify the filters panel is not open.
   Expected Result: The filters panel is closed.

6. Action: Verify the configuration list heading is visible.
   Expected Result: The heading is displayed.

7. Action: Verify the group summary (selected group name and configuration count) is visible.
   Expected Result: The group summary is displayed.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

The restoreConfigurationListState helper returns the configuration list to a clean state: no filter chips, filters panel closed, heading and group summary visible.

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