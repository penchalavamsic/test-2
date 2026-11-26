---
test_id: "LIMAS-SUD-210"
title: "To verify the functionality of \"System User Dashboard\" → \"Pending License Requests\" → \"History Search\" → \"Accessibility: No Live-Region Announcements\""
module: "System User Dashboard"
page: "System User Dashboard"
section: "Pending License Requests"
control: "History Search"
action: "Accessibility: No Live-Region Announcements"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P3"
classification: "Read-only"
test_type: "Accessibility"
automation_candidate: true
plan_status: "reviewed"
script_status: "generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/system-user-dashboard/LIMAS-SUD-210-history-search-accessibility.spec.ts"
---

# Purpose

Document that no live-region (aria-live) announcements are observed when search filter results change during history search.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The dashboard is loaded, history mode is active, and processed records are loaded.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to the System User Dashboard, enable history mode, and wait for processed records to load.
   Expected Result: Processed records are visible.

2. Action: Query the DOM for any elements with `aria-live` attribute within or near the processed section.
   Expected Result: No `aria-live` elements are found that would announce filter result changes.

3. Action: Type a search substring into the history search field.
   Expected Result: Filtering occurs.

4. Action: Assert no new `aria-live` elements appeared and no live-region text content changed to reflect filter results.
   Expected Result: Zero live-region announcements are observed for filter result changes.

5. Action: Clear the search field.
   Expected Result: Records restored.

6. Action: Assert still no live-region announcements occurred.
   Expected Result: Live regions remain absent throughout the search lifecycle.

# Network Verification

- Request URL: N/A (accessibility audit only)
- HTTP Method: N/A
- Expected Status: N/A
- Payload Presence: N/A
- Visible UI Result: No live-region announcements for filter result changes.

# Expected Final Result

No `aria-live` elements announce filter result changes to assistive technology during history search operations.

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