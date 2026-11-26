---
test_id: "LIMAS-SUD-1639"
title: "To verify the functionality of \"Reports\" → \"Floating Licenses\" → \"Report Card\" → \"Exactly One Card Selected\""
module: "Reports"
page: "Reports"
section: "Floating Licenses"
control: "Report Card"
action: "Exactly One Card Selected"
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

Verify exactly one report-type card has aria-pressed="true" at any time after selecting Floating Licenses.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and on the Reports page.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Select Floating Licenses and read aria-pressed on all three cards.
   Expected Result: Floating Licenses card is "true", Standard Licenses and Floating Configurations are "false".

2. Action: Count cards with aria-pressed="true".
   Expected Result: Exactly 1 card is pressed.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

Only one report card is selected at a time, enforced by aria-pressed mutual exclusion.

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