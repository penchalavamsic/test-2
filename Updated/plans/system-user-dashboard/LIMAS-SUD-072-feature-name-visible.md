---
test_id: "LIMAS-SUD-072"
title: 'To verify the functionality of "System User Dashboard" → "Pending License Requests" → "Table Row Data" → "Feature Name Visible"'
module: "System User Dashboard"
page: "System User Dashboard"
section: "Pending License Requests"
control: "Table Row Data"
action: "Verify at least one feature name paragraph in a row"
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
related_script: "tests/system-user-dashboard/LIMAS-SUD-072-feature-name-visible.spec.ts"
---

# Purpose

Verify that at least one feature name is displayed in the Feature column of the Pending License Requests table. The feature name appears as a paragraph inside a table cell.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The user is authenticated on `/system-user-dashboard`.
- The "Pending License Requests" tab is active and the table contains at least one row.

# Test Data

Runtime data from the table — no hardcoded feature names.

# Steps and Expected Results

1. Action: Navigate to the dashboard and ensure the request table has rendered with at least one row.
   Expected Result: At least one table row exists.

2. Action: In the first data row, locate the Feature column cell and verify it contains a paragraph with a non-empty feature name.
   Expected Result: The feature name paragraph is visible and contains text (not empty).

# Network Verification

- Request URL: `/system-user-dashboard`
- HTTP Method: GET
- Expected Status: 200
- Payload Presence: Dashboard HTML with pending requests rows
- Visible UI Result: At least one row shows a feature name

# Expected Final Result

At least one row in the pending requests table displays a non-empty feature name paragraph.

# Classification

- Read-only
- UI

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending