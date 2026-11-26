---
test_id: "LIMAS-SUD-498"
title: "To verify the functionality of \"System User Dashboard\" → \"Expiring Licenses\" → \"Expiration Extend by Days Input\" → \"Expiration Extend By Days Has Minimum Value One\""
module: "System User Dashboard"
page: "System User Dashboard"
section: "Expiring Licenses"
control: "Expiration Extend by Days Input"
action: "Expiration Extend By Days Has Minimum Value One"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Read-only"
test_type: "Positive"
automation_candidate: true
plan_status: "reviewed"
script_status: "generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: { runtime_keys: ["TEST_EXPIRING_RECORD_IDENTIFIER"] }
related_script: "tests/system-user-dashboard/LIMAS-SUD-498-expiration-extend-by-days-min-one.spec.ts"
---

# Purpose

Verify the Expiration Extend by Days input has min=1.

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

3. Action: Read the min attribute.
   Expected Result: min is "1".

4. Action: Close the dialog.
   Expected Result: The dialog is removed from the DOM.

5. Action: Verify Expiration is selected.
   Expected Result: The Expiration radio is checked.

6. Action: Verify Maintenance is unselected.
   Expected Result: The Maintenance radio is not checked.

7. Action: Verify Expires Before is empty.
   Expected Result: The Expires Before field value is empty.

8. Action: Verify Search is empty.
   Expected Result: The search field value is empty.

# Network Verification

- Request URL: N/A
- HTTP Method: N/A
- Expected Status: N/A
- Payload Presence: N/A
- Visible UI Result: min="1" is set.

# Expected Final Result

The Expiration Extend by Days input has a minimum of 1.

# Classification

- Read-only (dialog inspection only; no extension is applied)
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, authorization codes, or sensitive payloads.
- Do not enter dates or Extend by Days values.
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
