---
test_id: "LIMAS-SUD-896"
title: "To verify the functionality of \"System User Dashboard\" → \"Floating Licenses\" → \"Search\" → \"Search Value Accepted\""
module: "System User Dashboard"
page: "System User Dashboard"
section: "Floating Licenses"
control: "Search"
action: "Search Value Accepted"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Read-only"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/system-user-dashboard/floating-licenses/floating-licenses-search-behavior.spec.ts"
---

# Purpose

Verify that a search value can be entered into the Floating Licenses search control and the input accepts the value.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses section is loaded.

# Test Data

Use a runtime-provided search term via `TEST_FL_SEARCH_USER_ID`.

# Steps and Expected Results

1. Action: Navigate to System User Dashboard, wait for full render, select Floating Licenses, wait for initial GET.
   Expected Result: Floating Licenses section is visible with empty search control.

2. Action: Fill the search input with `TEST_FL_SEARCH_USER_ID`.
   Expected Result: The search input shows the filled value. The control is enabled and accepts text input.

# Network Verification

- Request URL: N/A (search is client-side)
- HTTP Method: N/A
- Expected Status: N/A
- Payload Presence: N/A
- Visible UI Result: Search value is visible in the input field.

# Expected Final Result

The search input accepts and displays the entered text value.

# Classification

- Read-only
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not repeat data-changing submissions.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Live UI observation via Playwright MCP: search value accepted and visible in DOM.