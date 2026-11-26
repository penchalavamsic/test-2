---
test_id: "LIMAS-SUD-1628"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Active View Toolbar\" → \"Export Excel Button\" → \"Repeated export (safe naming, no overwrite, no duplicates)\""
module: "Reports"
page: "Reports"
section: "Active View Toolbar"
control: "Export Excel Button"
action: "Repeated export (safe naming, no overwrite, no duplicates)"
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

Verify that repeated exports produce safe, distinct filenames with no overwriting and no duplicate requests per activation.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to Reports → Standard Licenses → Active view with data rows present.

# Test Data

Perform two sequential exports. Capture filenames via `suggestedFilename()` and save each file to a temp directory.

# Steps and Expected Results

1. Action: Click the Export Excel button and save the first download.
   Expected Result: Download 1 completes. Filename is captured as `{runtimeFilename}_1`.

2. Action: Click the Export Excel button again and save the second download.
   Expected Result: Download 2 completes. Filename is captured as `{runtimeFilename}_2`.

3. Action: Assert the two filenames are not identical, or if identical, that the test saves them without overwriting (distinct paths).
   Expected Result: Files are safely stored without one overwriting the other.

4. Action: Verify each export activation produced exactly one download and one request.
   Expected Result: No duplicate requests per activation.

5. Action: Verify the filenames contain no path separators or suspicious patterns.
   Expected Result: Filenames are clean and safe.

# Network Verification

- Each click produces exactly one export request and one download event.
- No request duplication within a single activation.

# Expected Final Result

Repeated exports produce safely named files with no overwriting and no duplicate requests per activation.

# Classification

- Read-only (two exports for observation)
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not repeat data-changing submissions beyond the two exports.

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