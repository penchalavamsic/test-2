---
test_id: "LIMAS-SUD-1649"
title: "To verify the functionality of \"Reports\" → \"Floating Licenses\" → \"Filters Panel\" → \"Profile Role Dependency\""
module: "Reports"
page: "Reports"
section: "Floating Licenses"
control: "Filters Panel"
action: "Profile Role Dependency"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Reports Floating Licenses RFL-A"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/reports/reports-floating-licenses-shell.spec.ts"
---

# Purpose

Verify the Profile Role filter is disabled initially with placeholder "Select a profile first" and has a dependency on Product Profile.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses is selected on the Reports page.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Expand the Filters panel and inspect the Profile Role control.
   Expected Result: Profile Role searchbox is disabled with placeholder "Select a profile first".

2. Action: Verify Product Profile is enabled and empty.
   Expected Result: Product Profile searchbox is enabled with placeholder "Search profiles".

3. Action: Do not enter values — confirm only that the dependency relationship exists.
   Expected Result: Profile Role remains disabled until Product Profile has a selection.

# Network Verification

No API request needed for this plan.

# Expected Final Result

Profile Role is disabled by default, indicating a dependency on Product Profile selection.

# Classification

- Read-only
- Positive

# Restrictions

- Do not enter or select filter values.
- Do not include credentials, tokens, cookies, or sensitive payloads.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending