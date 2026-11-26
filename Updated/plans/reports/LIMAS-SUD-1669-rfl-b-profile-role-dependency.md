---
test_id: "LIMAS-SUD-1669"
title: "To verify the functionality of \"Reports\" → \"Floating Licenses\" → \"Profile Role\" → \"Dependency on Product Profile\""
module: "Reports"
page: "Reports"
section: "Floating Licenses"
control: "Profile Role"
action: "Dependency on Product Profile"
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

Verify Profile Role transitions from disabled ("Select a profile first") to enabled ("Search roles") when a Product Profile is selected, and reverts when the profile is cleared.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable. Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses is selected, Active mode, Filters expanded.

# Test Data

Use runtime values dynamically.

# Steps and Expected Results

1. Action: Verify Profile Role is disabled with placeholder "Select a profile first".
   Expected Result: Input is disabled, placeholder is "Select a profile first".

2. Action: Select a Product Profile.
   Expected Result: Profile Role becomes enabled, placeholder changes to "Search roles".

3. Action: Remove the Product Profile via its chip.
   Expected Result: Profile Role reverts to disabled with placeholder "Select a profile first".

# Network Verification

No filter API triggered. Role options may be loaded client-side from profile data.

# Expected Final Result

Profile Role dependency is correctly enforced — enabled only when a Product Profile is selected.

# Classification

- Read-only
- Positive

# Restrictions

- Do not hardcode profile or role names.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending