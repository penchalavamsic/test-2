---
test_id: "LIMAS-SUD-897"
title: "To verify the functionality of \"System User Dashboard\" → \"Floating Licenses\" → \"Search\" → \"Search Is Client-Side — No API Request\""
module: "System User Dashboard"
page: "System User Dashboard"
section: "Floating Licenses"
control: "Search"
action: "Search Is Client-Side — No API Request"
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

Verify that entering a search value triggers zero API requests — confirming client-side filtering.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses section is loaded and all pending network requests have settled.

# Test Data

Use a runtime-provided search term via `TEST_FL_SEARCH_USER_ID`.

# Steps and Expected Results

1. Action: Navigate to System User Dashboard, wait for full render, select Floating Licenses, wait for initial GET.
   Expected Result: Floating Licenses section is visible.

2. Action: Start tracking all `/api/flicense/` requests. Fill the search input with `TEST_FL_SEARCH_USER_ID`.
   Expected Result: Zero API requests are observed on `/api/flicense/` (only the initial load request may have occurred before tracking started).

# Network Verification

- Request URL: N/A (no request expected)
- HTTP Method: N/A
- Expected Status: N/A
- Payload Presence: N/A
- Visible UI Result: Search value changes without triggering any network activity.

# Expected Final Result

Zero network requests are fired when search text is entered, confirming client-side filtering.

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

- Live UI observation via Playwright MCP: 0 API requests triggered by Search fill.