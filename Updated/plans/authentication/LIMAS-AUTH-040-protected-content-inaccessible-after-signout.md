---
test_id: "LIMAS-AUTH-040"
title: "To verify the functionality of \"Authentication\" → \"Session\" → \"Protected content inaccessible after Sign Out\""
module: "Authentication"
page: "System User Dashboard"
section: "Session"
control: "Sign Out"
action: "Access control"
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

Verify that protected content (dashboard) requires re-authentication after sign-out.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Valid credentials for `SUPER_USER_ADMIN_USER` are configured.

# Test Data

Credential variable names from the profile are read at runtime.

# Steps and Expected Results

1. Action: Complete full Keycloak login and confirm the dashboard loads.
   Expected Result: System User Dashboard is visible.

2. Action: Sign out.
   Expected Result: LIMAS login page is displayed.

3. Action: Attempt to navigate directly to `/system-user-dashboard`.
   Expected Result: User is redirected to the login page or Keycloak, not given access to the dashboard.

# Network Verification

- Request URL: `/system-user-dashboard` (after logout)
- Expected Status: Redirect to `/` or Keycloak
- Visible UI Result: Login page displayed, not dashboard

# Expected Final Result

Protected dashboard content is inaccessible after sign-out without re-authentication.

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
