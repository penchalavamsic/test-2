---
test_id: "LIMAS-SUD-1610"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Active View Toolbar\" → \"Export Excel Button\" → \"Structure (visible, role, label, icon, enabled, toolbar, tabindex)\""
module: "Reports"
page: "Reports"
section: "Active View Toolbar"
control: "Export Excel Button"
action: "Structure (visible, role, label, icon, enabled, toolbar, tabindex)"
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

Verify the Export Excel button structural properties: visible, correct ARIA role, accessible name "Export Excel", icon present, enabled, positioned in the toolbar, and keyboard-reachable via tabindex=0.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to the Reports page with the Standard Licenses card selected and Active mode active.

# Test Data

Use `page.getByRole('button', { name: 'Export Excel' })`. Verify icon presence via a child `<svg>` or `<img>` element within the button.

# Steps and Expected Results

1. Action: Navigate to Reports → Standard Licenses → Active view.
   Expected Result: The page loads with the Active toolbar visible.

2. Action: Locate the Export Excel button by role and accessible name.
   Expected Result: The button has `role="button"` and accessible name "Export Excel".

3. Action: Assert the button is visible.
   Expected Result: The button is in the viewport.

4. Action: Assert the button is enabled (not disabled).
   Expected Result: The button has no `disabled` attribute and is not `aria-disabled`.

5. Action: Assert an icon element is present inside the button.
   Expected Result: A child `<svg>` or `<img>` with decorative intent is present.

6. Action: Assert the button is inside the toolbar container.
   Expected Result: The button is a descendant of the Active view toolbar.

7. Action: Assert the button has `tabindex="0"` or is natively focusable.
   Expected Result: The button participates in the tab sequence.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

The Export Excel button renders with correct role, accessible name, icon, enabled state, toolbar placement, and tabindex=0 on page load.

# Classification

- Read-only
- Positive
- Visual

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