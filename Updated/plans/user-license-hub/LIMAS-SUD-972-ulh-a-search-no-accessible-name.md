---
test_id: "LIMAS-SUD-972"
title: "To verify the functionality of \"User & License Hub\" → \"Accessibility\" → \"Search Inputs\" → \"No Accessible Name\""
module: "User & License Hub"
page: "User & License Hub"
section: "Accessibility"
control: "Search Inputs"
action: "No Accessible Name"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
classification: "Accessibility"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/user-license-hub/user-license-hub-accessibility.spec.ts"
---

# Purpose

Verify that the user search and hardware ID search inputs lack accessible names (no aria-label, no aria-labelledby, no associated label).

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is navigated to User & License Hub.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to User & License Hub.
   Expected Result: Page loads.

2. Action: Verify that both the user search and hardware ID search inputs have no id, no aria-label, and no aria-labelledby attributes.
   Expected Result: All three attributes are null or absent on both inputs.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

Both search inputs rely solely on placeholder text for naming — no programmatic accessible name.

# Classification

- Accessibility
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not type into the search fields.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Live UI observation via Playwright MCP