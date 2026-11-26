---
test_id: "LIMAS-SUD-1622"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Active View Toolbar\" → \"Export Excel Button\" → \"Combined-filter export (Profile, Role, Expiration Date)\""
module: "Reports"
page: "Reports"
section: "Active View Toolbar"
control: "Export Excel Button"
action: "Combined-filter export (Profile, Role, Expiration Date)"
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

Verify that applying a combination of Product Profile, Profile Role, and Expiration Date filters and exporting produces a workbook scoped to the intersection. All three filter fields appear in the request, the workbook row count matches the combined filtered total, and no stale unfiltered data is present.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to Reports → Standard Licenses → Active view.
- `{runtimeProfile}`, `{runtimeRole}`, and `{runtimeDate}` are available at runtime and produce a non-empty combined result.

# Test Data

Apply `{runtimeProfile}` (Product Profile), `{runtimeRole}` (Profile Role), and `{runtimeDate}` (Expiration Date) filters simultaneously. Read `{runtimeFilteredTotal}`.

# Steps and Expected Results

1. Action: Apply all three filters: Product Profile = `{runtimeProfile}`, Profile Role = `{runtimeRole}`, Expiration Date = `{runtimeDate}`.
   Expected Result: The loaded-total shows `{runtimeFilteredTotal}`. All three filter tags are visible.

2. Action: Click the Export Excel button and capture the download and request.
   Expected Result: A download event fires.

3. Action: Assert the export request includes all three filter fields with correct values.
   Expected Result: Product Profile, Profile Role, and Expiration Date fields are present.

4. Action: Open the workbook and count data rows.
   Expected Result: `{runtimeExportedRows}` equals `{runtimeFilteredTotal}`.

5. Action: Scan workbook rows to verify all rows satisfy all three filter conditions.
   Expected Result: No row violates any of the combined filter criteria.

# Network Verification

- Request carries Product Profile, Profile Role, and Expiration Date filter fields.
- Response workbook row count matches combined filtered total.

# Expected Final Result

The combined-filter export produces a workbook containing only rows matching all three filter criteria, with all filter fields present in the request.

# Classification

- Read-only (single export for verification)
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode filter values; use runtime placeholders.

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