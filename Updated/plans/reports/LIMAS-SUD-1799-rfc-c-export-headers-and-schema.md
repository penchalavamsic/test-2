---
test_id: "LIMAS-SUD-1799"
title: "To verify the functionality of \"Reports\" → \"Floating Configurations\" → \"Deleted Mode\" → \"Export Headers and Schema\""
module: "Reports"
page: "Reports"
section: "Floating Configurations"
control: "Deleted Mode"
action: "Export Headers and Schema"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
classification: "Reports Floating Configurations RFC-C"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/reports/reports-floating-configurations-deleted.spec.ts"
---

# Purpose

Verify that the exported .xlsx file from Deleted mode has 15 columns with the correct headers: User Group, Product Profile, Profile Role, Feature, Feature Version, Expiration Date, Maintenance Date, System User, Deleted By, Modified Date, Created Date, Total Licenses, Occupied Licenses, Max Checkout (h), Available for Checkout. A header row is present and data rows follow.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated on the Reports page with Floating Configurations selected.
- Deleted mode has been selected and fully loaded.

# Test Data

Column headers and count are read from the exported workbook at runtime.

# Steps and Expected Results

1. Action: Export the workbook and read the header row.
   Expected Result: A header row is present as the first row of the sheet.

2. Action: Verify the column count.
   Expected Result: The header row contains {runtimeColumnCount} columns (15 columns expected at runtime).

3. Action: Verify each column header name.
   Expected Result: The headers include: User Group, Product Profile, Profile Role, Feature, Feature Version, Expiration Date, Maintenance Date, System User, Deleted By, Modified Date, Created Date, Total Licenses, Occupied Licenses, Max Checkout (h), Available for Checkout. Read and assert each at runtime.

4. Action: Verify data rows follow the header.
   Expected Result: Row 2 and beyond contain data in the same column structure as the header. No empty rows between header and first data row.

5. Action: Verify column order is consistent with the header row.
   Expected Result: The column order in data rows matches the header row order.

# Network Verification

- No server API requests (client-side export).

# Expected Final Result

The exported workbook has 15 columns with the specified headers, a header row, and data rows matching the column schema.

# Classification

- Read-only
- Positive

# Restrictions

- Do not hardcode column names or column count. Read dynamically from the workbook at runtime.
- Do not include credentials, tokens, cookies, or sensitive payloads.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending