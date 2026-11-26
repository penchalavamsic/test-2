---
test_id: "LIMAS-SUD-133"
title: 'To verify the functionality of "System User Dashboard" → "Pending License Requests" → "Inline Form" → "Single Form Open at a Time — Opening Another Closes Previous"'
module: "system-user-dashboard"
page: "/system-user-dashboard"
section: "Pending License Requests"
control: "Approve button (second row)"
action: "Click Approve on a second row while a form is already open and verify the first form closes"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Read-only"
test_type: "Functional"
automation_candidate: true
plan_status: "reviewed"
script_status: "generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: ""
---

# Purpose

Verify that only one inline approval form can be open at a time — clicking Approve on a different row while a form is already open closes the first form and opens a new one on the second row.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The user is authenticated on `/system-user-dashboard`.
- At least two pending license request rows are visible with Approve buttons.

# Test Data

None — dynamically select the first two available rows.

# Steps and Expected Results

1. Action: Click Approve on the first pending request row.
   Expected Result: Inline form opens. The first row's button changes to "Close".

2. Action: Click Approve on a second pending request row.
   Expected Result: The first form closes, the first row's button reverts to "Approve". A new inline form opens on the second row, and its button changes to "Close".

3. Action: Verify only one form is visible.
   Expected Result: Only one License Assignment heading is visible at a time.

# Network Verification

- Request URL: N/A (client-side UI toggle)
- HTTP Method: N/A
- Expected Status: N/A
- Payload Presence: N/A
- Visible UI Result: Only one inline form is open; previous row's form closed

# Expected Final Result

Opening Approve on a second row closes the first row's form and opens the form on the second row. Only one form exists at any time.

# Classification

- Read-only
- Functional

# Restrictions

- Do not include credentials, tokens, cookies, authorization codes, or sensitive payloads.
- Do not submit the approval form.
- Do not hardcode User Group, Profile, or Role names.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending