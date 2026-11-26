---
test_id: "LIMAS-SUD-077"
title: 'To verify the functionality of "System User Dashboard" → "Pending License Requests" → "Actions Column" → "Approve Button Enabled"'
module: "System User Dashboard"
page: "System User Dashboard"
section: "Pending License Requests"
control: "Actions Column"
action: "Verify Approve button is enabled (not disabled)"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Read-only"
test_type: "UI"
automation_candidate: true
plan_status: "reviewed"
script_status: "generated"
environment_variables:
  - LIMAS_BASE_URL
  - LIMAS_SUPER_USER_ADMIN_USER_USERNAME
  - LIMAS_SUPER_USER_ADMIN_USER_PASSWORD
test_data: {}
related_script: "tests/system-user-dashboard/LIMAS-SUD-077-approve-button-enabled.spec.ts"
---

# Purpose

Verify that the "Approve" button in each visible row is enabled (not disabled), confirming it can be interacted with.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The user is authenticated on `/system-user-dashboard`.
- The "Pending License Requests" tab is active and the table contains at least one row.

# Test Data

None.

# Steps and Expected Results

1. Action: Navigate to the dashboard and ensure the request table has rendered with at least one row.
   Expected Result: At least one data row exists with an Approve button.

2. Action: For each visible data row, verify the "Approve" button is enabled.
   Expected Result: Every visible Approve button has no `disabled` attribute and is enabled for interaction.

# Network Verification

- Request URL: `/system-user-dashboard`
- HTTP Method: GET
- Expected Status: 200
- Payload Presence: Dashboard HTML with pending requests rows
- Visible UI Result: Each row's Approve button is enabled

# Expected Final Result

Every visible Approve button in the pending requests table is enabled.

# Classification

- Read-only
- UI

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending