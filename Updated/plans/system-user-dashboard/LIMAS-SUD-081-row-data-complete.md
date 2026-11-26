---
test_id: "LIMAS-SUD-081"
title: 'To verify the functionality of "System User Dashboard" → "Pending License Requests" → "Table Row Data" → "Row Data Completeness"'
module: "System User Dashboard"
page: "System User Dashboard"
section: "Pending License Requests"
control: "Table Row Data"
action: "Verify each visible row has user, feature, hardware/date, and actions"
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
related_script: "tests/system-user-dashboard/LIMAS-SUD-081-row-data-complete.spec.ts"
---

# Purpose

Verify that every visible data row in the Pending License Requests table is complete — it contains a user name/email, a feature name/version, a hardware ID/date, and action buttons (Approve and Delete).

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The user is authenticated on `/system-user-dashboard`.
- The "Pending License Requests" tab is active and the table contains at least one row.

# Test Data

None. All data is read dynamically from the table.

# Steps and Expected Results

1. Action: Navigate to the dashboard and ensure the request table has rendered with data rows.
   Expected Result: At least one data row exists.

2. Action: For each visible data row, verify the row contains: a non-empty user name paragraph and an email paragraph with @ in the first cell; a non-empty feature name paragraph and a version paragraph in the Feature cell; a quoted numeric hardware ID paragraph and a DD Mon YYYY date paragraph in the Hardware/Created cell; and an Approve button plus a Delete button in the Actions cell.
   Expected Result: Every visible row has all four column groups populated with their expected content.

# Network Verification

- Request URL: `/system-user-dashboard`
- HTTP Method: GET
- Expected Status: 200
- Payload Presence: Dashboard HTML with pending requests rows
- Visible UI Result: Every row is complete with user, feature, hardware/date, and actions

# Expected Final Result

Every visible data row in the pending requests table contains complete data across all four column groups.

# Classification

- Read-only
- UI

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending