---
test_id: "LIMAS-SUD-1621"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Active View Toolbar\" → \"Export Excel Button\" → \"Date-filtered export (Expiration Date from runtime date helper)\""
module: "Reports"
page: "Reports"
section: "Active View Toolbar"
control: "Export Excel Button"
action: "Date-filtered export (Expiration Date from runtime date helper)"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
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

Verify that applying an Expiration Date filter and exporting produces a workbook scoped to the date range. The export request carries the correct date field with proper serialization, and the workbook is consistent with the filtered result.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to Reports → Standard Licenses → Active view.
- A runtime date helper is available to produce `{runtimeDate}` (a date known to produce a non-empty filtered result).

# Test Data

Use a runtime date helper to set the Expiration Date filter with `{runtimeDate}`. Read `{runtimeFilteredTotal}` from the loaded-total text.

# Steps and Expected Results

1. Action: Apply the Expiration Date filter using `{runtimeDate}`.
   Expected Result: The loaded-total shows `{runtimeFilteredTotal}`.

2. Action: Click the Export Excel button and capture the download and request.
   Expected Result: A download event fires.

3. Action: Assert the export request payload or query includes the Expiration Date field with a correctly serialized value derived from `{runtimeDate}`.
   Expected Result: The date field is present and serialized correctly (e.g., ISO 8601 or the format the API expects).

4. Action: Open the workbook and count data rows.
   Expected Result: `{runtimeExportedRows}` equals `{runtimeFilteredTotal}`.

5. Action: Verify all rows in the workbook have expiration dates consistent with the applied filter.
   Expected Result: No row has an expiration date outside the filtered range.

# Network Verification

- Request carries Expiration Date filter field with correct serialization.
- Response workbook row count matches filtered total.

# Expected Final Result

The date-filtered export produces a workbook containing only rows within the `{runtimeDate}` range, with correct date serialization in the request.

# Classification

- Read-only (single export for verification)
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode dates; use `{runtimeDate}` from a runtime date helper.

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