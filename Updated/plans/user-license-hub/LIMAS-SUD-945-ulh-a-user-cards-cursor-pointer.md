---
test_id: "LIMAS-SUD-945"
title: "To verify the functionality of \"User & License Hub\" → \"User List\" → \"User Card\" → \"Cursor Pointer\""
module: "User & License Hub"
page: "User & License Hub"
section: "User List"
control: "User Card"
action: "Cursor Pointer"
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

Verify that user cards have cursor: pointer, indicating they are selectable.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is navigated to User & License Hub with user cards loaded.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to User & License Hub and wait for user load.
   Expected Result: User cards are rendered.

2. Action: Verify the first user card has cursor: pointer in its computed styles.
   Expected Result: The card element's cursor CSS property is "pointer".

# Network Verification

No API verification needed for this plan.

# Expected Final Result

User cards display cursor: pointer to communicate selectability.

# Classification

- Read-only
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not repeat data-changing submissions.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Live UI observation via Playwright MCP