---
test_id: "LIMAS-SUD-1620"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Active View Toolbar\" → \"Export Excel Button\" → \"Core-filtered export (Product Profile from runtime)\""
module: "Reports"
page: "Reports"
section: "Active View Toolbar"
control: "Export Excel Button"
action: "Core-filtered export (Product Profile from runtime)"
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

Verify that applying a Product Profile filter and exporting produces a workbook scoped to the filtered data. The export request carries the correct filter field, the workbook row count matches the filtered contract, and no unfiltered data appears.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to Reports → Standard Licenses → Active view.
- At least one Product Profile filter option is available at runtime.

# Test Data

Select `{runtimeProfile}` from the Product Profile filter. Read `{runtimeFilteredTotal}` from the loaded-total text. After export, parse the workbook and verify `{runtimeExportedRows}` equals `{runtimeFilteredTotal}`.

# Steps and Expected Results

1. Action: Apply the Product Profile filter with `{runtimeProfile}`.
   Expected Result: The loaded-total shows `{runtimeFilteredTotal}`.

2. Action: Click the Export Excel button and capture the download and request.
   Expected Result: A download event fires.

3. Action: Assert the export request payload or query includes the Product Profile filter field with value `{runtimeProfile}`.
   Expected Result: The correct filter field is present in the request.

4. Action: Open the workbook and count data rows.
   Expected Result: `{runtimeExportedRows}` equals `{runtimeFilteredTotal}`.

5. Action: Scan workbook rows for any Product Profile value not matching `{runtimeProfile}`.
   Expected Result: No row contains an unfiltered profile value.

# Network Verification

- Request carries Product Profile filter field with `{runtimeProfile}`.
- Response workbook row count matches filtered total.

# Expected Final Result

The filtered export produces a workbook containing only rows matching `{runtimeProfile}`, with the correct filter field in the request and row count consistent with the filtered UI total.

# Classification

- Read-only (single export for verification)
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode profile names; use `{runtimeProfile}` and `{runtimeFilteredTotal}`.

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