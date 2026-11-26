---
test_id: "LIMAS-SUD-1540"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Hardware IDs\" → \"Two comma-separated Hardware IDs as multi-value POST body, Clear restores\""
module: "Reports"
page: "Reports"
section: "Hardware IDs"
control: "Multiple IDs"
action: "Two Hardware IDs entry as comma-separated, multi-value representation in POST body, duplicate prevention, Clear restores"
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

Verify that entering two comma-separated Hardware IDs submits both as a JSON array in the POST body, results include rows matching either ID, duplicates are not submitted, and Clear restores the unfiltered state.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to the Reports page.
- Standard Licenses card is selected and the filter panel is expanded.
- At least two distinct Hardware IDs exist in the data.

# Test Data

Use `{runtimeHardwareId1}` and `{runtimeHardwareId2}` as two distinct Hardware IDs.

# Steps and Expected Results

1. Action: Type `{runtimeHardwareId1}, {runtimeHardwareId2}` into the Hardware IDs input and press Enter.
   Expected Result: A POST request fires.

2. Action: Parse the request body and assert `hardwareId` is a JSON array containing both values: `["{runtimeHardwareId1}", "{runtimeHardwareId2}"]`.
   Expected Result: Both IDs are submitted as array elements.

3. Action: Assert no duplicate values exist in the `hardwareId` array.
   Expected Result: Array contains unique values only.

4. Action: Assert visible rows contain either `{runtimeHardwareId1}` or `{runtimeHardwareId2}` in the hardware ID column.
   Expected Result: Multi-value OR filtering is applied.

5. Action: Click Clear and assert unfiltered data returns with original counts.
   Expected Result: Clear restores the default view.

# Network Verification

- Request URL: `POST /api/report/standardlicenses?page=0&size={size}`
- Payload: `{ "hardwareId": ["{runtimeHardwareId1}", "{runtimeHardwareId2}"] }` with unique entries

# Expected Final Result

Comma-separated Hardware IDs submit as a unique JSON array and return matching rows via OR logic; Clear restores defaults.

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