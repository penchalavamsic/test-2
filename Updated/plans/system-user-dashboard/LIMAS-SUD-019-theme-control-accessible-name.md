---
test_id: "LIMAS-SUD-019"
title: 'To verify the functionality of "System User Dashboard" → "Header" → "Theme Control" → "Accessible Name"'
module: "system-user-dashboard"
page: "/system-user-dashboard"
section: "Header"
control: "Theme control (moon/sun button)"
action: "Verify accessible name is missing"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P3"
classification: "Read-only"
test_type: "Accessibility"
automation_candidate: true
plan_status: "reviewed"
script_status: "generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/system-user-dashboard/LIMAS-SUD-019-theme-control-accessible-name.spec.ts"
---

# Purpose

Verify that the theme control (moon/sun icon button) has no accessible name and document the fallback selector. This is an accessibility case.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The user is authenticated on `/system-user-dashboard`.

# Test Data

None.

# Steps and Expected Results

1. Action: Navigate to the dashboard and wait for full render.
   Expected Result: Dashboard heading "System User Dashboard" is visible.

2. Action: Inspect the theme control button for aria-label and title attributes.
   Expected Result: Neither aria-label nor title attribute is set.

3. Action: Confirm the control is still locatable via its nth-child position inside the header.
   Expected Result: The button is findable via `locator('header button').nth(1)`.

# Accessibility Recommendation

The theme control has no aria-label or title. Add `aria-label="Toggle theme"` or `data-testid="theme-toggle"` for reliable cross-platform selection.

# Expected Final Result

The theme control has no accessible name. The observed fallback selector is `locator('header button').nth(1)` (moon/sun icon).

# Classification

- Read-only
- Accessibility

# Restrictions

- Do not include credentials, tokens, cookies, authorization codes, or sensitive payloads.
- Do not repeat data-changing submissions.
- Do not manually navigate to simulate a successful result.
- Do not use static environment-specific data.
- Do not modify LIMAS source code.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending