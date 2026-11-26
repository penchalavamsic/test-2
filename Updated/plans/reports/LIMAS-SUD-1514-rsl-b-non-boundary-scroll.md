---
test_id: "LIMAS-SUD-1514"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Infinite Scroll\" → \"Non-boundary scroll does not trigger additional request\""
module: "Reports"
page: "Reports"
section: "Standard Licenses Infinite Scroll"
control: "Non-Boundary Scroll"
action: "No additional request triggered"
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

Verify that scrolling within the currently loaded rows without reaching the sentinel trigger boundary does not cause an additional API request.

# Preconditions

- Initial page=0, size=runtime request has completed.
- Loaded count > 0, rendered rows equal loaded count.
- Scroll container identified.

# Test Data

Use `ReportsPage.scrollStandardLicensesWithinCurrentBatch()` which scrolls a small amount within the loaded batch without reaching the trigger.

# Steps and Expected Results

1. Action: Capture initial loaded count and row count.
   Expected Result: Runtime values stored.

2. Action: Call `scrollStandardLicensesWithinCurrentBatch()`.
   Expected Result: Scroll position changes within existing rows; no API request fires.

3. Action: Verify no additional `allstandardlicenses` request fired after the scroll.
   Expected Result: Request count for the Standard Licenses endpoint remains unchanged.

4. Action: Verify loaded count and row count unchanged.
   Expected Result: Same loaded count and rendered row count as initial state.

5. Action: Verify Active tab still selected and Filters still collapsed.
   Expected Result: Active `aria-pressed="true"`, Filters panel hidden.

# Network Verification

- Request URL: No new request to `/api/report/allstandardlicenses`.
- Count of requests before and after must be equal.

# Expected Final Result

Scrolling within already loaded rows does not trigger an additional API request. State remains unchanged.

# Classification

- Read-only
- Positive

# Restrictions

- Do not hardcode scroll positions or counts.
- Do not trigger a next-page request.

# Generation Status

- Test script generation: Pending
- CI/CD execution: Pending
- Healing: Pending