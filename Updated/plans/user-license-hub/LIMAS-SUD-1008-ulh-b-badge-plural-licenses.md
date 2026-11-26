---
test_id: "LIMAS-SUD-1008"
title: "To verify the functionality of \"User & License Hub\" → \"User List\" → \"Accessibility\" → \"Badge Reads Plural For Multiple Licenses\""
module: "User & License Hub"
page: "User & License Hub"
section: "User List"
control: "Accessibility"
action: "Badge Reads Plural For Multiple Licenses"
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

Verify that the license-count badge on a user card reads "N Licenses" (plural) when more than one license is assigned.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is navigated to User & License Hub with user cards loaded.

# Test Data

Use environment variables and the authenticated fixture. Runtime badge text from DOM.

# Steps and Expected Results

1. Action: Navigate to User & License Hub, wait for load.
   Expected Result: User cards loaded.

2. Action: Locate cards whose badge text matches the pattern `{n} Licenses` where n > 1.
   Expected Result: Multiple cards exist with plural badges (e.g., "2 Licenses", "3 Licenses", "8 Licenses").

3. Action: For one such card, note the badge number, click it, and verify license card count matches.
   Expected Result: Visible license card count equals the badge number.

# Network Verification

No API requests.

# Expected Final Result

Users with more than 1 license have a badge that reads "N Licenses" (plural), and the count matches the visible licenses.

# Classification

- Read-only
- Positive
- Accessibility

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode user names, emails, groups, or license counts.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Live UI observation via Playwright MCP: multiple license counts (2,3,4,5,8) all use plural "N Licenses".