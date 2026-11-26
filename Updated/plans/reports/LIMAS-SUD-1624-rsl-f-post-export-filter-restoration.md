---
test_id: "LIMAS-SUD-1624"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Active View Toolbar\" → \"Export Excel Button\" → \"Post-export filter restoration\""
module: "Reports"
page: "Reports"
section: "Active View Toolbar"
control: "Export Excel Button"
action: "Post-export filter restoration"
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

After exporting with filters applied, clear all filters and verify the unfiltered view is restored with the full base total.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to Reports → Standard Licenses → Active view.
- `{runtimeBaseTotal}` is known from initial load.

# Test Data

Apply a `{runtimeProfile}` filter, export, then clear filters. Read the loaded-total and compare to `{runtimeBaseTotal}`.

# Steps and Expected Results

1. Action: On initial load with no filters, record `{runtimeBaseTotal}`.
   Expected Result: The loaded-total text is recorded.

2. Action: Apply a `{runtimeProfile}` filter.
   Expected Result: The loaded-total changes to `{runtimeFilteredTotal}` (less than or equal to `{runtimeBaseTotal}`).

3. Action: Click the Export Excel button and wait for download.
   Expected Result: A download completes.

4. Action: Clear all filters.
   Expected Result: All filter tags are removed.

5. Action: Observe the loaded-total text.
   Expected Result: The loaded-total returns to `{runtimeBaseTotal}`, confirming the unfiltered view is restored.

6. Action: Verify the table displays data rows consistent with `{runtimeBaseTotal}`.
   Expected Result: Rows are present and match the unfiltered scope.

# Network Verification

- After clearing filters, the data request is unfiltered (no filter parameters).
- The response total matches `{runtimeBaseTotal}`.

# Expected Final Result

After exporting with filters and subsequently clearing them, the unfiltered view is fully restored with the correct base total.

# Classification

- Read-only (single export for verification)
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode filter values or totals; use runtime placeholders.

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