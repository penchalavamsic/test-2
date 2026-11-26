---
test_id: "LIMAS-SUD-1002"
title: "To verify the functionality of \"User & License Hub\" → \"User List\" → \"Scrolling\" → \"License Panel Does Not Scroll With User Panel\""
module: "User & License Hub"
page: "User & License Hub"
section: "User List"
control: "Scrolling"
action: "License Panel Does Not Scroll With User Panel"
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

Verify that scrolling the user panel does not cause the license panel to scroll — they scroll independently.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is navigated to User & License Hub with user and license cards loaded.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to User & License Hub, wait for load.
   Expected Result: Both panels visible, each with its own scroll container.

2. Action: Record the license panel `scrollTop`.
   Expected Result: License panel scrollTop is at initial value.

3. Action: Scroll the user panel.
   Expected Result: License panel scrollTop is unchanged — the panels scroll independently.

# Network Verification

No API requests.

# Expected Final Result

User panel and license panel have independent scroll containers — scrolling one does not affect the other.

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

- Live UI observation via Playwright MCP: license panel does not scroll with user panel.