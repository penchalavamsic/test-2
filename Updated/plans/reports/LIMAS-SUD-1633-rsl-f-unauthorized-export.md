---
test_id: "LIMAS-SUD-1633"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Active View Toolbar\" → \"Export Excel Button\" → \"Unauthorized/forbidden export\""
module: "Reports"
page: "Reports"
section: "Active View Toolbar"
control: "Export Excel Button"
action: "Unauthorized/forbidden export"
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

Verify that when the export endpoint returns a 401 Unauthorized or 403 Forbidden response, the application handles it gracefully without crashing, leaking data, or producing a corrupt download.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to Reports → Standard Licenses → Active view.
- **Requires controlled export-failure fixture**: ability to intercept the export request and respond with 401/403.

# Test Data

Use Playwright `page.route()` to intercept the export endpoint and respond with 401 or 403.

# Steps and Expected Results

1. Action: Set up route interception to mock the export endpoint with a 401 or 403 response.
   Expected Result: The route is intercepted.

2. Action: Click the Export Excel button.
   Expected Result: The request is intercepted and the mocked response is returned.

3. Action: Observe the UI response.
   Expected Result: No download event fires. An error message is displayed (toast, inline alert, or status message). The application does not crash or navigate.

4. Action: Verify no file is downloaded.
   Expected Result: No `.xlsx` file is saved.

5. Action: Verify the Export button returns to an enabled state after the error.
   Expected Result: The button is not stuck in a loading/disabled state.

# Network Verification

- Export request returns 401 or 403.
- No download event fires.
- No subsequent retry without user action.

# Expected Final Result

The application handles 401/403 export responses gracefully: no download, user-visible error message, button recovers.

# Execution Status

- **Plan Status**: Reviewed
- **Script Status**: Not Started
- **Execution Status**: Not Run
- **Reason**: Requires controlled export-failure fixture (route interception for 401/403)

# Classification

- Read-only (no actual export)
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