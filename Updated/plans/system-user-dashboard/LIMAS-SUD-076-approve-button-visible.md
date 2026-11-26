---
test_id: "LIMAS-SUD-076"
title: 'To verify the functionality of "System User Dashboard" → "Pending License Requests" → "Actions Column" → "Approve Button Visible"'
module: "System User Dashboard"
page: "System User Dashboard"
section: "Pending License Requests"
control: "Actions Column"
action: "Verify Approve button in each visible row"
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
related_script: "tests/system-user-dashboard/LIMAS-SUD-076-approve-button-visible.spec.ts"
---

# Purpose

Verify that an "Approve" button is visible in each non-header row of the Pending License Requests table.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The user is authenticated on `/system-user-dashboard`.
- The "Pending License Requests" tab is active and the table contains at least one row.

# Test Data

None.

# Steps and Expected Results

1. Action: Navigate to the dashboard and ensure the request table has rendered with at least one row.
   Expected Result: At least one data row exists.

2. Action: For each visible data row, locate the "Approve" button by its accessible name or role.
   Expected Result: Every visible data row contains a visible "Approve" button.

# Network Verification

- Request URL: `/system-user-dashboard`
- HTTP Method: GET
- Expected Status: 200
- Payload Presence: Dashboard HTML with pending requests rows
- Visible UI Result: Each row has an Approve button

# Expected Final Result

Every visible data row in the pending requests table contains a visible "Approve" button.

# Classification

- Read-only
- UI

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending