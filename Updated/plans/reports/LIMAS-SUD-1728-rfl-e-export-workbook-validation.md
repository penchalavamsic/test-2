---
test_id: "LIMAS-SUD-1728"
title: "To verify the functionality of \"Reports\" → \"Floating Licenses\" → \"Export Excel\" → \"Workbook Structural Validation\""
module: "Reports"
page: "Reports"
section: "Floating Licenses"
control: "Export Excel"
action: "Workbook Structural Validation"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Reports Floating Licenses RFL-E"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
execution_status: "Not Run"
ci_cd_execution: "Pending"
healing: "Pending"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/reports/reports-floating-licenses-export.spec.ts"
---

# Purpose

Verify the exported workbook is structurally valid: not corrupt, correctly formatted as .xlsx, has the proper extension, contains at least one visible worksheet, a nonempty sheet name, a header row with nonempty cells, and column count matches the expected schema.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses is selected in Deleted mode with records loaded.
- Export button is enabled.

# Test Data

All values read dynamically from the exported file.

# Steps and Expected Results

1. Action: Click Export and capture the downloaded file.
   Expected Result: A download event fires, file is captured.

2. Action: Verify the file extension.
   Expected Result: File extension is `.xlsx`.

3. Action: Verify the file is not empty and not an HTML error page.
   Expected Result: File size > 0. The file does not begin with `<!DOCTYPE` or `<html` — it is a valid binary/ZIP-based .xlsx file.

4. Action: Attempt to open the workbook via xlsx.js or equivalent library without errors.
   Expected Result: Workbook opens successfully without corruption errors.

5. Action: Verify at least one worksheet is present.
   Expected Result: Workbook has at least one visible worksheet (sheet count ≥ 1).

6. Action: Verify the sheet name is nonempty.
   Expected Result: Sheet name is a nonempty string.

7. Action: Read the header row (first row of the sheet).
   Expected Result: Header row exists and all cells are nonempty strings.

8. Action: Count the number of columns in the header row and compare to the expected schema.
   Expected Result: Column count equals {runtimeExpectedColumnCount} (the number of columns observed in the Deleted table).

# Network Verification

No API request is sent during Export.

# Expected Final Result

The exported .xlsx workbook is structurally valid: not corrupt, nonempty, has at least one visible sheet with a nonempty name, a complete header row, and the correct number of columns.

# Classification

- Read-only
- Positive

# Restrictions

- Do not hardcode column counts, sheet names, or file signatures.
- Do not use static environment-specific data.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending