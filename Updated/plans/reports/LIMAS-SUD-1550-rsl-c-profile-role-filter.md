---
test_id: "LIMAS-SUD-1550"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Profile Role\" → \"Select Role with Profile: POST includes both productProfile and profileRole, page=0, results match both\""
module: "Reports"
page: "Reports"
section: "Profile Role"
control: "Filter"
action: "Select runtime Role with Profile selected, POST body includes both productProfile and profileRole arrays, page=0, filtered counts, visible rows match both"
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

Verify that selecting a Profile Role while a Product Profile is already selected triggers a POST request with both `productProfile` and `profileRole` as JSON arrays, `page` reset to 0, filtered counts updated, and visible rows match both criteria.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to the Reports page.
- Standard Licenses card is selected and the filter panel is expanded.
- A Product Profile is already selected and Profile Role is enabled.

# Test Data

Use `{runtimeProfile}` and `{runtimeRole}` as values where the Role belongs to the selected Profile.

# Steps and Expected Results

1. Action: Select `{runtimeProfile}` from the Product Profile combobox.
   Expected Result: Profile Role becomes enabled and filtered data appears.

2. Action: Select `{runtimeRole}` from the Profile Role combobox.
   Expected Result: A POST request fires.

3. Action: Parse the request body and assert it contains both `productProfile: ["{runtimeProfile}"]` and `profileRole: ["{runtimeRole}"]`.
   Expected Result: Both arrays are present in the body.

4. Action: Verify `page=0` and `size` preserved in query params.
   Expected Result: Pagination reset correctly.

5. Action: Assert visible rows match both the selected Product Profile and Profile Role.
   Expected Result: Rows satisfy the conjunction of both filters.

6. Action: Assert filtered total count is less than or equal to Profile-only total.
   Expected Result: Counts reflect the narrowed filter.

# Network Verification

- Request URL: `POST /api/report/standardlicenses?page=0&size={size}`
- HTTP Method: POST
- Expected Status: 200
- Payload: `{ "productProfile": ["{runtimeProfile}"], "profileRole": ["{runtimeRole}"] }`

# Expected Final Result

Selecting a Role alongside a Profile submits both in the POST body and returns rows matching the intersection of both filters.

# Classification

- Read-only
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode Profile or Role names.
- Do not repeat data-changing submissions.

# Generation Status

- Test script generation: Pending
- CI/CD execution: Pending
- Healing: Pending