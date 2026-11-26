---
test_id: "LIMAS-SUD-1802"
title: "To verify the functionality of \"Reports\" → \"Floating Configurations\" → \"Deleted Mode\" → \"Export UI Preservation\""
module: "Reports"
page: "Reports"
section: "Floating Configurations"
control: "Deleted Mode"
action: "Export UI Preservation"
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

Verify that clicking Export Excel does not change the UI state: Deleted mode remains selected, the Floating Configurations card stays visible, record counts remain unchanged, table content is preserved, and scroll position is maintained.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated on the Reports page with Floating Configurations selected.
- Deleted mode has been selected and fully loaded.

# Test Data

UI state properties are read from the DOM before and after export at runtime.

# Steps and Expected Results

1. Action: Before export, capture the UI state: active mode control (Deleted pressed), record count, loaded/total display, visible rows, scroll position.
   Expected Result: Pre-export snapshot captured: Deleted mode selected, {runtimeRecordCount} records, {runtimeLoaded} loaded · {runtimeTotalElements} total.

2. Action: Click Export Excel. Wait for the download to complete.
   Expected Result: The download fires and completes.

3. Action: Verify Deleted mode is still selected.
   Expected Result: The Deleted mode control remains in the pressed/selected state. The Active control is not selected.

4. Action: Verify the Floating Configurations card is still visible.
   Expected Result: The FC card is visible and unchanged.

5. Action: Verify record counts are unchanged.
   Expected Result: The record count and loaded/total display match the pre-export values exactly.

6. Action: Verify table content and scroll position are preserved.
   Expected Result: Table content is unchanged. Scroll position is stable. No mode switch, no data refresh occurred.

# Network Verification

- No server API requests fire during or after Export.

# Expected Final Result

Exporting does not alter the UI: Deleted mode, FC card, counts, table content, and scroll position are all preserved.

# Classification

- Read-only
- Positive

# Restrictions

- Do not hardcode UI state values. Read dynamically before and after export at runtime.
- Do not include credentials, tokens, cookies, or sensitive payloads.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending