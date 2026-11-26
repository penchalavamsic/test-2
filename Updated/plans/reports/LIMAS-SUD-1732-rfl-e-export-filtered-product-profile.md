---
test_id: "LIMAS-SUD-1732"
title: "To verify the functionality of \"Reports\" → \"Floating Licenses\" → \"Export Excel\" → \"Export with Product Profile Filter Applied\""
module: "Reports"
page: "Reports"
section: "Floating Licenses"
control: "Export Excel"
action: "Export with Product Profile Filter Applied"
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

Verify that applying a Product Profile filter in Deleted mode and exporting produces a workbook whose data rows reflect the filtered scope, while headers remain unchanged, and the export remains client-side.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses is selected in Deleted mode with records loaded.
- At least one Product Profile filter value is available.

# Test Data

All values read dynamically. Unfiltered total: {runtimeDeletedTotal}. Filter: {runtimeProfile}.

# Steps and Expected Results

1. Action: Expand the Filters panel and select one Product Profile filter value as {runtimeProfile}.
   Expected Result: Filter is applied. Table is filtered. Filtered row count {runtimeFilteredCount} ≤ {runtimeDeletedTotal}.

2. Action: Capture the filtered row count from the UI as {runtimeFilteredCount}.
   Expected Result: {runtimeFilteredCount} > 0 (assuming the profile has records).

3. Action: Click the Export Excel button.
   Expected Result: A download event fires. No server request is sent.

4. Action: Open the downloaded workbook and count data rows as {runtimeExportedRows}.
   Expected Result: {runtimeExportedRows} equals {runtimeFilteredCount} — only filtered data is exported.

5. Action: Verify the header row in the workbook.
   Expected Result: Headers are unchanged — same 8 columns (productProfile, profileRole, expirationDate, createdDate, deletedOn, email, hardwareId, contact).

6. Action: Verify all exported rows have {runtimeProfile} in the productProfile column.
   Expected Result: All rows have productProfile matching {runtimeProfile}.

7. Action: Clear the Product Profile filter after verification.
   Expected Result: Filter is cleared, unfiltered data is restored.

# Network Verification

No API request is sent during Export. The prior filtered Deleted API response is the data source.

# Expected Final Result

With a Product Profile filter applied, the exported workbook contains only filtered rows (count = {runtimeFilteredCount}), headers are unchanged, and the export remains client-side.

# Classification

- Read-only
- Positive

# Restrictions

- Do not hardcode the profile value — use a dynamic selection from available filter options.
- Do not hardcode row counts — capture dynamically before and after.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending