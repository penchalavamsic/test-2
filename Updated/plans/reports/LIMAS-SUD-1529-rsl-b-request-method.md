---
test_id: "LIMAS-SUD-1529"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Infinite Scroll\" → \"Next-page request uses GET only, no data-changing method\""
module: "Reports"
page: "Reports"
section: "Standard Licenses Infinite Scroll"
control: "Request Method"
action: "GET only, no mutation"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Reports Standard Licenses RSL-B"
test_type: "Positive"
automation_candidate: true
plan_status: "draft"
script_status: "not-generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: ""
---

# Purpose

Verify that all additional page-load requests use GET method only and no POST, PUT, PATCH, or DELETE request is sent to the Standard Licenses API.

# Preconditions

- Initial batch visible.
- Additional load can be triggered.

# Test Data

Monitor all requests to `/api/report/allstandardlicenses` during the load.

# Steps and Expected Results

1. Action: Start monitoring all request methods to the Standard Licenses API.
   Expected Result: Observer active.

2. Action: Trigger one additional batch load.
   Expected Result: New requests fire.

3. Action: Verify all monitored requests use GET method.
   Expected Result: No POST, PUT, PATCH, or DELETE request to the Standard Licenses API.

4. Action: Verify response content-type is `application/json`.
   Expected Result: JSON responses only.

# Network Verification

- All requests: GET method
- No data-changing methods (POST, PUT, PATCH, DELETE)
- Content-Type: application/json

# Expected Final Result

All pagination requests are read-only GET requests.

# Classification

- Read-only
- Positive

# Restrictions

- Do not hardcode request URLs.

# Generation Status

- Test script generation: Pending
- CI/CD execution: Pending
- Healing: Pending