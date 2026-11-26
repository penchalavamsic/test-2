---
test_id: "LIMAS-SUD-1736"
title: "To verify the functionality of \"Reports\" → \"Floating Licenses\" → \"Export Excel\" → \"Temporary File Cleanup After Export\""
module: "Reports"
page: "Reports"
section: "Floating Licenses"
control: "Export Excel"
action: "Temporary File Cleanup After Export"
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

Verify that after an Export completes, the temporary download file is cleaned up — the temp directory is removed when empty, no stray files remain in the workspace, and no shared Downloads folder is used.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses is selected in Deleted mode with records loaded.
- Export button is enabled.
- Test runner has access to observe the file system for temporary files (via Playwright's download path or equivalent).

# Test Data

All paths observed dynamically from the Playwright download context.

# Steps and Expected Results

1. Action: Before export, note the state of the download/temp directory.
   Expected Result: Baseline: no stale `.xlsx` files from prior runs remain.

2. Action: Click the Export Excel button and wait for the download to complete.
   Expected Result: A download is completed.

3. Action: Capture the suggested filename and the temporary path where the file was written as {runtimeTempPath}.
   Expected Result: {runtimeTempPath} is a temporary directory, not a shared Downloads folder (e.g., not `~/Downloads` or `%USERPROFILE%\Downloads`).

4. Action: After the download is consumed by the test, verify the temporary file is removed.
   Expected Result: The `.xlsx` file at {runtimeTempPath} no longer exists.

5. Action: Verify the temporary directory is also removed if it becomes empty.
   Expected Result: The temp directory used for this export is no longer present (removed when empty).

6. Action: Verify no stray `.xlsx` files remain in the workspace or any persistent directory.
   Expected Result: No `.xlsx` files remain that were created by the export.

# Network Verification

No API request is sent during Export.

# Expected Final Result

After export, the temporary `.xlsx` file and its containing temp directory are cleaned up — no stray files remain in the workspace, and no shared Downloads folder is used.

# Classification

- Read-only
- Positive

# Restrictions

- Do not hardcode file system paths — observe dynamically.
- Do not rely on manual file deletion — verify automatic cleanup.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending