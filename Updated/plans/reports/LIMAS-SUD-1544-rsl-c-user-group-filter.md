---
test_id: "LIMAS-SUD-1544"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"User Group\" → \"Select User Group triggers POST with group as JSON array, page=0, filtered counts\""
module: "Reports"
page: "Reports"
section: "User Group"
control: "Filter"
action: "Select runtime User Group triggers POST with group as JSON array in body, page=0, filtered counts, visible rows match Group"
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

Verify that selecting a User Group from the combobox triggers a POST request to `/api/report/standardlicenses` with `group` as a JSON array in the body, `page` reset to 0, filtered counts updated, and visible rows matching the selected Group.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to the Reports page.
- Standard Licenses card is selected and the filter panel is expanded.
- Unfiltered data is loaded.

# Test Data

Use `{runtimeUserGroup}` as a User Group value known to match at least one row.

# Steps and Expected Results

1. Action: Select `{runtimeUserGroup}` from the User Group combobox.
   Expected Result: A POST request fires.

2. Action: Verify request query contains `page=0` and `size` is preserved.
   Expected Result: Page reset, size unchanged.

3. Action: Parse the request body and assert `group` is a JSON array containing `"{runtimeUserGroup}"`.
   Expected Result: `{ "group": ["{runtimeUserGroup}"] }`.

4. Action: Assert the filtered total count updates and is less than or equal to the unfiltered total.
   Expected Result: Counts reflect filtered results.

5. Action: Assert every visible row's User Group column contains or matches `{runtimeUserGroup}`.
   Expected Result: Rows correspond to the selected Group.

# Network Verification

- Request URL: `POST /api/report/standardlicenses?page=0&size={size}`
- HTTP Method: POST
- Expected Status: 200
- Payload: `{ "group": ["{runtimeUserGroup}"] }`

# Expected Final Result

Selecting a User Group submits `group` as a JSON array, resets to page 0, and displays matching rows with updated counts.

# Classification

- Read-only
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode User Group names.
- Do not repeat data-changing submissions.

# Generation Status

- Test script generation: Pending
- CI/CD execution: Pending
- Healing: Pending