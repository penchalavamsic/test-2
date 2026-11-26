---
test_id: "LIMAS-SUD-1761"
title: "To verify the functionality of \"Reports\" → \"Floating Configurations\" → \"Error State\" → \"Error State Accessibility\""
module: "Reports"
page: "Reports"
section: "Floating Configurations"
control: "Error State"
action: "Error State Accessibility"
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

Verify the error state is accessible: error message has an accessible name, Retry button has accessible name "Retry", loading and failure are communicated to assistive technology, mode controls remain keyboard-accessible, focus stays on or near the error, and there is no silent failure.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated on the Reports page with Floating Configurations selected.
- The API returns a 500 error.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Inspect the error message heading for accessible name.
   Expected Result: The error heading has an accessible name matching "Unable to load Floating Configuration records".

2. Action: Inspect the Retry button.
   Expected Result: Retry button has accessible name "Retry".

3. Action: Verify that loading and failure states are communicated.
   Expected Result: A loading indicator is shown before the error. The error replaces the loading state. Assistive technology can detect the state change.

4. Action: Navigate to mode controls (Active/Deleted) using the keyboard during error state.
   Expected Result: Mode controls are keyboard-reachable and operable.

5. Action: Verify where focus lands after the error appears.
   Expected Result: Focus is on or near the error container. The error is not a silent failure with focus lost elsewhere.

6. Action: Confirm no silent failure.
   Expected Result: The error message is visible and programmatically determinable. It is not hidden from assistive technology.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

The error state is communicated accessibly with named error message and Retry button, keyboard-accessible controls, and no silent failure.

# Classification

- Read-only
- Positive
- Accessibility

# Restrictions

- Do not hardcode error messages or button labels.
- Do not include credentials, tokens, cookies, or sensitive payloads.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending