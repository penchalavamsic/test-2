---
test_id: "LIMAS-SUD-1651"
title: "To verify the functionality of \"Reports\" → \"Floating Licenses\" → \"Export Excel\" → \"Button Structure\""
module: "Reports"
page: "Reports"
section: "Floating Licenses"
control: "Export Excel"
action: "Button Structure"
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

Inspect the Export Excel button without clicking it — verify visibility, accessible name, disabled state, SVG icon, keyboard relationship, and tooltip.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses is selected on the Reports page.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Inspect the Export Excel button in the toolbar.
   Expected Result: Button is visible with text "Export Excel", has an SVG icon, and is a native button element.

2. Action: Check the disabled state.
   Expected Result: Button is disabled when the record count is 0 (or enabled when records exist).

3. Action: Verify the disabled button is skipped in the keyboard tab order.
   Expected Result: When disabled, Tab skips the Export button.

4. Action: Verify the button has a tooltip or accessible name.
   Expected Result: Button has accessible name "Export Excel" via its text content.

# Network Verification

Do not trigger export. No download should occur.

# Expected Final Result

The Export Excel button structure is correct with proper disabled state management based on record availability.

# Classification

- Read-only
- Positive

# Restrictions

- Do not click the Export button.
- Do not trigger a download.
- Do not include credentials, tokens, cookies, or sensitive payloads.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending