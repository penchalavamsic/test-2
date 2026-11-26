---
test_id: "LIMAS-SUD-267"
title: "To verify the functionality of \"System User Dashboard\" → \"Pending License Requests\" → \"API\" → \"Resumes After History Disabled\""
module: "System User Dashboard"
page: "System User Dashboard"
section: "Pending License Requests"
control: "API"
action: "Resumes After History Disabled"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Read-only"
test_type: "Positive"
automation_candidate: true
plan_status: "reviewed"
script_status: "generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/system-user-dashboard/LIMAS-SUD-267-pending-api-resumes-after-disable.spec.ts"
---

# Purpose

Verify that after toggling the history switch off, a pending API request fires (or has already fired) to reload the pending license request data.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The dashboard is loaded with history mode active; processed API calls have completed.

# Test Data

Use environment variables, the authenticated fixture, and Playwright network route interception.

# Steps and Expected Results

1. Action: Navigate to the System User Dashboard, enable history mode, and start monitoring network requests for the pending API endpoint (e.g., a route matching `**/license-requests?**status=pending**`).
   Expected Result: Network monitoring is active.

2. Action: Click the history switch to toggle it off.
   Expected Result: Switch becomes unchecked.

3. Action: Assert that a pending API request matching the pending endpoint pattern was fired after the toggle (or is in-flight).
   Expected Result: At least one pending API GET request is observed after toggle-off.

# Network Verification

- Request URL: Pattern matching pending license-requests endpoint (status=pending or equivalent).
- HTTP Method: GET
- Expected Status: 200
- Payload Presence: Yes — pending license request records.
- Visible UI Result: Pending records reload in the UI.

# Expected Final Result

A pending API request is triggered after the history switch is toggled off, restoring the pending dataset in the UI.

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