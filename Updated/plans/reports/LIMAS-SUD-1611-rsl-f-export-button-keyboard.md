---
test_id: "LIMAS-SUD-1611"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Active View Toolbar\" → \"Export Excel Button\" → \"Keyboard activation (Tab, focus indicator, Enter, Space)\""
module: "Reports"
page: "Reports"
section: "Active View Toolbar"
control: "Export Excel Button"
action: "Keyboard activation (Tab, focus indicator, Enter, Space)"
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

Verify that the Export Excel button is reachable via Tab key, shows a visible focus indicator, and activates export on both Enter and Space key presses.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to Reports → Standard Licenses → Active view.
- Export button is visible in the toolbar.

# Test Data

Use `page.getByRole('button', { name: 'Export Excel' })`. Track download events via `page.waitForEvent('download')` or equivalent.

# Steps and Expected Results

1. Action: Press Tab repeatedly until focus reaches the Export Excel button.
   Expected Result: The button receives focus.

2. Action: Observe the focus indicator on the button.
   Expected Result: A visible focus ring or outline is present.

3. Action: With focus on the button, press Enter.
   Expected Result: A download event fires, confirming activation via Enter.

4. Action: Wait for download to complete, then navigate focus back to the button via Tab.
   Expected Result: The button receives focus again.

5. Action: With focus on the button, press Space.
   Expected Result: A download event fires, confirming activation via Space.

# Network Verification

- Download event count incremented on each activation.
- No request body assertion needed for this plan.

# Expected Final Result

The Export Excel button is Tab-focusable, shows a visible focus indicator, and activates export on both Enter and Space key presses.

# Classification

- Read-only
- Positive
- Accessibility

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not repeat data-changing submissions.
- Clean up downloaded files after verification.

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