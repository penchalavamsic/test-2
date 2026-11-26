---
test_id: "LIMAS-SUD-1682"
title: "To verify the functionality of \"Reports\" → \"Floating Licenses\" → \"Accessibility\" → \"Chip Communication and Keyboard\""
module: "Reports"
page: "Reports"
section: "Floating Licenses"
control: "Accessibility"
action: "Chip Communication and Keyboard"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
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

Verify chip accessible names (Email, Profiles, Roles, Exp), Clear all accessible name, remove button names, and non-color visual indication.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable. Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses is selected, Active mode, Filters expanded, filters applied.

# Test Data

Use runtime values.

# Steps and Expected Results

1. Action: Verify Email chip has text "Email: {runtimeEmail}" and remove button accessible name.
   Expected Result: Remove button named "Remove Email: {runtimeEmail}".

2. Action: Verify Profiles chip has text "Profiles: {count}" and remove button.
   Expected Result: Accessible name includes profile count.

3. Action: Verify Roles chip has text "Roles: {count}".
   Expected Result: Accessible name includes role count.

4. Action: Verify Exp chip has text "Exp: {date}".
   Expected Result: Date in chip text.

5. Action: Verify Clear all button accessible name "Clear all".
   Expected Result: Button named "Clear all".

6. Action: Verify chips use non-color indication (border, background).
   Expected Result: Chips are visually distinguishable by more than color.

# Network Verification

No API needed.

# Expected Final Result

All chips have descriptive accessible names and remove buttons; Clear all is properly named.

# Classification

- Read-only
- Accessibility

# Restrictions

- Do not hardcode filter values.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending