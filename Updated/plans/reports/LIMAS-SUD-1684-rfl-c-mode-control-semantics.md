---
test_id: "LIMAS-SUD-1684"
title: "To verify the functionality of \"Reports\" → \"Floating Licenses\" → \"Mode Control\" → \"Group Role, Pressed States, Keyboard, and Single-Selection\""
module: "Reports"
page: "Reports"
section: "Floating Licenses"
control: "Mode Control"
action: "Group Role, Pressed States, Keyboard, and Single-Selection"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
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

Verify the mode control group semantics: role="group", accessible name "Floating license mode", Active button initial pressed/unpressed states, Deleted button initial pressed/unpressed states, keyboard reachability for both, single-selection behavior (only one pressed at a time), and non-color selected-state indicator.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses is selected on the Reports page.

# Test Data

All values are read dynamically from the DOM.

# Steps and Expected Results

1. Action: Inspect the mode control container role and accessible name.
   Expected Result: Container has role="group" and accessible name "Floating license mode".

2. Action: Inspect the Active button initial state.
   Expected Result: Active button is visible, enabled, and aria-pressed is "true".

3. Action: Inspect the Deleted button initial state.
   Expected Result: Deleted button is visible, enabled, and aria-pressed is "false".

4. Action: Focus the Active button via keyboard (Tab).
   Expected Result: Active button receives visible focus indicator.

5. Action: Focus the Deleted button via keyboard (Tab).
   Expected Result: Deleted button receives visible focus indicator.

6. Action: Activate Deleted via keyboard (Enter or Space) and inspect both pressed states.
   Expected Result: Deleted aria-pressed becomes "true", Active aria-pressed becomes "false". Only one button is pressed.

7. Action: Activate Active via keyboard (Enter or Space) and inspect both pressed states.
   Expected Result: Active aria-pressed becomes "true", Deleted aria-pressed becomes "false". Single-selection holds.

8. Action: Verify the selected state conveys "pressed" through a non-color mechanism (e.g., aria-pressed, font-weight, or shape change).
   Expected Result: Selected state is distinguishable without relying solely on color.

# Network Verification

No API verification specific to this plan — mode control semantics are DOM-inspectable.

# Expected Final Result

The mode control group has role="group" with accessible name "Floating license mode", both buttons are keyboard reachable, only one is pressed at a time, and selected state uses a non-color indicator.

# Classification

- Read-only
- Positive
- Accessibility

# Restrictions

- Do not hardcode element attributes or role values.
- Do not rely on color alone for selected-state verification.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending