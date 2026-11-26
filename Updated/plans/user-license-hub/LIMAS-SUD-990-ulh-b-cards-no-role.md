---
test_id: "LIMAS-SUD-990"
title: "To verify the functionality of \"User & License Hub\" → \"User List\" → \"Selection\" → \"Cards Have No role Attribute\""
module: "User & License Hub"
page: "User & License Hub"
section: "User List"
control: "Selection"
action: "Cards Have No role Attribute"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Read-only"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/user-license-hub/user-license-hub-selection-semantics.spec.ts"
---

# Purpose

Verify that user cards are plain `div` elements with no ARIA `role` attribute — they are not exposed as buttons, options, or list items to assistive technology.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is navigated to User & License Hub with user cards loaded.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to User & License Hub, wait for load.
   Expected Result: User cards loaded.

2. Action: Check all visible user cards for `role` attribute.
   Expected Result: 0 cards have a `role` attribute.

3. Action: Verify the card element's tag name.
   Expected Result: Cards are `<div>` elements.

# Network Verification

No API requests.

# Expected Final Result

User cards are semantic-less `<div>` elements with no ARIA role, not recognized as interactive widgets by assistive technology.

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

- Live UI observation via Playwright MCP: card div has no role attribute, not button or option.