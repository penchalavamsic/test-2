---
test_id: "LIMAS-SUD-1570"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"License Created Date\" → \"Clear Created Date individually, input empties, POST with createdDate=null, unfiltered data returns, page=0\""
module: "Reports"
page: "Reports"
section: "License Created Date"
control: "Clear"
action: "Clear Created Date individually, input empties, POST with createdDate=null, unfiltered data returns, page=0"
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

Verify that individually clearing the License Created Date filter via chip Remove empties the input, fires a POST with `createdDate` as `null`, returns unfiltered data with `page=0`, and restores original counts.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to the Reports page.
- Standard Licenses card is selected, the filter panel is expanded, and the Active tab is selected.
- License Created Date has a date applied (`{runtimeCurrentDate}`) and filtered results are displayed.

# Test Data

Use `{runtimeCurrentDate}` as the initially applied date. Intercept network requests.

# Steps and Expected Results

1. Action: Apply `{runtimeCurrentDate}` in License Created Date and confirm the filtered state.
   Expected Result: `Created: {runtimeCurrentDate}` chip visible; filtered results loaded.

2. Action: Click the Remove (×) button on the License Created Date filter chip.
   Expected Result: The chip is removed; the License Created Date input becomes empty.

3. Action: Assert a POST fires with `page=0` and `createdDate` as `null` or not present.
   Expected Result: Body does not contain a date value for `createdDate`.

4. Action: Assert unfiltered data returns and the total count matches the original unfiltered value.
   Expected Result: Counts restored to unfiltered state.

5. Action: Assert no other filter controls are altered.
   Expected Result: All other filters remain unchanged.

# Network Verification

- After clear, POST includes `createdDate: null` or omits the field; `page=0`.
- Response returns full unfiltered paginated JSON.

# Expected Final Result

Individually clearing License Created Date via chip Remove empties the input, fires a POST without the date, and restores unfiltered data.

# Classification

- Read-only
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode dates or counts.
- Do not repeat data-changing submissions.

# Generation Status

- Test script generation: Pending
- CI/CD execution: Pending
- Healing: Pending