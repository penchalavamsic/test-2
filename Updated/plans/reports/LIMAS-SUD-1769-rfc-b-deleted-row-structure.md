---
test_id: "LIMAS-SUD-1769"
title: "To verify the functionality of \"Reports\" → \"Floating Configurations\" → \"Table\" → \"Deleted Row Structure\""
module: "Reports"
page: "Reports"
section: "Floating Configurations"
control: "Table"
action: "Deleted Row Structure"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Reports Floating Configurations RFC-B"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/reports/reports-floating-configurations-error-deleted.spec.ts"
---

# Purpose

Verify that each Deleted table row contains a User Group cell, a Profile cell, a Role cell, a Created/Deleted By cell with "Created: {createdDate} Deleted: {deletedDate}" pairs, a Configuration Details cell with Exp/Maint/Created/Modified dates plus Feature name and version, and an Availability cell with Total/Occupied/Max checkout plus Available/Unavailable status. At least one row is present when data exists.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated on the Reports page with Floating Configurations selected.
- Deleted mode is selected and data has loaded successfully.
- The API response contains at least one record.

# Test Data

Use environment variables and the authenticated fixture. All row values are verified at runtime against the API response.

# Steps and Expected Results

1. Action: Verify at least one row exists in the Deleted table.
   Expected Result: The table body contains at least one row when data is available.

2. Action: Inspect the first row's cells.
   Expected Result: The row contains cells for User Group, Profile, and Role, each with non-empty content.

3. Action: Inspect the Created/Deleted By cell.
   Expected Result: Cell contains "Created: {createdDate} Deleted: {deletedDate}" with date values from the API record.

4. Action: Inspect the Configuration Details cell.
   Expected Result: Cell contains Expiration, Maintenance, Created, and Modified dates, plus Feature name and version from the API record.

5. Action: Inspect the Availability cell.
   Expected Result: Cell contains Total, Occupied, and Max checkout values, plus an Available or Unavailable status indicator.

# Network Verification

- Request URL: Contains report/alldeleted
- HTTP Method: GET

# Expected Final Result

Each Deleted row has six structured cells matching the API record: User Group, Profile, Role, Created/Deleted By with date pairs, Configuration Details with dates and feature info, and Availability with totals and status.

# Classification

- Read-only
- Positive

# Restrictions

- Do not hardcode dates, user groups, profiles, roles, feature names, or availability values.
- Do not include credentials, tokens, cookies, or sensitive payloads.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending