---
test_id: "LIMAS-SUD-1613"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Active View Toolbar\" → \"Export Excel Button\" → \"Pending state during active export\""
module: "Reports"
page: "Reports"
section: "Active View Toolbar"
control: "Export Excel Button"
action: "Pending state during active export"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
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

Observe the Export Excel button state during an active export operation. Verify it shows a disabled or loading indicator to prevent duplicate activation.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to Reports → Standard Licenses → Active view with data rows present.
- Export button is enabled.

# Test Data

Use `page.getByRole('button', { name: 'Export Excel' })`. This plan requires fixture support to capture button state immediately after click.

# Steps and Expected Results

1. Action: Click the Export Excel button.
   Expected Result: A download event starts.

2. Action: Immediately after click, observe the button state before the download completes.
   Expected Result: The button transitions to a disabled state (attribute `disabled` or `aria-disabled="true"`) or shows a loading indicator (spinner, text change, or visual cue).

3. Action: Wait for the download to complete.
   Expected Result: The button returns to its enabled state.

# Network Verification

- Download event fires once.
- No duplicate requests during the pending window.

# Expected Final Result

During an active export, the button enters a disabled or loading state, then returns to enabled after completion.

# Classification

- Read-only
- Positive
- Visual

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not repeat data-changing submissions.
- This plan requires Playwright MCP fixture support for timing-sensitive state observation.

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