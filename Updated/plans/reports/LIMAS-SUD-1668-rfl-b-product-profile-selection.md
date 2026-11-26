---
test_id: "LIMAS-SUD-1668"
title: "To verify the functionality of \"Reports\" → \"Floating Licenses\" → \"Product Profile\" → \"Selection, Pill, and Chip\""
module: "Reports"
page: "Reports"
section: "Floating Licenses"
control: "Product Profile"
action: "Selection, Pill, and Chip"
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

Verify selecting a Product Profile shows a pill inside the searchbox, a "Profiles: {count}" chip with a remove button, and selecting enables Profile Role.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable. Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses is selected, Active mode, Filters expanded.

# Test Data

Profile names are read dynamically.

# Steps and Expected Results

1. Action: Select one Product Profile from the dropdown.
   Expected Result: The profile name appears as a pill inside the searchbox with a remove button. A "Profiles: 1" chip appears with a remove button.

2. Action: Verify Profile Role becomes enabled.
   Expected Result: Profile Role searchbox is no longer disabled; placeholder changes from "Select a profile first" to "Search roles".

3. Action: Click the profile pill remove button.
   Expected Result: Pill is removed, "Profiles:" chip disappears, Profile Role becomes disabled again.

# Network Verification

No filter API request triggered. Profile options from pre-fetched account-scope API.

# Expected Final Result

Profile selection creates a pill and chip, enables Profile Role, and can be individually removed.

# Classification

- Read-only
- Positive

# Restrictions

- Do not hardcode profile names or counts.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending