---
test_id: "LIMAS-SUD-1727"
title: "To verify the functionality of \"Reports\" → \"Floating Licenses\" → \"Export Excel\" → \"Unfiltered Export Scope and Content\""
module: "Reports"
page: "Reports"
section: "Floating Licenses"
control: "Export Excel"
action: "Unfiltered Export Scope and Content"
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

Verify that clicking Export in unfiltered Deleted mode produces a workbook with the expected sheet name, column headers, data row count matching totalElements, and a non-trivial file size.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses is selected in Deleted mode with filters cleared.
- Deleted totalElements is observed from the API response as {runtimeDeletedTotal}.
- Export button is enabled.

# Test Data

All values read dynamically. Expected column headers: productProfile, profileRole, expirationDate, createdDate, deletedOn, email, hardwareId, contact.

# Steps and Expected Results

1. Action: Read the totalElements count from the Deleted API response and store as {runtimeDeletedTotal}.
   Expected Result: {runtimeDeletedTotal} > 0.

2. Action: Click the Export Excel button.
   Expected Result: A download event fires. No server request is sent.

3. Action: Open the downloaded workbook using xlsx.js or equivalent library.
   Expected Result: Workbook opens successfully with 1 sheet.

4. Action: Read the sheet name.
   Expected Result: Sheet name contains "Exported Deleted Floating Licenses" (may be truncated per Excel's 31-character sheet name limit).

5. Action: Read the header row (row 1).
   Expected Result: Header row contains 8 columns matching the schema: productProfile, profileRole, expirationDate, createdDate, deletedOn, email, hardwareId, contact.

6. Action: Count the data rows (rows after the header).
   Expected Result: Data row count equals {runtimeDeletedTotal}.

7. Action: Verify the file is non-trivial in size.
   Expected Result: File size > {runtimeMinFileSize} (an appropriate threshold, e.g., 500 KB for {runtimeDeletedTotal} rows).

# Network Verification

No API request is sent during the Export click. The prior Deleted API response is the data source.

# Expected Final Result

The exported workbook has 1 sheet with a name containing "Exported Deleted Floating Licenses", 8 expected columns, data rows equal to {runtimeDeletedTotal}, and a non-trivial file size.

# Classification

- Read-only
- Positive

# Restrictions

- Do not hardcode {runtimeDeletedTotal}, column headers, sheet names, or file sizes — read dynamically.
- Do not compare against static expected values from another environment.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending