---
test_id: "LIMAS-SUD-1856"
title: "To verify Filters panel closes via Cancel button"
module: "Floating License Configurations"
page: "Floating License Configurations"
section: "Filters"
control: "Cancel Button"
action: "Panel Close"
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

Verify clicking the Cancel button closes the filters panel without applying any filters.

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

3. Action: Click the Cancel button in the filters panel.
   Expected Result: The filters panel closes.

4. Action: Verify no filter chips are present on the page.
   Expected Result: No filter chips are visible.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

The Cancel button closes the filters panel without applying any filters, and no filter chips appear.

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