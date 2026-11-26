---
test_id: "LIMAS-SUD-900"
title: "To verify the functionality of \"System User Dashboard\" → \"Floating Licenses\" → \"Search\" → \"Count Text Unchanged During Search\""
module: "System User Dashboard"
page: "System User Dashboard"
section: "Floating Licenses"
control: "Search"
action: "Count Text Unchanged During Search"
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

Verify that the count text stays "0 loaded · 0 total licenses" and does not switch to a "matches" format when search is used — unlike the Expiring Licenses section.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses section is loaded with zero data.

# Test Data

Use a runtime-provided search term via `TEST_FL_SEARCH_USER_ID`.

# Steps and Expected Results

1. Action: Navigate to System User Dashboard, wait for full render, select Floating Licenses, wait for initial GET.
   Expected Result: Count text shows "0 loaded · 0 total licenses".

2. Action: Fill the search input with `TEST_FL_SEARCH_USER_ID`.
   Expected Result: Count text remains in the "loaded · total" format — it does not switch to a "matches" format. The values remain 0.

# Network Verification

- Request URL: N/A
- HTTP Method: N/A
- Expected Status: N/A
- Payload Presence: N/A
- Visible UI Result: Count text unchanged in both wording and values.

# Expected Final Result

Count text retains the "loaded · total licenses" wording throughout search operations.

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

- Live UI observation via Playwright MCP: "0 loaded · 0 total licenses" remained regardless of search value.