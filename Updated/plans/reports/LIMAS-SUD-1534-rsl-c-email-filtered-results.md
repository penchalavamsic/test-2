---
test_id: "LIMAS-SUD-1534"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Email Filter\" → \"Filtered total count updates, loaded count updates, visible rows correspond, Active remains selected\""
module: "Reports"
page: "Reports"
section: "Email Filter"
control: "Filtered Results"
action: "Filtered total count updates, loaded count updates, visible rows correspond to email evidence, no stale unfiltered rows, Active remains selected"
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

Verify that after applying an Email filter, the filtered total count updates, the loaded count updates, every visible row's email column contains evidence of the filter value, no unfiltered rows remain, and the Active tab remains selected.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to the Reports page.
- Standard Licenses card is selected and the filter panel is expanded.
- Initial unfiltered data is loaded.

# Test Data

Use `{runtimeEmail}` as the filter value.

# Steps and Expected Results

1. Action: Note the unfiltered total and loaded counts, then apply the Email filter with `{runtimeEmail}`.
   Expected Result: A filtered POST request fires and the page updates.

2. Action: Assert the filtered total count is less than or equal to the unfiltered total.
   Expected Result: Total count reflects the filtered subset.

3. Action: Assert the loaded count updates to match the number of rows received in the filtered response.
   Expected Result: Loaded count is consistent with the visible rows.

4. Action: Assert every visible row's email column contains or matches `{runtimeEmail}`.
   Expected Result: No row with a non-matching email is present.

5. Action: Assert the Active tab (or currently selected license-mode tab) remains selected.
   Expected Result: Tab selection is unchanged after filtering.

# Network Verification

- Request URL: `POST /api/report/standardlicenses?page=0&size={size}`
- Payload: `{ "email": "{runtimeEmail}" }`
- Response: `{ content: [...], totalElements: number }` with filtered data

# Expected Final Result

Filtered results display only rows matching the email filter, counts update correctly, and the Active tab stays selected.

# Classification

- Read-only
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode email addresses, counts, or row data.
- Do not repeat data-changing submissions.

# Generation Status

- Test script generation: Pending
- CI/CD execution: Pending
- Healing: Pending