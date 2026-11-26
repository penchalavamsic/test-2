---
test_id: "LIMAS-SUD-995"
title: "To verify the functionality of \"User & License Hub\" → \"License List\" → \"Synchronization\" → \"License Assigned-To Maps To Selected User\""
module: "User & License Hub"
page: "User & License Hub"
section: "License List"
control: "Synchronization"
action: "License Assigned-To Maps To Selected User"
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

Verify that the "Assigned to" field on license cards contains the name of the selected user.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is navigated to User & License Hub with user and license cards loaded.

# Test Data

Use environment variables and the authenticated fixture. Runtime user name from selected card's h3.

# Steps and Expected Results

1. Action: Navigate to User & License Hub, wait for load.
   Expected Result: First user auto-selected. License cards rendered.

2. Action: Extract the selected user's name from the h3 of the selected card.
   Expected Result: Name retrieved as {runtimeSelectedUserName}.

3. Action: Check all visible license cards' "Assigned to" fields.
   Expected Result: Every license card's assigned-to value matches {runtimeSelectedUserName}.

4. Action: Click a different user card.
   Expected Result: License cards update. All "Assigned to" values now match the new selected user's name.

# Network Verification

No additional API request for license data.

# Expected Final Result

License cards' "Assigned to" fields always match the currently selected user's name.

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

- Live UI observation via Playwright MCP: assigned-to field on licenses maps to selected user; updates immediately on selection change.