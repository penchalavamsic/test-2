---
test_id: "LIMAS-SUD-069"
title: 'To verify the functionality of "System User Dashboard" → "Pending License Requests" → "Table Columns" → "Actions Column Heading"'
module: "System User Dashboard"
page: "System User Dashboard"
section: "Pending License Requests"
control: "Table Columns"
action: "Verify Actions column heading visible"
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
related_script: "tests/system-user-dashboard/LIMAS-SUD-069-actions-column-heading.spec.ts"
---

# Purpose

Verify that the "Actions" column heading is visible in the Pending License Requests table.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The user is authenticated on `/system-user-dashboard`.
- The "Pending License Requests" tab is active and the table has rendered.

# Test Data

None.

# Steps and Expected Results

1. Action: Navigate to the dashboard and ensure the Pending License Requests table is rendered.
   Expected Result: At least one row or the table header is visible.

2. Action: Locate the column header with exact text "Actions" within the table.
   Expected Result: The header cell or element with text "Actions" is visible and belongs to the table header row. If the column has no text header, verify the column itself is present in the table.

# Network Verification

- Request URL: `/system-user-dashboard`
- HTTP Method: GET
- Expected Status: 200
- Payload Presence: Dashboard HTML with pending requests data
- Visible UI Result: Table renders with "Actions" column heading (or column present)

# Expected Final Result

The "Actions" column heading is visible — or the Actions column is confirmed present in the Pending License Requests table.

# Classification

- Read-only
- UI

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending