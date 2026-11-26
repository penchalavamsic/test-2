---
test_id: "LIMAS-SUD-320"
title: "To verify the functionality of "System User Dashboard" → "Expiring Licenses" → "License Count" → "Loaded Count Matches Rendered Records After Maintenance Selection""
module: "System User Dashboard"
page: "System User Dashboard"
section: "Expiring Licenses"
control: "License Count"
action: "Loaded Count Matches Rendered Records After Maintenance Selection"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Read-only"
test_type: "Positive"
automation_candidate: true
plan_status: "reviewed"
script_status: "generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/system-user-dashboard/LIMAS-SUD-320-expiring-maintenance-loaded-count-consistent.spec.ts"
---

# Purpose

Verify that after selecting Maintenance the loaded count is numeric and equals the number of rendered license records.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Dashboard is loaded and the Expiring Licenses section is available.

# Test Data

Use environment variables and the authenticated fixture. Counts are captured at runtime and are never hardcoded.

# Steps and Expected Results

1. Action: Authenticate as SUPER_USER_ADMIN_USER and open the System User Dashboard.
   Expected Result: The System User Dashboard heading is visible.

2. Action: Click the Expiring Licenses summary card and wait for the section to load.
   Expected Result: Expiration is selected, Expires before is empty and Search is empty.

3. Action: Click the Maintenance radio while waiting for the license-list response.
   Expected Result: The response completes.

4. Action: Read the loaded count and count rendered Extend buttons.
   Expected Result: The loaded count is numeric, zero or greater, and equals the rendered record count.

5. Action: Restore the default filter state.
   Expected Result: Expiration is selected, Maintenance is unselected, Expires before is empty and Search is empty.

# Network Verification

- Request URL: Users list endpoint (sanitized, no query values recorded)
- HTTP Method: GET
- Expected Status: 200
- Payload Presence: Not inspected
- Visible UI Result: License list refreshes.

# Expected Final Result

Loaded count is numeric and equals the number of rendered records.

# Classification

- Read-only (UI filter state only; no license data is changed)
- Positive

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
