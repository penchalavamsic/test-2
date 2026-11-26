---
test_id: "LIMAS-SUD-1627"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Active View Toolbar\" → \"Export Excel Button\" → \"One click produces exactly one download\""
module: "Reports"
page: "Reports"
section: "Active View Toolbar"
control: "Export Excel Button"
action: "One click produces exactly one download"
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

Verify that a single click on the Export Excel button produces exactly one download event — no duplicate requests, no double downloads.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to Reports → Standard Licenses → Active view with data rows present.

# Test Data

Use `page.waitForEvent('download')` with a timeout to capture all download events triggered by a single click.

# Steps and Expected Results

1. Action: Set up a download event listener/counter before clicking.
   Expected Result: The listener is armed.

2. Action: Click the Export Excel button exactly once.
   Expected Result: The button click is registered.

3. Action: Wait for download events to settle (allow any duplicates to surface within a reasonable timeout).
   Expected Result: Exactly one download event fires.

4. Action: Verify no additional download events arrive after the first one completes.
   Expected Result: The download count is 1.

5. Action: Verify no duplicate network requests for the export endpoint.
   Expected Result: The export endpoint is called exactly once.

# Network Verification

- Export endpoint hit count: 1.
- Download event count: 1.

# Expected Final Result

A single click produces exactly one download, with no duplicate events or requests.

# Classification

- Read-only (single export for observation)
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not repeat data-changing submissions.

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