---
test_id: "LIMAS-AUTH-038"
title: "To verify the functionality of \"Authentication\" → \"Session\" → \"Re-login after Sign Out\""
module: "Authentication"
page: "System User Dashboard"
section: "Session"
control: "Sign Out"
action: "Re-login"
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

Verify that a user can sign out and then successfully re-authenticate with valid credentials.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Valid credentials for `SUPER_USER_ADMIN_USER` are configured.

# Test Data

Credential variable names from the profile are read at runtime.

# Steps and Expected Results

1. Action: Complete full Keycloak login and confirm the dashboard loads.
   Expected Result: System User Dashboard is visible.

2. Action: Sign out via user button → Logout.
   Expected Result: LIMAS login page is displayed.

3. Action: Click Sign In, complete Keycloak login again.
   Expected Result: System User Dashboard is visible after re-authentication.

# Network Verification

- Request URL: `/system-user-dashboard` (after re-auth)
- HTTP Method: GET
- Expected Status: 200
- Visible UI Result: Dashboard rendered after re-login

# Expected Final Result

User can sign out and successfully re-authenticate.

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
