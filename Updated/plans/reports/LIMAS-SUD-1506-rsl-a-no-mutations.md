---
test_id: "LIMAS-SUD-1506"
title: "To verify the functionality of \"Reports\" → \"Initial Network\" → \"No Mutations\" → \"No POST/PUT/PATCH/DELETE during initial load\""
module: "Reports"
page: "Reports"
section: "Initial Network"
control: "No Mutations"
action: "No POST/PUT/PATCH/DELETE during initial load"
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

Verify that no data-changing HTTP requests (POST, PUT, PATCH, DELETE) are sent to the standard-licenses API endpoint during the initial page load.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated on the System User Dashboard.

# Test Data

Monitor all requests to `standardLicensesApiPath` for methods POST, PUT, PATCH, or DELETE using `page.on('request', ...)`.

# Steps and Expected Results

1. Action: Set up request listeners to capture any mutation-verb requests to `standardLicensesApiPath`, then navigate to Reports.
   Expected Result: The page loads successfully.

2. Action: Wait for the loaded-total text to appear.
   Expected Result: Data is displayed.

3. Action: Assert that the captured mutations array has length 0.
   Expected Result: No POST, PUT, PATCH, or DELETE requests were made.

# Network Verification

- Monitored methods: POST, PUT, PATCH, DELETE
- Target path: `/api/report/allstandardlicenses`
- Expected: Zero captured mutations

# Expected Final Result

The initial page load is read-only; no data-changing HTTP requests are sent.

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