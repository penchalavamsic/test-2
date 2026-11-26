---
test_id: "LIMAS-SUD-1635"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Active View Toolbar\" → \"Export Excel Button\" → \"Network interruption / partial download / disk-write failure\""
module: "Reports"
page: "Reports"
section: "Active View Toolbar"
control: "Export Excel Button"
action: "Network interruption / partial download / disk-write failure"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
classification: "Reports Standard Licenses RSL-F"
test_type: "Negative"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Not Started"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: ""
---

# Purpose

Verify that when the export download is interrupted mid-stream (network failure), delivers only a partial file, or encounters a disk-write failure, the application handles it gracefully.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to Reports → Standard Licenses → Active view.
- **Requires controlled export-failure fixture**: ability to intercept and abort the download stream.

# Test Data

Use Playwright `page.route()` to simulate three failure modes:
1. **Network interruption**: abort the response stream mid-download.
2. **Partial download**: deliver a truncated response (only part of a valid `.xlsx`).
3. **Disk-write failure**: simulate a filesystem error when saving (platform-dependent; may require mocking the filesystem or using a read-only temp directory).

# Steps and Expected Results

1. Action: Set up route interception to abort mid-stream. Click Export.
   Expected Result: The download fails. No valid file is produced. The application shows an error. Button recovers.

2. Action: Set up route interception to deliver a truncated response. Click Export.
   Expected Result: The partial file is identified as invalid (corrupt workbook, unexpected EOF). Application does not crash.

3. Action: If disk-write simulation is feasible, attempt to save to a non-writable path. Click Export.
   Expected Result: The application reports a save error. Button recovers.

# Network Verification

- Aborted stream: response interrupted before completion.
- Partial download: Content-Length mismatch or truncated body.
- Disk failure: filesystem error on write.

# Expected Final Result

The application handles network interruptions, partial downloads, and disk-write failures without crashing and with user-visible error communication.

# Execution Status

- **Plan Status**: Reviewed
- **Script Status**: Not Started
- **Execution Status**: Not Run
- **Reason**: Requires controlled export-failure fixture (route interception for aborted/partial download, optional disk-write simulation)

# Classification

- Read-only (no successful export)
- Negative

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not manufacture failures on the live backend.
- Do not execute without Playwright route interception available.

# Generation Status

- Test script generation: Not Started
- CI/CD execution: Pending
- Healing: Pending

# Dynamic Plan Rules

1. Use only behavior verified through Playwright MCP.
2. Verify one atomic behavior per plan.
3. Do not hardcode application URLs.
4. Do not hardcode usernames or passwords.
5. Do not hardcode counts, emails, hardware IDs, groups, profiles, roles, dates, or filenames.
6. Use runtime placeholders: `{runtimeBaseTotal}`, `{runtimeFilteredTotal}`, `{runtimeExportedRows}`, `{runtimeFilename}`, `{runtimeSheetName}`, `{runtimeDate}`, `{runtimeProfile}`, `{runtimeRole}`, `{runtimeEmail}`.