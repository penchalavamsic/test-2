---
test_id: "LIMAS-SUD-149"
title: 'To verify the functionality of "System User Dashboard" → "Pending License Requests" → "Inline Form" → "Approve Request Disabled When Expiration Date Missing"'
module: "system-user-dashboard"
page: "/system-user-dashboard"
section: "Pending License Requests"
control: "Approve Request button"
action: "Verify Approve Request button is disabled when Expiration Date has not been selected"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Read-only"
test_type: "Functional"
automation_candidate: true
plan_status: "reviewed"
script_status: "generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: ""
---

# Purpose

Verify that the Approve Request button remains disabled when an Expiration Date has not been selected, even though User Group, Profile, and Role are filled.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The user is authenticated on `/system-user-dashboard`.
- The inline approval form is open with User Group, Profile, and Role selected.

# Test Data

Use environment variables and runtime fixture values only.

# Steps and Expected Results

1. Action: Open the approve form on the first pending request.
   Expected Result: Form opens; Approve Request button is disabled.

2. Action: Select a User Group from the dropdown.
   Expected Result: User Group value is displayed.

3. Action: Select a Profile from the dropdown.
   Expected Result: Profile value is displayed. Role and Expiration Date fields become visible.

4. Action: Select a Role from the dropdown.
   Expected Result: Role value is displayed. Approve Request remains disabled because Expiration Date is still empty.

5. Action: Verify Approve Request button state.
   Expected Result: Approve Request button is disabled.

6. Action: Close the form via Cancel.
   Expected Result: Form closes; Approve button reappears on the row.

# Network Verification

- No PUT request should be triggered.

# Expected Final Result

Approve Request button remains disabled when Expiration Date is not selected.

# Classification

- Read-only
- Positive

# Restrictions

- Do not include credentials.
- Do not submit approval.
- Do not hardcode User Group, Profile, or Role names.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending