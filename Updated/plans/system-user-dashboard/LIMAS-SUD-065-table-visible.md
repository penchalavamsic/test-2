---
test_id: "LIMAS-SUD-065"
title: 'To verify the functionality of "System User Dashboard" → "Pending License Requests" → "Table" → "Request Rows Present"'
module: "system-user-dashboard"
page: "/system-user-dashboard"
section: "Pending License Requests"
control: "Data table with license request rows"
action: "Verify that license request rows are visible in the table"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
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

Verify that the Pending License Requests section contains a visible data table with at least one request row.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The user is authenticated on `/system-user-dashboard`.

# Test Data

None — row count is verified dynamically.

# Steps and Expected Results

1. Action: Navigate to the dashboard and wait for full render.
   Expected Result: The Pending License Requests section is visible.

2. Action: Locate the table element by its role.
   Expected Result: A table with role="table" is visible.

3. Action: Count the data rows in the table (excluding the header row).
   Expected Result: At least 1 data row exists — `count() > 1` (accounting for header row) or at least one row with Approve/Delete buttons.

# Expected Final Result

The data table is visible and contains at least one pending license request row.

# Classification

- Read-only
- Visual

# Restrictions

- Do not include credentials, tokens, cookies, authorization codes, or sensitive payloads.
- Do not hardcode row counts.
- Do not use static environment-specific data.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending