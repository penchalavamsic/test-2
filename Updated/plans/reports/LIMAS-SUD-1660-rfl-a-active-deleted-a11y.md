---
test_id: "LIMAS-SUD-1660"
title: "To verify the functionality of \"Reports\" → \"Floating Licenses\" → \"Accessibility\" → \"Active and Deleted Semantics\""
module: "Reports"
page: "Reports"
section: "Floating Licenses"
control: "Accessibility"
action: "Active and Deleted Semantics"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
classification: "Reports Floating Licenses RFL-A"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/reports/reports-floating-licenses-shell.spec.ts"
---

# Purpose

Verify the Active/Deleted mode controls use role="group" with accessible name "Floating license mode", aria-pressed for state, and are keyboard-reachable.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses is selected on the Reports page.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Inspect the mode group.
   Expected Result: Group has role="group" and aria-label "Floating license mode".

2. Action: Verify Active aria-pressed="true" and Deleted aria-pressed="false".
   Expected Result: Correct pressed states.

3. Action: Verify both buttons are keyboard-reachable and show focus-visible.
   Expected Result: Tab navigates from Active to Deleted with focus-visible indicator.

4. Action: Verify the group name differs from Standard Licenses ("License mode" vs "Floating license mode").
   Expected Result: The group name is specific to Floating Licenses.

# Network Verification

No API verification needed.

# Expected Final Result

Active/Deleted controls are properly grouped, keyboard-accessible, and use the Floating Licenses-specific group name.

# Classification

- Read-only
- Positive
- Accessibility

# Restrictions

- Do not activate Deleted.
- Do not include credentials, tokens, cookies, or sensitive payloads.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending