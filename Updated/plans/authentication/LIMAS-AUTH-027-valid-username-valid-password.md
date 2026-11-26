---
test_id: "LIMAS-AUTH-027"
title: "To verify the functionality of \"Authentication\" → \"Login\" → \"Valid username + valid password\""
module: "Authentication"
page: "System User Dashboard"
section: "Login"
control: "Credentials"
action: "Valid login"
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
  - LIMAS_SUPER_USER_ADMIN_USER_PASSWORD
test_data: {}
related_script: ""
---

# Purpose

Verify that a user can log in with a valid username and valid password.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Valid credentials for `SUPER_USER_ADMIN_USER` are configured.

# Test Data

Credential variable names from the profile are read at runtime.

# Steps and Expected Results

1. Action: Navigate to LIMAS, click Sign In to reach Keycloak.
   Expected Result: Keycloak login form is visible.

2. Action: Enter valid username and valid password, submit.
   Expected Result: Browser redirects to `/system-user-dashboard`.

3. Action: Verify dashboard heading is visible.
   Expected Result: "System User Dashboard" heading is displayed.

# Network Verification

- Request URL: `/system-user-dashboard`
- HTTP Method: GET
- Expected Status: 200
- Payload Presence: Dashboard content
- Visible UI Result: Dashboard rendered

# Expected Final Result

User is authenticated and lands on the System User Dashboard.

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
