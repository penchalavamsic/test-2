---
test_id: "LIMAS-SUD-005"
title: "To verify the functionality of \"System User Dashboard\" → \"Page Shell\" → \"Subtitle\" → \"Subtitle visibility and text\""
module: "System User Dashboard"
page: "System User Dashboard"
section: "Page Shell"
control: "Subtitle"
action: "Visibility and text"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "High"
classification: "Read-only"
test_type: "Visual"
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

Verify that the dashboard subtitle is visible and contains the expected text describing the dashboard's purpose.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Valid credentials for `SUPER_USER_ADMIN_USER` are configured.

# Test Data

Credential variable names from the profile are read at runtime.

# Steps and Expected Results

1. Action: Complete Keycloak login and land on the dashboard.
   Expected Result: Dashboard page is loaded.

2. Action: Inspect the paragraph below the dashboard heading.
   Expected Result: A paragraph with text "Monitor pending requests, expiring licenses, and floating seat usage." is visible.

# Network Verification

- Request URL: `/system-user-dashboard`
- HTTP Method: GET
- Expected Status: 200
- Payload Presence: Dashboard content
- Visible UI Result: Subtitle text visible

# Expected Final Result

The subtitle "Monitor pending requests, expiring licenses, and floating seat usage." is visible.

# Classification

- Read-only
- Visual

# Generation Status

- Test script generation: Pending
- CI/CD execution: Pending
- Healing: Pending