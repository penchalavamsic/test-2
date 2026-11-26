---
test_id: "LIMAS-SUD-867"
title: "To verify the functionality of \"System User Dashboard\" → \"Floating Licenses\" → \"Date Control Structure\" → \"Date Control Visibility\""
module: "System User Dashboard"
page: "System User Dashboard"
section: "Floating Licenses"
control: "Date Control Structure"
action: "Date Control Visibility"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Read-only"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/system-user-dashboard/floating-licenses/floating-licenses-date-control.spec.ts"
---

# Purpose

Verify that the Expires before date input control is visible within the Floating Licenses section.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses card is selected and section is visible.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to the dashboard, select the Floating Licenses card, wait for section load.
   Expected Result: The Floating Licenses section is rendered.

2. Action: Verify the Expires before input is visible.
   Expected Result: The date input with label "Expires before" is visible.

# Network Verification

- Request URL: `**/api/flicense/ex/**`
- HTTP Method: GET
- Expected Status: 200
- Payload Presence: Empty body (zero data)
- Visible UI Result: Expires before date input is visible.

# Expected Final Result

The Expires before date input control is visible in the Floating Licenses section.

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