---
test_id: "LIMAS-SUD-1681"
title: "To verify the functionality of \"Reports\" → \"Floating Licenses\" → \"Accessibility\" → \"Filter Labels, Combobox, and Disabled\""
module: "Reports"
page: "Reports"
section: "Floating Licenses"
control: "Accessibility"
action: "Filter Labels, Combobox, and Disabled"
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

Verify filter controls have proper labels, accessible names, appropriate input types, Profile Role disabled announcement, and keyboard focus.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable. Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses is selected, Active mode, Filters expanded.

# Test Data

Use environment variables.

# Steps and Expected Results

1. Action: Verify Email input accessible name "Email".
   Expected Result: Input has accessible name "Email", type=email.

2. Action: Verify HW IDs accessible name "Search Hardware IDs".
   Expected Result: Input has accessible name "Search Hardware IDs", type=search.

3. Action: Verify Expiration Date accessible name.
   Expected Result: Accessible name "Expiration Date", type=date.

4. Action: Verify License Created Date accessible name.
   Expected Result: Accessible name "License Created Date", type=date.

5. Action: Verify Product Profile accessible name "Search profiles".
   Expected Result: Combobox with accessible name.

6. Action: Verify Profile Role disabled state.
   Expected Result: Programmatically disabled with placeholder "Select a profile first".

7. Action: Verify keyboard focus on all controls.
   Expected Result: All controls are Tab-reachable with focus-visible indicators.

# Network Verification

No API needed.

# Expected Final Result

All filter controls have appropriate accessible names, types, and keyboard accessibility; disabled state properly announced.

# Classification

- Read-only
- Accessibility

# Restrictions

- Do not enter values.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending