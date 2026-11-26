---
test_id: "LIMAS-AUTH-028"
title: "To verify the functionality of \"Authentication\" → \"Login\" → \"Valid username + invalid password\""
module: "Authentication"
page: "Keycloak"
section: "Login"
control: "Credentials"
action: "Negative login"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "Critical"
classification: "Read-only"
test_type: "Functional"
automation_candidate: true
plan_status: "reviewed"
script_status: "not-generated"
environment_variables:
  - LIMAS_BASE_URL
  - LIMAS_SUPER_USER_ADMIN_USER_USERNAME
test_data:
  invalid_password: "wrong-password-123"
related_script: ""
---

# Purpose

Verify that login is rejected when a valid username is paired with an invalid password.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Valid username from `SUPER_USER_ADMIN_USER` is configured.

# Test Data

- Username: runtime credential from profile
- Password: `wrong-password-123`

# Steps and Expected Results

1. Action: Navigate to Keycloak login form.
   Expected Result: Keycloak login form is visible.

2. Action: Enter valid username and invalid password, submit.
   Expected Result: Login is rejected. Error message is visible on the Keycloak page.

3. Action: Verify the login page is still active.
   Expected Result: User is NOT redirected to the dashboard. Keycloak login form remains visible.

# Network Verification

- Request URL: Keycloak POST (rejected)
- Expected Status: 401 or redirect back to login
- Visible UI Result: Error feedback displayed, login form still active

# Expected Final Result

Authentication is rejected, error feedback is displayed, and the Keycloak login page remains active.

# Classification

- Read-only
- Functional

# Restrictions

- Do not include credentials, tokens, cookies, authorization codes, or sensitive payloads.
- Do not use static environment-specific data.

# Generation Status

- Test script generation: Pending
- CI/CD execution: Pending
- Healing: Pending
