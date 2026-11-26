---
test_id: "LIMAS-SUD-997"
title: "To verify the functionality of \"User & License Hub\" → \"License List\" → \"Synchronization\" → \"No Duplicate License Cards After Multiple Switches\""
module: "User & License Hub"
page: "User & License Hub"
section: "License List"
control: "Synchronization"
action: "No Duplicate License Cards After Multiple Switches"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
classification: "Read-only"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/user-license-hub/user-license-hub-license-synchronization.spec.ts"
---

# Purpose

Verify that after switching between multiple users repeatedly, license cards are never duplicated.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is navigated to User & License Hub with user and license cards loaded.

# Test Data

Use environment variables and the authenticated fixture. Runtime license counts from DOM.

# Steps and Expected Results

1. Action: Navigate to User & License Hub, wait for load.
   Expected Result: First user auto-selected.

2. Action: Switch among 3 different users in sequence (e.g., User A → User B → User C → User A → User B).
   Expected Result: After every switch, the license card count matches the selected user's badge count exactly. No accumulation of cards from previous selections.

3. Action: After returning to original user, verify license count equals original count.
   Expected Result: Count is unchanged from the initial observation for that user.

# Network Verification

No additional API requests.

# Expected Final Result

License cards are never duplicated — repeated switching between users produces clean, exact license sets each time.

# Classification

- Read-only
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode user names, emails, groups, or license counts.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Live UI observation via Playwright MCP: no duplicate cards; license counts consistent across repeated selections.