---
test_id: "LIMAS-AUTH-041"
title: "To verify the functionality of \"Authentication\" → \"Session\" → \"Session state cleared after Sign Out\""
module: "Authentication"
page: "System User Dashboard"
section: "Session"
control: "Sign Out"
action: "Session clearance"
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

Verify that after sign-out, stored authenticated state is no longer usable and authentication-dependent content is not visible.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Valid credentials for `SUPER_USER_ADMIN_USER` are configured.

# Test Data

Credential variable names from the profile are read at runtime.

# Steps and Expected Results

1. Action: Complete full Keycloak login and confirm the dashboard loads. Note the identity of the authenticated user.
   Expected Result: System User Dashboard is visible with authenticated user identity.

2. Action: Sign out and verify return to login page.
   Expected Result: LIMAS login page is displayed.

3. Action: Clear browser storage (cookies, localStorage, sessionStorage), then navigate to the dashboard route.
   Expected Result: User is redirected to the login page, not the dashboard.

4. Action: Verify no authenticated user-identity elements are visible on the login page.
   Expected Result: Only the public login page content is visible.

# Network Verification

- Request URL: `/system-user-dashboard` (after logout + storage clear)
- Expected Status: Redirect to `/` or Keycloak
- Visible UI Result: Login page displayed

# Expected Final Result

After sign-out and storage clearance, no authenticated content is accessible without re-authentication.

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
