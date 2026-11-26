---
test_id: "LIMAS-SUD-967"
title: "To verify the functionality of \"User & License Hub\" → \"License List\" → \"License Card\" → \"Date Format\""
module: "User & License Hub"
page: "User & License Hub"
section: "License List"
control: "License Card"
action: "Date Format"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
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

Verify that Maintenance and Expiration dates on license cards are formatted as yyyy-mm-dd.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is navigated to User & License Hub with license cards loaded.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to User & License Hub and wait for license card load.
   Expected Result: License cards are rendered.

2. Action: Extract the date values from the Maintenance and Expiration fields of the first license card.
   Expected Result: Both dates match the yyyy-mm-dd pattern (e.g., `\d{4}-\d{2}-\d{2}`).

# Network Verification

No API verification needed for this plan.

# Expected Final Result

Maintenance and Expiration dates display in ISO date format.

# Classification

- Read-only
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not repeat data-changing submissions.
- Do not hardcode specific dates.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Live UI observation via Playwright MCP