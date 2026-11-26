---
test_id: "LIMAS-SUD-1554"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Combined Filters\" → \"User Group + Profile + Role: POST includes all three arrays, results match all, Clear restores\""
module: "Reports"
page: "Reports"
section: "Combined Filters"
control: "User Group + Profile + Role"
action: "Apply all three, POST includes all three arrays, results match all filters, no duplicate rows, Clear restores default"
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

Verify that applying User Group, Product Profile, and Profile Role simultaneously submits all three arrays in the POST body, results match the conjunction of all three filters, no duplicate rows appear, and Clear restores the default unfiltered view.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to the Reports page.
- Standard Licenses card is selected and the filter panel is expanded.
- Unfiltered data is loaded.

# Test Data

Use `{runtimeUserGroup}`, `{runtimeProfile}`, and `{runtimeRole}` where the Role belongs to the selected Profile and all three filter criteria produce a subset of results.

# Steps and Expected Results

1. Action: Select `{runtimeUserGroup}` from the User Group combobox.
   Expected Result: Filtered results appear.

2. Action: Select `{runtimeProfile}` from the Product Profile combobox.
   Expected Result: Profile Role becomes enabled; results narrow further.

3. Action: Select `{runtimeRole}` from the Profile Role combobox.
   Expected Result: A POST request fires with all three filter arrays.

4. Action: Parse the POST body and assert it contains `group: ["{runtimeUserGroup}"]`, `productProfile: ["{runtimeProfile}"]`, and `profileRole: ["{runtimeRole}"]`.
   Expected Result: All three arrays are present.

5. Action: Verify `page=0` and `size` preserved.
   Expected Result: Pagination reset correctly.

6. Action: Assert visible rows match the User Group, Product Profile, and Profile Role criteria simultaneously.
   Expected Result: Intersection filtering is applied.

7. Action: Assert no duplicate rows appear in the visible results.
   Expected Result: Result set has no duplicates.

8. Action: Click Clear and assert all three controls reset, Profile Role disables, and unfiltered data returns.
   Expected Result: Default view restored.

# Network Verification

- Request URL: `POST /api/report/standardlicenses?page=0&size={size}`
- Payload: `{ "group": ["{runtimeUserGroup}"], "productProfile": ["{runtimeProfile}"], "profileRole": ["{runtimeRole}"] }`
- Response: filtered intersection result set with no duplicates

# Expected Final Result

Combined User Group + Product Profile + Profile Role filters submit all three arrays and return intersection results with no duplicates; Clear restores defaults.

# Classification

- Read-only
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode filter values.
- Do not repeat data-changing submissions.

# Generation Status

- Test script generation: Pending
- CI/CD execution: Pending
- Healing: Pending