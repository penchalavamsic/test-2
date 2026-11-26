---
test_id: "LIMAS-SUD-1729"
title: "To verify the functionality of \"Reports\" → \"Floating Licenses\" → \"Export Excel\" → \"UI State Preservation During and After Export\""
module: "Reports"
page: "Reports"
section: "Floating Licenses"
control: "Export Excel"
action: "UI State Preservation During and After Export"
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

Verify that during and after an Export, the UI state is preserved: Deleted mode stays selected, Active stays unpressed, Floating Licenses card stays selected, filters remain collapsed and empty, counts are unchanged, table is intact, and scroll position is preserved.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses is selected in Deleted mode with records loaded.
- Filters are collapsed and cleared.
- A known scroll position is set (e.g., scrolled to a specific row).
- Export button is enabled.

# Test Data

All values read dynamically before and after export for comparison.

# Steps and Expected Results

1. Action: Before export, capture UI baseline: Deleted pressed state, Active pressed state, Floating Licenses card pressed state, filter panel collapsed state, filter input values, record count, loaded count, total count, table row count, and scroll position.
   Expected Result: Baseline values captured.

2. Action: Click the Export Excel button.
   Expected Result: Download fires. No page navigation or reload occurs.

3. Action: During the export (immediately after click), re-read Deleted pressed state and Active pressed state.
   Expected Result: Deleted remains aria-pressed="true", Active remains aria-pressed="false".

4. Action: After export completes, re-capture all baseline values and compare.
   Expected Result: Deleted mode stays selected. Active stays unpressed. Floating Licenses card stays selected (aria-pressed="true"). Filters remain collapsed and empty. Record count, loaded count, and total count are unchanged. Table row count is unchanged. Scroll position is preserved or restored.

5. Action: Verify no visual flicker, unexpected loading spinner, or mode switch occurred.
   Expected Result: The UI is visually stable throughout the export.

# Network Verification

No new API requests are sent during or after export. The Deleted API response remains as the current data source.

# Expected Final Result

The UI state across mode selection, card selection, filters, counts, table, and scroll position is fully preserved during and after a client-side Export.

# Classification

- Read-only
- Positive

# Restrictions

- Do not hardcode counts, scroll positions, or DOM state — compare dynamically before/after.
- Do not manually navigate to simulate a successful result.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending