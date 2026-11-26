---
test_id: "LIMAS-SUD-1501"
title: "To verify the functionality of \"Reports\" → \"Standard License Table\" → \"Loaded-Total Text\" → \"Display {runtimeLoaded} loaded · {runtimeTotal} total\""
module: "Reports"
page: "Reports"
section: "Standard License Table"
control: "Loaded-Total Text"
action: "Display {runtimeLoaded} loaded · {runtimeTotal} total"
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

Verify that the loaded-total text displays runtime values in the format `{runtimeLoaded} loaded · {runtimeTotal} total`, where loaded does not exceed total.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to the Reports page.
- The standard-licenses API has returned data.

# Test Data

Use `ReportsPage.loadedTotalText` locator (regex `/^\d+\s*loaded\s*·\s*\d+\s*total$/`) and `getStandardLicenseLoadedState()` which returns `{ loaded, total }`.

# Steps and Expected Results

1. Action: Navigate to the Reports page and wait for the loaded-total text.
   Expected Result: The loaded-total text is visible.

2. Action: Call `getStandardLicenseLoadedState()` to extract `loaded` and `total`.
   Expected Result: `loaded` >= 0, `total` >= 0, and `loaded` <= `total`.

# Network Verification

No API verification needed for this plan; values derive from the API response verified in LIMAS-SUD-1505.

# Expected Final Result

The loaded-total text displays `{runtimeLoaded} loaded · {runtimeTotal} total` with consistent, non-negative runtime values.

# Classification

- Read-only
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode record counts.
- Do not repeat data-changing submissions.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Live UI observation via Playwright MCP