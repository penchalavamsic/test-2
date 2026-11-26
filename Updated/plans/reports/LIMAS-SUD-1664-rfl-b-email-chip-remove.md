---
test_id: "LIMAS-SUD-1664"
title: "To verify the functionality of \"Reports\" → \"Floating Licenses\" → \"Email Filter\" → \"Chip Display, Remove, and Clear All\""
module: "Reports"
page: "Reports"
section: "Floating Licenses"
control: "Email Filter"
action: "Chip Display, Remove, and Clear All"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Reports Floating Licenses RFL-B"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/reports/reports-floating-licenses-filters.spec.ts"
---

# Purpose

Verify the Email chip has text "Email: {runtimeEmail}", a remove button with accessible name "Remove Email: {runtimeEmail}", and Clear all removes the chip and clears the input.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable. Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses is selected, Active mode, Filters expanded, Email chip is present.

# Test Data

Use runtime email values. Do not hardcode.

# Steps and Expected Results

1. Action: After adding an email, verify the chip text format.
   Expected Result: Chip displays "Email: {runtimeEmail}".

2. Action: Click the remove button on the chip.
   Expected Result: Chip disappears, email input is cleared.

3. Action: Re-add an email, then click "Clear all".
   Expected Result: Chip is removed, email input cleared, Clear all button also disappears.

# Network Verification

No server request triggered by chip removal.

# Expected Final Result

Email chip can be individually removed or cleared via Clear all, with proper accessible names.

# Classification

- Read-only
- Positive

# Restrictions

- Do not hardcode email values.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending