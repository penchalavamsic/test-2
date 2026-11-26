---
test_id: "LIMAS-SUD-1741"
title: "To verify the functionality of \"Reports\" → \"Floating Configurations\" → \"Report Card\" → \"Visibility and Structure\""
module: "Reports"
page: "Reports"
section: "Floating Configurations"
control: "Report Card"
action: "Visibility and Structure"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Reports Floating Configurations RFC-A"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/reports/reports-floating-configurations-shell.spec.ts"
---

# Purpose

Verify the Floating Configurations report card is visible, has the correct accessible name, shows aria-pressed="true" when selected, and is keyboard-reachable. The Standard Licenses and Floating Licenses cards remain unpressed.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and on the Reports page.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to /reports and verify the heading "Reports".
   Expected Result: Page shows the Reports heading and three report-type cards.

2. Action: Inspect the Floating Configurations card.
   Expected Result: Card is visible, has accessible name matching "Floating Configurations", is a native button, and is enabled.

3. Action: Click the Floating Configurations card.
   Expected Result: aria-pressed updates to "true". Standard Licenses and Floating Licenses cards have aria-pressed="false".

4. Action: Verify the Floating Configurations card is reachable via Tab navigation.
   Expected Result: Card receives keyboard focus with a visible focus indicator.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

The Floating Configurations card is visible, accessible, keyboard-reachable, and shows aria-pressed="true" when selected, while sibling cards remain unpressed.

# Classification

- Read-only
- Positive
- Accessibility

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not use static environment-specific data.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending