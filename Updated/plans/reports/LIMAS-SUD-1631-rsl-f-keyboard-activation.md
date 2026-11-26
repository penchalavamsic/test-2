---
test_id: "LIMAS-SUD-1631"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Active View Toolbar\" → \"Export Excel Button\" → \"Keyboard activation (Enter, Space, focus after activation)\""
module: "Reports"
page: "Reports"
section: "Active View Toolbar"
control: "Export Excel Button"
action: "Keyboard activation (Enter, Space, focus after activation)"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Reports Standard Licenses RSL-F"
test_type: "Accessibility"
automation_candidate: true
plan_status: "Reviewed"
script_status: ""
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: ""
---

# Purpose

Verify that the Export Excel button can be activated via Enter and Space keys and that focus behavior after activation is correct.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to Reports → Standard Licenses → Active view with data rows present.
- Export button is enabled and visible.

# Test Data

Use `page.getByRole('button', { name: 'Export Excel' })`. Track keyboard focus and download events.

# Steps and Expected Results

1. Action: Tab to the Export Excel button.
   Expected Result: The button receives focus.

2. Action: Press Enter.
   Expected Result: A download event fires, confirming Enter activates export.

3. Action: After download completes, observe focus position.
   Expected Result: Focus is either retained on the button or returned to a logical position in the toolbar (not lost to `document.body`).

4. Action: Navigate focus back to the button.

5. Action: Press Space.
   Expected Result: A download event fires, confirming Space activates export.

6. Action: After download completes, observe focus position.
   Expected Result: Focus is in a sensible location, not lost.

# Network Verification

- Download event fires on each keyboard activation.
- No additional network requests beyond export.

# Expected Final Result

Both Enter and Space activate the Export button, and focus is managed correctly after activation.

# Classification

- Read-only (two exports for keyboard verification)
- Accessibility

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not repeat data-changing submissions beyond the two exports.
- Clean up downloaded files.

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