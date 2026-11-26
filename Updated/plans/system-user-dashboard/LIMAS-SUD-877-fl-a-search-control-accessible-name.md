---
test_id: "LIMAS-SUD-877"
title: "To verify the functionality of \"System User Dashboard\" → \"Floating Licenses\" → \"Search Control Structure\" → \"Search Control Accessible Name (Placeholder-Only)\""
module: "System User Dashboard"
page: "System User Dashboard"
section: "Floating Licenses"
control: "Search Control Structure"
action: "Search Control Accessible Name (Placeholder-Only)"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
classification: "Accessibility"
test_type: "Negative"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/system-user-dashboard/floating-licenses/floating-licenses-search-control.spec.ts"
---

# Purpose

Verify that the search input has no accessible name beyond its placeholder — no id, name, aria-label, or aria-labelledby.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses card is selected and section is visible.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to the dashboard, select the Floating Licenses card, wait for section load.
   Expected Result: The Floating Licenses section is rendered.

2. Action: Verify the search input has no id attribute.
   Expected Result: The id attribute is absent or empty.

3. Action: Verify the search input has no aria-label.
   Expected Result: The aria-label attribute is absent.

4. Action: Verify the search input has no aria-labelledby.
   Expected Result: The aria-labelledby attribute is absent.

5. Action: Verify the search input has no associated label elements.
   Expected Result: The input has zero label elements.

# Network Verification

- Request URL: `**/api/flicense/ex/**`
- HTTP Method: GET
- Expected Status: 200
- Payload Presence: Empty body (zero data)
- Visible UI Result: Search input is only identifiable by its placeholder.

# Expected Final Result

The search input has no id, no aria-label, no aria-labelledby, and no associated label — accessible name comes only from its placeholder. This is a known WCAG SC 3.3.2 finding.

# Classification

- Accessibility
- Negative

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