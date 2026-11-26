---
test_id: "LIMAS-SUD-1770"
title: "To verify the functionality of \"Reports\" → \"Floating Configurations\" → \"Toolbar\" → \"Deleted Export State\""
module: "Reports"
page: "Reports"
section: "Floating Configurations"
control: "Toolbar"
action: "Deleted Export State"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Reports Floating Configurations RFC-B"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/reports/reports-floating-configurations-error-deleted.spec.ts"
---

# Purpose

Verify the Export Excel button is enabled and accessible in Deleted mode when data is present. Record the actual runtime state (enabled/disabled) rather than asserting a hardcoded expectation.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated on the Reports page with Floating Configurations selected.
- Deleted mode is selected and data has loaded successfully.

# Test Data

Use environment variables and the authenticated fixture. The export button state is verified at runtime.

# Steps and Expected Results

1. Action: After Deleted data loads, locate the Export Excel button.
   Expected Result: The Export Excel button is present and visible in the toolbar.

2. Action: Verify the button is not disabled.
   Expected Result: The disabled attribute is absent or false. The button is interactive.

3. Action: Verify the button is accessible.
   Expected Result: The button has an accessible name and is keyboard-reachable.

4. Action: Record the actual runtime enabled/disabled state.
   Expected Result: The button state matches the expected behavior for Deleted mode with data.

# Network Verification

- Request URL: Contains report/alldeleted
- HTTP Method: GET

# Expected Final Result

The Export Excel button in Deleted mode with data is present, enabled, and accessible. Runtime state is recorded for behavioral tracking.

# Classification

- Read-only
- Positive
- Accessibility

# Restrictions

- Do not hardcode the button's enabled/disabled state. Verify and record actual runtime state.
- Do not include credentials, tokens, cookies, or sensitive payloads.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending