---
test_id: "LIMAS-SUD-1798"
title: "To verify the functionality of \"Reports\" → \"Floating Configurations\" → \"Deleted Mode\" → \"Export Workbook Validation\""
module: "Reports"
page: "Reports"
section: "Floating Configurations"
control: "Deleted Mode"
action: "Export Workbook Validation"
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

Verify that the downloaded file from Deleted mode Export opens as a valid .xlsx workbook, is not corrupt, is not HTML, has non-zero size (approximately 140KB at runtime), and contains the sheet "Exported Deleted Configs".

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated on the Reports page with Floating Configurations selected.
- Deleted mode has been selected and fully loaded.

# Test Data

The downloaded file is saved to a temporary path and validated at runtime.

# Steps and Expected Results

1. Action: Click Export Excel and save the downloaded file to a temporary path.
   Expected Result: A file is saved with size {runtimeExportSize} bytes (non-zero).

2. Action: Verify the file is a valid .xlsx workbook.
   Expected Result: The file can be opened as a valid .xlsx archive (ZIP-based format). It is not corrupt.

3. Action: Verify the file is not HTML or an error page.
   Expected Result: The file contents are binary .xlsx format, not HTML, JSON, or plain text error messages.

4. Action: Verify the file size is reasonable.
   Expected Result: The file size is greater than 0 bytes (approximately 140KB at runtime for the full dataset).

5. Action: Verify the expected sheet is present.
   Expected Result: The workbook contains a sheet named "Exported Deleted Configs". Record the runtime sheet name.

# Network Verification

- No server API requests fire for export (client-side).

# Expected Final Result

The downloaded file is a valid, non-corrupt .xlsx workbook of non-zero size containing the "Exported Deleted Configs" sheet.

# Classification

- Read-only
- Positive

# Restrictions

- Do not hardcode the sheet name or file size. Read dynamically at runtime.
- Do not include credentials, tokens, cookies, or sensitive payloads.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending