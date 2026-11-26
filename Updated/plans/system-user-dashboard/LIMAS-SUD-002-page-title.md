---
test_id: "LIMAS-SUD-002"
title: "To verify the functionality of \"System User Dashboard\" → \"Page Shell\" → \"Title\" → \"Browser page title\""
module: "System User Dashboard"
page: "System User Dashboard"
section: "Page Shell"
control: "Title"
action: "Browser page title"
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

Verify that the browser page title is "LIMAS" when the System User Dashboard is loaded.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Valid credentials for `SUPER_USER_ADMIN_USER` are configured.

# Test Data

Credential variable names from the profile are read at runtime.

# Steps and Expected Results

1. Action: Complete Keycloak login and land on the dashboard.
   Expected Result: Dashboard page is loaded.

2. Action: Read the browser page title.
   Expected Result: `document.title` equals "LIMAS".

# Network Verification

- Request URL: `/system-user-dashboard`
- HTTP Method: GET
- Expected Status: 200
- Payload Presence: HTML with title
- Visible UI Result: Browser tab shows "LIMAS"

# Expected Final Result

The browser page title is "LIMAS".

# Classification

- Read-only
- Visual

# Generation Status

- Test script generation: Pending
- CI/CD execution: Pending
- Healing: Pending