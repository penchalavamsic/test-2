---
test_id: "LIMAS-SUD-1801"
title: "To verify the functionality of \"Reports\" → \"Floating Configurations\" → \"Deleted Mode\" → \"Export Filtered Scope\""
module: "Reports"
page: "Reports"
section: "Floating Configurations"
control: "Deleted Mode"
action: "Export Filtered Scope"
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

Verify that applying a filter before export produces a file with fewer rows than the unfiltered export, the exported rows reflect the current filter scope, and clearing the filter restores the full unfiltered export.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated on the Reports page with Floating Configurations selected.
- Deleted mode has been selected and fully loaded.

# Test Data

Filter values are chosen from the loaded dataset at runtime.

# Steps and Expected Results

1. Action: Export without any filter applied. Record the data row count.
   Expected Result: Data row count = {runtimeUnfilteredRowCount}.

2. Action: Apply a filter (e.g., "Deleted By" with a value from the dataset). Observe the filtered row count in the UI.
   Expected Result: The UI shows fewer rows. Record {runtimeFilteredUIRowCount}.

3. Action: Export while the filter is active. Record the data row count in the exported file.
   Expected Result: Data row count = {runtimeFilteredExportRowCount}, which is less than {runtimeUnfilteredRowCount}. The exported rows reflect the current filter scope.

4. Action: Verify the filtered export row count matches the UI's filtered row count.
   Expected Result: {runtimeFilteredExportRowCount} equals {runtimeFilteredUIRowCount}.

5. Action: Clear the filter and export again.
   Expected Result: The unfiltered export row count returns to {runtimeUnfilteredRowCount}.

# Network Verification

- No server API requests for any export (client-side).

# Expected Final Result

Filtered export produces fewer rows than unfiltered, matching the UI's filtered view, and clearing the filter restores the full unfiltered export scope.

# Classification

- Read-only
- Positive

# Restrictions

- Do not hardcode row counts or filter values. Read dynamically at runtime.
- Do not include credentials, tokens, cookies, or sensitive payloads.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending