---
test_id: "LIMAS-SUD-1526"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Infinite Scroll\" → \"Restore initial batch after additional load\""
module: "Reports"
page: "Reports"
section: "Standard Licenses Infinite Scroll"
control: "Restoration"
action: "Initial batch restored to page 0"
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

After an additional batch load, restore the initial page-0 batch using the established restoration method and verify all initial conditions.

# Preconditions

- At least one additional batch load triggered.
- Currently showing > initial loaded count.

# Test Data

Use `ReportsPage.restoreStandardLicenseInitialBatch()` which navigates away and back to /reports to re-trigger the initial page=0 request.

# Steps and Expected Results

1. Action: Wait for any pending requests to settle.
   Expected Result: No pending requests.

2. Action: Call `restoreStandardLicenseInitialBatch()`.
   Expected Result: Navigates away and back; page=0 request fires.

3. Action: Wait for the page=0 request to complete.
   Expected Result: Request succeeds with 200.

4. Action: Scroll to top of the page.
   Expected Result: `window.scrollY = 0`.

5. Action: Verify Standard Licenses `aria-pressed="true"`.
   Expected Result: Standard Licenses selected.

6. Action: Verify Active `aria-pressed="true"`, Deleted `aria-pressed="false"`.
   Expected Result: Tabs in correct state.

7. Action: Verify Filters collapsed and filters empty.
   Expected Result: Email searchbox not visible; filter values empty.

8. Action: Verify initial batch visible — loaded-total text and table rows present.
   Expected Result: Loaded-total text visible. Row count equals loaded count.

9. Action: Verify Export Excel not activated, no error toast, no request pending.
   Expected Result: No errors, no pending network.

10. Action: Verify route remains /reports.
    Expected Result: URL pathname matches /reports.

# Network Verification

- A page=0 GET request fires during restoration.

# Expected Final Result

Initial page=0 batch restored. All initial conditions verified. Browser remains open.

# Classification

- Read-only
- Positive

# Restrictions

- Do not hardcode row data or counts.

# Generation Status

- Test script generation: Pending
- CI/CD execution: Pending
- Healing: Pending