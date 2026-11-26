---
test_id: "LIMAS-SUD-1701"
title: "To verify the functionality of \"Reports\" → \"Floating Licenses\" → \"Mode Control\" → \"Accessibility — Group Name, Pressed Announcement, Keyboard, Focus\""
module: "Reports"
page: "Reports"
section: "Floating Licenses"
control: "Mode Control"
action: "Accessibility — Group Name, Pressed Announcement, Keyboard, Focus"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
classification: "Reports Floating Licenses RFL-C"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
execution_status: "Not Run"
ci_cd_execution: "Pending"
healing: "Pending"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/reports/reports-floating-licenses-active-deleted.spec.ts"
---

# Purpose

Verify mode control accessibility: group accessible name "Floating license mode", Active and Deleted pressed-state announcement, single-selection semantics communicated to assistive technology, keyboard activation via Enter and Space, visible focus indicators on both buttons, non-color selected-state differentiation, and logical keyboard focus order.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses is selected on the Reports page.

# Test Data

All values read dynamically from DOM attributes.

# Steps and Expected Results

1. Action: Inspect the mode group accessible name.
   Expected Result: The group has accessible name "Floating license mode" (via aria-label or aria-labelledby).

2. Action: Inspect the Active button's pressed-state announcement.
   Expected Result: Active button has aria-pressed="true" when selected, and the state is announced.

3. Action: Inspect the Deleted button's pressed-state announcement.
   Expected Result: Deleted button has aria-pressed reflecting its state ("true" or "false") and changes are announced.

4. Action: Verify single-selection semantics.
   Expected Result: Only one button has aria-pressed="true" at any time. The group conveys single-selection behavior.

5. Action: Activate each button via Enter key.
   Expected Result: Both buttons respond to Enter — pressed state toggles correctly.

6. Action: Activate each button via Space key.
   Expected Result: Both buttons respond to Space — pressed state toggles correctly.

7. Action: Verify visible focus indicators on both buttons.
   Expected Result: A visible focus ring or outline appears on each button when focused via Tab.

8. Action: Verify the logical keyboard focus order.
   Expected Result: Tab order is Active → Deleted (within the mode group, consistent with visual order).

9. Action: Verify selected state uses a non-color indicator (e.g., font-weight, underline, border).
   Expected Result: Pressed state is distinguishable without relying solely on color.

# Network Verification

No API verification needed — accessibility inspection only.

# Expected Final Result

Mode controls are fully keyboard-accessible, announce pressed state correctly, have visible focus indicators, logical tab order, and non-color selected-state differentiation.

# Classification

- Read-only
- Positive
- Accessibility

# Restrictions

- Do not hardcode aria-label values.
- Verify with Playwright accessibility snapshot or evaluate.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending