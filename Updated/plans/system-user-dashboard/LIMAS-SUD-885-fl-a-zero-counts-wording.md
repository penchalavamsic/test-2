---
test_id: "LIMAS-SUD-885"
title: "To verify the functionality of \"System User Dashboard\" → \"Floating Licenses\" → \"Zero Counts\" → \"Zero Counts Wording\""
module: "System User Dashboard"
page: "System User Dashboard"
section: "Floating Licenses"
control: "Zero Counts"
action: "Zero Counts Wording"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Read-only"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/system-user-dashboard/floating-licenses/floating-licenses-zero-state.spec.ts"
---

# Purpose

Verify that the count text shows "0 loaded · 0 total licenses" when no floating licenses exist.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses card is selected and network response received.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to the dashboard, select the Floating Licenses card, wait for the flicense API response.
   Expected Result: The count text is visible.

2. Action: Verify the count text content.
   Expected Result: The text reads "0 loaded · 0 total licenses".

# Network Verification

- Request URL: `**/api/flicense/ex/**`
- HTTP Method: GET
- Expected Status: 200
- Payload Presence: Empty body (Content-Length: 0)
- Visible UI Result: Count text "0 loaded · 0 total licenses" is displayed.

# Expected Final Result

The counts display "0 loaded · 0 total licenses".

# Classification

- Read-only
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not repeat data-changing submissions.
- Do not enter a date value.
- Do not enter search text.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Live UI observation via Playwright MCP