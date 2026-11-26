---
test_id: "LIMAS-SUD-1855"
title: "To verify Filters panel opens with heading and all filter controls"
module: "Floating License Configurations"
page: "Floating License Configurations"
section: "Filters"
control: "Filters Button"
action: "Panel Open"
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

Verify the Filters panel opens showing "Configuration Filters" heading, Product Profile dropdown, Profile Role dropdown, Checkout Availability radio group, and Apply Filters button.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and on the Floating License Configurations group-selection page showing the group-selection tree.

# Test Data

Use environment variables and the authenticated fixture. No static filter values.

# Steps and Expected Results

1. Action: Navigate to the Floating License Configurations group-selection page, select a runtime leaf group, and confirm the configuration list loads.
   Expected Result: The configuration list view is displayed.

2. Action: Click the Filters button.
   Expected Result: A filters panel opens.

3. Action: Verify the panel heading text.
   Expected Result: The heading reads "Configuration Filters".

4. Action: Verify the Product Profile filter control is visible.
   Expected Result: The Product Profile dropdown is visible.

5. Action: Verify the Profile Role filter control is visible.
   Expected Result: The Profile Role dropdown is visible.

6. Action: Verify the Checkout Availability radio group is visible.
   Expected Result: Radio buttons for Checkout Availability are visible (All, Available, Reserved).

7. Action: Verify the Apply Filters button is visible.
   Expected Result: The Apply Filters button is visible and enabled.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

The Filters panel opens and displays all expected filter controls including heading, Product Profile, Profile Role, Checkout Availability radios, and Apply Filters button.

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