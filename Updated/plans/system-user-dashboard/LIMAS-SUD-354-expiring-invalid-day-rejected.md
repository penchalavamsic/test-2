---
test_id: "LIMAS-SUD-354"
title: "To verify the functionality of "System User Dashboard" → "Expiring Licenses" → "Expires Before Field" → "Invalid Day Text Is Not Accepted""
module: "System User Dashboard"
page: "System User Dashboard"
section: "Expiring Licenses"
control: "Expires Before Field"
action: "Invalid Day Text Is Not Accepted"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
classification: "Read-only"
test_type: "Negative"
automation_candidate: true
plan_status: "reviewed"
script_status: "generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: { runtime_keys: ["TEST_CURRENT_DATE", "TEST_PAST_DATE", "TEST_FUTURE_DATE", "TEST_EXPIRES_BEFORE_DATE", "TEST_MONTH_BOUNDARY_DATE", "TEST_INVALID_MONTH_DATE", "TEST_INVALID_DAY_DATE", "TEST_UNSUPPORTED_FORMAT_DATE"] }
related_script: "tests/system-user-dashboard/LIMAS-SUD-354-expiring-invalid-day-rejected.spec.ts"
---

# Purpose

Verify that invalid day text generated at runtime is not accepted and the list is unchanged.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Dashboard is loaded and the Expiring Licenses section is available.

# Test Data

Use environment variables and the authenticated fixture. Dates are generated at runtime (TEST_CURRENT_DATE, TEST_PAST_DATE, TEST_FUTURE_DATE, TEST_EXPIRES_BEFORE_DATE and related keys) and are never stored in this plan. Counts are captured at runtime and are never hardcoded.

# Steps and Expected Results

1. Action: Authenticate as SUPER_USER_ADMIN_USER and open the System User Dashboard.
   Expected Result: The System User Dashboard heading is visible.

2. Action: Click the Expiring Licenses summary card and wait for the section to load.
   Expected Result: Expiration is selected, Expires before is empty and Search is empty.

3. Action: Capture the loaded count at runtime.
   Expected Result: The count is numeric.

4. Action: Attempt to enter TEST_INVALID_DAY_DATE.
   Expected Result: The field value stays empty.

5. Action: Read the loaded count.
   Expected Result: It equals the captured value.

6. Action: Restore the default filter state.
   Expected Result: Expiration is selected, Maintenance is unselected, Expires before is empty and Search is empty.

# Network Verification

- Request URL: N/A
- HTTP Method: N/A
- Expected Status: N/A
- Payload Presence: N/A
- Visible UI Result: The field stays empty and the list is unchanged.

# Expected Final Result

The field stays empty and the list is unchanged.

# Classification

- Read-only (UI filter state only; no license data is changed)
- Negative

# Restrictions

- Do not include credentials, tokens, cookies, authorization codes, or sensitive payloads.
- Do not repeat data-changing submissions.
- Do not manually navigate to simulate a successful result.
- Do not use static environment-specific data.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending

# Dynamic Plan Rules

1. Use only behavior verified through Playwright MCP.
2. Verify one atomic behavior per plan.
3. Do not hardcode application URLs.
4. Do not hardcode usernames or passwords.
5. Do not hardcode user names, emails, request IDs, license IDs, hardware IDs, dates, User Groups, Profiles, Roles, feature names, versions, or local paths.
6. Use environment variables, access-profiles.json, runtime fixtures, or test-data configuration.
7. Select exactly one access profile: SUPER_USER_ADMIN_USER
8. Keep every plan shareable between environments and team members.
9. CI/CD owns test execution.
10. The Healer may propose test-only changes later but must not change expected LIMAS behavior.
11. Plans must use this Jira-style title format:

To verify the functionality of "<Module>" → "<Section>" → "<Control>" → "<Action>"
