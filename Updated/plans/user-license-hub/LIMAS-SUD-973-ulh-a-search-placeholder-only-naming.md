---
test_id: "LIMAS-SUD-973"
title: "To verify the functionality of \"User & License Hub\" → \"Accessibility\" → \"Search Inputs\" → \"Placeholder-Only Naming\""
module: "User & License Hub"
page: "User & License Hub"
section: "Accessibility"
control: "Search Inputs"
action: "Placeholder-Only Naming"
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

Verify that both search inputs are named only by their placeholder attributes and have no associated label elements.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is navigated to User & License Hub.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to User & License Hub.
   Expected Result: Page loads.

2. Action: Verify that both search inputs have zero associated labels and no programmatic label elements.
   Expected Result: `labels.length === 0` for both inputs, but both have non-empty placeholder attributes.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

Both search fields are named only by placeholder — no label, no aria-label, no aria-labelledby.

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