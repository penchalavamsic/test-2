---
test_id: "LIMAS-SUD-1763"
title: "To verify the functionality of \"Reports\" → \"Floating Configurations\" → \"Error State\" → \"Active Mode 500 Error Response\""
module: "Reports"
page: "Reports"
section: "Floating Configurations"
control: "Error State"
action: "Active Mode 500 Error Response"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Reports Floating Configurations RFC-B"
test_type: "Negative"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/reports/reports-floating-configurations-error-deleted.spec.ts"
---

# Purpose

Verify that when Active mode's API GET call to the report/all endpoint with page and size query params returns a 500 status, the UI displays error heading "Unable to load Floating Configuration records", supporting text "Request failed with status code 500", a Retry button, no data table, while mode controls and filters panel remain usable.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated on the Reports page with Floating Configurations selected.
- Active mode is selected (default).
- The API endpoint returns a 500 Internal Server Error.

# Test Data

Use environment variables and the authenticated fixture. The error response is triggered by the backend.

# Steps and Expected Results

1. Action: Trigger or wait for the 500 error state in Active mode.
   Expected Result: The heading "Unable to load Floating Configuration records" is visible.

2. Action: Verify the supporting error text.
   Expected Result: Text "Request failed with status code 500" is visible.

3. Action: Verify the Retry button presence.
   Expected Result: A Retry button is present and visible on screen.

4. Action: Verify no table is rendered.
   Expected Result: No data table, table rows, or table skeleton are visible in the content area.

5. Action: Verify mode controls remain usable.
   Expected Result: Active and Deleted mode controls are visible, interactive, and not disabled.

6. Action: Verify the Filters panel is still accessible.
   Expected Result: The Filters button is visible and the filter panel can be opened and interacted with.

# Network Verification

- Request URL: Contains report/all with page={runtimePage}&size={runtimeSize}
- HTTP Method: GET
- Expected Status: 500

# Expected Final Result

The 500 error state in Active mode shows the error heading, supporting text, Retry button, no table, and keeps mode controls and filters panel accessible and usable.

# Classification

- Read-only
- Negative

# Restrictions

- Do not hardcode error messages, status codes, or endpoint paths.
- Do not hardcode page or size values. Read dynamically.
- Do not include credentials, tokens, cookies, or sensitive payloads.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending