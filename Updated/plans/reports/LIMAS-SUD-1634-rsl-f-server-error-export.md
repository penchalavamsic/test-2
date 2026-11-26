---
test_id: "LIMAS-SUD-1634"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Active View Toolbar\" → \"Export Excel Button\" → \"Server error / empty response / corrupt workbook\""
module: "Reports"
page: "Reports"
section: "Active View Toolbar"
control: "Export Excel Button"
action: "Server error / empty response / corrupt workbook"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
classification: "Reports Standard Licenses RSL-F"
test_type: "Negative"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Not Started"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: ""
---

# Purpose

Verify that when the export endpoint returns a 500 server error, an empty response body, or a corrupt (non-Excel) payload, the application handles it gracefully without crashing or producing an invalid download.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to Reports → Standard Licenses → Active view.
- **Requires controlled export-failure fixture**: ability to intercept the export request and respond with 500, empty body, or corrupt payload.

# Test Data

Use Playwright `page.route()` to intercept the export endpoint. Test three sub-scenarios:
1. Respond with HTTP 500 and a JSON error body.
2. Respond with HTTP 200 but an empty body (zero bytes).
3. Respond with HTTP 200 but a payload that is not a valid `.xlsx` file (e.g., plain text or HTML).

# Steps and Expected Results

1. Action: Set up route interception for 500 error. Click Export.
   Expected Result: No download event fires. A user-visible error message is shown. Button recovers to enabled.

2. Action: Set up route interception for empty 200 response. Click Export.
   Expected Result: Either no download event fires or the download is intercepted. If a file is saved, it should be identified as invalid. Application does not crash.

3. Action: Set up route interception for corrupt payload (200 with non-Excel body). Click Export.
   Expected Result: The downloaded file is not a valid workbook. Application does not crash. Button recovers.

# Network Verification

- 500 scenario: response status 500, no download.
- Empty scenario: zero-length body.
- Corrupt scenario: non-Excel Content-Type or invalid OOXML.

# Expected Final Result

The application handles server errors, empty responses, and corrupt workbooks without crashing and provides user-visible error feedback.

# Execution Status

- **Plan Status**: Reviewed
- **Script Status**: Not Started
- **Execution Status**: Not Run
- **Reason**: Requires controlled export-failure fixture (route interception for 500 / empty / corrupt responses)

# Classification

- Read-only (no successful export)
- Negative

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not manufacture failures on the live backend.
- Do not execute without Playwright route interception available.

# Generation Status

- Test script generation: Not Started
- CI/CD execution: Pending
- Healing: Pending

# Dynamic Plan Rules

1. Use only behavior verified through Playwright MCP.
2. Verify one atomic behavior per plan.
3. Do not hardcode application URLs.
4. Do not hardcode usernames or passwords.
5. Do not hardcode counts, emails, hardware IDs, groups, profiles, roles, dates, or filenames.
6. Use runtime placeholders: `{runtimeBaseTotal}`, `{runtimeFilteredTotal}`, `{runtimeExportedRows}`, `{runtimeFilename}`, `{runtimeSheetName}`, `{runtimeDate}`, `{runtimeProfile}`, `{runtimeRole}`, `{runtimeEmail}`.