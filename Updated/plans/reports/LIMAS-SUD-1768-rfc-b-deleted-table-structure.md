---
test_id: "LIMAS-SUD-1768"
title: "To verify the functionality of \"Reports\" → \"Floating Configurations\" → \"Table\" → \"Deleted Table Structure\""
module: "Reports"
page: "Reports"
section: "Floating Configurations"
control: "Table"
action: "Deleted Table Structure"
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

Verify the Deleted mode table contains exactly six column headers: User Group, Profile, Role, Created/Deleted By, Configuration Details, and Availability. Each header is visible and accessible, and the table element is present in the DOM.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated on the Reports page with Floating Configurations selected.
- Deleted mode is selected and data has loaded successfully.

# Test Data

Use environment variables and the authenticated fixture. Column headers are verified by accessible name or visible text.

# Steps and Expected Results

1. Action: Verify the table element is present after Deleted data loads.
   Expected Result: A table element (or role="table") is rendered in the content area.

2. Action: Inspect the column headers.
   Expected Result: Six column headers are present and visible.

3. Action: Verify each header by name.
   Expected Result: Headers include "User Group", "Profile", "Role", "Created/Deleted By", "Configuration Details", and "Availability". Each is visible and has an accessible name.

4. Action: Verify header accessibility.
   Expected Result: Each header is programmatically associated with its column (e.g., via scope or role="columnheader").

# Network Verification

- Request URL: Contains report/alldeleted
- HTTP Method: GET

# Expected Final Result

The Deleted table has six named, visible, and accessible column headers: User Group, Profile, Role, Created/Deleted By, Configuration Details, and Availability.

# Classification

- Read-only
- Positive
- Accessibility

# Restrictions

- Do not hardcode column header text, though names listed here are expected at runtime.
- Do not include credentials, tokens, cookies, or sensitive payloads.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending