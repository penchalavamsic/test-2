---
test_id: "LIMAS-SUD-923"
title: "To verify the functionality of \"System User Dashboard\" → \"Floating Licenses\" → \"Accessibility\" → \"Date Value Announcement After Setting\""
module: "System User Dashboard"
page: "System User Dashboard"
section: "Floating Licenses"
control: "Accessibility"
action: "Date Value Announcement After Setting"
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

Verify that after setting a date value, the date control's accessible value or displayed value is correct.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses section is loaded.

# Test Data

Use a runtime-provided date via `TEST_FL_FUTURE_DATE`.

# Steps and Expected Results

1. Action: Navigate to System User Dashboard, wait for full render, select Floating Licenses, wait for initial GET.
   Expected Result: Floating Licenses section is visible.

2. Action: Set date to `TEST_FL_FUTURE_DATE` and wait for the GET response.
   Expected Result: The date input's `inputValue()` returns `TEST_FL_FUTURE_DATE`. The value is visible and discoverable via the accessibility tree (either as the input value or an associated label).

# Network Verification

- Request URL: `/api/flicense/ex/{date}/{profileId}?page=0&size=5`
- HTTP Method: GET
- Expected Status: 200
- Payload Presence: N/A
- Visible UI Result: Date value discoverable.

# Expected Final Result

The date value is accessible after setting.

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

- Live UI observation via Playwright MCP: date value visible in DOM after setting.