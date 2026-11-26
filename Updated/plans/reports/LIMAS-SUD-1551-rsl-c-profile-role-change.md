---
test_id: "LIMAS-SUD-1551"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Profile Role\" → \"Changing Product Profile clears incompatible Role, refreshes Role options, no stale Role submitted\""
module: "Reports"
page: "Reports"
section: "Profile Role"
control: "Profile Change"
action: "Changing Product Profile clears incompatible Role, Role options refresh, no stale Role submitted"
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

Verify that changing the Product Profile after a Role has been selected clears the incompatible Role selection, refreshes the Role options to correspond to the new Profile, and does not submit a stale Role in the filter request.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to the Reports page.
- Standard Licenses card is selected and the filter panel is expanded.
- A Product Profile (`{runtimeProfile1}`) and its corresponding Role (`{runtimeRole1}`) are selected.

# Test Data

Use `{runtimeProfile1}` with `{runtimeRole1}` as the initial selection, and `{runtimeProfile2}` as a different Profile.

# Steps and Expected Results

1. Action: Select `{runtimeProfile1}` and then `{runtimeRole1}`; verify the POST body contains both.
   Expected Result: Initial combined filter is applied.

2. Action: Change the Product Profile selection from `{runtimeProfile1}` to `{runtimeProfile2}`.
   Expected Result: The Profile Role value is cleared.

3. Action: Assert the Role dropdown now shows options corresponding to `{runtimeProfile2}`, not `{runtimeProfile1}`.
   Expected Result: Role options are refreshed.

4. Action: Assert the POST request body for the Profile change does NOT include `profileRole: ["{runtimeRole1}"]`.
   Expected Result: No stale Role is submitted.

5. Action: Assert the POST body contains only `productProfile: ["{runtimeProfile2}"]` (no `profileRole` field or empty array).
   Expected Result: The filter request is clean with only the new Profile.

# Network Verification

- Request body after Profile change: `{ "productProfile": ["{runtimeProfile2}"] }` — no stale `profileRole`.
- Response: filtered by new Profile only.

# Expected Final Result

Changing the Product Profile clears the Role and refreshes options without submitting the old Role.

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