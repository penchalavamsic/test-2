---
test_id: "LIMAS-SUD-1011"
title: "To verify the functionality of \"User & License Hub\" → \"User List\" → \"Accessibility\" → \"Cards Are Not Buttons Or Options\""
module: "User & License Hub"
page: "User & License Hub"
section: "User List"
control: "Accessibility"
action: "Cards Are Not Buttons Or Options"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
classification: "Read-only"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/user-license-hub/user-license-hub-selection-accessibility.spec.ts"
---

# Purpose

Verify that user card container elements are not exposed as buttons, options, or any other interactive widget role to assistive technology.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is navigated to User & License Hub with user cards loaded.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to User & License Hub, wait for load.
   Expected Result: User cards loaded.

2. Action: For each visible card container, verify tag name and role.
   Expected Result: Element tag is `DIV`. Computed role is empty or `generic` — not `button`, `option`, `listitem`, or any other interactive role.

3. Action: Verify that the card has `cursor: pointer` CSS but no interactive semantics.
   Expected Result: `cursor: pointer` is present, but `role` is absent.

# Network Verification

No API requests.

# Expected Final Result

User cards look clickable (cursor: pointer) but are not semantically interactive — they are generic divs with no ARIA role.

# Classification

- Read-only
- Positive
- Accessibility

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode user names, emails, groups, or card indexes.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Live UI observation via Playwright MCP: card div has no role; cursor=pointer but no button/option semantics.