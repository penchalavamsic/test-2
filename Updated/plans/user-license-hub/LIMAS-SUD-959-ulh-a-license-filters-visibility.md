---
test_id: "LIMAS-SUD-959"
title: "To verify the functionality of \"User & License Hub\" → \"License Controls\" → \"License Filters\" → \"Filters Button Visibility\""
module: "User & License Hub"
page: "User & License Hub"
section: "License Controls"
control: "License Filters"
action: "Filters Button Visibility"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Read-only"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/user-license-hub/user-license-hub-license-controls.spec.ts"
---

# Purpose

Verify that the license Filters button is visible in the Licenses panel.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is navigated to User & License Hub.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to User & License Hub.
   Expected Result: Page loads.

2. Action: Verify the license Filters button is visible.
   Expected Result: A Filters button is visible in the licenses panel.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

The Filters button is rendered in the licenses panel.

# Classification

- Read-only
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not click or open the Filters dialog.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Live UI observation via Playwright MCP