---
test_id: "LIMAS-SUD-1735"
title: "To verify the functionality of \"Reports\" → \"Floating Licenses\" → \"Export Excel\" → \"Duplicate Export Protection\""
module: "Reports"
page: "Reports"
section: "Floating Licenses"
control: "Export Excel"
action: "Duplicate Export Protection"
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

Verify that rapid consecutive Export clicks each produce an independent, valid workbook — one download per click, no corruption, no cancelled downloads.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses is selected in Deleted mode with records loaded.
- Export button is enabled.

# Test Data

All values read dynamically from each download event.

# Steps and Expected Results

1. Action: Set up download event listeners to capture all download events.
   Expected Result: Listeners are active and will count each download.

2. Action: Click the Export Excel button twice in rapid succession (as fast as programmatically possible).
   Expected Result: Two click events are dispatched.

3. Action: Count the number of download events fired.
   Expected Result: Exactly 2 download events were fired — one per click.

4. Action: Capture both downloaded files and verify each can be opened as a valid workbook.
   Expected Result: Both workbooks open without corruption errors.

5. Action: Verify both workbooks have the same structure (same header row, same column count).
   Expected Result: Both workbooks are structurally identical.

6. Action: Verify both workbooks contain data rows (non-empty when Deleted data exists).
   Expected Result: Both workbooks have data rows. No workbook is empty or corrupted.

7. Action: Verify no cancelled or aborted download events were observed.
   Expected Result: All download events completed successfully — no aborted/interrupted downloads.

# Network Verification

No API requests are sent during any of the Export clicks.

# Expected Final Result

Two rapid Export clicks produce exactly two valid, structurally identical workbooks with no corruption and no cancelled downloads.

# Classification

- Read-only
- Positive
- Boundary

# Restrictions

- Do not hardcode the number of clicks — the test verifies the 1:1 relationship between clicks and downloads.
- Do not manually navigate to simulate a successful result.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending