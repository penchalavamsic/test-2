---
test_id: "LIMAS-SUD-856"
title: "To verify the functionality of \"System User Dashboard\" → \"Expiring Floating Configurations\" → \"Combined Date and Search\" → \"Count Unchanged During Combined Ops\""
module: "System User Dashboard"
page: "System User Dashboard"
section: "Expiring Floating Configurations"
control: "Combined Date and Search"
action: "Count Unchanged During Combined Ops"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Read-only"
test_type: "Positive"
automation_candidate: true
plan_status: "reviewed"
script_status: "generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/system-user-dashboard/LIMAS-SUD-856-efc-f-count-unchanged-during-combined-ops.spec.ts"
---

# Purpose

Verify that the count text ("0 loaded · 0 total configurations") remains unchanged throughout combined date and search operations.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Dashboard loaded, EFC section selected, Expiration radio checked, zero-data state visible.

# Test Data

Use environment variables and the authenticated fixture. Past date and search text are generated at runtime.

# Steps and Expected Results

1. Action: Navigate to dashboard, click EFC card, wait for initial EFC load, observe the count text.
   Expected Result: Count text displays "0 loaded · 0 total configurations".

2. Action: Fill Expires until with a past date, wait for the API response.
   Expected Result: Count text remains unchanged.

3. Action: Fill search with a runtime-generated query string.
   Expected Result: Count text remains unchanged.

# Network Verification

- Request URL: `GET /limas/api/flconfig/e/{past-date}/{userId}?page=0&size=5`
- HTTP Method: GET
- Expected Status: 200
- Payload Presence: N/A
- Visible UI Result: Count text remains "0 loaded · 0 total configurations" throughout all operations.

# Expected Final Result

Count text remains unchanged during combined date and search operations.

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