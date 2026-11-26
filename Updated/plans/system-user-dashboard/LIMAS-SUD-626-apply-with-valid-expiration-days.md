---
test_id: "LIMAS-SUD-626"
title: "To verify the functionality of \"System User Dashboard\" → \"Expiring Licenses\" → \"Apply Extension\" → \"Apply Extension With Valid Expiration Days\""
module: "System User Dashboard"
page: "System User Dashboard"
section: "Expiring Licenses"
control: "Apply Extension"
action: "Apply Extension With Valid Expiration Days"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Data-changing"
test_type: "Data-changing"
automation_candidate: true
plan_status: "reviewed"
script_status: "generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: { runtime_keys: ["TEST_EXPIRING_RECORD_IDENTIFIER"] }
related_script: "tests/system-user-dashboard/LIMAS-SUD-626-apply-with-valid-expiration-days.spec.ts"
---

# Purpose

Verify submitting valid Expiration days updates the license.
# API Contract (verified from source)

- HTTP Method: PUT
- Endpoint: `/limas/api/users` (relative to BASE_URL)
- Expected Status: 200
- Payload: `{ id: <User.id>, licenses: [{ id, expirationDate, maintenanceDate, enabled, hardwareId: { id }, productProfile: { id }, profileRole, user: { id } }] }`
- Dates in payload: epoch milliseconds (23:59:59 local)

# Success Behavior (verified from source)

- Dialog closes (`setExtendDialogOpen(false)`).
- Toast notification: "License updated" / "License dates updated successfully."
- Query invalidation triggers automatic list refresh (`queryClient.invalidateQueries` on `["users"]` and `["expiring-licenses-by-groups"]`).

# Failure Behavior (verified from source)

- Toast notification: "Update failed" / error message or "The license dates could not be updated."
- Variant: "destructive"

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Dashboard is loaded and the Expiring Licenses section is available.
- At least one loaded record has an Extend button.
- For data-changing cases: a dedicated, mutable license record is available.

# Steps and Expected Results

1. Action: Navigate to the System User Dashboard and select Expiring Licenses.
   Expected Result: Expiration is selected, Expires before is empty and Search is empty.

2. Action: Locate a record by its identifier and click its Extend button.
   Expected Result: The Extend License dialog opens.

3. Action: Enter valid Expiration days.
   Expected Result: The days value is displayed.

4. Action: Click Apply Extension.
   Expected Result: PUT /users is called. Dialog closes. Success toast. Exp date advances by the submitted days.

5. Action: Clear all extension inputs.
   Expected Result: All date and days fields are empty.

6. Action: Uncheck Synchronise Maintenance Date with Expiration.
   Expected Result: The checkbox is unchecked.

7. Action: Close the dialog or verify it is already closed.
   Expected Result: The dialog is removed.

8. Action: Verify Expiration is selected with default controls.
   Expected Result: Expiration radio checked, Expires Before empty, Search empty.

# Network Verification

- Request URL: /limas/api/users
- HTTP Method: PUT
- Expected Status: 200
- Payload Presence: Yes (see API Contract above)
- Visible UI Result: PUT /users returns 200. Dialog closes. Success toast. Record updates.

# Expected Final Result

The license Expiration date advances by the submitted days.

# Classification

- Data-changing
- Data-changing

# Restrictions

- Do not include credentials, tokens, cookies, authorization codes, or sensitive payloads.
- Use a dedicated test record for data-changing cases.
- Submit exactly once per execution.
- Do not repeat submission in the same run.
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
