---
test_id: "LIMAS-SUD-946"
title: "To verify the functionality of \"User & License Hub\" → \"User List\" → \"Selection\" → \"First User Auto-Selected\""
module: "User & License Hub"
page: "User & License Hub"
section: "User List"
control: "Selection"
action: "First User Auto-Selected"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Read-only"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/user-license-hub/user-license-hub-user-list.spec.ts"
---

# Purpose

Verify that the first user is auto-selected on page load without explicit user interaction.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is navigated to User & License Hub.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to User & License Hub and wait for user and license loads.
   Expected Result: User cards and license cards are rendered.

2. Action: Verify that license cards are rendered for a user without any explicit user click.
   Expected Result: License cards are visible in the license panel, meaning a user was selected by default.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

License cards for the first user appear automatically without requiring a user click.

# Classification

- Read-only
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not repeat data-changing submissions.
- Do not hardcode user names, emails, groups, or license counts.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Live UI observation via Playwright MCP