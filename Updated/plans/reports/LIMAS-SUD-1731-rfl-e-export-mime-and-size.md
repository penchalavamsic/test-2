---
test_id: "LIMAS-SUD-1731"
title: "To verify the functionality of \"Reports\" → \"Floating Licenses\" → \"Export Excel\" → \"MIME Type and File Size Validation\""
module: "Reports"
page: "Reports"
section: "Floating Licenses"
control: "Export Excel"
action: "MIME Type and File Size Validation"
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

Verify the exported file has a valid Excel MIME type, a non-zero file size, and is not truncated.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses is selected in Deleted mode with records loaded.
- Export button is enabled.

# Test Data

MIME type and file size captured dynamically from the download.

# Steps and Expected Results

1. Action: Click Export and capture the downloaded file's MIME type as {runtimeMimeType}.
   Expected Result: {runtimeMimeType} is one of the expected Excel MIME types.

2. Action: Verify {runtimeMimeType} matches an accepted Excel MIME type.
   Expected Result: {runtimeMimeType} is `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet` or `application/octet-stream`.

3. Action: Read the downloaded file's size in bytes as {runtimeFileSize}.
   Expected Result: {runtimeFileSize} > 0 — the file is nonempty.

4. Action: Verify the file is not truncated by opening it as a valid ZIP archive (since .xlsx is ZIP-based).
   Expected Result: The file can be opened as a ZIP archive without errors, confirming it is complete and not truncated.

5. Action: Verify the ZIP central directory is present (signature `PK\x05\x06` near end of file).
   Expected Result: The file contains a valid ZIP central directory — the file is complete, not truncated mid-write.

# Network Verification

No API request is sent during Export.

# Expected Final Result

The exported file has MIME type `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet` or `application/octet-stream`, file size > 0, and is a complete ZIP archive (not truncated).

# Classification

- Read-only
- Positive

# Restrictions

- Do not hardcode the MIME type or file size — capture dynamically.
- Do not assume a single MIME type — accept known valid variants.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending