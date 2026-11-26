---
test_id: "LIMAS-SUD-1629"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Active View Toolbar\" → \"Export Excel Button\" → \"File cleanup (temp directory, delete in finally, confirm gone)\""
module: "Reports"
page: "Reports"
section: "Active View Toolbar"
control: "Export Excel Button"
action: "File cleanup (temp directory, delete in finally, confirm gone)"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
classification: "Reports Standard Licenses RSL-F"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: ""
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: ""
---

# Purpose

Verify that each test creates a dedicated temp directory for downloads, deletes the file in a `finally` block, confirms the file is gone, and removes the empty directory.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to Reports → Standard Licenses → Active view with data rows present.
- Test framework supports temp directory creation and `finally`/`afterEach` cleanup hooks.

# Test Data

Create a unique temp directory per test (e.g., using `os.tmpdir()` + test ID). Save the downloaded file there.

# Steps and Expected Results

1. Action: Create a unique temp directory for the test.
   Expected Result: The directory is created and empty.

2. Action: Export and save the downloaded file to the temp directory.
   Expected Result: The file exists at the expected path.

3. Action: Delete the downloaded file in a `finally` or `afterEach` block.
   Expected Result: The file is deleted.

4. Action: Assert the file no longer exists.
   Expected Result: The file path does not resolve to an existing file.

5. Action: Remove the now-empty temp directory.
   Expected Result: The directory is removed.

# Network Verification

No specific network verification for this plan.

# Expected Final Result

The test creates and cleans up its temp directory and downloaded file completely, leaving no artifacts.

# Classification

- Read-only (single export for cleanup verification)
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode file paths; use runtime temp directory resolution.

# Generation Status

- Test script generation: Pending
- CI/CD execution: Pending
- Healing: Pending

# Dynamic Plan Rules

1. Use only behavior verified through Playwright MCP.
2. Verify one atomic behavior per plan.
3. Do not hardcode application URLs.
4. Do not hardcode usernames or passwords.
5. Do not hardcode counts, emails, hardware IDs, groups, profiles, roles, dates, or filenames.
6. Use runtime placeholders: `{runtimeBaseTotal}`, `{runtimeFilteredTotal}`, `{runtimeExportedRows}`, `{runtimeFilename}`, `{runtimeSheetName}`, `{runtimeDate}`, `{runtimeProfile}`, `{runtimeRole}`, `{runtimeEmail}`.