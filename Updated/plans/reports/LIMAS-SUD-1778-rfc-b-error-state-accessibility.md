---
test_id: "LIMAS-SUD-1778"
title: "To verify the functionality of \"Reports\" → \"Floating Configurations\" → \"Error State\" → \"Error State Accessibility\""
module: "Reports"
page: "Reports"
section: "Floating Configurations"
control: "Error State"
action: "Error State Accessibility"
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

Verify the error state is accessible: the "Unable to load Floating Configuration records" heading has an accessible name, the status code text is accessible, the Retry button is accessible, the error is not silent, focus order is reasonable during error, and mode controls remain keyboard-accessible while the error is displayed.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated on the Reports page with Floating Configurations selected.
- Active mode is selected.
- The API returns a 500 error.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Inspect the error heading for accessible name.
   Expected Result: The heading "Unable to load Floating Configuration records" has an accessible name matching its visible text.

2. Action: Inspect the status code error text for accessibility.
   Expected Result: The text "Request failed with status code 500" is programmatically determinable by assistive technology.

3. Action: Verify the Retry button is accessible.
   Expected Result: Retry button has accessible name "Retry" and is keyboard-reachable.

4. Action: Confirm the error is not a silent failure.
   Expected Result: The error message is visible, programmatically determinable, and not hidden from assistive technology with aria-hidden or display:none.

5. Action: Verify focus order during error state.
   Expected Result: Focus order through the page during error is reasonable. Focus is not lost or trapped. The error container is reachable.

6. Action: Navigate to mode controls using keyboard during error state.
   Expected Result: Active and Deleted mode controls remain keyboard-accessible while the error is displayed.

# Network Verification

- Request URL: Contains report/all
- HTTP Method: GET
- Expected Status: 500

# Expected Final Result

The error state is fully accessible with named heading and Retry button, accessible status text, no silent failure, reasonable focus order, and keyboard-accessible mode controls.

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