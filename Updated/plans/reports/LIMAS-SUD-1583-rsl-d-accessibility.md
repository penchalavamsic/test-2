---
test_id: "LIMAS-SUD-1583"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Accessibility\" → \"Date labels via parent text, no aria-label (gap), no aria-describedby (gap), no aria-required, native picker a11y, focus visible, keyboard navigation, Clear accessible\""
module: "Reports"
page: "Reports"
section: "Accessibility"
control: "Date Labels and ARIA"
action: "Date labels via parent text elements, no aria-label (gap), no aria-describedby for format guidance (gap), no aria-required, native picker accessibility, focus indicator visible, keyboard movement between date controls, Clear button accessible"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
classification: "Reports Standard Licenses RSL-D"
test_type: "Accessibility"
automation_candidate: true
plan_status: "Reviewed"
script_status: "not-generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: ""
---

# Purpose

Audit the accessibility of date controls and related elements: verify that date labels are provided via parent text elements, document the absence of `aria-label` and `aria-describedby` as accessibility gaps, confirm no `aria-required` is present, verify the native date picker provides its own accessibility, confirm visible focus indicators, test keyboard navigation between date controls, and confirm the Clear button is keyboard-accessible.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to the Reports page.
- Standard Licenses card is selected, the filter panel is expanded.

# Test Data

Use Playwright accessibility snapshot and keyboard simulation. No specific data values required.

# Steps and Expected Results

1. Action: For each date control, assert that an accessible text label comes from a parent or sibling text element (e.g., `<label>` wrapping or `for`/`id` association).
   Expected Result: Each date input has an associated text label.

2. Action: Assert that no `aria-label` attribute is present on any date input.
   Expected Result: No `aria-label` (relies on parent text label — document as a gap if needed for screen-reader precision).

3. Action: Assert that no `aria-describedby` attribute points to a format-guidance element (e.g., "Use format YYYY-MM-DD").
   Expected Result: No `aria-describedby` for format guidance (document as a gap).

4. Action: Assert that no `aria-required` attribute is present on any date input.
   Expected Result: Date filters are optional; `aria-required` is absent.

5. Action: Open the native date picker and assert the browser's native picker provides its own accessibility tree (calendar grid, navigation buttons).
   Expected Result: Native picker has accessible structure.

6. Action: Assert a visible focus indicator (focus ring or outline) appears when each date control receives focus.
   Expected Result: Focus indicator is visible on each date control.

7. Action: Navigate between all four date controls using the Tab key (and Shift+Tab for reverse) and assert focus moves in DOM order through all date controls.
   Expected Result: Keyboard navigation between date controls works correctly.

8. Action: Apply a date via the picker, then Tab to the Clear button and press Enter or Space to activate it.
   Expected Result: Clear button is keyboard-accessible and activates on Enter/Space.

# Network Verification

No specific API contract verification needed; focus on accessibility audit findings.

# Expected Final Result

Accessibility audit of date controls: labels provided via parent text, `aria-label` gap noted, `aria-describedby` gap noted, no `aria-required`, native picker a11y present, focus indicators visible, keyboard navigation functional, and Clear button keyboard-accessible.

# Classification

- Read-only
- Accessibility

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode dates.
- Do not repeat data-changing submissions.

# Generation Status

- Test script generation: Pending
- CI/CD execution: Pending
- Healing: Pending