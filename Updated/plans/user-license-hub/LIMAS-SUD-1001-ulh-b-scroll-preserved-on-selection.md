---
test_id: "LIMAS-SUD-1001"
title: "To verify the functionality of \"User & License Hub\" → \"User List\" → \"Scrolling\" → \"Scroll Position Preserved Through Selection Changes\""
module: "User & License Hub"
page: "User & License Hub"
section: "User List"
control: "Scrolling"
action: "Scroll Position Preserved Through Selection Changes"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
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

Verify that the user panel's scroll position does not reset when selecting a different user.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is navigated to User & License Hub with user cards loaded.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to User & License Hub, wait for load.
   Expected Result: User cards loaded, first user auto-selected.

2. Action: Scroll the user panel to offset {runtimeScrollOffset} and record `scrollTop`.
   Expected Result: scrollTop > 0.

3. Action: Click a user card that is visible at the scrolled position to select it.
   Expected Result: Card becomes selected. scrollTop stays at approximately the same value — it does not jump back to 0.

# Network Verification

No API requests on selection or scroll.

# Expected Final Result

Scroll position in the user panel is preserved when selecting a different user — no auto-scroll, no reset.

# Classification

- Read-only
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode user names, emails, groups, or scroll offsets.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Live UI observation via Playwright MCP: scrolled to 800, clicked card 7, scrollTop stayed 782.