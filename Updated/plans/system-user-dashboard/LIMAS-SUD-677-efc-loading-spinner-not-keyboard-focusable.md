---
test_id: "LIMAS-SUD-677"
title: "To verify the functionality of "System User Dashboard" → "Expiring Floating Configurations" → "Loading Indicator" → "Not Keyboard Focusable""
module: "System User Dashboard"
page: "System User Dashboard"
section: "Expiring Floating Configurations"
control: "Loading Indicator"
action: "Not Keyboard Focusable"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Accessibility"
test_type: "Positive"
automation_candidate: true
plan_status: "reviewed"
script_status: "generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/system-user-dashboard/LIMAS-SUD-677-efc-loading-spinner-not-keyboard-focusable.spec.ts"
---

# Purpose

Verify the spinner is not keyboard-focusable (no tabindex).

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Dashboard is loaded and summary cards are rendered.
- Expiring Floating Configurations section is selected with Expiration filter active.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Inspect LoadingSpinner.tsx for tabIndex.
   Expected Result: No tabIndex attribute; spinner is a plain div with an SVG child.

# Network Verification

- Request URL: N/A (source-code verified)
- HTTP Method: N/A
- Expected Status: N/A

# Expected Final Result

Spinner is not keyboard-focusable.

# Classification

- Accessibility
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

1. Use only behavior verified through Playwright MCP and source code analysis.
2. Verify one atomic behavior per plan.
3. Do not hardcode application URLs.
4. Do not hardcode usernames or passwords.
5. Do not hardcode user names, emails, request IDs, license IDs, hardware IDs, dates, User Groups, Profiles, Roles, feature names, versions, or local paths.
6. Use environment variables, access-profiles.json, runtime fixtures, or test-data configuration.
7. Select exactly one access profile: SUPER_USER_ADMIN_USER
8. Keep every plan shareable between environments and team members.
9. CI/CD owns test execution.
10. Source-code-verified: DashboardSection.tsx and LoadingSpinner.tsx define loading behavior.
11. Plans must use this Jira-style title format:

To verify the functionality of "<Module>" → "<Section>" → "<Control>" → "<Action>"
