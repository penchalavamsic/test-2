---
test_id: "LIMAS-SUD-1670"
title: "To verify the functionality of \"Reports\" → \"Floating Licenses\" → \"Profile Role\" → \"Combobox, Selection, and Chip\""
module: "Reports"
page: "Reports"
section: "Floating Licenses"
control: "Profile Role"
action: "Combobox, Selection, and Chip"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Reports Floating Licenses RFL-B"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/reports/reports-floating-licenses-filters.spec.ts"
---

# Purpose

After selecting a Product Profile, verify Profile Role is a searchable checkbox combobox that produces a "Roles: {count}" chip on selection.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable. Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses is selected, Active mode, Filters expanded, Product Profile selected.

# Test Data

Role names are read dynamically.

# Steps and Expected Results

1. Action: Click the Profile Role searchbox.
   Expected Result: A dropdown appears with available role options as checkbox buttons.

2. Action: Select one role.
   Expected Result: The role name appears as a pill; a "Roles: 1" chip appears with remove button.

3. Action: Verify the role dropdown options are specific to the selected profile.
   Expected Result: Options correspond to the selected Product Profile.

# Network Verification

No filter API triggered. Role options loaded client-side.

# Expected Final Result

Profile Role is a profile-dependent checkbox combobox producing "Roles: {count}" chips.

# Classification

- Read-only
- Positive

# Restrictions

- Do not hardcode role names.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending