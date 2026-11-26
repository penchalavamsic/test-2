---
test_id: "LIMAS-SUD-1584"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Deleted Mode\" → \"Mode Control Structure\" → \"Buttons inside group with aria-pressed semantics and keyboard focus\""
module: "Reports"
page: "Reports"
section: "Deleted Mode"
control: "Mode Control Structure"
action: "Buttons inside group 'License mode' — button 'Active' and button 'Deleted', aria-pressed='true'/'false' toggle semantics, native button elements, keyboard focus ring visible on Tab"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Reports Standard Licenses RSL-E"
test_type: "Accessibility"
automation_candidate: true
plan_status: "Reviewed"
script_status: "not-generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: ""
---

# Purpose

Verify that the Active and Deleted mode buttons are native `<button>` elements inside a `role="group"` with `aria-label="License mode"`, each using `aria-pressed="true"/"false"` toggle semantics, and that they receive a visible focus ring on keyboard Tab navigation.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to the Reports page.
- Standard Licenses card is selected.

# Test Data

Use Playwright locators:
- `page.getByRole('group', { name: 'License mode' })`
- `page.getByRole('button', { name: 'Active' })`
- `page.getByRole('button', { name: 'Deleted' })`

# Steps and Expected Results

1. Action: Navigate to the Reports page and select the Standard Licenses card.
   Expected Result: The Standard Licenses table loads; Active tab is selected by default.

2. Action: Assert the Active and Deleted buttons are contained within a `role="group"` element with `aria-label="License mode"`.
   Expected Result: Group element present with accessible name "License mode".

3. Action: Assert both Active and Deleted are native `<button>` elements.
   Expected Result: Tag name is `button` for both; no `aria-label` attribute on individual buttons (they rely on visible text content).

4. Action: Assert Active button has `aria-pressed="true"` and Deleted button has `aria-pressed="false"` on initial load.
   Expected Result: Toggle semantics are correctly expressed via `aria-pressed`.

5. Action: Press Tab to move focus to the Active button and assert a visible focus ring or outline appears.
   Expected Result: Focus indicator is visible on the Active button.

6. Action: Press Tab again to move focus to the Deleted button and assert a visible focus ring.
   Expected Result: Focus indicator is visible on the Deleted button.

# Network Verification

No API verification needed for structure audit.

# Expected Final Result

The mode control consists of native `<button>` elements with `aria-pressed` toggle semantics inside a `role="group"` labeled "License mode", and both buttons show visible focus indicators on keyboard navigation.

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

# Evidence Source

- Live UI observation via Playwright MCP