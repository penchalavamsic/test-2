---
test_id: "LIMAS-SUD-1757"
title: "To verify the functionality of \"Reports\" → \"Floating Configurations\" → \"Error State\" → \"500 Error State UI\""
module: "Reports"
page: "Reports"
section: "Floating Configurations"
control: "Error State"
action: "500 Error State UI"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Reports Floating Configurations RFC-A"
test_type: "Negative"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/reports/reports-floating-configurations-shell.spec.ts"
---

# Purpose

Verify the 500 error state UI: heading "Unable to load Floating Configuration records", supporting text "Request failed with status code 500", Retry button present, no table rendered, Export visible but possibly enabled (bug), filters available, mode controls usable, UI responsive (not a fatal crash).

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated on the Reports page with Floating Configurations selected.
- The API endpoint returns a 500 Internal Server Error.

# Test Data

Use environment variables and the authenticated fixture. The error response is triggered by the backend.

# Steps and Expected Results

1. Action: Trigger or wait for the 500 error state.
   Expected Result: The heading "Unable to load Floating Configuration records" is visible.

2. Action: Verify supporting error text.
   Expected Result: Text "Request failed with status code 500" is visible.

3. Action: Verify the Retry button.
   Expected Result: A Retry button is present and visible.

4. Action: Verify no table is rendered.
   Expected Result: No data table, rows, or loading table skeleton are visible.

5. Action: Verify Export button visibility.
   Expected Result: Export Excel button is visible. It may be enabled — record this behavioral observation.

6. Action: Verify Filters button and panel.
   Expected Result: Filters button and filter panel remain available and openable.

7. Action: Verify mode controls (Active/Deleted).
   Expected Result: Active and Deleted mode controls remain visible and usable.

8. Action: Verify the UI is responsive.
   Expected Result: No crash or freeze. All visible controls are interactive.

# Network Verification

- Request URL: Contains /api/report/all
- HTTP Method: GET
- Expected Status: 500

# Expected Final Result

The 500 error state shows appropriate heading, error detail, Retry button, no table, and keeps the UI responsive with Export, Filters, and mode controls available.

# Classification

- Read-only
- Negative

# Restrictions

- Do not hardcode error messages, status codes, or endpoint paths.
- Do not include credentials, tokens, cookies, or sensitive payloads.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending