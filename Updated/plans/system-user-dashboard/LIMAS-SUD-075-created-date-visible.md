---
test_id: "LIMAS-SUD-075"
title: 'To verify the functionality of "System User Dashboard" → "Pending License Requests" → "Table Row Data" → "Created Date Visible"'
module: "System User Dashboard"
page: "System User Dashboard"
section: "Pending License Requests"
control: "Table Row Data"
action: "Verify at least one date in DD Mon YYYY format"
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
related_script: "tests/system-user-dashboard/LIMAS-SUD-075-created-date-visible.spec.ts"
---

# Purpose

Verify that at least one created date is displayed in the Hardware / Created column of the Pending License Requests table. The date appears in the format `DD Mon YYYY` (e.g., "13 Aug 2026").

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The user is authenticated on `/system-user-dashboard`.
- The "Pending License Requests" tab is active and the table contains at least one row.

# Test Data

Runtime data from the table — no hardcoded dates.

# Steps and Expected Results

1. Action: Navigate to the dashboard and ensure the request table has rendered with at least one row.
   Expected Result: At least one table row exists.

2. Action: In the first data row, locate the Hardware / Created column cell and verify it contains a paragraph whose text matches the `DD Mon YYYY` date format.
   Expected Result: The date paragraph is visible and matches the pattern of two digits, a three-letter month abbreviation, and a four-digit year.

# Network Verification

- Request URL: `/system-user-dashboard`
- HTTP Method: GET
- Expected Status: 200
- Payload Presence: Dashboard HTML with pending requests rows
- Visible UI Result: At least one row shows a date in "DD Mon YYYY" format

# Expected Final Result

At least one row in the pending requests table displays a date paragraph matching the `DD Mon YYYY` pattern.

# Classification

- Read-only
- UI

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending