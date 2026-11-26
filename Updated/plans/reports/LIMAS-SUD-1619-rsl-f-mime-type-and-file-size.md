---
test_id: "LIMAS-SUD-1619"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Active View Toolbar\" → \"Export Excel Button\" → \"MIME type and file size\""
module: "Reports"
page: "Reports"
section: "Active View Toolbar"
control: "Export Excel Button"
action: "MIME type and file size"
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

Verify that the response Content-Type header is consistent with the `.xlsx` extension and that the downloaded file has a non-zero size.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to Reports → Standard Licenses → Active view with data rows present.

# Test Data

Capture Content-Type from response headers and file size from the downloaded buffer.

# Steps and Expected Results

1. Action: Click the Export Excel button and capture the download with response headers.
   Expected Result: A download event fires.

2. Action: Assert the Content-Type header is an Excel MIME type.
   Expected Result: Content-Type is `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet` or a compatible Excel type.

3. Action: Assert the Content-Type is consistent with the `.xlsx` extension.
   Expected Result: The MIME type maps to the `.xlsx` format (not `.csv`, `.xls`, or generic binary).

4. Action: Read the downloaded file buffer and assert its byte length.
   Expected Result: `fileSize > 0`.

5. Action: Verify the file is not a zero-byte stub or empty response.
   Expected Result: The file contains actual workbook data beyond the minimum ZIP/OOXML header.

# Network Verification

- Content-Type header matches `.xlsx` MIME type.
- Response body length > 0.

# Expected Final Result

The download response has the correct Excel MIME type and delivers a non-zero-sized file.

# Classification

- Read-only (single export for observation)
- Positive
- API

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode expected file size.

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