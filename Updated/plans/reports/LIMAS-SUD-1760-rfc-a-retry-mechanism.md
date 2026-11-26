---
test_id: "LIMAS-SUD-1760"
title: "To verify the functionality of \"Reports\" → \"Floating Configurations\" → \"Error State\" → \"Retry Mechanism\""
module: "Reports"
page: "Reports"
section: "Floating Configurations"
control: "Error State"
action: "Retry Mechanism"
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

Verify the Retry button appears after a 500 error, clicking it fires a new GET request with page and size params, counts reflect the result, Retry does not change the mode or card selection, and multiple retries are allowed.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated on the Reports page with Floating Configurations selected.
- The API returns a 500 error.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: After 500 error, verify the Retry button is visible.
   Expected Result: Retry button is present and clickable.

2. Action: Click the Retry button and observe the network request.
   Expected Result: A new GET request to /api/report/all with page={runtimePage}&size={runtimeSize} is sent.

3. Action: Verify the record count updates after Retry (if the retry succeeds).
   Expected Result: Record count and loaded/total counts reflect the response result.

4. Action: Verify mode and card selection after Retry.
   Expected Result: Floating Configurations card remains selected. Active mode remains pressed.

5. Action: Click Retry multiple times.
   Expected Result: Each click fires a new GET request. No error from repeated retries.

# Network Verification

- Request URL: Contains /api/report/all?page={runtimePage}&size={runtimeSize}
- HTTP Method: GET
- Request Count: 1 per Retry click

# Expected Final Result

Retry fires a fresh GET request, updates counts, preserves card and mode selection, and supports multiple retries.

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