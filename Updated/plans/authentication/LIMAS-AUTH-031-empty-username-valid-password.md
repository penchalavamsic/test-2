---
test_id: "LIMAS-AUTH-031"
title: "To verify the functionality of \"Authentication\" → \"Login\" → \"Empty username + valid password\""
module: "Authentication"
page: "Keycloak"
section: "Login"
control: "Credentials"
action: "Negative login"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "High"
classification: "Read-only"
test_type: "Functional"
automation_candidate: true
plan_status: "reviewed"
script_status: "not-generated"
environment_variables:
  - LIMAS_BASE_URL
  - LIMAS_SUPER_USER_ADMIN_USER_PASSWORD
test_data: {}
related_script: ""
---

# Purpose

Verify that login is rejected when the username field is empty but a valid password is supplied.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Valid password from `SUPER_USER_ADMIN_USER` is configured.

# Test Data

- Username: (empty)
- Password: runtime credential from profile

# Steps and Expected Results

1. Action: Navigate to Keycloak login form.
   Expected Result: Keycloak login form is visible.

2. Action: Leave username empty, enter valid password, submit.
   Expected Result: Login is rejected. Validation feedback is visible (field required or general error).

3. Action: Verify the login page is still active.
   Expected Result: User is NOT redirected to the dashboard.

# Network Verification

- Request URL: Keycloak POST (rejected)
- Expected Status: 401 or validation error
- Visible UI Result: Validation feedback displayed

# Expected Final Result

Authentication is rejected due to missing username, feedback is displayed, and the Keycloak login page remains active.

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
