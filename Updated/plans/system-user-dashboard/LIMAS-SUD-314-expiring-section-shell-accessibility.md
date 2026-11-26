---
test_id: "LIMAS-SUD-314"
title: "To verify the functionality of "System User Dashboard" → "Expiring Licenses" → "Accessibility" → "Section Shell Gaps""
module: "System User Dashboard"
page: "System User Dashboard"
section: "Expiring Licenses"
control: "Accessibility"
action: "Section Shell Gaps"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P3"
classification: "Accessibility"
test_type: "Accessibility"
automation_candidate: true
plan_status: "reviewed"
script_status: "generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/system-user-dashboard/LIMAS-SUD-314-expiring-section-shell-accessibility.spec.ts"
---

# Purpose

Document a11y gaps: cards lack semantic roles, not keyboard-focusable, no aria-live announcements, no label association for Expires before input, dynamic summary card name, no calendar accessible name.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Dashboard is loaded, Expiring Licenses card has been clicked, and section is fully rendered.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to the System User Dashboard and click the Expiring Licenses summary card.
   Expected Result: The Expiring Licenses section appears.

2. Action: Inspect record cards for semantic roles (listitem, article, row).
   Expected Result: Record cards have no semantic role.

3. Action: Attempt to focus a record card via Tab.
   Expected Result: Record cards are not keyboard-focusable.

4. Action: Query the DOM for aria-live elements within the section.
   Expected Result: No aria-live regions are found for content announcements.

5. Action: Inspect the Expires before label-input association (for/id or wrapping label).
   Expected Result: No label element is programmatically associated with the Expires before input.

6. Action: Inspect the summary card accessible name for stability.
   Expected Result: The summary card accessible name includes a dynamic count (no stable accessible name).

7. Action: Inspect the calendar control for an accessible name.
   Expected Result: No accessible name is found on the calendar icon/control.

# Network Verification

- Request URL: N/A
- HTTP Method: N/A
- Expected Status: N/A
- Payload Presence: N/A
- Visible UI Result: All a11y gaps confirmed.

# Expected Final Result

All documented a11y gaps are confirmed: cards no semantics, no focus, no aria-live, no label association, dynamic summary card name, no calendar accessible name.

# Classification

- Accessibility
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
11. Plans must use this Jira-style title format:

To verify the functionality of "<Module>" → "<Section>" → "<Control>" → "<Action>"
