---
test_id: "LIMAS-SUD-009"
title: "To verify the functionality of \"System User Dashboard\" → \"Page Shell\" → \"Contentinfo\" → \"Footer visibility\""
module: "System User Dashboard"
page: "System User Dashboard"
section: "Page Shell"
control: "Contentinfo"
action: "Footer visibility"
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

Verify that the footer contentinfo region with the KPIT copyright notice is visible on the dashboard.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Valid credentials for `SUPER_USER_ADMIN_USER` are configured.

# Test Data

Credential variable names from the profile are read at runtime.

# Steps and Expected Results

1. Action: Complete Keycloak login and land on the dashboard.
   Expected Result: Dashboard page is loaded.

2. Action: Inspect the footer area.
   Expected Result: A `<contentinfo>` element (or `<footer>`) containing the text "© KPIT Technologies Ltd. All rights reserved." is visible.

# Network Verification

- Request URL: `/system-user-dashboard`
- HTTP Method: GET
- Expected Status: 200
- Payload Presence: Dashboard with footer
- Visible UI Result: Copyright notice in footer

# Expected Final Result

The KPIT copyright footer is visible on the dashboard.

# Classification

- Read-only
- Visual

# Generation Status

- Test script generation: Pending
- CI/CD execution: Pending
- Healing: Pending