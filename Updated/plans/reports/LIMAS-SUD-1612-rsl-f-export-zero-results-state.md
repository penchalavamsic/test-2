---
test_id: "LIMAS-SUD-1612"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Active View Toolbar\" → \"Export Excel Button\" → \"State with zero filtered results\""
module: "Reports"
page: "Reports"
section: "Active View Toolbar"
control: "Export Excel Button"
action: "State with zero filtered results"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
classification: "Reports Standard Licenses RSL-F"
test_type: "Boundary"
automation_candidate: true
plan_status: "Reviewed"
script_status: "not-generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: ""
---

# Purpose

Observe the Export button state when a filter produces zero results. Determine whether the button is disabled, or remains enabled and produces a header-only workbook if activated.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to Reports → Standard Licenses → Active view.
- A filter that reliably returns zero results is known and applicable (e.g., a non-existent email or a far-future expiration date).

# Test Data

Use runtime filter values that produce zero matches. Use `page.getByRole('button', { name: 'Export Excel' })`.

# Steps and Expected Results

1. Action: Apply a filter known to yield zero results (e.g., email filter with a non-existent `{runtimeEmail}` value).
   Expected Result: The table shows zero rows and the loaded-total text reflects zero.

2. Action: Observe the Export Excel button state.
   Expected Result: The button is either disabled or enabled depending on the application behavior.

3. Action: If enabled, click the Export Excel button and capture the download.
   Expected Result: A download fires. The workbook contains only a header row with no data rows.

4. Action: If disabled, verify no download event fires on click attempt.
   Expected Result: No download event is triggered.

# Network Verification

- If export fires: verify response status is 200, Content-Type matches `.xlsx`.
- If disabled: no request is made.

# Expected Final Result

The Export button's zero-result behavior is documented: either disabled to prevent empty exports, or enabled and producing a header-only workbook.

# Classification

- Read-only (observation) or Read-only with single export
- Boundary

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not repeat data-changing submissions.
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