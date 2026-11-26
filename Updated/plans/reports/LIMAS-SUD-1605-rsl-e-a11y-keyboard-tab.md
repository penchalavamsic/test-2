---
test_id: "LIMAS-SUD-1605"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Deleted Mode\" → \"Accessibility\" → \"Keyboard Tab order through Active and Deleted buttons\""
module: "Reports"
page: "Reports"
section: "Deleted Mode"
control: "Accessibility — Tab order"
action: "Keyboard Tab key navigates focus from the Active button to the Deleted button in DOM order. Both buttons receive visible focus. Shift+Tab navigates in reverse. Focus order is logical and predictable."
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
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

Verify that keyboard Tab navigation moves focus between the Active and Deleted mode buttons in the correct DOM order, both forward and reverse, with visible focus indicators.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to the Reports page.
- Standard Licenses card is selected.

# Test Data

Use Playwright keyboard simulation. No specific data values needed.

# Steps and Expected Results

1. Action: Navigate to the Reports page and select the Standard Licenses card.
   Expected Result: Active button has `aria-pressed="true"`.

2. Action: Press Tab repeatedly until focus lands on the Active button. Use Playwright's `page.keyboard.press('Tab')` and assert the focused element is the Active button.
   Expected Result: Active button receives focus; focus ring visible.

3. Action: Press Tab once more and assert focus moves to the Deleted button.
   Expected Result: Deleted button receives focus.

4. Action: Press Shift+Tab and assert focus returns to the Active button.
   Expected Result: Reverse Tab navigation works; Active button focused again.

5. Action: Assert both buttons have a visible focus indicator (outline or ring) when focused.
   Expected Result: Focus indicator visible on each button when it receives focus.

6. Action: Assert that focus does not skip any elements between the two buttons (no hidden or off-screen focusable elements in between).
   Expected Result: Clean focus order; no unexpected focus traps.

# Network Verification

No API verification needed for keyboard navigation audit.

# Expected Final Result

Tab moves focus from Active to Deleted in order; Shift+Tab reverses; both buttons show visible focus indicators.

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