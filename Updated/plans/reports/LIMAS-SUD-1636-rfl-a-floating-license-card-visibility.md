---
test_id: "LIMAS-SUD-1636"
title: "To verify the functionality of \"Reports\" → \"Floating Licenses\" → \"Report Card\" → \"Visibility and Structure\""
module: "Reports"
page: "Reports"
section: "Floating Licenses"
control: "Report Card"
action: "Visibility and Structure"
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

Verify the Floating Licenses report card is visible, has the correct accessible name, is enabled, and uses aria-pressed for selected state.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and on the Reports page.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to /reports and verify the heading "Reports".
   Expected Result: Page shows the Reports heading and three report-type cards.

2. Action: Inspect the Floating Licenses card.
   Expected Result: Card is visible, has accessible name matching "Floating Licenses", is a native button, and is enabled.

3. Action: Read the aria-pressed attribute before activation.
   Expected Result: aria-pressed is "false".

# Network Verification

No API verification needed for this plan.

# Expected Final Result

The Floating Licenses card is visible, accessible, enabled, and initially unpressed (aria-pressed="false").

# Classification

- Read-only
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not repeat data-changing submissions.
- Do not use static environment-specific data.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending