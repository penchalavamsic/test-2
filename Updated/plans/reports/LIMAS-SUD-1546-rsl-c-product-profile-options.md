---
test_id: "LIMAS-SUD-1546"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Product Profile\" → \"Options: searchable combobox, reads options dynamically, selected-state semantics\""
module: "Reports"
page: "Reports"
section: "Product Profile"
control: "Options"
action: "Searchable combobox, reads options dynamically, selected-state semantics"
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

Verify that the Product Profile filter is a searchable combobox that dynamically loads options, opens a dropdown on interaction, and communicates selected state semantically.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to the Reports page.
- Standard Licenses card is selected and the filter panel is expanded.

# Test Data

Use runtime Product Profile options retrieved from the combobox dropdown.

# Steps and Expected Results

1. Action: Click or focus the Product Profile combobox.
   Expected Result: The combobox opens a dropdown list of Product Profile options loaded dynamically.

2. Action: Verify the dropdown options are not empty and each has a distinct text value.
   Expected Result: Options are populated from runtime data.

3. Action: Type a search string and verify the dropdown filters options.
   Expected Result: Type-ahead filtering works.

4. Action: Select an option and verify the combobox reflects the selected value.
   Expected Result: Selected value is shown.

5. Action: Assert the combobox has appropriate ARIA attributes for selected state.
   Expected Result: Selected state is communicated semantically.

# Network Verification

- An API request may fire to populate Product Profile options.
- No filter POST request fires until the user submits the selection.

# Expected Final Result

The Product Profile filter is a searchable combobox with dynamic options and proper selected-state semantics.

# Classification

- Read-only
- Positive
- Accessibility

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode Product Profile names.
- Do not repeat data-changing submissions.

# Generation Status

- Test script generation: Pending
- CI/CD execution: Pending
- Healing: Pending