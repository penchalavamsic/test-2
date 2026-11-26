---
test_id: "LIMAS-SUD-850"
title: "To verify the functionality of \"System User Dashboard\" → \"Expiring Floating Configurations\" → \"Combined Date and Search\" → \"Clear Date Preserves Search\""
module: "System User Dashboard"
page: "System User Dashboard"
section: "Expiring Floating Configurations"
control: "Combined Date and Search"
action: "Clear Date Preserves Search"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Read-only"
test_type: "Positive"
automation_candidate: true
plan_status: "reviewed"
script_status: "generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/system-user-dashboard/LIMAS-SUD-850-efc-f-clear-date-preserves-search.spec.ts"
---

# Purpose

Verify that clearing the date while search is populated triggers a default-date flconfig GET and the search remains.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Dashboard loaded, EFC section selected, Expiration radio checked, both date and search are populated.

# Test Data

Use environment variables and the authenticated fixture. Past date and search text are generated at runtime.

# Steps and Expected Results

1. Action: Navigate to dashboard, click EFC card, wait for initial EFC load, fill search with a runtime-generated query string, fill Expires until with a past date, wait for the date-triggered GET.
   Expected Result: Both search and date are populated.

2. Action: Clear the Expires until date input.
   Expected Result: A GET to `/limas/api/flconfig/e/{default-date}/{userId}?page=0&size=5` is observed. The search input still contains the original query string.

# Network Verification

- Request URL: `GET /limas/api/flconfig/e/{default-date}/{userId}?page=0&size=5`
- HTTP Method: GET
- Expected Status: 200
- Payload Presence: N/A
- Visible UI Result: Search value remains after clearing the date, default-date request is triggered.

# Expected Final Result

Clearing the date while search is populated triggers a default-date flconfig GET and preserves the search value.

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