---
test_id: "LIMAS-SUD-1640"
title: "To verify the functionality of \"Reports\" → \"Floating Licenses\" → \"Active Control\" → \"Structure and Pressed State\""
module: "Reports"
page: "Reports"
section: "Floating Licenses"
control: "Active Control"
action: "Structure and Pressed State"
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

Verify the Active control is visible, enabled, has aria-pressed="true" initially, and belongs to a "Floating license mode" group.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses is selected on the Reports page.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: After selecting Floating Licenses, inspect the Active button.
   Expected Result: Active button is visible, enabled, and has aria-pressed="true".

2. Action: Inspect the parent group.
   Expected Result: The Active and Deleted buttons are children of role="group" with accessible name "Floating license mode".

# Network Verification

No API verification needed for this plan.

# Expected Final Result

The Active control is pressed initially, enabled, keyboard-reachable, and grouped under "Floating license mode".

# Classification

- Read-only
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not repeat data-changing submissions.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending