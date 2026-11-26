---
test_id: "LIMAS-SUD-004"
title: "To verify the functionality of \"System User Dashboard\" → \"Page Shell\" → \"Heading\" → \"Dashboard heading visibility\""
module: "System User Dashboard"
page: "System User Dashboard"
section: "Page Shell"
control: "Heading"
action: "Visibility"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "Critical"
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

Verify that the "System User Dashboard" heading is visible as a level-1 heading on the page.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Valid credentials for `SUPER_USER_ADMIN_USER` are configured.

# Test Data

Credential variable names from the profile are read at runtime.

# Steps and Expected Results

1. Action: Complete Keycloak login and land on the dashboard.
   Expected Result: Dashboard page is loaded.

2. Action: Inspect the main content heading.
   Expected Result: An H1 element with text "System User Dashboard" is visible. The heading is accessible via `getByRole('heading', { name: 'System User Dashboard', level: 1 })`.

# Network Verification

- Request URL: `/system-user-dashboard`
- HTTP Method: GET
- Expected Status: 200
- Payload Presence: Dashboard content
- Visible UI Result: Heading "System User Dashboard" visible

# Expected Final Result

The "System User Dashboard" level-1 heading is visible.

# Classification

- Read-only
- Visual

# Generation Status

- Test script generation: Pending
- CI/CD execution: Pending
- Healing: Pending