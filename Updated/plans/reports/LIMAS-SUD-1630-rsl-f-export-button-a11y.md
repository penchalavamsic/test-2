---
test_id: "LIMAS-SUD-1630"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Active View Toolbar\" → \"Export Excel Button\" → \"Accessibility (accessible name, icon semantics, enabled/disabled announcement)\""
module: "Reports"
page: "Reports"
section: "Active View Toolbar"
control: "Export Excel Button"
action: "Accessibility (accessible name, icon semantics, enabled/disabled announcement)"
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

Verify the Export Excel button's accessibility properties: accessible name, icon semantics (aria-hidden or decorative), and enabled/disabled state announcement to assistive technology.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to Reports → Standard Licenses → Active view with data rows present.

# Test Data

Use `page.getByRole('button', { name: 'Export Excel' })`. Inspect ARIA attributes on the button and its icon child.

# Steps and Expected Results

1. Action: Locate the Export Excel button and read its accessible name.
   Expected Result: The accessible name is "Export Excel" (via `aria-label`, inner text, or `aria-labelledby`).

2. Action: Inspect the icon element inside the button.
   Expected Result: The icon has `aria-hidden="true"` or is a decorative element not exposed to the accessibility tree.

3. Action: Assert the enabled state is communicated correctly.
   Expected Result: When enabled, `aria-disabled` is either absent or `false`.

4. Action: If a scenario exists where the button becomes disabled (e.g., zero results), assert the disabled state.
   Expected Result: When disabled, `aria-disabled="true"` or the `disabled` attribute is present, and the accessible name still resolves.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

The Export Excel button has a correct accessible name, the icon is hidden from assistive technology, and enabled/disabled states are properly communicated.

# Classification

- Read-only
- Accessibility

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