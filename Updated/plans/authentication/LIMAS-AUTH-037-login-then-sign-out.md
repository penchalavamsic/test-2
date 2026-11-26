---
test_id: "LIMAS-AUTH-037"
title: "To verify the functionality of \"Authentication\" → \"Session\" → \"Login then Sign Out\""
module: "Authentication"
page: "System User Dashboard"
section: "Session"
control: "Sign Out"
action: "Logout"
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

Verify that a logged-in user can sign out and be returned to the login page.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Valid credentials for `SUPER_USER_ADMIN_USER` are configured.

# Test Data

Credential variable names from the profile are read at runtime.

# Steps and Expected Results

1. Action: Complete full Keycloak login and confirm the dashboard loads.
   Expected Result: System User Dashboard is visible.

2. Action: Click the user button and select Logout.
   Expected Result: User is signed out and returned to the LIMAS login page.

3. Action: Verify the Sign In button is visible on the login page.
   Expected Result: The LIMAS login page is displayed with the Sign In button.

# Network Verification

- Request URL: `/system-user-dashboard` → Logout → `/`
- Expected Status: 200 (login page)
- Visible UI Result: LIMAS login page with Sign In button

# Expected Final Result

User is signed out and the LIMAS login page is displayed.

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
