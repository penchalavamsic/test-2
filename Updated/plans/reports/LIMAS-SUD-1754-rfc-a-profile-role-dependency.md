---
test_id: "LIMAS-SUD-1754"
title: "To verify the functionality of \"Reports\" → \"Floating Configurations\" → \"Filters\" → \"Profile Role Dependency\""
module: "Reports"
page: "Reports"
section: "Floating Configurations"
control: "Filters"
action: "Profile Role Dependency"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Reports Floating Configurations RFC-A"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/reports/reports-floating-configurations-shell.spec.ts"
---

# Purpose

Verify Profile Role is initially disabled with placeholder "Select a profile first", becomes enabled after selecting a Product Profile, and returns to disabled with the placeholder when Product Profile is cleared.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated on the Reports page with Floating Configurations selected.
- Filter panel is opened.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Inspect Profile Role initial state.
   Expected Result: Profile Role is disabled with placeholder "Select a profile first".

2. Action: Select a value in Product Profile.
   Expected Result: Profile Role becomes enabled.

3. Action: Clear the Product Profile selection.
   Expected Result: Profile Role returns to disabled with placeholder "Select a profile first".

# Network Verification

No API verification needed for this plan.

# Expected Final Result

Profile Role is disabled until a Product Profile is selected, and returns to disabled when Product Profile is cleared.

# Classification

- Read-only
- Positive

# Restrictions

- Do not hardcode profile names, role names, or placeholder text.
- Do not include credentials, tokens, cookies, or sensitive payloads.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending