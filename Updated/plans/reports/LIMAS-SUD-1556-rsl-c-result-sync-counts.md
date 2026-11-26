---
test_id: "LIMAS-SUD-1556"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Result Synchronization\" → \"Toolbar count equals filtered total, loaded <= total, counts restore after Clear\""
module: "Reports"
page: "Reports"
section: "Result Synchronization"
control: "Counts"
action: "Toolbar count equals filtered total, loaded <= total, rendered rows match loaded, counts restore after Clear, empty results show 0"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Reports Standard Licenses RSL-C"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "not-generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: ""
---

# Purpose

Verify that the toolbar record count equals the filtered total from the API response, the loaded count is less than or equal to the total, the number of rendered rows matches the loaded count, counts restore to original values after Clear, and empty results show 0 for both counts.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to the Reports page.
- Standard Licenses card is selected and the filter panel is expanded.
- Unfiltered data is loaded with a non-zero total.

# Test Data

Use `{runtimeEmail}` and `{runtimeNoMatchEmail}` to test filtered and empty states.

# Steps and Expected Results

1. Action: Note the toolbar count and loaded count in the unfiltered state.
   Expected Result: Toolbar count equals the total from the initial API response; loaded <= total.

2. Action: Count the visible rows and assert the count matches the loaded count.
   Expected Result: Rendered rows equal loaded count.

3. Action: Apply the Email filter with `{runtimeEmail}`.
   Expected Result: Filtered results appear.

4. Action: Assert toolbar count equals the filtered `totalElements` from the API response.
   Expected Result: Toolbar count syncs with filtered total.

5. Action: Assert loaded count is <= filtered total and rendered rows match loaded count.
   Expected Result: Row-count consistency holds after filtering.

6. Action: Apply a no-match filter (`{runtimeNoMatchEmail}`) and assert both toolbar count and loaded count show 0.
   Expected Result: Empty state shows 0 for both counts.

7. Action: Click Clear and assert toolbar count and loaded count restore to their original unfiltered values.
   Expected Result: Counts fully restore after Clear.

# Network Verification

- Each API response provides `totalElements`; the UI toolbar must match it.
- `content.length` in each response must equal or contribute to the loaded count.

# Expected Final Result

Toolbar and loaded counts are synchronized with API responses across filtered, empty, and restored states.

# Classification

- Read-only
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode counts, email addresses, or row data.
- Do not repeat data-changing submissions.

# Generation Status

- Test script generation: Pending
- CI/CD execution: Pending
- Healing: Pending