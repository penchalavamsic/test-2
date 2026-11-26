---
test_id: "LIMAS-SUD-1626"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Deleted View Toolbar\" → \"Export Excel Button\" → \"Deleted export scope\""
module: "Reports"
page: "Reports"
section: "Deleted View Toolbar"
control: "Export Excel Button"
action: "Deleted export scope"
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

If the Deleted view supports export, perform a single export and validate the workbook. Verify the workbook contains Deleted-mode data, not Active-mode data. If export is unavailable in the Deleted view, document the finding.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to Reports → Standard Licenses → Deleted view.
- All filters are cleared. The Deleted loaded-total is known.

# Test Data

Record the Deleted loaded-total as `{runtimeFilteredTotal}`. If export is available, capture the workbook and parse it.

# Steps and Expected Results

1. Action: Ensure the Deleted view is active with no filters applied.
   Expected Result: The Deleted loaded-total shows `{runtimeFilteredTotal}`.

2. Action: If export is available, click the Export Excel button and download.
   Expected Result: A download event fires.

3. Action: Open the workbook and validate structure (headers, sheet, non-corrupt).
   Expected Result: The workbook passes structural validation.

4. Action: Count data rows and compare to `{runtimeFilteredTotal}`.
   Expected Result: `{runtimeExportedRows}` matches the Deleted `{runtimeFilteredTotal}`.

5. Action: Verify the workbook does not contain Active-mode data (e.g., no row with a status inconsistent with Deleted).
   Expected Result: All rows represent deleted/deactivated licenses, not active ones.

6. Action: If export is unavailable, document the observation.
   Expected Result: The finding is recorded: Export button absent or disabled in Deleted view.

# Network Verification

- If export fires: request carries Deleted mode parameter or hits a Deleted-specific endpoint.
- Response workbook contains only Deleted-scope data.

# Expected Final Result

The Deleted export scope is validated and confirmed to contain only Deleted-mode data, or the unavailability is documented.

# Classification

- Read-only (single export for verification, or observation only)
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode Deleted count or Active data for comparison.

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