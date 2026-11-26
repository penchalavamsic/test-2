---
test_id: "LIMAS-SUD-1789"
title: "To verify the functionality of \"Reports\" → \"Floating Configurations\" → \"Deleted Mode\" → \"Filter Zero Result\""
module: "Reports"
page: "Reports"
section: "Floating Configurations"
control: "Deleted Mode"
action: "Filter Zero Result"
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

Verify that entering a non-matching filter value produces a zero-result state with no rows displayed, record count showing "{0} records", loaded/total showing "{0} loaded · {0} total", and no crash or error.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated on the Reports page with Floating Configurations selected.
- Deleted mode has been selected and fully loaded.
- The Filters panel is open.

# Test Data

A filter value that does not match any record in the loaded dataset (e.g., a deliberately non-matching string).

# Steps and Expected Results

1. Action: Enter a non-matching value into one of the filter textboxes.
   Expected Result: No table rows are visible. The record count displays "{0} records".

2. Action: Verify the loaded/total display.
   Expected Result: The display shows "{0} loaded · {0} total". Both counts are zero.

3. Action: Verify no crash or error state.
   Expected Result: The UI remains stable. No error message, no blank screen, no console errors. Filter controls remain interactive and visible.

4. Action: Verify the Clear button is still functional.
   Expected Result: The Clear button is visible and enabled.

5. Action: Click Clear to restore the full dataset.
   Expected Result: All {runtimeTotalElements} records are restored. The UI returns to the fully loaded state.

# Network Verification

- No API requests fire during the zero-result filter state.
- No API requests fire when Clear restores the dataset (unless a reload is triggered — record behavior).

# Expected Final Result

A non-matching filter value produces a clean zero-result state with "{0} records", "{0} loaded · {0} total", no crash, and Clear restores the full dataset.

# Classification

- Read-only
- Boundary

# Restrictions

- Do not hardcode the non-matching filter value. Use a runtime-generated string unlikely to match.
- Do not include credentials, tokens, cookies, or sensitive payloads.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending