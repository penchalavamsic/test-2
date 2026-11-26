---
test_id: "LIMAS-SUD-1638"
title: "To verify the functionality of \"Reports\" → \"Floating Licenses\" → \"Report Card\" → \"Mouse Activation and Selection\""
module: "Reports"
page: "Reports"
section: "Floating Licenses"
control: "Report Card"
action: "Mouse Activation and Selection"
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

Verify clicking the Floating Licenses card sets it to pressed state and deselects Standard Licenses and Floating Configurations.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and on the Reports page with Standard Licenses initially selected.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Verify Standard Licenses card has aria-pressed="true" and Floating Licenses has aria-pressed="false".
   Expected Result: Only Standard Licenses is pressed.

2. Action: Click the Floating Licenses card.
   Expected Result: Floating Licenses card aria-pressed becomes "true".

3. Action: Verify Standard Licenses and Floating Configurations.
   Expected Result: Standard Licenses aria-pressed is "false", Floating Configurations aria-pressed is "false".

4. Action: Verify the route.
   Expected Result: URL pathname remains /reports.

# Network Verification

No API verification needed for this plan (API is verified in LIMAS-SUD-1653).

# Expected Final Result

Clicking Floating Licenses selects it, deselects the other two cards, and the route stays /reports.

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