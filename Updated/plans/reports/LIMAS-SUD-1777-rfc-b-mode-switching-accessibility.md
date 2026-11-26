---
test_id: "LIMAS-SUD-1777"
title: "To verify the functionality of \"Reports\" → \"Floating Configurations\" → \"Configuration Mode\" → \"Mode Switching Accessibility\""
module: "Reports"
page: "Reports"
section: "Floating Configurations"
control: "Configuration Mode"
action: "Mode Switching Accessibility"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Reports Floating Configurations RFC-B"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/reports/reports-floating-configurations-error-deleted.spec.ts"
---

# Purpose

Verify the mode group has accessible name "Configuration mode", aria-pressed reflects the current mode, both Active and Deleted buttons are keyboard-accessible, have accessible names, focus is managed adequately during mode switches, and the mode change is communicated to assistive technology.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated on the Reports page with Floating Configurations selected.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Inspect the mode group for accessible name and role.
   Expected Result: The wrapping element has accessible name "Configuration mode" and role="group".

2. Action: Verify aria-pressed reflects the current mode.
   Expected Result: The selected mode button has aria-pressed="true". The unselected mode button has aria-pressed="false".

3. Action: Verify both mode buttons are keyboard-accessible.
   Expected Result: Active and Deleted controls are reachable via Tab navigation and have visible focus indicators.

4. Action: Verify Active and Deleted buttons have accessible names.
   Expected Result: Active button has accessible name containing "Active". Deleted button has accessible name containing "Deleted".

5. Action: Switch modes via keyboard (Enter or Space) and observe focus.
   Expected Result: Focus management during the switch is adequate. Focus does not get lost or trapped.

6. Action: Verify the mode change is communicated to assistive technology.
   Expected Result: The aria-pressed state change is announced or programmatically detectable by assistive technology after a mode switch.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

The "Configuration mode" group is accessible, aria-pressed reflects mode state, buttons are keyboard-operable with accessible names, focus is managed during switches, and mode changes are communicated.

# Classification

- Read-only
- Positive
- Accessibility

# Restrictions

- Do not hardcode accessible names or aria values.
- Do not include credentials, tokens, cookies, or sensitive payloads.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending