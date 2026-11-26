---
test_id: "LIMAS-SUD-1740"
title: "To verify the functionality of \"Reports\" → \"Floating Licenses\" → \"Export Excel\" → \"Controlled Failure — 500 Server Error on Server-Side Export\""
module: "Reports"
page: "Reports"
section: "Floating Licenses"
control: "Export Excel"
action: "Controlled Failure — 500 Server Error on Server-Side Export"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
classification: "Reports Floating Licenses RFL-E"
test_type: "Negative"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Not Started"
execution_status: "Not Run"
ci_cd_execution: "Pending"
healing: "Pending"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/reports/reports-floating-licenses-export.spec.ts"
---

# Purpose

Verify that in a hypothetical server-side export scenario, a 500 Internal Server Error response is handled gracefully — the application degrades without crashing and provides user feedback.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses is selected in Deleted mode with records loaded.
- A Playwright route interceptor is configured to mock a 500 response for the Export-related endpoint (if one existed).
- **Note:** Current export is client-side. This plan validates robustness if the export were server-driven.

# Test Data

Fixtures required: a mock 500 response. Actual UI state after failure observed dynamically.

# Steps and Expected Results

1. Action: Set up a route interceptor to return HTTP 500 Internal Server Error for the hypothetical export endpoint.
   Expected Result: Interceptor is active and will respond with 500.

2. Action: Click the Export Excel button.
   Expected Result: No download event fires. No uncaught JavaScript exception occurs.

3. Action: Observe the UI for error handling.
   Expected Result: An error toast or inline message is displayed indicating the export failed (e.g., "Server error" or "Export failed. Please try again."). The application does not crash.

4. Action: Verify the Export button remains usable after the failure.
   Expected Result: The Export button is still enabled and can be clicked again to retry. The UI is not frozen or stuck in a loading state.

5. Action: Verify there is no browser console error that indicates an unhandled rejection or crash.
   Expected Result: Console is free of unhandled promise rejections or fatal errors.

6. Action: Verify the table data and UI state are preserved after the failure.
   Expected Result: Table data, counts, filters, and mode selection are unchanged.

7. Action: Remove the route interceptor.
   Expected Result: Subsequent Export clicks work normally.

# Network Verification

The mock 500 response is returned for the Export-related request. No actual server request reaches the backend for this test.

# Expected Final Result

A 500 Internal Server Error on a hypothetical server-side export is handled gracefully: an error message is shown, the Export button remains usable for retry, table state is preserved, and no crash occurs.

# Classification

- Read-only
- Negative
- API

# Restrictions

- Requires a fixture or Playwright route interception — mark as "Not Started" until fixture is available.
- Do not hardcode error messages or API paths.
- Do not modify the backend to trigger 500.

# Generation Status

- Test script generation: Not Started (requires fixture)
- CI/CD execution: Pending
- Healing: Pending