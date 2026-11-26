---
test_id: "LIMAS-SUD-1642"
title: "To verify the functionality of \"Reports\" → \"Floating Licenses\" → \"Active Control\" → \"Already-Selected Activation\""
module: "Reports"
page: "Reports"
section: "Floating Licenses"
control: "Active Control"
action: "Already-Selected Activation"
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

Verify that clicking the already-selected Active control does not trigger a duplicate API request or change state.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses is selected, Active mode is already pressed.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Click the Active button while it is already pressed.
   Expected Result: No new network request to the floating licenses API is triggered.

2. Action: Verify aria-pressed remains "true".
   Expected Result: Active button aria-pressed remains "true".

# Network Verification

- Request URL: Should not emit a new GET to allfloatinglicenses.
- HTTP Method: N/A
- Expected Status: No new request.

# Expected Final Result

Clicking the already-selected Active control is idempotent — no duplicate request, state unchanged.

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