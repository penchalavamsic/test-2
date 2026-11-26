---
test_id: "LIMAS-SUD-377"
title: "To verify the functionality of "System User Dashboard" → "Expiring Licenses" → "Email Search" → "Searching By Full Email Shows Matching Records""
module: "System User Dashboard"
page: "System User Dashboard"
section: "Expiring Licenses"
control: "Email Search"
action: "Searching By Full Email Shows Matching Records"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Read-only"
test_type: "Positive"
automation_candidate: true
plan_status: "reviewed"
script_status: "generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: { runtime_keys: ["TEST_EXPIRING_RECORD_IDENTIFIER", "TEST_USER_EMAIL"] }
related_script: "tests/system-user-dashboard/LIMAS-SUD-377-searching-by-full-email-shows-matching-records.spec.ts"
---

# Purpose

Verify that searching with a full Email value from a loaded record keeps that record and hides non-matching loaded records.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Dashboard is loaded and the Expiring Licenses section is available.
- At least one loaded record exposes a name, email, Hardware ID and Profile.

# Test Data

Use environment variables and the authenticated fixture. Search values (TEST_EXPIRING_RECORD_IDENTIFIER, TEST_USER_EMAIL) are derived at runtime from a record already loaded in the Expiring Licenses list and are never stored in this plan. Counts are captured at runtime and are never hardcoded.

Deterministic-data note: TEST_USER_EMAIL is read from a record already loaded in the list; no value is stored.

# Steps and Expected Results

1. Action: Authenticate as SUPER_USER_ADMIN_USER and open the System User Dashboard.
   Expected Result: The System User Dashboard heading is visible.

2. Action: Click the Expiring Licenses summary card and wait for the section to load.
   Expected Result: Expiration is selected, Expires before is empty and Search is empty.

3. Action: Read one loaded record at runtime to derive TEST_* search values (values are never stored).
   Expected Result: Runtime values are available from the loaded list.

4. Action: Enter TEST_USER_EMAIL (taken from a loaded record) into the Search field.
   Expected Result: The list filters immediately and the source record remains visible.

5. Action: Compare the visible records with the loaded baseline.
   Expected Result: Every loaded record that matches TEST_USER_EMAIL remains and every visible record matches it.

6. Action: Read the count text.
   Expected Result: The count text reads "<matches> matches·<total> total" and the matches value equals the number of visible records.

7. Action: Restore the default filter state.
   Expected Result: Expiration is selected, Maintenance is unselected, Expires before is empty and Search is empty.

# Network Verification

- Request URL: N/A
- HTTP Method: N/A
- Expected Status: N/A
- Payload Presence: N/A
- Visible UI Result: Matching records remain visible, non-matching records are removed and the total count is unchanged.

# Expected Final Result

Records matching the Email value remain visible, the matches count equals the visible records and the total count is unchanged.

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
