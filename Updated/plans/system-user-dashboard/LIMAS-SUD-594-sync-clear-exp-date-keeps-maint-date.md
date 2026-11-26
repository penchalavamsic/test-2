---
test_id: "LIMAS-SUD-594"
title: "To verify the functionality of \"System User Dashboard\" → \"Expiring Licenses\" → \"Synchronization With Expiration Date\" → \"Clearing Expiration Date During Sync Retains Last Maintenance Date\""
module: "System User Dashboard"
page: "System User Dashboard"
section: "Expiring Licenses"
control: "Synchronization With Expiration Date"
action: "Clearing Expiration Date During Sync Retains Last Maintenance Date"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Read-only"
test_type: "Positive"
automation_candidate: true
plan_status: "reviewed"
script_status: "generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: { runtime_keys: ["TEST_EXPIRING_RECORD_IDENTIFIER"] }
related_script: "tests/system-user-dashboard/LIMAS-SUD-594-sync-clear-exp-date-keeps-maint-date.spec.ts"
---

# Purpose

Verify clearing Expiration date while synced retains the last Maintenance date value.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Dashboard is loaded and the Expiring Licenses section is available.
- At least one loaded record has an Extend button.

# Steps and Expected Results

1. Action: Navigate to the System User Dashboard and select Expiring Licenses.
   Expected Result: Expiration is selected, Expires before is empty and Search is empty.

2. Action: Locate a record by its identifier and click its Extend button.
   Expected Result: The Extend License dialog opens.

3. Action: Set date, sync, clear exp date.
   Expected Result: Maintenance date retains its last value.

4. Action: Clear all extension inputs.
   Expected Result: All date and days fields are empty.

5. Action: Uncheck Synchronise Maintenance Date with Expiration.
   Expected Result: The checkbox is unchecked.

6. Action: Close the dialog.
   Expected Result: The dialog is removed.

7. Action: Verify Expiration is selected with default controls.
   Expected Result: Expiration radio checked, Expires Before empty, Search empty.

# Network Verification

- Request URL: N/A
- HTTP Method: N/A
- Expected Status: N/A
- Payload Presence: N/A
- Visible UI Result: Maintenance date retains the last value.

# Expected Final Result

Clearing Expiration date during sync retains the last Maintenance date.

# Classification

- Read-only (no extension is applied)
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, authorization codes, or sensitive payloads.
- Do not click Apply Extension.
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
