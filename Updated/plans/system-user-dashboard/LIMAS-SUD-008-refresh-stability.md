---
test_id: "LIMAS-SUD-008"
title: "To verify the functionality of \"System User Dashboard\" → \"Page Shell\" → \"Stability\" → \"Dashboard after refresh\""
module: "System User Dashboard"
page: "System User Dashboard"
section: "Page Shell"
control: "Stability"
action: "After refresh"
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

Verify that the dashboard page shell remains stable and fully rendered after a browser refresh.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Valid credentials for `SUPER_USER_ADMIN_USER` are configured.

# Test Data

Credential variable names from the profile are read at runtime.

# Steps and Expected Results

1. Action: Complete Keycloak login and land on the dashboard.
   Expected Result: Dashboard page is loaded with heading, subtitle, and content visible.

2. Action: Refresh the browser page.
   Expected Result: The page reloads.

3. Action: Verify the page shell after refresh.
   Expected Result: The route is still `/system-user-dashboard`, the heading "System User Dashboard" is visible, and the subtitle text is present. No redirect to login occurs.

# Network Verification

- Request URL: `/system-user-dashboard`
- HTTP Method: GET
- Expected Status: 200
- Payload Presence: Dashboard content
- Visible UI Result: Full dashboard shell rendered after refresh

# Expected Final Result

The dashboard page shell remains intact after a page refresh.

# Classification

- Read-only
- Session

# Generation Status

- Test script generation: Pending
- CI/CD execution: Pending
- Healing: Pending