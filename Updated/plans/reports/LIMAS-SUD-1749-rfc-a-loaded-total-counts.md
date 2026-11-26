---
test_id: "LIMAS-SUD-1749"
title: "To verify the functionality of \"Reports\" → \"Floating Configurations\" → \"Toolbar\" → \"Loaded/Total Counts\""
module: "Reports"
page: "Reports"
section: "Floating Configurations"
control: "Toolbar"
action: "Loaded/Total Counts"
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

Verify the loaded/total counts text appears when data loads, follows the format "{loaded} loaded · {total} total", and behaves appropriately when an error occurs.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated on the Reports page with Floating Configurations selected.

# Test Data

Use environment variables and the authenticated fixture. Loaded and total counts are read dynamically.

# Steps and Expected Results

1. Action: On a successful data load, inspect the loaded/total text.
   Expected Result: Text matches "{loaded} loaded · {total} total" where loaded >= 0 and total >= 0.

2. Action: When an API error (500) occurs, inspect whether the loaded/total text is present.
   Expected Result: Observe and record actual behavior. Counts may not appear during error state.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

On successful load, the toolbar shows "{loaded} loaded · {total} total". During error, counts may be absent — verify actual behavior.

# Classification

- Read-only
- Positive

# Restrictions

- Do not hardcode loaded or total counts. Use runtime placeholders.
- Do not include credentials, tokens, cookies, or sensitive payloads.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending