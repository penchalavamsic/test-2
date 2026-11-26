---
test_id: "LIMAS-SUD-1548"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Product Profile\" → \"Selecting Profile enables Role, Clear Profile disables Role and clears it\""
module: "Reports"
page: "Reports"
section: "Product Profile"
control: "Profile Role Dependency"
action: "Selecting Profile enables Profile Role, placeholder changes, Clear Profile disables Role and clears it"
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

Verify the dependency between Product Profile and Profile Role: selecting a Profile enables the Role dropdown with an updated placeholder; clearing the Product Profile disables and clears the Profile Role.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to the Reports page.
- Standard Licenses card is selected and the filter panel is expanded.
- Profile Role is initially disabled.

# Test Data

Use `{runtimeProfile}` as the Product Profile value.

# Steps and Expected Results

1. Action: Assert the Profile Role control is disabled with a default placeholder (e.g., "Select Profile first").
   Expected Result: Profile Role is disabled before Profile selection.

2. Action: Select `{runtimeProfile}` from the Product Profile combobox.
   Expected Result: Profile Role becomes enabled.

3. Action: Assert the Profile Role placeholder changes to something like "Select Role".
   Expected Result: Placeholder reflects that Role selection is now available.

4. Action: Clear the Product Profile selection (remove the selected value).
   Expected Result: Profile Role becomes disabled and its value is cleared.

5. Action: Assert the Profile Role placeholder reverts to its original disabled-state text.
   Expected Result: Disabled state is restored.

# Network Verification

- A filter request fires on Profile selection and on Clear.
- No request body includes `profileRole` when Profile is cleared.

# Expected Final Result

Profile Role enable/disable state is tied to Product Profile selection: enabling on select, disabling and clearing on clear.

# Classification

- Read-only
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode Product Profile names or placeholder text.
- Do not repeat data-changing submissions.

# Generation Status

- Test script generation: Pending
- CI/CD execution: Pending
- Healing: Pending