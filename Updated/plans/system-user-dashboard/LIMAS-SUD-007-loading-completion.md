---
test_id: "LIMAS-SUD-007"
title: "To verify the functionality of \"System User Dashboard\" → \"Page Shell\" → \"Loading\" → \"Dashboard loading completion\""
module: "System User Dashboard"
page: "System User Dashboard"
section: "Page Shell"
control: "Loading"
action: "Completion"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "High"
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

Verify that the dashboard transitions from loading state to fully rendered state without errors.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Valid credentials for `SUPER_USER_ADMIN_USER` are configured.

# Test Data

Credential variable names from the profile are read at runtime.

# Steps and Expected Results

1. Action: Complete Keycloak login and land on the dashboard.
   Expected Result: The page initially shows a "Loading..." indicator.

2. Action: Wait for the dashboard to finish loading.
   Expected Result: The loading indicator is replaced by the rendered dashboard content. The heading "System User Dashboard" and the summary cards (Pending License Requests, Expiring Licenses, etc.) become visible.

# Network Verification

- Request URL: `/system-user-dashboard`
- HTTP Method: GET
- Expected Status: 200
- Payload Presence: Dashboard content
- Visible UI Result: Dashboard fully rendered, no loading text

# Expected Final Result

The dashboard completes loading and renders all page-shell content.

# Classification

- Read-only
- Session

# Generation Status

- Test script generation: Pending
- CI/CD execution: Pending
- Healing: Pending