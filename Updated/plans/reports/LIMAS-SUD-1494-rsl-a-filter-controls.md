---
test_id: "LIMAS-SUD-1494"
title: "To verify the functionality of \"Reports\" → \"Filters Panel\" → \"Controls\" → \"Contains all nine filter controls\""
module: "Reports"
page: "Reports"
section: "Filters Panel"
control: "Controls"
action: "Contains all nine filter controls"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Reports Standard Licenses RSL-A"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/reports/reports-standard-licenses-shell.spec.ts"
---

# Purpose

Verify that when the filter panel is expanded, all nine filter controls are visible: Email, Hardware IDs, Expiration Date, Maintenance Date, User Group, Product Profile, Profile Role, License Created Date, and License Modified Date.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to the Reports page.
- Filters panel is expanded.

# Test Data

Use `ReportsPage.getStandardLicenseFilterControls()` which returns visibility/disabled/placeholder/value for each of the nine controls.

# Steps and Expected Results

1. Action: Navigate to the Reports page and expand the filters panel.
   Expected Result: The Email searchbox is visible.

2. Action: Call `getStandardLicenseFilterControls()` and iterate over the expected control names: `email`, `hardwareIds`, `expirationDate`, `maintenanceDate`, `userGroup`, `productProfile`, `profileRole`, `licenseCreatedDate`, `licenseModifiedDate`.
   Expected Result: Each control is defined and visible.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

All nine filter controls are present and visible in the expanded filter panel.

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

# Evidence Source

- Live UI observation via Playwright MCP