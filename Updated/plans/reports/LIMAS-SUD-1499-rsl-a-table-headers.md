---
test_id: "LIMAS-SUD-1499"
title: "To verify the functionality of \"Reports\" → \"Standard License Table\" → \"Column Headers\" → \"Six headers: User Group, Profile, Role, Email, Hardware ID, License Dates\""
module: "Reports"
page: "Reports"
section: "Standard License Table"
control: "Column Headers"
action: "Six headers: User Group, Profile, Role, Email, Hardware ID, License Dates"
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

Verify that the standard-license table has exactly six column headers with the correct text: "User Group", "Profile", "Role", "Email", "Hardware ID", "License Dates".

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to the Reports page.
- The standard-licenses API has returned data.

# Test Data

Use `ReportsPage.getStandardLicenseHeaders()` which extracts text from `<thead th, th>` elements.

# Steps and Expected Results

1. Action: Navigate to the Reports page and wait for the table to render.
   Expected Result: The table is visible.

2. Action: Call `getStandardLicenseHeaders()` to extract header texts.
   Expected Result: The returned array equals `['User Group', 'Profile', 'Role', 'Email', 'Hardware ID', 'License Dates']`.

# Network Verification

No API verification needed for this plan; the table is populated from the initial API response verified by LIMAS-SUD-1504.

# Expected Final Result

The standard-license table renders six column headers with the exact labels listed above.

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