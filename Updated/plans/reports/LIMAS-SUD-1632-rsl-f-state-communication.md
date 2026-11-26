---
test_id: "LIMAS-SUD-1632"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Active View Toolbar\" → \"Export Excel Button\" → \"State communication (pending, completion, error, scope, non-color)\""
module: "Reports"
page: "Reports"
section: "Active View Toolbar"
control: "Export Excel Button"
action: "State communication (pending, completion, error, scope, non-color)"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
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

Verify that the export operation communicates state changes (pending, completion, error) to assistive technology, that scope information (row count) is communicated, and that state is not conveyed solely through color.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to Reports → Standard Licenses → Active view with data rows present.

# Test Data

Use ARIA live regions, `role="status"` or `role="alert"` elements, and color-contrast checks. Monitor for announcements during export lifecycle.

# Steps and Expected Results

1. Action: Click the Export Excel button.
   Expected Result: A download starts.

2. Action: Observe any live-region or status announcement during the pending phase.
   Expected Result: A pending/loading announcement is made (e.g., via `aria-live="polite"` or `role="status"`).

3. Action: Wait for download completion and observe any completion announcement.
   Expected Result: A completion or success announcement is exposed to assistive technology.

4. Action: Verify that scope information (row count, filter context) is communicated via accessible text, not only visually.
   Expected Result: The loaded-total or export-scope information is available as text content or an ARIA attribute.

5. Action: Assert that no state is conveyed solely through color (e.g., a green checkmark with no text alternative).
   Expected Result: Every state indicator has a text equivalent or ARIA property, not just a color change.

6. Action: If an error state can be triggered (e.g., by a controlled fixture), verify an error announcement.
   Expected Result: Error state is announced via `role="alert"` or `aria-live="assertive"`.

# Network Verification

No specific network verification for this plan beyond confirming export lifecycle events.

# Expected Final Result

Export state changes (pending, completion, error) are communicated to assistive technology, scope information is accessible, and no state relies solely on color.

# Classification

- Read-only (single export for observation)
- Accessibility

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not manufacture errors on the live backend; use controlled fixtures if available.

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