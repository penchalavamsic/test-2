---
test_id: "LIMAS-SUD-1667"
title: "To verify the functionality of \"Reports\" → \"Floating Licenses\" → \"Product Profile\" → \"Combobox Structure and Options\""
module: "Reports"
page: "Reports"
section: "Floating Licenses"
control: "Product Profile"
action: "Combobox Structure and Options"
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

Verify Product Profile is a searchable combobox with checkbox options loaded from the profiles API, with accessible name "Search profiles".

# Preconditions

- `${LIMAS_BASE_URL}` is reachable. Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses is selected, Active mode, Filters expanded.

# Test Data

Profile names are read dynamically. Do not hardcode.

# Steps and Expected Results

1. Action: Click the Product Profile searchbox.
   Expected Result: A dropdown list appears with available profile options.

2. Action: Verify options have checkbox semantics.
   Expected Result: Each option is a button with a nested checkbox.

3. Action: Type a search string and verify the options filter.
   Expected Result: Only matching profiles appear.

# Network Verification

Profile options are loaded from /api/account-scope/profiles?view=summary (pre-fetched at page load).

# Expected Final Result

Product Profile is a searchable checkbox combobox with dynamically loaded options.

# Classification

- Read-only
- Positive

# Restrictions

- Do not hardcode profile names. Do not select a profile yet.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending