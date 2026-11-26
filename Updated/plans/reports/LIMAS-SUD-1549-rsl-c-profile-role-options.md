---
test_id: "LIMAS-SUD-1549"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Profile Role\" → \"Options: reads dynamically, options correspond to selected Profile, selected-state semantics\""
module: "Reports"
page: "Reports"
section: "Profile Role"
control: "Options"
action: "Role dropdown reads options dynamically, options correspond to selected Profile, selected-state semantics"
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

Verify that the Profile Role dropdown dynamically loads options that correspond to the currently selected Product Profile, and communicates selected state semantically.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to the Reports page.
- Standard Licenses card is selected and the filter panel is expanded.
- A Product Profile has been selected, enabling the Profile Role control.

# Test Data

Use `{runtimeProfile}` as the selected Product Profile. Use `{runtimeRole}` as a role that belongs to that Profile.

# Steps and Expected Results

1. Action: Select `{runtimeProfile}` from the Product Profile combobox to enable Profile Role.
   Expected Result: Profile Role becomes enabled.

2. Action: Open the Profile Role dropdown.
   Expected Result: The dropdown displays Role options loaded dynamically.

3. Action: Assert the Role options are not empty and each option is a valid role name.
   Expected Result: Options are populated and relevant to the selected Profile.

4. Action: Verify that each Role option corresponds to the selected Product Profile (roles are not from an unrelated Profile).
   Expected Result: Roles are scoped to the selected Profile.

5. Action: Select a Role and assert the combobox has appropriate ARIA attributes for selected state.
   Expected Result: Selected state is communicated to assistive technology.

# Network Verification

- A GET request may fire to fetch Role options for the selected Profile.
- No filter POST fires until a Role is selected.

# Expected Final Result

Profile Role options are dynamically loaded, scoped to the selected Product Profile, and have proper selected-state semantics.

# Classification

- Read-only
- Positive
- Accessibility

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode Profile or Role names.
- Do not repeat data-changing submissions.

# Generation Status

- Test script generation: Pending
- CI/CD execution: Pending
- Healing: Pending