---
test_id: "LIMAS-SUD-996"
title: "To verify the functionality of \"User & License Hub\" → \"License List\" → \"Synchronization\" → \"No Stale Licenses On Selection Change\""
module: "User & License Hub"
page: "User & License Hub"
section: "License List"
control: "Synchronization"
action: "No Stale Licenses On Selection Change"
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

Verify that after switching users, no license cards from the previously selected user remain visible (no stale data).

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is navigated to User & License Hub with user and license cards loaded.

# Test Data

Use environment variables and the authenticated fixture. Runtime names from DOM.

# Steps and Expected Results

1. Action: Navigate to User & License Hub, wait for load.
   Expected Result: First user auto-selected. Record the selected user's name and license "Assigned to" values.

2. Action: Click a different user card.
   Expected Result: All visible license cards' "Assigned to" fields contain only the new user's name. No license card references the previous user.

3. Action: Switch back to the first user.
   Expected Result: License cards update. No stale data from the intermediate user.

# Network Verification

No additional API requests.

# Expected Final Result

License panel always reflects exactly the currently selected user — no stale licenses from previous selections.

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

- Live UI observation via Playwright MCP: no stale licenses from previous user; license panel updates completely on selection change.