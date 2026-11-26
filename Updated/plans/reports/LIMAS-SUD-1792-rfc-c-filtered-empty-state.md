---
test_id: "LIMAS-SUD-1792"
title: "To verify the functionality of \"Reports\" → \"Floating Configurations\" → \"Deleted Mode\" → \"Filtered Empty State\""
module: "Reports"
page: "Reports"
section: "Floating Configurations"
control: "Deleted Mode"
action: "Filtered Empty State"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
classification: "Reports Floating Configurations RFC-C"
test_type: "Boundary"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/reports/reports-floating-configurations-deleted.spec.ts"
---

# Purpose

Verify that after applying a filter with zero matching results, no rows are visible, the record count shows "{0} records", the UI does not crash, and all filter controls remain interactive and usable.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated on the Reports page with Floating Configurations selected.
- Deleted mode has been selected and fully loaded.

# Test Data

A non-matching filter string is generated at runtime.

# Steps and Expected Results

1. Action: Apply a zero-result filter by typing a non-matching string into one of the filter textboxes.
   Expected Result: No table rows are visible in the content area. The record count displays "{0} records".

2. Action: Verify the UI does not crash.
   Expected Result: No error messages, blank screens, or console errors appear. The page remains stable.

3. Action: Verify all filter controls remain interactive.
   Expected Result: All three filter textboxes are visible, enabled, and accept input. The Clear button is visible and enabled.

4. Action: Verify the mode controls remain usable.
   Expected Result: Active and Deleted mode controls are visible and interactive.

5. Action: Clear the filter and verify restoration.
   Expected Result: Clicking Clear restores the full dataset and the table renders rows again.

# Network Verification

- No API requests fire during the zero-result state or on Clear (unless a reload is triggered — record behavior).

# Expected Final Result

The zero-result filter state shows no rows, "{0} records", no crash, and all filter and mode controls remain interactive.

# Classification

- Read-only
- Boundary

# Restrictions

- Do not hardcode the non-matching filter string. Generate dynamically.
- Do not include credentials, tokens, cookies, or sensitive payloads.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending