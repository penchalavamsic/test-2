---
test_id: "LIMAS-SUD-080"
title: 'To verify the functionality of "System User Dashboard" → "Pending License Requests" → "Table Row Data" → "Date Format Consistency"'
module: "System User Dashboard"
page: "System User Dashboard"
section: "Pending License Requests"
control: "Table Row Data"
action: "Verify every created date matches DD Mon YYYY pattern"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
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
related_script: "tests/system-user-dashboard/LIMAS-SUD-080-date-format-consistency.spec.ts"
---

# Purpose

Verify that every created date displayed in the Pending License Requests table consistently follows the `DD Mon YYYY` format (e.g., "13 Aug 2026") — two digits, three-letter month abbreviation, four-digit year.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The user is authenticated on `/system-user-dashboard`.
- The "Pending License Requests" tab is active and the table contains at least one row.

# Test Data

Runtime data from the table — no hardcoded dates.

# Steps and Expected Results

1. Action: Navigate to the dashboard and ensure the request table has rendered with data rows.
   Expected Result: At least one data row exists.

2. Action: For each visible data row, locate the date paragraph in the Hardware / Created column and verify its text matches the `DD Mon YYYY` format.
   Expected Result: Every date paragraph matches the pattern `\d{2} (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \d{4}`.

# Network Verification

- Request URL: `/system-user-dashboard`
- HTTP Method: GET
- Expected Status: 200
- Payload Presence: Dashboard HTML with pending requests rows
- Visible UI Result: All dates follow DD Mon YYYY format

# Expected Final Result

Every created date in the pending requests table consistently matches the `DD Mon YYYY` format.

# Classification

- Read-only
- UI

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending