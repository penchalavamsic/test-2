---
test_id: "LIMAS-SUD-1617"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Active View Toolbar\" → \"Export Excel Button\" → \"Filename and file type\""
module: "Reports"
page: "Reports"
section: "Active View Toolbar"
control: "Export Excel Button"
action: "Filename and file type"
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

Verify that the downloaded file has a nonempty filename, an `.xlsx` extension, no path separators in the name, and no credentials or tokens embedded in the filename.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to Reports → Standard Licenses → Active view with data rows present.

# Test Data

Capture the filename from the download event's `suggestedFilename()` or Content-Disposition header as `{runtimeFilename}`.

# Steps and Expected Results

1. Action: Click the Export Excel button and capture the download.
   Expected Result: A download event fires.

2. Action: Read the suggested filename `{runtimeFilename}`.
   Expected Result: The filename is nonempty.

3. Action: Assert the filename ends with `.xlsx`.
   Expected Result: The extension is `.xlsx`.

4. Action: Assert the filename contains no path separators (`/` or `\`).
   Expected Result: The filename is a simple name, not a path.

5. Action: Assert the filename contains no credentials or tokens (no base64-like long strings, no `Bearer`, no `token=` patterns).
   Expected Result: The filename is clean of sensitive data.

# Network Verification

- Content-Disposition header contains `filename=` with a valid `.xlsx` name.

# Expected Final Result

The downloaded file has a clean, safe `.xlsx` filename with no embedded credentials or path components.

# Classification

- Read-only (single export for observation)
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode the expected filename; use `{runtimeFilename}`.

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