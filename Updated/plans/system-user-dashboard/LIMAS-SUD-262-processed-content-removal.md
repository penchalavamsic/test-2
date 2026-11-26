---
test_id: "LIMAS-SUD-262"
title: "To verify the functionality of \"System User Dashboard\" → \"Processed License Requests\" → \"Content\" → \"Removal After History Disabled\""
module: "System User Dashboard"
page: "System User Dashboard"
section: "Processed License Requests"
control: "Content"
action: "Removal After History Disabled"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Read-only"
test_type: "Positive"
automation_candidate: true
plan_status: "reviewed"
script_status: "generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/system-user-dashboard/LIMAS-SUD-262-processed-content-removal.spec.ts"
---

# Purpose

Verify that after toggling the history switch off, all processed-mode content — the processed subtitle, processed count, and processed record cards — is no longer visible.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The dashboard is loaded with history mode active and processed records visible.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to the System User Dashboard, enable history mode, and confirm all three processed elements are visible: the subtitle, the count, and at least one record card.
   Expected Result: Processed subtitle, count, and record cards are present.

2. Action: Click the history switch to toggle it off.
   Expected Result: Switch becomes unchecked.

3. Action: Assert the processed subtitle "Processed License Requests — approved or deleted." is not visible.
   Expected Result: Processed subtitle is absent.

4. Action: Assert no text matching the processed count format `total processed` is visible.
   Expected Result: No processed count suffix appears.

5. Action: Assert no processed record cards are visible (rows without Approve/Delete buttons).
   Expected Result: Processed-only card elements are not displayed.

# Network Verification

- Request URL: N/A
- HTTP Method: N/A
- Expected Status: N/A
- Payload Presence: N/A
- Visible UI Result: All processed-mode content is removed.

# Expected Final Result

No processed subtitle, processed count, or processed record cards remain visible after history is disabled.

# Classification

- Read-only
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