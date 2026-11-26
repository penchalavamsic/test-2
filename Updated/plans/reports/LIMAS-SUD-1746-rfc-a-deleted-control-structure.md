---
test_id: "LIMAS-SUD-1746"
title: "To verify the functionality of \"Reports\" → \"Floating Configurations\" → \"Configuration Mode\" → \"Deleted Control Structure\""
module: "Reports"
page: "Reports"
section: "Floating Configurations"
control: "Configuration Mode"
action: "Deleted Control Structure"
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

Verify the Deleted mode control exists, is not disabled, is not pressed by default, has accessible name "Deleted", and mirrors the Active control structure.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and on the Reports page.
- Floating Configurations card is selected.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Inspect the Deleted control element.
   Expected Result: Element exists and is a button. Accessible name is "Deleted".

2. Action: Verify the control is not disabled.
   Expected Result: The disabled attribute is absent or false.

3. Action: Verify aria-pressed is "false" by default.
   Expected Result: aria-pressed="false".

4. Action: Compare the Deleted control structure to Active.
   Expected Result: Both controls share the same element type, dimensions, and semantic role structure.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

Deleted is a non-disabled button with accessible name "Deleted", not pressed by default, and structurally mirrors Active.

# Classification

- Read-only
- Positive
- Accessibility

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not use static environment-specific data.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending