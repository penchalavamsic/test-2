---
test_id: "LIMAS-SUD-1007"
title: "To verify the functionality of \"User & License Hub\" → \"User List\" → \"Accessibility\" → \"Badge Reads Singular For 1 License\""
module: "User & License Hub"
page: "User & License Hub"
section: "User List"
control: "Accessibility"
action: "Badge Reads Singular For 1 License"
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

Verify that the license-count badge on a user card reads "1 License" (singular) when exactly one license is assigned.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is navigated to User & License Hub with user cards loaded.

# Test Data

Use environment variables and the authenticated fixture. Runtime badge text from DOM.

# Steps and Expected Results

1. Action: Navigate to User & License Hub, wait for load.
   Expected Result: User cards loaded. Some cards display "1 License" badge.

2. Action: Locate a card whose badge contains "1 License" (singular).
   Expected Result: Card exists with badge text matching pattern `1 License` (no plural 's').

3. Action: Click that user and verify 1 license card appears.
   Expected Result: Exactly 1 license card is visible.

# Network Verification

No API requests.

# Expected Final Result

Users with exactly 1 license have a badge that reads "1 License" (singular).

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

- Live UI observation via Playwright MCP: "1 License" (singular) for count=1; "N Licenses" (plural) for count>1.