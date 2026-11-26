---
test_id: "LIMAS-SUD-966"
title: "To verify the functionality of \"User & License Hub\" → \"License List\" → \"License Card\" → \"Edit and Delete Buttons\""
module: "User & License Hub"
page: "User & License Hub"
section: "License List"
control: "License Card"
action: "Edit and Delete Buttons"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Read-only"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/user-license-hub/user-license-hub-license-list.spec.ts"
---

# Purpose

Verify that each license card has Edit and Delete buttons.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is navigated to User & License Hub with license cards loaded.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to User & License Hub and wait for license card load.
   Expected Result: License cards are rendered.

2. Action: Verify the first license card has Edit and Delete buttons.
   Expected Result: Both an Edit button and a Delete button are present on the card.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

Each license card provides Edit and Delete action buttons.

# Classification

- Read-only
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not click Edit or Delete buttons.
- Do not repeat data-changing submissions.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Live UI observation via Playwright MCP