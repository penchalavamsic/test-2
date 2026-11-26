---
test_id: "LIMAS-SUD-868"
title: "To verify the functionality of \"System User Dashboard\" → \"Floating Licenses\" → \"Date Control Structure\" → \"Date Control Label\""
module: "System User Dashboard"
page: "System User Dashboard"
section: "Floating Licenses"
control: "Date Control Structure"
action: "Date Control Label"
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

Verify that the Expires before date input has a visible label "Expires before" with a for/id association.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses card is selected and section is visible.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to the dashboard, select the Floating Licenses card, wait for section load.
   Expected Result: The Floating Licenses section is rendered.

2. Action: Verify the Expires before input has a label with text "Expires before".
   Expected Result: The label element is associated with the input via for attribute.

# Network Verification

- Request URL: `**/api/flicense/ex/**`
- HTTP Method: GET
- Expected Status: 200
- Payload Presence: Empty body (zero data)
- Visible UI Result: Label "Expires before" is visible and associated with the input.

# Expected Final Result

The Expires before date input has a visible label "Expires before" with proper for/id association.

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