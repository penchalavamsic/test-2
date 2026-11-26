---
test_id: "LIMAS-SUD-1764"
title: "To verify the functionality of \"Reports\" → \"Floating Configurations\" → \"Error State\" → \"Retry Mechanism\""
module: "Reports"
page: "Reports"
section: "Floating Configurations"
control: "Error State"
action: "Retry Mechanism"
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

Verify the Retry button, when clicked after a 500 error in Active mode, sends a new GET request to the report/all endpoint with page and size query params, allows multiple retries, does not change the selected mode or Floating Configurations card, and keeps the UI responsive during retry.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated on the Reports page with Floating Configurations selected.
- Active mode is selected.
- The API returns a 500 error.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: After the 500 error, verify the Retry button is visible and click it.
   Expected Result: A new GET request to report/all with page={runtimePage}&size={runtimeSize} is sent.

2. Action: Verify the mode remains unchanged after Retry.
   Expected Result: Active mode remains selected (aria-pressed="true"). Deleted mode remains unpressed.

3. Action: Verify the Floating Configurations card remains selected after Retry.
   Expected Result: Floating Configurations card selection is unchanged. No other report card becomes selected.

4. Action: Click Retry multiple times in succession.
   Expected Result: Each click fires a new GET request. No errors from repeated clicks. Retry button remains interactive.

5. Action: Verify the UI remains responsive during retry.
   Expected Result: No crash or freeze. Controls remain interactive while the retry request is in flight.

# Network Verification

- Request URL: Contains report/all?page={runtimePage}&size={runtimeSize}
- HTTP Method: GET
- Request Count: 1 per Retry click

# Expected Final Result

Retry fires a fresh GET request each time, preserves mode and card selection, supports multiple retries, and keeps the UI responsive.

# Classification

- Read-only
- Positive

# Restrictions

- Do not hardcode API paths, page, or size values.
- Do not include credentials, tokens, cookies, or sensitive payloads.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending