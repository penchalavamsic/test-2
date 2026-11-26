---
test_id: "LIMAS-SUD-1623"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Active View Toolbar\" → \"Export Excel Button\" → \"Zero-result export\""
module: "Reports"
page: "Reports"
section: "Active View Toolbar"
control: "Export Excel Button"
action: "Zero-result export"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
classification: "Reports Standard Licenses RSL-F"
test_type: "Boundary"
automation_candidate: true
plan_status: "Reviewed"
script_status: ""
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: ""
---

# Purpose

Apply a safe no-match filter and observe the Export button state. If disabled, verify no download fires. If enabled, export and verify the workbook is header-only (zero data rows).

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to Reports → Standard Licenses → Active view.
- A filter combination that reliably yields zero results is known (e.g., a non-existent email address).

# Test Data

Apply a filter producing zero results: e.g., Email filter with a non-existent `{runtimeEmail}` value.

# Steps and Expected Results

1. Action: Apply a filter that yields zero results (e.g., email `{runtimeEmail}` with no match).
   Expected Result: The loaded-total text shows zero. The table shows no data rows.

2. Action: Observe the Export Excel button state.
   Expected Result: The button is either disabled or enabled.

3. Action: If disabled, attempt to trigger a download via click or keyboard.
   Expected Result: No download event fires.

4. Action: If enabled, click the Export Excel button and capture the download.
   Expected Result: A download fires.

5. Action: If enabled and exported, open the workbook and verify structure.
   Expected Result: The workbook has a header row but zero data rows. `{runtimeExportedRows}` equals 0.

# Network Verification

- If disabled: no export request is made.
- If enabled: 200 response, workbook with headers only.

# Expected Final Result

The zero-result behavior is documented: either the Export button is disabled to prevent empty exports, or it is enabled and produces a header-only workbook with zero data rows.

# Classification

- Read-only (observation) or Read-only with single export
- Boundary

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode the no-match filter value; use a runtime placeholder.

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