---
test_id: "LIMAS-SUD-880"
title: "To verify the functionality of \"System User Dashboard\" → \"Floating Licenses\" → \"Search Control Structure\" → \"Search Icon Present and Decorative\""
module: "System User Dashboard"
page: "System User Dashboard"
section: "Floating Licenses"
control: "Search Control Structure"
action: "Search Icon Present and Decorative"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
classification: "Accessibility"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/system-user-dashboard/floating-licenses/floating-licenses-search-control.spec.ts"
---

# Purpose

Verify that a search icon is present within or adjacent to the search input and is marked decorative (tabIndex=-1, no role, no aria-label).

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses card is selected and section is visible.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to the dashboard, select the Floating Licenses card, wait for section load.
   Expected Result: The Floating Licenses section is rendered.

2. Action: Locate the search icon element within the search input container.
   Expected Result: An SVG/icon element is present with tabIndex=-1 and no aria-role or aria-label (decorative).

# Network Verification

- Request URL: `**/api/flicense/ex/**`
- HTTP Method: GET
- Expected Status: 200
- Payload Presence: Empty body (zero data)
- Visible UI Result: Search icon is visible but decorative in the accessibility tree.

# Expected Final Result

A decorative search icon is present near the search input, excluded from the accessibility tree.

# Classification

- Accessibility
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