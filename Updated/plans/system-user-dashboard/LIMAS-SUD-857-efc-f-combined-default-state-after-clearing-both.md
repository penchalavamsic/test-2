---
test_id: "LIMAS-SUD-857"
title: "To verify the functionality of \"System User Dashboard\" → \"Expiring Floating Configurations\" → \"Combined Date and Search\" → \"Combined Default State After Clearing Both\""
module: "System User Dashboard"
page: "System User Dashboard"
section: "Expiring Floating Configurations"
control: "Combined Date and Search"
action: "Combined Default State After Clearing Both"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Read-only"
test_type: "Positive"
automation_candidate: true
plan_status: "reviewed"
script_status: "generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/system-user-dashboard/LIMAS-SUD-857-efc-f-combined-default-state-after-clearing-both.spec.ts"
---

# Purpose

Verify that after clearing both search and date, the default empty state "No expiring floating configurations found" returns.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Dashboard loaded, EFC section selected, Expiration radio checked, both date and search are populated.

# Test Data

Use environment variables and the authenticated fixture. Past date and search text are generated at runtime.

# Steps and Expected Results

1. Action: Navigate to dashboard, click EFC card, wait for initial EFC load, fill search with a runtime-generated query string, fill Expires until with a past date, wait for the date-triggered GET.
   Expected Result: Both search and date are populated.

2. Action: Clear the search input, then clear the Expires until date input, wait for the default-date API response.
   Expected Result: "No expiring floating configurations found" is visible as the empty state text.

# Network Verification

- Request URL: `GET /limas/api/flconfig/e/{default-date}/{userId}?page=0&size=5`
- HTTP Method: GET
- Expected Status: 200
- Payload Presence: N/A
- Visible UI Result: Default "No expiring floating configurations found" heading is restored.

# Expected Final Result

After clearing both search and date, the default empty state heading returns.

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