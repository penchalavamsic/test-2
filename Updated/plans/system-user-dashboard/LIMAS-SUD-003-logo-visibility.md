---
test_id: "LIMAS-SUD-003"
title: "To verify the functionality of \"System User Dashboard\" → \"Page Shell\" → \"Header\" → \"LIMAS logo visibility\""
module: "System User Dashboard"
page: "System User Dashboard"
section: "Page Shell"
control: "Header"
action: "LIMAS logo visibility"
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

Verify that the LIMAS logo image is visible in the dashboard header.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Valid credentials for `SUPER_USER_ADMIN_USER` are configured.

# Test Data

Credential variable names from the profile are read at runtime.

# Steps and Expected Results

1. Action: Complete Keycloak login and land on the dashboard.
   Expected Result: Dashboard page is loaded.

2. Action: Inspect the header/banner for the logo image.
   Expected Result: An `img` element with name "Logo" is visible. The logo is rendered from `/LIMASdark.svg`.

# Network Verification

- Request URL: `/LIMASdark.svg`
- HTTP Method: GET
- Expected Status: 200 or 304
- Payload Presence: SVG image
- Visible UI Result: Logo image rendered in header

# Expected Final Result

The LIMAS logo is visible in the dashboard header.

# Classification

- Read-only
- Visual

# Generation Status

- Test script generation: Pending
- CI/CD execution: Pending
- Healing: Pending