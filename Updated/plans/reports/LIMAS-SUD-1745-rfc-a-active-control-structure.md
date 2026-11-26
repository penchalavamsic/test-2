---
test_id: "LIMAS-SUD-1745"
title: "To verify the functionality of \"Reports\" → \"Floating Configurations\" → \"Configuration Mode\" → \"Active Control Structure\""
module: "Reports"
page: "Reports"
section: "Floating Configurations"
control: "Configuration Mode"
action: "Active Control Structure"
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

Verify the Active mode control is a button, is not disabled, has a tabindex for keyboard reachability, shows aria-pressed="true" when selected, and provides a non-color selected-state indicator.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and on the Reports page.
- Floating Configurations card is selected.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Inspect the Active control element.
   Expected Result: Element is a button with an explicit tabindex for keyboard reachability.

2. Action: Verify the control is not disabled.
   Expected Result: The disabled attribute is absent or false.

3. Action: Verify aria-pressed is "true" by default.
   Expected Result: aria-pressed="true".

4. Action: Verify a non-color selected-state indicator exists.
   Expected Result: A visible indicator (border, underline, font-weight, or icon change) differentiates the selected state regardless of color perception.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

Active is a non-disabled button with tabindex, pressed state, and a non-color selected-state indicator.

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