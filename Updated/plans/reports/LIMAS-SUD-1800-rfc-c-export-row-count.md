---
test_id: "LIMAS-SUD-1800"
title: "To verify the functionality of \"Reports\" → \"Floating Configurations\" → \"Deleted Mode\" → \"Export Row Count\""
module: "Reports"
page: "Reports"
section: "Floating Configurations"
control: "Deleted Mode"
action: "Export Row Count"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
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

Verify that the exported .xlsx file contains data row count matching the API's totalElements (e.g., 598 data rows, 599 total rows including header at runtime), and that the row count is consistent with the alldeleted API response.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated on the Reports page with Floating Configurations selected.
- Deleted mode has been selected and fully loaded.

# Test Data

The API totalElements and the exported workbook row count are both read at runtime.

# Steps and Expected Results

1. Action: Read totalElements from the alldeleted API response.
   Expected Result: totalElements = {runtimeTotalElements}.

2. Action: Click Export Excel and save the file.
   Expected Result: The file is downloaded successfully.

3. Action: Count the data rows in the exported workbook (rows excluding the header).
   Expected Result: The data row count is {runtimeExportDataRowCount}, which equals {runtimeTotalElements} from the API.

4. Action: Count total rows including the header.
   Expected Result: Total rows = {runtimeExportDataRowCount} + 1 (header). This is {runtimeTotalElements} + 1.

5. Action: Verify the row count is consistent across multiple exports.
   Expected Result: A second export produces the same row count.

# Network Verification

- No server API requests for export (client-side).
- Row count derived from the alldeleted API totalElements.

# Expected Final Result

The exported workbook contains data rows equal to the API totalElements, with one additional header row.

# Classification

- Read-only
- Positive

# Restrictions

- Do not hardcode totalElements or row counts. Read dynamically from API and workbook at runtime.
- Do not include credentials, tokens, cookies, or sensitive payloads.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending