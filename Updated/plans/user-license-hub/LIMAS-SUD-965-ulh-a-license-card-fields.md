---
test_id: "LIMAS-SUD-965"
title: "To verify the functionality of \"User & License Hub\" → \"License List\" → \"License Card\" → \"Card Fields\""
module: "User & License Hub"
page: "User & License Hub"
section: "License List"
control: "License Card"
action: "Card Fields"
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

Verify that each license card renders Profile, Role, Maintenance, Expiration, Hardware ID, and Assigned to fields.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is navigated to User & License Hub with license cards loaded.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to User & License Hub and wait for license card load.
   Expected Result: License cards are rendered.

2. Action: Verify the first license card contains label/value pairs for Profile, Role, Maintenance, Expiration, Hardware ID, and Assigned to.
   Expected Result: Each card has text for "Profile", "Role", "Maintenance", "Expiration", "Hardware ID", and "Assigned to" labels.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

License cards display all expected fields with labels and runtime values.

# Classification

- Read-only
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not repeat data-changing submissions.
- Do not hardcode profile names, roles, dates, hardware IDs, or user names.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Live UI observation via Playwright MCP