---
test_id: "LIMAS-SUD-1615"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Active View Toolbar\" → \"Export Excel Button\" → \"Unfiltered export scope\""
module: "Reports"
page: "Reports"
section: "Active View Toolbar"
control: "Export Excel Button"
action: "Unfiltered export scope"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Reports Standard Licenses RSL-F"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "not-generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: ""
---

# Purpose

Verify that an unfiltered export produces a workbook whose data row count matches the runtime base total, confirming no filters are applied and no page/scrolling restriction limits the export.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to Reports → Standard Licenses → Active view.
- All filters are cleared. The loaded-total text shows `{runtimeBaseTotal}`.

# Test Data

Read `{runtimeBaseTotal}` from the loaded-total element. After export, open the workbook and count data rows (excluding header). Assert `{runtimeExportedRows}` equals `{runtimeBaseTotal}`.

# Steps and Expected Results

1. Action: Ensure all filters are cleared and the loaded-total text is visible.
   Expected Result: The loaded-total text shows `{runtimeBaseTotal}`.

2. Action: Click the Export Excel button and download the workbook.
   Expected Result: A download event fires.

3. Action: Open the workbook and count data rows.
   Expected Result: The row count `{runtimeExportedRows}` matches `{runtimeBaseTotal}`.

4. Action: Verify no filter parameters are present in the export request.
   Expected Result: The request body or query string contains no filter fields.

5. Action: Verify the export includes all rows regardless of how many are visible in the UI scrollport.
   Expected Result: `{runtimeExportedRows}` is not limited to the currently rendered page size.

# Network Verification

- Request carries no filter parameters.
- Response payload row count matches unfiltered total.

# Expected Final Result

An unfiltered export produces a workbook containing exactly all Active rows, matching the runtime base total, with no filter or pagination restriction.

# Classification

- Read-only (single export for verification)
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode expected row counts; use `{runtimeBaseTotal}`.

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