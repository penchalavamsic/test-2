---
test_id: "LIMAS-SUD-960"
title: "To verify the functionality of \"User & License Hub\" → \"License Controls\" → \"License Filters\" → \"aria-expanded State\""
module: "User & License Hub"
page: "User & License Hub"
section: "License Controls"
control: "License Filters"
action: "aria-expanded State"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Accessibility"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/user-license-hub/user-license-hub-license-controls.spec.ts"
---

# Purpose

Verify that the license Filters button communicates its expanded state via aria-expanded.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is navigated to User & License Hub.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to User & License Hub.
   Expected Result: Page loads.

2. Action: Verify the license Filters button has aria-expanded attribute.
   Expected Result: The button has `aria-expanded="false"` in its default collapsed state.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

The license Filters button communicates collapse state via aria-expanded="false".

# Classification

- Accessibility
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