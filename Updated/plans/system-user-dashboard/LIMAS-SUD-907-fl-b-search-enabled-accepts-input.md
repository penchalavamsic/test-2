---
test_id: "LIMAS-SUD-907"
title: "To verify the functionality of \"System User Dashboard\" → \"Floating Licenses\" → \"Search\" → \"Search Enabled and Accepts Input\""
module: "System User Dashboard"
page: "System User Dashboard"
section: "Floating Licenses"
control: "Search"
action: "Search Enabled and Accepts Input"
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

Verify that the search input is enabled and can accept keyboard input after section load.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses section is loaded.

# Test Data

Use a runtime-provided search term via `TEST_FL_SEARCH_USER_ID`.

# Steps and Expected Results

1. Action: Navigate to System User Dashboard, wait for full render, select Floating Licenses, wait for initial GET.
   Expected Result: Floating Licenses section is visible.

2. Action: Verify the search control is enabled, then fill it with `TEST_FL_SEARCH_USER_ID`.
   Expected Result: The control has the `enabled` attribute state and accepts fill without error. `inputValue()` reflects the entered text.

# Network Verification

- Request URL: N/A
- HTTP Method: N/A
- Expected Status: N/A
- Payload Presence: N/A
- Visible UI Result: Search enabled and containing typed text.

# Expected Final Result

The search control is enabled and can receive user input.

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

- Live UI observation via Playwright MCP: search is enabled and accepts input.