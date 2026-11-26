---
test_id: "LIMAS-SUD-999"
title: "To verify the functionality of \"User & License Hub\" → \"License List\" → \"Synchronization\" → \"License Toolbar Buttons Track Selection State\""
module: "User & License Hub"
page: "User & License Hub"
section: "License List"
control: "Synchronization"
action: "License Toolbar Buttons Track Selection State"
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

Verify that the License toolbar buttons respond consistently to user selection changes — remaining enabled while a user with licenses is selected.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is navigated to User & License Hub with user and license cards loaded.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to User & License Hub, wait for load.
   Expected Result: First user auto-selected. Toolbar buttons should be enabled (user has licenses).

2. Action: Click a second user with different license count.
   Expected Result: Toolbar buttons remain enabled.

3. Action: Click a third user.
   Expected Result: Toolbar buttons remain enabled.

4. Action: Return to the first user.
   Expected Result: Toolbar buttons remain enabled — state is consistent across all selections of licensed users.

# Network Verification

No API requests.

# Expected Final Result

Toolbar button enabled state tracks correctly across multiple user selection changes — they remain enabled whenever a user with licenses is selected.

# Classification

- Read-only
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode user names, emails, groups, or license counts.
- Note: zero-license users were not observed on page 1; toolbar-disable-when-no-license scenario is deferred to a later batch.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Live UI observation via Playwright MCP: toolbar buttons enable after selecting licensed user; all 20 users on page 1 have ≥1 license.