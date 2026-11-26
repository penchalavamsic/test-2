---
test_id: "LIMAS-SUD-1637"
title: "To verify the functionality of \"Reports\" → \"Floating Licenses\" → \"Report Card\" → \"Keyboard Focus and Focus Indicator\""
module: "Reports"
page: "Reports"
section: "Floating Licenses"
control: "Report Card"
action: "Keyboard Focus and Focus Indicator"
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

Verify the Floating Licenses card is keyboard-reachable and shows a visible focus-visible indicator.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and on the Reports page.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Focus the Floating Licenses card via keyboard tab.
   Expected Result: The Floating Licenses card receives focus and matches :focus-visible.

2. Action: Inspect focus-visible styling (ring or outline).
   Expected Result: A visible focus ring or outline is present on the focused card.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

The Floating Licenses card is keyboard-reachable and displays a visible focus indicator via :focus-visible.

# Classification

- Read-only
- Positive
- Accessibility

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not repeat data-changing submissions.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending