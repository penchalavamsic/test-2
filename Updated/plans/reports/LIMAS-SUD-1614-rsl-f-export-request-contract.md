---
test_id: "LIMAS-SUD-1614"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Active View Toolbar\" → \"Export Excel Button\" → \"Export request contract (HTTP method, endpoint, Content-Type, Content-Disposition, status, download count)\""
module: "Reports"
page: "Reports"
section: "Active View Toolbar"
control: "Export Excel Button"
action: "Export request contract (HTTP method, endpoint, Content-Type, Content-Disposition, status, download count)"
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

Verify the export HTTP request contract without asserting payload values. Assert method, sanitized endpoint shape, response Content-Type, Content-Disposition header, response status, and download event count.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to Reports → Standard Licenses → Active view with data rows present.

# Test Data

Intercept the export request via `page.waitForEvent('download')` or Playwright route interception. Do not assert payload values — only structural contract properties.

# Steps and Expected Results

1. Action: Click the Export Excel button and capture the download event.
   Expected Result: Exactly one download event fires.

2. Action: Assert the HTTP method.
   Expected Result: The request uses `GET` or `POST` (whichever the application uses for export).

3. Action: Assert the request URL structure.
   Expected Result: The URL is well-formed, points to the export endpoint, and contains no credentials or tokens in query parameters.

4. Action: Assert the response Content-Type header.
   Expected Result: The Content-Type matches an Excel MIME type (e.g., `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`).

5. Action: Assert the Content-Disposition header is present.
   Expected Result: The header includes `attachment` and a filename.

6. Action: Assert the response HTTP status.
   Expected Result: The status is `200`.

# Network Verification

- Request URL: export endpoint, sanitized check only
- HTTP Method: GET or POST
- Expected Status: 200
- Content-Type: Excel MIME type
- Content-Disposition: attachment present

# Expected Final Result

The export HTTP contract is structurally valid: correct method, clean endpoint, Excel Content-Type, attachment disposition, 200 status, and single download event.

# Classification

- Read-only (single export for observation)
- Positive
- API

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not assert payload values or data content in this plan.
- Do not hardcode endpoint paths; assert shape only.

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