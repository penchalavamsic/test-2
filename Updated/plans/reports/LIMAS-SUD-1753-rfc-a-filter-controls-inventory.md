---
test_id: "LIMAS-SUD-1753"
title: "To verify the functionality of \"Reports\" → \"Floating Configurations\" → \"Filters\" → \"Filter Controls Inventory\""
module: "Reports"
page: "Reports"
section: "Floating Configurations"
control: "Filters"
action: "Filter Controls Inventory"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Reports Floating Configurations RFC-A"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/reports/reports-floating-configurations-shell.spec.ts"
---

# Purpose

Verify all 8 filter controls exist with correct accessible names, types, placeholders, and enabled/disabled states: System Users (searchbox), Expiration Date (textbox+calendar), Maintenance Date (textbox+calendar), User Group (searchbox), Product Profile (searchbox), Profile Role (searchbox, disabled "Select a profile first"), Configuration Modified Date (textbox+calendar), Configuration Created Date (textbox+calendar).

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated on the Reports page with Floating Configurations selected.
- Filter panel is opened.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Verify System Users filter.
   Expected Result: Accessible name contains "System Users". Type is searchbox. Enabled.

2. Action: Verify Expiration Date filter.
   Expected Result: Accessible name contains "Expiration Date". Type is textbox with a calendar trigger. Enabled.

3. Action: Verify Maintenance Date filter.
   Expected Result: Accessible name contains "Maintenance Date". Type is textbox with a calendar trigger. Enabled.

4. Action: Verify User Group filter.
   Expected Result: Accessible name contains "User Group". Type is searchbox. Enabled.

5. Action: Verify Product Profile filter.
   Expected Result: Accessible name contains "Product Profile". Type is searchbox. Enabled.

6. Action: Verify Profile Role filter.
   Expected Result: Accessible name contains "Profile Role". Type is searchbox. Disabled with placeholder "Select a profile first".

7. Action: Verify Configuration Modified Date filter.
   Expected Result: Accessible name contains "Configuration Modified Date". Type is textbox with a calendar trigger. Enabled.

8. Action: Verify Configuration Created Date filter.
   Expected Result: Accessible name contains "Configuration Created Date". Type is textbox with a calendar trigger. Enabled.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

All 8 filter controls are present with the specified accessible names, types, placeholders, and enabled/disabled states.

# Classification

- Read-only
- Positive
- Accessibility

# Restrictions

- Do not hardcode control labels, types, or placeholders. Verify dynamically.
- Do not include credentials, tokens, cookies, or sensitive payloads.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending