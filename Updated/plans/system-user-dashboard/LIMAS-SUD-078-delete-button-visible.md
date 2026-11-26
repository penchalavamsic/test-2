---
test_id: "LIMAS-SUD-078"
title: 'To verify the functionality of "System User Dashboard" → "Pending License Requests" → "Actions Column" → "Delete Button Visible"'
module: "System User Dashboard"
page: "System User Dashboard"
section: "Pending License Requests"
control: "Actions Column"
action: "Verify Delete button has accessible name in each visible row"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Read-only"
test_type: "Accessibility"
automation_candidate: true
plan_status: "reviewed"
script_status: "generated"
environment_variables:
  - LIMAS_BASE_URL
  - LIMAS_SUPER_USER_ADMIN_USER_USERNAME
  - LIMAS_SUPER_USER_ADMIN_USER_PASSWORD
test_data: {}
related_script: "tests/system-user-dashboard/LIMAS-SUD-078-delete-button-visible.spec.ts"
---

# Purpose

Verify that a "Delete" button with an accessible name matching the pattern `Delete LR-XXXXX` is visible in each visible row of the Pending License Requests table.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The user is authenticated on `/system-user-dashboard`.
- The "Pending License Requests" tab is active and the table contains at least one row.

# Test Data

None. The LR request ID is dynamic and part of the button's accessible name.

# Steps and Expected Results

1. Action: Navigate to the dashboard and ensure the request table has rendered with at least one row.
   Expected Result: At least one data row exists.

2. Action: For each visible data row, locate a button whose accessible name starts with "Delete".
   Expected Result: Every visible data row contains a visible Delete button with an accessible name.

# Network Verification

- Request URL: `/system-user-dashboard`
- HTTP Method: GET
- Expected Status: 200
- Payload Presence: Dashboard HTML with pending requests rows
- Visible UI Result: Each row has a Delete button with accessible name

# Expected Final Result

Every visible data row in the pending requests table contains a visible Delete button with an accessible name.

# Classification

- Read-only
- Accessibility

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending