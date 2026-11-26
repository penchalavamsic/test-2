---
test_id: "LIMAS-SUD-918"
title: "To verify the functionality of \"System User Dashboard\" → \"Floating Licenses\" → \"Empty State\" → \"Filtered Empty State After Search No-Match\""
module: "System User Dashboard"
page: "System User Dashboard"
section: "Floating Licenses"
control: "Empty State"
action: "Filtered Empty State After Search No-Match"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Read-only"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/system-user-dashboard/floating-licenses/floating-licenses-filtered-zero-state.spec.ts"
---

# Purpose

Verify that entering a search term with zero-data results shows the filtered no-match empty state.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses section is loaded with zero data.

# Test Data

Use a runtime-provided search term via `TEST_FL_SEARCH_USER_ID`.

# Steps and Expected Results

1. Action: Navigate to System User Dashboard, wait for full render, select Floating Licenses, wait for initial GET.
   Expected Result: Default empty state is visible.

2. Action: Fill search with `TEST_FL_SEARCH_USER_ID`.
   Expected Result: "No matching floating licenses found" heading and "Try a different user ID, profile, hardware ID, or role." subtext are displayed.

# Network Verification

- Request URL: N/A
- HTTP Method: N/A
- Expected Status: N/A
- Payload Presence: N/A
- Visible UI Result: Filtered empty state shown.

# Expected Final Result

Search with zero-data results shows the filtered no-match empty state.

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

- Live UI observation via Playwright MCP: search no-match → filtered empty state confirmed.