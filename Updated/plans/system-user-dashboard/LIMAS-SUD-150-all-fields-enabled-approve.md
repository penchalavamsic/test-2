---
test_id: "LIMAS-SUD-150"
title: 'To verify the functionality of "System User Dashboard" → "Pending License Requests" → "Inline Form" → "Approve Request Enabled After All Required Fields"'
module: "system-user-dashboard"
page: "/system-user-dashboard"
section: "Pending License Requests"
control: "Approve Request button"
action: "Verify Approve Request button becomes enabled after all required fields are filled"
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

Verify that the Approve Request button transitions from disabled to enabled after User Group, Profile, Role, and Expiration Date are all selected.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The user is authenticated on `/system-user-dashboard`.
- The inline approval form is open.

# Test Data

Use environment variables and runtime dropdown selections.

# Steps and Expected Results

1. Action: Open the approve form on the first pending request.
   Expected Result: Form opens with Approve Request disabled.

2. Action: Select a User Group from the dropdown.
   Expected Result: Approve Request still disabled.

3. Action: Select a Profile from the dropdown.
   Expected Result: Approve Request still disabled.

4. Action: Select a Role from the dropdown.
   Expected Result: Approve Request still disabled (Expiration Date missing).

5. Action: Select an Expiration Date.
   Expected Result: Approve Request becomes enabled after all required fields filled.

6. Action: Close the form via Cancel without submitting.
   Expected Result: Form closes cleanly.

# Network Verification

- No PUT request should be triggered by this inspection.

# Expected Final Result

Approve Request button becomes enabled only when User Group, Profile, Role, and Expiration Date are all selected.

# Classification

- Read-only
- Positive

# Restrictions

- Do not include credentials.
- Do not submit approval.
- Do not hardcode User Group, Profile, Role, or date values.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending