---
test_id: "LIMAS-SUD-886"
title: "To verify the functionality of \"System User Dashboard\" → \"Floating Licenses\" → \"Empty State\" → \"Empty State Heading and Text\""
module: "System User Dashboard"
page: "System User Dashboard"
section: "Floating Licenses"
control: "Empty State"
action: "Empty State Heading and Text"
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

Verify that the empty state heading and supporting text are displayed when no floating licenses exist.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses card is selected and network response received.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to the dashboard, select the Floating Licenses card, wait for the flicense API response.
   Expected Result: The empty state is visible.

2. Action: Verify the empty state heading.
   Expected Result: Text "No floating licenses found" is visible.

3. Action: Verify the supporting text.
   Expected Result: Text "No floating licenses match the selected expiration criteria." is visible.

# Network Verification

- Request URL: `**/api/flicense/ex/**`
- HTTP Method: GET
- Expected Status: 200
- Payload Presence: Empty body (Content-Length: 0)
- Visible UI Result: Empty state heading and supporting text are displayed.

# Expected Final Result

The empty state displays "No floating licenses found" with supporting text "No floating licenses match the selected expiration criteria."

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