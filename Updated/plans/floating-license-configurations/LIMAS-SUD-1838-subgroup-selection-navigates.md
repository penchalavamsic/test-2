---
test_id: "LIMAS-SUD-1838"
title: "To verify selecting a subgroup after expanding parent navigates correctly"
module: "Floating License Configurations"
page: "Floating License Configurations"
section: "Parent and Subgroup Selection"
control: "Subgroup Tree Item"
action: "Subgroup Selection"
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

Verify that expanding a parent group and selecting a child subgroup navigates to the configuration page showing the subgroup name.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and on the Floating License Configurations group-selection page showing the group-selection tree with expandable parent groups.

# Test Data

Use environment variables and the authenticated fixture. No static group names, IDs, or counts. If no subgroup is available, mark the test as data-dependent (skip with reason).

# Steps and Expected Results

1. Action: Navigate to the Floating License Configurations group-selection page and verify the "Select a User Group" heading is visible.
   Expected Result: The group-selection heading is displayed and the tree contains visible items.

2. Action: Discover a runtime parent group that has an expand control (e.g., an expand/collapse toggle or chevron).
   Expected Result: A parent group with an expand control is located. If none is found, skip with reason "data-dependent — no parent group with subgroups available."

3. Action: Expand the parent group.
   Expected Result: Child subgroups become visible under the expanded parent.

4. Action: Discover a child subgroup within the expanded parent.
   Expected Result: A clickable subgroup is located. If none is found, skip with reason "data-dependent — no subgroup available under parent."

5. Action: Click the child subgroup.
   Expected Result: The page navigates to the configuration view.

6. Action: Verify that the displayed group name on the configuration page contains the subgroup name.
   Expected Result: The group name shown on the configuration page includes the subgroup name, confirming the correct group was selected.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

Selecting a subgroup after expanding its parent navigates to the configuration page displaying the subgroup name.

# Classification

- Floating License Configurations FLC-A
- Positive
- Data-dependent (no subgroup available)

# Restrictions

- Do not hardcode group names, IDs, or counts. Discover all values at runtime.
- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not use static environment-specific data.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending