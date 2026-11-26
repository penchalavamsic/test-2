---
test_id: "LIMAS-SUD-1733"
title: "To verify the functionality of \"Reports\" → \"Floating Licenses\" → \"Export Excel\" → \"Export with Expiration Date Filter Applied\""
module: "Reports"
page: "Reports"
section: "Floating Licenses"
control: "Export Excel"
action: "Export with Expiration Date Filter Applied"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
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

Verify that applying an Expiration Date filter in Deleted mode and exporting produces a workbook whose data rows reflect the filtered scope, while headers remain unchanged.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses is selected in Deleted mode with records loaded.
- At least one Expiration Date filter value is available.

# Test Data

All values read dynamically. Unfiltered total: {runtimeDeletedTotal}. Filter: {runtimeDate}.

# Steps and Expected Results

1. Action: Expand the Filters panel and select one Expiration Date filter value as {runtimeDate}.
   Expected Result: Filter is applied. Table is filtered. Filtered row count {runtimeFilteredCount} ≤ {runtimeDeletedTotal}.

2. Action: Capture the filtered row count from the UI as {runtimeFilteredCount}.
   Expected Result: {runtimeFilteredCount} > 0 (assuming the date has records).

3. Action: Click the Export Excel button.
   Expected Result: A download event fires. No server request is sent.

4. Action: Open the downloaded workbook and count data rows as {runtimeExportedRows}.
   Expected Result: {runtimeExportedRows} equals {runtimeFilteredCount}.

5. Action: Verify the header row in the workbook.
   Expected Result: Headers are unchanged — same 8 columns as in unfiltered export.

6. Action: Verify all exported rows have expirationDate matching {runtimeDate} (or falling within the date range if a range filter was applied).
   Expected Result: All rows have expirationDate consistent with the applied filter.

7. Action: Clear the Expiration Date filter after verification.
   Expected Result: Filter is cleared.

# Network Verification

No API request is sent during Export. The prior filtered Deleted API response is the data source.

# Expected Final Result

With an Expiration Date filter applied, the exported workbook contains only filtered rows, headers are unchanged, and the export remains client-side.

# Classification

- Read-only
- Positive

# Restrictions

- Do not hardcode the date value — use a dynamic selection from available filter options.
- Do not hardcode row counts — capture dynamically.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending