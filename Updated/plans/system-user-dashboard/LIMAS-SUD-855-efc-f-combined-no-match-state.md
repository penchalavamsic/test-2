---
test_id: "LIMAS-SUD-855"
title: "To verify the functionality of \"System User Dashboard\" → \"Expiring Floating Configurations\" → \"Combined Date and Search\" → \"Combined No-Match State\""
module: "System User Dashboard"
page: "System User Dashboard"
section: "Expiring Floating Configurations"
control: "Combined Date and Search"
action: "Combined No-Match State"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Read-only"
test_type: "Positive"
automation_candidate: true
plan_status: "reviewed"
script_status: "generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/system-user-dashboard/LIMAS-SUD-855-efc-f-combined-no-match-state.spec.ts"
---

# Purpose

Verify that with both date set and search populated with non-matching text, the no-match empty state is displayed.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Dashboard loaded, EFC section selected, Expiration radio checked, date set to a past date with no matching configurations.

# Test Data

Use environment variables and the authenticated fixture. Past date and non-matching search text are generated at runtime.

# Steps and Expected Results

1. Action: Navigate to dashboard, click EFC card, wait for initial EFC load, fill Expires until with a past date expected to return data, wait for the API response.
   Expected Result: The grid shows matching configurations for the selected date.

2. Action: Fill search with non-matching text (gibberish string not matching any configuration).
   Expected Result: The no-match empty state is displayed, indicating no results for the combined date and search criteria.

# Network Verification

- Request URL: `GET /limas/api/flconfig/e/{past-date}/{userId}?page=0&size=5`
- HTTP Method: GET
- Expected Status: 200
- Payload Presence: N/A
- Visible UI Result: No-match empty state is displayed for the combined criteria.

# Expected Final Result

With both date set and non-matching search text, the no-match empty state is displayed.

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

- Live UI observation via Playwright MCP