---
test_id: "LIMAS-SUD-236"
title: "To verify the functionality of \"System User Dashboard\" → \"Processed License Requests\" → \"Record List\" → \"No Aria-Live Announcements on Load\""
module: "System User Dashboard"
page: "System User Dashboard"
section: "Processed License Requests"
control: "Record List"
action: "No Aria-Live Announcements on Load"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
classification: "Read-only"
test_type: "Accessibility"
automation_candidate: true
plan_status: "reviewed"
script_status: "generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/system-user-dashboard/LIMAS-SUD-236-processed-record-no-live-region.spec.ts"
---

# Purpose

Verify that no aria-live announcements are made when processed records load, indicating a screen-reader accessibility gap.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The dashboard is loaded and history mode is ready to be activated.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to the System User Dashboard and ensure history mode is off.
   Expected Result: Pending records are visible.

2. Action: Inspect the DOM for any element with an aria-live attribute (e.g., aria-live="polite" or aria-live="assertive") in the record list area.
   Expected Result: No aria-live region exists for processed records announcements.

3. Action: Enable history mode and observe whether any new aria-live region appears or an existing one receives updated content.
   Expected Result: No aria-live announcement occurs when processed records load.

# Network Verification

- Request URL: N/A
- HTTP Method: N/A
- Expected Status: N/A
- Payload Presence: N/A
- Visible UI Result: Processed records load silently without live-region announcements.

# Expected Final Result

No aria-live region announces the loading of processed records, confirming a screen-reader accessibility gap.

# Classification

- Read-only
- Accessibility

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