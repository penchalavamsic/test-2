---
test_id: "LIMAS-SUD-985"
title: "To verify the functionality of \"User & License Hub\" → \"User List\" → \"Selection\" → \"Edit-Delete Buttons Isolated From Selection\""
module: "User & License Hub"
page: "User & License Hub"
section: "User List"
control: "Selection"
action: "Edit-Delete Buttons Isolated From Selection"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
classification: "Read-only"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/user-license-hub/user-license-hub-user-selection.spec.ts"
---

# Purpose

Verify that Edit and Delete buttons inside a user card have separate click targets and do not interfere with the card's selection behavior.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is navigated to User & License Hub with user cards loaded.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to User & License Hub, wait for load.
   Expected Result: User cards loaded. Each card contains Edit and Delete buttons.

2. Action: Verify Edit and Delete buttons are present inside cards but have separate event targets (buttons with type or role).
   Expected Result: Edit and Delete are `<button>` elements or have `role="button"` — distinct from the card div wrapper that triggers selection.

3. Action: Verify that the card container (the outer div) does not have `role="button"`.
   Expected Result: Card is a `div` with no ARIA role.

# Network Verification

No API requests.

# Expected Final Result

Edit and Delete buttons are identifiable as separate interactive elements inside each card, distinct from the card's selection click target.

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

- Live UI observation via Playwright MCP: Edit and Delete are role="button" inside card div; card div has no role.