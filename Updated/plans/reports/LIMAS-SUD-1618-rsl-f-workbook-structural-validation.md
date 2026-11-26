---
test_id: "LIMAS-SUD-1618"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Active View Toolbar\" → \"Export Excel Button\" → \"Workbook structural validation\""
module: "Reports"
page: "Reports"
section: "Active View Toolbar"
control: "Export Excel Button"
action: "Workbook structural validation"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Reports Standard Licenses RSL-F"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: ""
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: ""
---

# Purpose

Validate that the exported workbook opens without corruption, contains at least one visible sheet with a nonempty name, a header row with nonempty headers, at least one column, zero or more data rows, and is not an HTML error page disguised as an `.xlsx` file.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to Reports → Standard Licenses → Active view with data rows present.
- Excel parsing library (e.g., `xlsx` or `exceljs`) is available in the test environment.

# Test Data

Read `{runtimeSheetName}` and `{runtimeExportedRows}` from the parsed workbook.

# Steps and Expected Results

1. Action: Export the workbook and open it with an Excel parsing library.
   Expected Result: The library parses the file without throwing a corruption or format error.

2. Action: Verify at least one visible sheet exists.
   Expected Result: `workbook.SheetNames.length >= 1` and the sheet is not hidden.

3. Action: Read the sheet name as `{runtimeSheetName}`.
   Expected Result: The sheet name is nonempty.

4. Action: Read the header row (row 1).
   Expected Result: The header row exists and every header value is nonempty.

5. Action: Verify the column count is greater than zero.
   Expected Result: The header row has at least one column.

6. Action: Count the data rows (rows beyond the header).
   Expected Result: Data rows count `{runtimeExportedRows} >= 0`.

7. Action: Verify the file is not an HTML error page.
   Expected Result: The first cell does not contain `<!DOCTYPE`, `<html`, or error-page text.

# Network Verification

No additional network verification beyond successful download.

# Expected Final Result

The workbook is structurally valid, uncorrupted, has a named sheet with headers, columns, and consistent data rows, and is not an HTML error page.

# Classification

- Read-only (single export for validation)
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode expected sheet names, column counts, or row counts.
- Use an Excel parsing library; do not attempt to parse binary manually.

# Generation Status

- Test script generation: Pending
- CI/CD execution: Pending
- Healing: Pending

# Dynamic Plan Rules

1. Use only behavior verified through Playwright MCP.
2. Verify one atomic behavior per plan.
3. Do not hardcode application URLs.
4. Do not hardcode usernames or passwords.
5. Do not hardcode counts, emails, hardware IDs, groups, profiles, roles, dates, or filenames.
6. Use runtime placeholders: `{runtimeBaseTotal}`, `{runtimeFilteredTotal}`, `{runtimeExportedRows}`, `{runtimeFilename}`, `{runtimeSheetName}`, `{runtimeDate}`, `{runtimeProfile}`, `{runtimeRole}`, `{runtimeEmail}`.