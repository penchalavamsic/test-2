---
test_id: "LIMAS-SUD-329"
title: "To verify the functionality of "System User Dashboard" → "Expiring Licenses" → "Filter By Radios" → "Tab Moves Focus To Expires Before Field""
module: "System User Dashboard"
page: "System User Dashboard"
section: "Expiring Licenses"
control: "Filter By Radios"
action: "Tab Moves Focus To Expires Before Field"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Read-only"
test_type: "Positive"
automation_candidate: true
plan_status: "reviewed"
script_status: "generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/system-user-dashboard/LIMAS-SUD-329-expiring-radio-tab-moves-focus-to-expires-before.spec.ts"
---

# Purpose

Verify that pressing Tab from the radio group moves keyboard focus to the Expires before textbox.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Dashboard is loaded and the Expiring Licenses section is available.

# Test Data

Use environment variables and the authenticated fixture. Counts are captured at runtime and are never hardcoded.

# Steps and Expected Results

1. Action: Authenticate as SUPER_USER_ADMIN_USER and open the System User Dashboard.
   Expected Result: The System User Dashboard heading is visible.

2. Action: Click the Expiring Licenses summary card and wait for the section to load.
   Expected Result: Expiration is selected, Expires before is empty and Search is empty.

3. Action: Focus the checked Expiration radio.
   Expected Result: The radio has focus.

4. Action: Press Tab.
   Expected Result: The Expires before textbox has focus.

# Network Verification

- Request URL: N/A
- HTTP Method: N/A
- Expected Status: N/A
- Payload Presence: N/A
- Visible UI Result: Expires before is the next tab stop after the radio group.

# Expected Final Result

Expires before is the next tab stop after the radio group.

# Classification

- Read-only (UI filter state only; no license data is changed)
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, authorization codes, or sensitive payloads.
- Do not repeat data-changing submissions.
- Do not manually navigate to simulate a successful result.
- Do not use static environment-specific data.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending

# Dynamic Plan Rules

1. Use only behavior verified through Playwright MCP.
2. Verify one atomic behavior per plan.
3. Do not hardcode application URLs.
4. Do not hardcode usernames or passwords.
5. Do not hardcode user names, emails, request IDs, license IDs, hardware IDs, dates, User Groups, Profiles, Roles, feature names, versions, or local paths.
6. Use environment variables, access-profiles.json, runtime fixtures, or test-data configuration.
7. Select exactly one access profile: SUPER_USER_ADMIN_USER
8. Keep every plan shareable between environments and team members.
9. CI/CD owns test execution.
10. The Healer may propose test-only changes later but must not change expected LIMAS behavior.
11. Plans must use this Jira-style title format:

To verify the functionality of "<Module>" → "<Section>" → "<Control>" → "<Action>"
