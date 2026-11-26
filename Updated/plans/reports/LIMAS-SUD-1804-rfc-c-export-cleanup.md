---
test_id: "LIMAS-SUD-1804"
title: "To verify the functionality of \"Reports\" → \"Floating Configurations\" → \"Deleted Mode\" → \"Export Cleanup\""
module: "Reports"
page: "Reports"
section: "Floating Configurations"
control: "Deleted Mode"
action: "Export Cleanup"
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

Verify that downloaded export files are properly cleaned up after each test, temporary files are removed, no shared paths are used between tests, and cleanup runs even on test failure via a finally block.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated on the Reports page with Floating Configurations selected.
- Deleted mode has been selected and fully loaded.

# Test Data

Temporary download paths are generated per test run (e.g., using os.tmpdir() or equivalent).

# Steps and Expected Results

1. Action: Export Excel and save the file to a test-specific temporary path.
   Expected Result: The file is saved at a unique temporary path (no shared paths with other tests).

2. Action: Validate the file exists and is valid.
   Expected Result: The file exists, has non-zero size, and is a valid .xlsx workbook.

3. Action: Delete the file after validation.
   Expected Result: The file is removed from the filesystem. The temporary path is clean.

4. Action: Verify cleanup runs in a finally block.
   Expected Result: The cleanup code is placed in a finally block, ensuring file removal even if test assertions fail.

5. Action: After cleanup, verify the file no longer exists.
   Expected Result: The temporary path no longer contains the file.

# Network Verification

- No server API requests (client-side export).

# Expected Final Result

Downloaded export files are cleaned up after each test from test-specific temporary paths, with cleanup guaranteed via a finally block.

# Classification

- Read-only
- Positive

# Restrictions

- Do not hardcode file paths. Use system temp directories and unique filenames.
- Do not include credentials, tokens, cookies, or sensitive payloads.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending