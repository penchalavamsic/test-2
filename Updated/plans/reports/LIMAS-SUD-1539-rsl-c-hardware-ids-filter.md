---
test_id: "LIMAS-SUD-1539"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Hardware IDs\" → \"Single Hardware ID triggers POST with hardwareId as JSON array, page=0, filtered counts\""
module: "Reports"
page: "Reports"
section: "Hardware IDs"
control: "Filter"
action: "Single Hardware ID entry triggers POST with hardwareId as JSON array, page=0, size preserved, filtered counts, visible rows match"
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

Verify that entering a single Hardware ID and submitting triggers a POST request to `/api/report/standardlicenses` with `hardwareId` as a JSON array in the body, `page` reset to 0, `size` preserved, filtered counts updated, and visible rows match the Hardware ID.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to the Reports page.
- Standard Licenses card is selected and the filter panel is expanded.
- Unfiltered data is loaded.

# Test Data

Use `{runtimeHardwareId}` as a value known to match at least one row.

# Steps and Expected Results

1. Action: Type `{runtimeHardwareId}` into the Hardware IDs input and press Enter.
   Expected Result: A POST request fires.

2. Action: Verify the request query contains `page=0` and `size` matches the current size.
   Expected Result: Page reset and size preserved.

3. Action: Parse the request body and assert `hardwareId` is a JSON array containing `"{runtimeHardwareId}"`.
   Expected Result: `{ "hardwareId": ["{runtimeHardwareId}"] }`.

4. Action: Assert the filtered total count updates and is less than or equal to the unfiltered total.
   Expected Result: Counts reflect the filtered subset.

5. Action: Assert every visible row's hardware ID column contains or matches `{runtimeHardwareId}`.
   Expected Result: Rows are correctly filtered.

# Network Verification

- Request URL: `POST /api/report/standardlicenses?page=0&size={size}`
- HTTP Method: POST
- Expected Status: 200
- Payload: `{ "hardwareId": ["{runtimeHardwareId}"] }`

# Expected Final Result

A single Hardware ID filter submits `hardwareId` as a JSON array, resets to page 0, and displays matching rows with updated counts.

# Classification

- Read-only
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode Hardware ID values.
- Do not repeat data-changing submissions.

# Generation Status

- Test script generation: Pending
- CI/CD execution: Pending
- Healing: Pending