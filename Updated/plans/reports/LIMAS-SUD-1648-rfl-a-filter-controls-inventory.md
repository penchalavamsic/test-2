---
test_id: "LIMAS-SUD-1648"
title: "To verify the functionality of \"Reports\" → \"Floating Licenses\" → \"Filters Panel\" → \"Filter Controls Inventory\""
module: "Reports"
page: "Reports"
section: "Floating Licenses"
control: "Filters Panel"
action: "Filter Controls Inventory"
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

Discover the actual Floating License filter controls and inspect their labels, accessible names, roles, initial values, placeholders, and enabled/disabled states. Do not assume the filter inventory matches Standard Licenses.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses is selected on the Reports page.

# Test Data

All filter attributes are read dynamically. Do not hardcode filter names.

# Steps and Expected Results

1. Action: Expand the Filters panel.
   Expected Result: Filter controls are visible.

2. Action: Discover and enumerate all filter controls.
   Expected Result: The panel contains Email (type=email, placeholder "Enter email"), Hardware IDs (searchbox, placeholder "Search Hardware IDs"), Expiration Date (type=date), License Created Date (type=date), Product Profile (searchbox, placeholder "Search profiles"), and Profile Role (searchbox, placeholder "Select a profile first").

3. Action: For each control, inspect label text, accessible name, role, initial value (empty), placeholder, and disabled state.
   Expected Result: All controls are enabled except Profile Role which is disabled. All values are empty.

4. Action: Verify the count differs from Standard Licenses (no Maintenance Date, User Group, License Modified Date).
   Expected Result: Exactly 6 filter controls are present.

# Network Verification

No API request should trigger from inspection.

# Expected Final Result

Six Floating License filters are discovered with correct types, labels, and initial empty/default states.

# Classification

- Read-only
- Positive

# Restrictions

- Do not enter or select filter values.
- Do not assume the filter set matches Standard Licenses.
- Do not include credentials, tokens, cookies, or sensitive payloads.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending