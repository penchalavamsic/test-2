---
test_id: "LIMAS-SUD-994"
title: "To verify the functionality of \"User & License Hub\" → \"License List\" → \"Synchronization\" → \"License Card Count Matches Badge Count\""
module: "User & License Hub"
page: "User & License Hub"
section: "License List"
control: "Synchronization"
action: "License Card Count Matches Badge Count"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
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

Verify that the number of visible license cards matches the license-count badge on the selected user's card.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is navigated to User & License Hub with user and license cards loaded.

# Test Data

Use environment variables and the authenticated fixture. Runtime badge count and license card count from DOM.

# Steps and Expected Results

1. Action: Navigate to User & License Hub, wait for load.
   Expected Result: First user auto-selected with {runtimeLicenseCount} on badge.

2. Action: Count visible license cards in the license panel.
   Expected Result: License card count equals the badge number (e.g., "3 Licenses" → 3 cards).

3. Action: Click a user with a different license count.
   Expected Result: License cards update. New card count equals the new user's badge number.

# Network Verification

No additional API request for license data.

# Expected Final Result

For every selected user, the visible license card count matches the badge count on that user's card.

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

- Live UI observation via Playwright MCP: license card count matches badge count (e.g., "3 Licenses" = 3 license cards).