---
test_id: "LIMAS-SUD-006"
title: "To verify the functionality of \"System User Dashboard\" → \"Page Shell\" → \"Content\" → \"Main content visibility\""
module: "System User Dashboard"
page: "System User Dashboard"
section: "Page Shell"
control: "Content"
action: "Main content visibility"
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

Verify that the main content container is visible and populated after the dashboard loads.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Valid credentials for `SUPER_USER_ADMIN_USER` are configured.

# Test Data

Credential variable names from the profile are read at runtime.

# Steps and Expected Results

1. Action: Complete Keycloak login and land on the dashboard.
   Expected Result: Dashboard page is loaded.

2. Action: Inspect the main content area.
   Expected Result: The `<main>` element is present in the DOM and contains visible child elements. The main's inner container uses the class `container mx-auto p-6 animate-in fade-in`.

# Network Verification

- Request URL: `/system-user-dashboard`
- HTTP Method: GET
- Expected Status: 200
- Payload Presence: Dashboard content
- Visible UI Result: Main content rendered with child elements

# Expected Final Result

The main content container is present and visible.

# Classification

- Read-only
- Visual

# Generation Status

- Test script generation: Pending
- CI/CD execution: Pending
- Healing: Pending