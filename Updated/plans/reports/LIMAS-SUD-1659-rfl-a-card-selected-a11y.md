---
test_id: "LIMAS-SUD-1659"
title: "To verify the functionality of \"Reports\" → \"Floating Licenses\" → \"Accessibility\" → \"Report Card Selected State\""
module: "Reports"
page: "Reports"
section: "Floating Licenses"
control: "Accessibility"
action: "Report Card Selected State"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
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

Verify the report card selected state is communicated through aria-pressed and a non-color visual indicator.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- On the Reports page, with Floating Licenses selected.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Verify Floating Licenses card has aria-pressed="true".
   Expected Result: aria-pressed is accurately set to "true".

2. Action: Verify the selected card has a visual indicator beyond just color (e.g., border, background change, icon).
   Expected Result: The selected card is visually distinguishable by more than color alone.

3. Action: Verify unselected cards have aria-pressed="false".
   Expected Result: Standard Licenses and Floating Configurations cards have aria-pressed="false".

# Network Verification

No API verification needed.

# Expected Final Result

Report card selection state is programmatically exposed via aria-pressed and has a non-color visual indicator.

# Classification

- Read-only
- Positive
- Accessibility

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending