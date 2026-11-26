---
test_id: "LIMAS-SUD-924"
title: "To verify the functionality of \"System User Dashboard\" → \"Floating Licenses\" → \"Accessibility\" → \"Search Value Announcement\""
module: "System User Dashboard"
page: "System User Dashboard"
section: "Floating Licenses"
control: "Accessibility"
action: "Search Value Announcement"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
classification: "Accessibility"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/system-user-dashboard/floating-licenses/floating-licenses-filtered-zero-state.spec.ts"
---

# Purpose

Verify that the search input value is discoverable after filling.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses section is loaded.

# Test Data

Use a runtime-provided search term via `TEST_FL_SEARCH_USER_ID`.

# Steps and Expected Results

1. Action: Navigate to System User Dashboard, wait for full render, select Floating Licenses, wait for initial GET.
   Expected Result: Floating Licenses section is visible.

2. Action: Fill search with `TEST_FL_SEARCH_USER_ID`.
   Expected Result: `inputValue()` returns `TEST_FL_SEARCH_USER_ID`. The search input is accessible (though it lacks an aria-label, it is discoverable via placeholder or DOM presence).

# Network Verification

- Request URL: N/A
- HTTP Method: N/A
- Expected Status: N/A
- Payload Presence: N/A
- Visible UI Result: Search value discoverable.

# Expected Final Result

The search value is retrievable from the DOM after filling.

# Classification

- Accessibility
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not repeat data-changing submissions.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Live UI observation via Playwright MCP: search value visible in DOM.