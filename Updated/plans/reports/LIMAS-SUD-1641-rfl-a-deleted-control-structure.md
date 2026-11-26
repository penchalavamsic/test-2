---
test_id: "LIMAS-SUD-1641"
title: "To verify the functionality of \"Reports\" → \"Floating Licenses\" → \"Deleted Control\" → \"Structure Without Activation\""
module: "Reports"
page: "Reports"
section: "Floating Licenses"
control: "Deleted Control"
action: "Structure Without Activation"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
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

Inspect the Deleted control structure — visibility, enabled state, accessible name, unpressed state, keyboard reachability, and focus indicator — without activating it.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses is selected on the Reports page, Active mode.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Inspect the Deleted button without clicking it.
   Expected Result: Deleted button is visible, enabled, with text "Deleted" and aria-pressed="false".

2. Action: Tab to reach the Deleted button after the Active button.
   Expected Result: Deleted button is keyboard-reachable and shows a focus-visible indicator when focused.

# Network Verification

No API verification needed for this plan. Do not activate Deleted.

# Expected Final Result

The Deleted control is visible, enabled, unpressed, keyboard-reachable, and shows focus-visible without being activated.

# Classification

- Read-only
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not activate the Deleted control.
- Do not repeat data-changing submissions.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending