---
test_id: "LIMAS-SUD-1647"
title: "To verify the functionality of \"Reports\" → \"Floating Licenses\" → \"Filters Panel\" → \"Panel Visibility and Clear Button\""
module: "Reports"
page: "Reports"
section: "Floating Licenses"
control: "Filters Panel"
action: "Panel Visibility and Clear Button"
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

Verify the filter panel heading, internal scrolling, and Clear button visibility.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses is selected on the Reports page.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Expand the Filters panel.
   Expected Result: Panel shows "Filters" heading text.

2. Action: Inspect the Clear button inside the panel.
   Expected Result: A "Clear" button is visible and enabled.

3. Action: Verify the panel has internal scroll capability when many filter controls are present.
   Expected Result: The panel container or its parent supports overflow scrolling.

# Network Verification

No API request should trigger from expanding or inspecting the panel.

# Expected Final Result

The filter panel has a heading, a visible Clear button, and internal scrolling.

# Classification

- Read-only
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not enter filter values.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending