---
test_id: "LIMAS-SUD-1744"
title: "To verify the functionality of \"Reports\" → \"Floating Configurations\" → \"Configuration Mode\" → \"Default Active Selection\""
module: "Reports"
page: "Reports"
section: "Floating Configurations"
control: "Configuration Mode"
action: "Default Active Selection"
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

Verify that on initial Floating Configurations selection, the Active mode is selected by default (aria-pressed="true"), Deleted is unselected (aria-pressed="false"), and the mode group has accessible name "Configuration mode" with role="group".

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and on the Reports page.
- Floating Configurations card has been freshly selected.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Select the Floating Configurations card.
   Expected Result: The mode group appears with accessible name "Configuration mode" and role="group".

2. Action: Inspect the Active control.
   Expected Result: Active has aria-pressed="true".

3. Action: Inspect the Deleted control.
   Expected Result: Deleted has aria-pressed="false".

# Network Verification

No API verification needed for this plan.

# Expected Final Result

On initial Floating Configurations selection, Active is pressed and Deleted is unpressed within a group with accessible name "Configuration mode" and role="group".

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