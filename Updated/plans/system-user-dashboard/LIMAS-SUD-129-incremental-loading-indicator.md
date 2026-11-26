---
test_id: "LIMAS-SUD-129"
title: 'To verify the functionality of "System User Dashboard" → "Pending License Requests" → "Table" → "Incremental loading indicator"'
module: "system-user-dashboard"
page: "/system-user-dashboard"
section: "Pending License Requests"
control: "Table footer"
action: "Verify that the text 'More requests will load automatically.' is visible below the loaded rows"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P3"
classification: "Read-only"
test_type: "Visual"
automation_candidate: true
plan_status: "reviewed"
script_status: "generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: ""
---

# Purpose

Verify that the incremental loading hint text "More requests will load automatically." is present and visible below the Pending License Requests table when there are more rows to load.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The user is authenticated on `/system-user-dashboard`.
- The Pending License Requests tab is selected and the initial rows are loaded.

# Test Data

None.

# Steps and Expected Results

1. Action: Navigate to the dashboard, ensure the Pending License Requests tab is active, and confirm the table is visible.
   Expected Result: The table is visible with at least one data row.

2. Action: Look for the text "More requests will load automatically." near or below the table.
   Expected Result: The text is visible, indicating to the user that more data can be loaded by scrolling.

# Network Verification

- Request URL: `/system-user-dashboard`
- HTTP Method: GET
- Expected Status: 200
- Payload Presence: Dashboard HTML with Pending License Requests data

# Expected Final Result

The incremental loading hint text "More requests will load automatically." is visible.

# Classification

- Read-only
- Visual

# Restrictions

- Do not include credentials, tokens, cookies, authorization codes, or sensitive payloads.
- Do not repeat data-changing submissions.
- Do not use static environment-specific data.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending