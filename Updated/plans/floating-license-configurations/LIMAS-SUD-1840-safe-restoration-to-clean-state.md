---
test_id: "LIMAS-SUD-1840"
title: "To verify safe restoration to clean group-selection state"
module: "Floating License Configurations"
page: "Floating License Configurations"
section: "Safe Restoration"
control: "Group-Selection Panel"
action: "State Restoration"
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

Verify that after navigating to configuration view and back, clearing search and collapsing all restores the initial clean state with heading, panel heading, empty search, and no selection.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and on the Floating License Configurations group-selection page showing the group-selection tree.

# Test Data

Use environment variables and the authenticated fixture. No static group names, IDs, or counts.

# Steps and Expected Results

1. Action: Navigate to the Floating License Configurations group-selection page and verify the "Select a User Group" heading is visible.
   Expected Result: The group-selection heading is displayed.

2. Action: Discover a runtime leaf group and click it to navigate to the configuration page.
   Expected Result: The page transitions to the configuration view.

3. Action: Click the Back button.
   Expected Result: The page returns to the group-selection view.

4. Action: Clear the search input (if any text is present in it).
   Expected Result: The search input is empty.

5. Action: Click Collapse All to collapse all expanded groups.
   Expected Result: All groups are collapsed.

6. Action: Verify the following clean state assertions:
   Expected Result:
   - The "Select a User Group" heading is visible.
   - The group-selection panel heading is visible.
   - The search input is empty.
   - No group is shown as selected (no active/highlighted selection).

# Network Verification

No API verification needed for this plan.

# Expected Final Result

After navigating to the configuration view and back, clearing search and collapsing all restores the initial clean group-selection state: heading, panel heading, empty search, and no selection.

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