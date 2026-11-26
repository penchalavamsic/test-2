---
test_id: "LIMAS-SUD-925"
title: "To verify the functionality of \"System User Dashboard\" → \"Floating Licenses\" → \"Accessibility\" → \"Focus After Date Clearing\""
module: "System User Dashboard"
page: "System User Dashboard"
section: "Floating Licenses"
control: "Accessibility"
action: "Focus After Date Clearing"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
classification: "Accessibility"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/system-user-dashboard/floating-licenses/floating-licenses-filtered-zero-state.spec.ts"
---

# Purpose

Verify that after clearing the date control and the resulting GET request, focus management is reasonable (control is not lost to an unreachable element).

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses section is loaded.

# Test Data

Use a runtime-provided date via `TEST_FL_FUTURE_DATE`.

# Steps and Expected Results

1. Action: Navigate to System User Dashboard, wait for full render, select Floating Licenses, wait for initial GET.
   Expected Result: Floating Licenses section is visible.

2. Action: Focus the date control, set to `TEST_FL_FUTURE_DATE`, wait for GET, then clear by filling with empty string.
   Expected Result: After the GET completes, the focused element is either still on the page (the date control or a reasonable adjacent element). Focus has not moved to an unreachable or unexpected element.

# Network Verification

- Request URL: `/api/flicense/ex/{date}/{profileId}?page=0&size=5`
- HTTP Method: GET
- Expected Status: 200
- Payload Presence: N/A
- Visible UI Result: Focus remains in a reasonable location after clearing.

# Expected Final Result

Focus does not disappear or become orphaned after clearing the date control.

# Classification

- Accessibility
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not repeat data-changing submissions.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Live UI observation via Playwright MCP: focus behavior after date clearing.