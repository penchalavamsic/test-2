---
test_id: "LIMAS-SUD-1482"
title: "To verify the functionality of \"Reports\" → \"Navigation\" → \"Sidebar Link\" → \"Navigate to Reports\""
module: "Reports"
page: "Reports"
section: "Navigation"
control: "Sidebar Link"
action: "Navigate to Reports"
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

Verify that clicking the Reports sidebar link navigates to the `/reports` route.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated on the System User Dashboard.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Authenticate and ensure the dashboard is fully rendered.
   Expected Result: System User Dashboard is visible.

2. Action: Click the sidebar link for Reports.
   Expected Result: The URL pathname matches `/reports`.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

Navigation to the Reports page succeeds via the sidebar link and the URL resolves to the `/reports` route.

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