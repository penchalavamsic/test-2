---
test_id: "LIMAS-SUD-1756"
title: "To verify the functionality of \"Reports\" → \"Floating Configurations\" → \"Toolbar\" → \"Export Button Structure\""
module: "Reports"
page: "Reports"
section: "Floating Configurations"
control: "Toolbar"
action: "Export Button Structure"
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

Verify the Export Excel button exists, is a native button element, has an accessible name, and has a tabindex for keyboard reachability. Note: the Export button is observed to remain enabled even during a 500 error, which may be a bug.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated on the Reports page with Floating Configurations selected.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Locate the Export button in the toolbar.
   Expected Result: Button element exists with accessible name containing "Export" or "Excel".

2. Action: Verify the button element type.
   Expected Result: The element is a native `<button>` or has role="button".

3. Action: Verify the button has a tabindex for keyboard reachability.
   Expected Result: The button has a tabindex attribute, or is natively focusable.

4. Action: Observe the enabled/disabled state under normal and error (500) conditions.
   Expected Result: Button is not disabled. Under 500 error, the button may remain enabled — record this as a behavioral observation.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

Export Excel is a native button with accessible name and keyboard reachability. Its enabled state during error is noted as a potential bug.

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