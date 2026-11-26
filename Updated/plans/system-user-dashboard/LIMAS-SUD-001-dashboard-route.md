---
test_id: "LIMAS-SUD-001"
title: "To verify the functionality of \"System User Dashboard\" → \"Page Shell\" → \"Route\" → \"/system-user-dashboard\""
module: "System User Dashboard"
page: "System User Dashboard"
section: "Page Shell"
control: "Route"
action: "/system-user-dashboard"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "Critical"
classification: "Read-only"
test_type: "Session"
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

Verify that the authenticated SUPER_USER_ADMIN_USER session lands at the `/system-user-dashboard` route.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Valid credentials for `SUPER_USER_ADMIN_USER` are configured.

# Test Data

Credential variable names from the profile are read at runtime via `access-profiles.json` and `process.env`.

# Steps and Expected Results

1. Action: Complete Keycloak login as SUPER_USER_ADMIN_USER.
   Expected Result: Browser navigates through the OAuth callback.

2. Action: Observe the final URL after redirect.
   Expected Result: The URL path is `/system-user-dashboard`.

# Network Verification

- Request URL: `/system-user-dashboard`
- HTTP Method: GET
- Expected Status: 200
- Payload Presence: Dashboard HTML
- Visible UI Result: Dashboard content renders

# Expected Final Result

The authenticated session lands at `/system-user-dashboard`.

# Classification

- Read-only
- Session

# Generation Status

- Test script generation: Pending
- CI/CD execution: Pending
- Healing: Pending