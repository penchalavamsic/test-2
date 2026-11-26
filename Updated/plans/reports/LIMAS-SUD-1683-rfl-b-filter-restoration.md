---
test_id: "LIMAS-SUD-1683"
title: "To verify the functionality of \"Reports\" → \"Floating Licenses\" → \"Restoration\" → \"Filter State Restoration\""
module: "Reports"
page: "Reports"
section: "Floating Licenses"
control: "Restoration"
action: "Filter State Restoration"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Reports Floating Licenses RFL-B"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/reports/reports-floating-licenses-filters.spec.ts"
---

# Purpose

After applying multiple filters, restore the initial state: all filters cleared, Profile Role disabled, counts restored, route /reports, no pending requests.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable. Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses is selected, Active mode.

# Test Data

All values dynamic.

# Steps and Expected Results

1. Action: Apply Email, Profile, Role, and Date filters.
   Expected Result: Multiple chips visible.

2. Action: Click Clear all.
   Expected Result: All chips removed, inputs cleared, Profile Role disabled.

3. Action: Collapse the Filters panel.
   Expected Result: Panel collapsed.

4. Action: Verify Floating Licenses selected, Active pressed, Deleted unpressed.
   Expected Result: Correct selection states.

5. Action: Verify route.
   Expected Result: URL pathname matches /reports.

6. Action: Verify counts.
   Expected Result: Record count and loaded/total match initial values.

# Network Verification

No pending requests; initial GET settled.

# Expected Final Result

Full restoration to initial Floating Licenses state with all filters cleared.

# Classification

- Read-only
- Positive

# Restrictions

- Do not hardcode values.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending