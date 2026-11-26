---
test_id: "LIMAS-SUD-419"
title: "To verify the functionality of "System User Dashboard" → "Expiring Licenses" → "Search Filter Interaction" → "Search Value Is Retained When Switching To Maintenance""
module: "System User Dashboard"
page: "System User Dashboard"
section: "Expiring Licenses"
control: "Search Filter Interaction"
action: "Search Value Is Retained When Switching To Maintenance"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Read-only"
test_type: "Positive"
automation_candidate: true
plan_status: "reviewed"
script_status: "generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: { runtime_keys: ["TEST_USER_EMAIL"] }
related_script: "tests/system-user-dashboard/LIMAS-SUD-419-search-value-is-retained-when-switching-to-maintenance.spec.ts"
---

# Purpose

Verify the Search value is kept when the filter changes from Expiration to Maintenance.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Dashboard is loaded and the Expiring Licenses section is available.
- At least one loaded record exposes a name, email, Hardware ID and Profile.

# Test Data

Use environment variables and the authenticated fixture. Search values (TEST_USER_EMAIL) are derived at runtime from a record already loaded in the Expiring Licenses list and are never stored in this plan. Counts are captured at runtime and are never hardcoded.

# Steps and Expected Results

1. Action: Authenticate as SUPER_USER_ADMIN_USER and open the System User Dashboard.
   Expected Result: The System User Dashboard heading is visible.

2. Action: Click the Expiring Licenses summary card and wait for the section to load.
   Expected Result: Expiration is selected, Expires before is empty and Search is empty.

3. Action: Read one loaded record at runtime to derive TEST_* search values (values are never stored).
   Expected Result: Runtime values are available from the loaded list.

4. Action: Enter TEST_USER_EMAIL into the Search field.
   Expected Result: The list is filtered immediately.

5. Action: Select Maintenance.
   Expected Result: The Search value is unchanged.

6. Action: Restore the default filter state.
   Expected Result: Expiration is selected, Maintenance is unselected, Expires before is empty and Search is empty.

# Network Verification

- Request URL: N/A
- HTTP Method: N/A
- Expected Status: N/A
- Payload Presence: N/A
- Visible UI Result: The Search value is retained.

# Expected Final Result

The Search value is retained when switching to Maintenance.

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
