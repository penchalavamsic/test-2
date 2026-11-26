---
test_id: "LIMAS-SUD-070"
title: 'To verify the functionality of "System User Dashboard" → "Pending License Requests" → "Table Row Data" → "User Name Visible"'
module: "System User Dashboard"
page: "System User Dashboard"
section: "Pending License Requests"
control: "Table Row Data"
action: "Verify at least one user name paragraph in a row"
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
related_script: "tests/system-user-dashboard/LIMAS-SUD-070-user-name-visible.spec.ts"
---

# Purpose

Verify that at least one user name is displayed in the User column of the Pending License Requests table. The user name appears as a paragraph inside a table cell.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The user is authenticated on `/system-user-dashboard`.
- The "Pending License Requests" tab is active and the table contains at least one row.

# Test Data

Runtime data from the table — no hardcoded names.

# Steps and Expected Results

1. Action: Navigate to the dashboard and ensure the request table has rendered with at least one row.
   Expected Result: At least one table row exists in the pending requests section.

2. Action: In the first data row, locate the User column cell and verify it contains a paragraph with a non-empty user name.
   Expected Result: The user name paragraph is visible and contains text (not empty, not whitespace-only).

# Network Verification

- Request URL: `/system-user-dashboard`
- HTTP Method: GET
- Expected Status: 200
- Payload Presence: Dashboard HTML with pending requests rows
- Visible UI Result: At least one row shows a user name

# Expected Final Result

At least one row in the pending requests table displays a non-empty user name paragraph.

# Classification

- Read-only
- UI

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending