---
test_id: "LIMAS-SUD-1547"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Product Profile\" → \"Select Profile triggers POST with productProfile array, page=0, Profile Role enabled\""
module: "Reports"
page: "Reports"
section: "Product Profile"
control: "Filter"
action: "Select runtime Product Profile triggers POST with productProfile JSON array, page=0, filtered counts, Profile Role becomes enabled"
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

Verify that selecting a Product Profile triggers a POST request with `productProfile` as a JSON array, `page` reset to 0, filtered counts updated, visible rows matching the selected Profile, and the Profile Role control becomes enabled.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to the Reports page.
- Standard Licenses card is selected and the filter panel is expanded.
- Profile Role control is initially disabled.
- Unfiltered data is loaded.

# Test Data

Use `{runtimeProfile}` as a Product Profile value known to match at least one row.

# Steps and Expected Results

1. Action: Assert the Profile Role control is initially disabled.
   Expected Result: Profile Role is disabled before Profile selection.

2. Action: Select `{runtimeProfile}` from the Product Profile combobox.
   Expected Result: A POST request fires.

3. Action: Verify request body contains `productProfile` as a JSON array with `["{runtimeProfile}"]`.
   Expected Result: `{ "productProfile": ["{runtimeProfile}"] }`.

4. Action: Verify `page=0` and `size` preserved in query params.
   Expected Result: Pagination reset correctly.

5. Action: Assert filtered counts update and visible rows match the selected Profile.
   Expected Result: Data is filtered correctly.

6. Action: Assert the Profile Role control is now enabled.
   Expected Result: Profile Role becomes interactive after Profile selection.

# Network Verification

- Request URL: `POST /api/report/standardlicenses?page=0&size={size}`
- HTTP Method: POST
- Expected Status: 200
- Payload: `{ "productProfile": ["{runtimeProfile}"] }`

# Expected Final Result

Selecting a Product Profile filters data, enables Profile Role, and submits `productProfile` as a JSON array with correct pagination.

# Classification

- Read-only
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode Product Profile names.
- Do not repeat data-changing submissions.

# Generation Status

- Test script generation: Pending
- CI/CD execution: Pending
- Healing: Pending