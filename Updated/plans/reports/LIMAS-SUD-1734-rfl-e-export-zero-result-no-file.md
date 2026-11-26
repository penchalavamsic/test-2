---
test_id: "LIMAS-SUD-1734"
title: "To verify the functionality of \"Reports\" → \"Floating Licenses\" → \"Export Excel\" → \"Export with Zero-Result Filter\""
module: "Reports"
page: "Reports"
section: "Floating Licenses"
control: "Export Excel"
action: "Export with Zero-Result Filter"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
classification: "Reports Floating Licenses RFL-E"
test_type: "Boundary"
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

Verify that when a filter combination produces zero results in Deleted mode, the Export behavior is consistent — either it exports a header-only workbook, or the Export button becomes disabled — and no crash occurs.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses is selected in Deleted mode with records loaded.
- Filters can be combined to produce zero results.

# Test Data

All values read dynamically. Target: zero results from filter combination.

# Steps and Expected Results

1. Action: Apply a filter combination in Deleted mode that yields zero results (e.g., a Product Profile filter value that has no Deleted records, or a Profile Role with no matches).
   Expected Result: The table shows "No records found" or an equivalent empty state. The loaded/total counts reflect zero results.

2. Action: Inspect the Export button state.
   Expected Result: Observe whether the Export button is enabled or disabled. Record the observed behavior as {runtimeExportButtonState}.

3. Action: If the Export button is enabled, click it.
   Expected Result: A download event fires. The workbook contains either a header-only row (8 headers, 0 data rows) or some minimal structure. No crash or error occurs.

4. Action: If the Export button is disabled, verify it cannot be clicked.
   Expected Result: No download event fires on click attempt. No crash or error occurs.

5. Action: Verify no console errors, uncaught exceptions, or UI anomalies result from the export attempt.
   Expected Result: The application remains stable. No error toasts appear.

6. Action: Clear all filters and verify the full dataset is restored.
   Expected Result: All filters cleared. Deleted data is fully restored.

# Network Verification

No API request is sent during Export (if enabled). The Deleted filtered API response has already settled with zero results.

# Expected Final Result

When a filter yields zero results, the Export behavior is consistent with the observed {runtimeExportButtonState} — either exporting a header-only workbook or being disabled — and no crash or error occurs.

# Classification

- Read-only
- Boundary

# Restrictions

- Do not hardcode the filter combination — dynamically select values that produce zero results.
- Do not assume whether the button is enabled or disabled — observe and verify consistency.
- Do not manually navigate to simulate a successful result.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending