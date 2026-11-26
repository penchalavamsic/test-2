---
test_id: "LIMAS-SUD-1859"
title: "To verify Filters panel Reset clears radio selections"
module: "Floating License Configurations"
page: "Floating License Configurations"
section: "Filters"
control: "Reset Button"
action: "Reset Selections"
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

Verify clicking Reset in the filters panel restores the Checkout Availability radio selection to "All".

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and on the Floating License Configurations group-selection page showing the group-selection tree.

# Test Data

Use environment variables and the authenticated fixture. No static filter values.

# Steps and Expected Results

1. Action: Navigate to the Floating License Configurations group-selection page, select a runtime leaf group, and confirm the configuration list loads.
   Expected Result: The configuration list view is displayed.

2. Action: Click the Filters button to open the filters panel.
   Expected Result: The filters panel is visible.

3. Action: Select the "Available" radio button under Checkout Availability.
   Expected Result: The Available radio is selected.

4. Action: Click the Reset button in the filters panel.
   Expected Result: The Checkout Availability radio selection resets.

5. Action: Verify the "All" radio button is checked again.
   Expected Result: The All radio under Checkout Availability is selected.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

The Reset button clears the Checkout Availability radio selection and restores it to "All" without applying any filters.

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