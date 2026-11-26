---
test_id: "LIMAS-SUD-1000"
title: "To verify the functionality of \"User & License Hub\" → \"User List\" → \"Scrolling\" → \"Selection Persists Across User-List Scrolling\""
module: "User & License Hub"
page: "User & License Hub"
section: "User List"
control: "Scrolling"
action: "Selection Persists Across User-List Scrolling"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Read-only"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/user-license-hub/user-license-hub-panel-scrolling.spec.ts"
---

# Purpose

Verify that the selected user's green ring remains after scrolling the user panel away from and back to the selected card.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is navigated to User & License Hub with user cards loaded.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to User & License Hub, wait for load.
   Expected Result: First user auto-selected (green ring).

2. Action: Scroll the user panel down so the first card is no longer visible.
   Expected Result: Scroll position changes; first card scrolled out of viewport.

3. Action: Scroll back up so the first card is visible again.
   Expected Result: First card still has the green-ring box-shadow — selection persisted through scrolling.

# Network Verification

No API requests triggered by scrolling.

# Expected Final Result

User selection is preserved through user-panel scrolling — the green ring remains on the originally selected card after scroll-out and scroll-back.

# Classification

- Read-only
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode user names, emails, groups, or card indexes.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Live UI observation via Playwright MCP: selection persists across scrolling; scrolled away and back, green ring still on first card.