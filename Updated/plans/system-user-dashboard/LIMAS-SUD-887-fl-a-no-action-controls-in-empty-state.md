---
test_id: "LIMAS-SUD-887"
title: "To verify the functionality of \"System User Dashboard\" → \"Floating Licenses\" → \"Empty State\" → \"No Action Controls in Empty State\""
module: "System User Dashboard"
page: "System User Dashboard"
section: "Floating Licenses"
control: "Empty State"
action: "No Action Controls in Empty State"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
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

Verify that the empty state contains no pagination, Load More button, retry, or refresh controls.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses card is selected and network response received.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to the dashboard, select the Floating Licenses card, wait for the flicense API response.
   Expected Result: The empty state is visible.

2. Action: Verify no pagination controls are present.
   Expected Result: No pagination elements are rendered.

3. Action: Verify no Load More button is present.
   Expected Result: No "Load More" button is rendered.

4. Action: Verify no retry or refresh button is present.
   Expected Result: No retry/refresh controls are rendered.

5. Action: Verify no license cards are rendered.
   Expected Result: No license record cards are present.

# Network Verification

- Request URL: `**/api/flicense/ex/**`
- HTTP Method: GET
- Expected Status: 200
- Payload Presence: Empty body (Content-Length: 0)
- Visible UI Result: Only empty state text is displayed; no action controls.

# Expected Final Result

The empty state has no pagination, Load More, retry, refresh, or license cards.

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