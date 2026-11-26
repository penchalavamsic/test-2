---
test_id: "LIMAS-SUD-1580"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Result Sync\" → \"Counts synchronize after date filter: toolbar base unchanged, loaded <= total, rendered=loaded, zero-result shows 0, counts restore after Clear\""
module: "Reports"
page: "Reports"
section: "Result Sync"
control: "Counts After Date Filter"
action: "After any date filter: toolbar base count unchanged, loaded <= filtered total, rendered rows = loaded, counts change only after request settles, counts restore after Clear, zero-result dates show 0 loaded and 0 total"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Reports Standard Licenses RSL-D"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "not-generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: ""
---

# Purpose

Verify that after any date filter is applied: the toolbar base count remains unchanged, the loaded count is less than or equal to the filtered total, the number of rendered rows equals the loaded count, counts only change after the network request settles, counts restore to original values after Clear, and zero-result filters show 0 for both loaded and total.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to the Reports page.
- Standard Licenses card is selected, the filter panel is expanded, and the Active tab is selected.
- Unfiltered data is loaded with a non-zero total.

# Test Data

Use `{runtimeCurrentDate}` for a date filter with results and `{runtimeNoMatchDate}` for a no-match date filter.

# Steps and Expected Results

1. Action: Note the unfiltered toolbar count and loaded count.
   Expected Result: Toolbar count equals the total from the initial API response; loaded ≤ total.

2. Action: Count visible rows and assert the count matches the loaded count.
   Expected Result: Rendered rows equal loaded count.

3. Action: Apply Expiration Date set to `{runtimeCurrentDate}`.
   Expected Result: Filtered results appear.

4. Action: Assert the toolbar base count (from the unfiltered initial response) remains displayed or unchanged somewhere in the UI.
   Expected Result: Base count (e.g., total of all Active records) is not overwritten.

5. Action: Assert the loaded count matches the `content.length` from the filtered response and is ≤ filtered `totalElements`.
   Expected Result: Loaded ≤ filtered total.

6. Action: Assert rendered rows equal the loaded count.
   Expected Result: Row-count consistency holds after filtering.

7. Action: Apply a no-match date (`{runtimeNoMatchDate}`) and assert both loaded and total show 0.
   Expected Result: Zero-result state: loaded=0, total=0.

8. Action: Click Clear and assert toolbar count and loaded count restore to their original unfiltered values.
   Expected Result: Counts fully restore after Clear.

# Network Verification

- Each POST response provides `totalElements` and `content`; UI counts must match.
- Counts only update after the response settles, not preemptively.

# Expected Final Result

Counts remain synchronized after date filtering: base count unchanged, loaded/total consistent, zero-result shows 0, and counts restore after Clear.

# Classification

- Read-only
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode dates, counts, or row data.
- Do not repeat data-changing submissions.

# Generation Status

- Test script generation: Pending
- CI/CD execution: Pending
- Healing: Pending