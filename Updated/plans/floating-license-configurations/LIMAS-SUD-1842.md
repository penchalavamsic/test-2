---
test_id: "LIMAS-SUD-1842"
title: "To verify dynamic configuration count is displayed"
module: "Floating License Configurations"
page: "Floating License Configurations"
section: "Configuration List Shell"
control: "Configuration Count"
action: "Count Display"
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

Verify the configuration count text is visible and shows a non-negative number.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and on the Floating License Configurations group-selection page showing the group-selection tree.

# Test Data

Use environment variables and the authenticated fixture. No static counts or IDs.

# Steps and Expected Results

1. Action: Navigate to a runtime group's configuration list by selecting a leaf group from the tree.
   Expected Result: The configuration list view loads.

2. Action: Locate the configuration count text on the page.
   Expected Result: The count text element is visible and not empty.

3. Action: Extract the numeric value from the count text and assert it is a non-negative integer.
   Expected Result: The parsed count is >= 0.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

The configuration count text is visible and displays a non-negative number that reflects the loaded configurations.

# Classification

- Floating License Configurations FLC-B
- Positive

# Restrictions

- Do not hardcode group names, IDs, or counts. Discover all values at runtime.
- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not use static environment-specific data.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending