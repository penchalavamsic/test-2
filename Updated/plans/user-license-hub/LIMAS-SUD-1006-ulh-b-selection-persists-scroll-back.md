---
test_id: "LIMAS-SUD-1006"
title: "To verify the functionality of \"User & License Hub\" → \"User List\" → \"Scrolling\" → \"Selection Persists After Scroll-Back To Original User\""
module: "User & License Hub"
page: "User & License Hub"
section: "User List"
control: "Scrolling"
action: "Selection Persists After Scroll-Back To Original User"
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

Verify that after scrolling away, selecting a different user, and scrolling back to re-select the original user, selection and license state are correctly restored.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is navigated to User & License Hub with user cards loaded.

# Test Data

Use environment variables and the authenticated fixture. Runtime user names from DOM.

# Steps and Expected Results

1. Action: Navigate to User & License Hub, wait for load.
   Expected Result: First user auto-selected. Record its name and license count.

2. Action: Scroll down to a different visible region and select a different user.
   Expected Result: New user selected with different license count.

3. Action: Scroll back up and click the original first user.
   Expected Result: Original user becomes selected (green ring). License panel shows the original license set with the original count.

# Network Verification

No API requests triggered by scrolling or selection.

# Expected Final Result

Selection and license state are fully preserved and restorable after any sequence of scroll and selection actions.

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

- Live UI observation via Playwright MCP: selection persists across scroll + selection + scroll-back; original user's license state restored.