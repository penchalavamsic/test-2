---
test_id: "LIMAS-AUTH-036"
title: "To verify the functionality of \"Authentication\" → \"Login\" → \"Whitespace-only credentials\""
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
test_data:
  whitespace_username: "   "
  whitespace_password: "   "
related_script: ""
---

# Purpose

Verify that whitespace-only credentials are rejected.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.

# Test Data

- Username: `   ` (three spaces)
- Password: `   ` (three spaces)

# Steps and Expected Results

1. Action: Navigate to Keycloak login form.
   Expected Result: Keycloak login form is visible.

2. Action: Enter whitespace-only values in both fields, submit.
   Expected Result: Login is rejected. Error or validation feedback is visible.

3. Action: Verify the login page is still active.
   Expected Result: User is NOT redirected to the dashboard.

# Network Verification

- Request URL: Keycloak POST (rejected)
- Expected Status: 401 or validation error
- Visible UI Result: Error feedback displayed

# Expected Final Result

Authentication is rejected, feedback is displayed, and the Keycloak login page remains active.

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
