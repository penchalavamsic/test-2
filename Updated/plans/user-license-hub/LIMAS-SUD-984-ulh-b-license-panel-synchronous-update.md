---
test_id: "LIMAS-SUD-984"
title: "To verify the functionality of \"User & License Hub\" → \"License List\" → \"Synchronization\" → \"License Panel Updates Synchronously On Selection\""
module: "User & License Hub"
page: "User & License Hub"
section: "License List"
control: "Synchronization"
action: "License Panel Updates Synchronously On Selection"
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

Verify that the license panel updates synchronously (without visible delay) when a different user is selected.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is navigated to User & License Hub with user and license cards loaded.

# Test Data

Use environment variables and the authenticated fixture. Runtime license count from DOM.

# Steps and Expected Results

1. Action: Navigate to User & License Hub, wait for load.
   Expected Result: License cards for the auto-selected first user are rendered.

2. Action: Record the license count.
   Expected Result: {runtimeLicenseCountFirst} licenses visible.

3. Action: Click a different user card.
   Expected Result: License panel updates immediately — visible license cards reflect the newly selected user. License count matches the badge count of the new user.

# Network Verification

No additional API request for license data — verify by watching network.

# Expected Final Result

License panel updates synchronously and immediately upon user selection change, without any network request.

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

- Live UI observation via Playwright MCP: license panel updates synchronously; all license data embedded in initial user-list response.