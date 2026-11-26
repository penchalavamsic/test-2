---
test_id: "LIMAS-SUD-1522"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Infinite Scroll\" → \"State preservation across additional load\""
module: "Reports"
page: "Reports"
section: "Standard Licenses Infinite Scroll"
control: "State Preservation"
action: "Standard Licenses, Active, Filters unchanged"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Reports Standard Licenses RSL-B"
test_type: "Positive"
automation_candidate: true
plan_status: "draft"
script_status: "not-generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: ""
---

# Purpose

Verify that after an additional batch load, the Standard Licenses card, Active tab, and collapsed Filters state remain unchanged.

# Preconditions

- Initial state: Standard Licenses selected, Active selected, Filters collapsed.

# Test Data

Use ReportsPage locators for card aria-pressed, tab aria-pressed, and filter panel visibility.

# Steps and Expected Results

1. Action: Verify initial state — Standard Licenses `aria-pressed="true"`, Active `aria-pressed="true"`, Filters panel hidden.
   Expected Result: All verified.

2. Action: Trigger one additional batch load.
   Expected Result: Request completes.

3. Action: Re-verify Standard Licenses `aria-pressed` is still `"true"`.
   Expected Result: Standard Licenses remains selected.

4. Action: Re-verify Active tab `aria-pressed` is still `"true"` and Deleted tab `aria-pressed` is still `"false"`.
   Expected Result: Active remains selected, Deleted remains unselected.

5. Action: Re-verify Filters panel is still collapsed.
   Expected Result: Email searchbox not visible.

6. Action: Verify Export Excel was not activated.
   Expected Result: No Export-related request or download triggered.

# Network Verification

- No Export Excel or other data-changing request occurred.

# Expected Final Result

All selection state preserved after the additional batch load.

# Classification

- Read-only
- Positive

# Restrictions

- Do not activate Deleted, Floating Licenses, Floating Configurations, or Export Excel.

# Generation Status

- Test script generation: Pending
- CI/CD execution: Pending
- Healing: Pending