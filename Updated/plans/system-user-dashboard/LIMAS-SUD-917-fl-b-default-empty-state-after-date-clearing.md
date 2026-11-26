---
test_id: "LIMAS-SUD-917"
title: "To verify the functionality of \"System User Dashboard\" → \"Floating Licenses\" → \"Empty State\" → \"Default Empty State After Date Clearing\""
module: "System User Dashboard"
page: "System User Dashboard"
section: "Floating Licenses"
control: "Empty State"
action: "Default Empty State After Date Clearing"
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

Verify that after setting and then clearing the date, the default empty state is restored (heading and subtext revert).

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses section is loaded.

# Test Data

Use a runtime-provided date via `TEST_FL_FUTURE_DATE`.

# Steps and Expected Results

1. Action: Navigate to System User Dashboard, wait for full render, select Floating Licenses, wait for initial GET.
   Expected Result: Default empty state: "No floating licenses found" / "No floating licenses match the selected expiration criteria."

2. Action: Set date to `TEST_FL_FUTURE_DATE`, wait for GET.
   Expected Result: Date is populated.

3. Action: Clear the date (fill ''), wait for the default-date GET.
   Expected Result: Default empty state returns: heading "No floating licenses found", subtext "No floating licenses match the selected expiration criteria."

# Network Verification

- Request URL: `/api/flicense/ex/{defaultDate}/{profileId}?page=0&size=5`
- HTTP Method: GET
- Expected Status: 200
- Payload Presence: N/A
- Visible UI Result: Default empty state restored.

# Expected Final Result

Clearing the date restores the default empty state.

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

- Live UI observation via Playwright MCP: date cleared → default empty state returned.