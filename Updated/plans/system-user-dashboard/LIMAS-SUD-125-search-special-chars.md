---
test_id: "LIMAS-SUD-125"
title: 'To verify the functionality of "System User Dashboard" → "Pending License Requests" → "Search" → "Special character handling"'
module: "system-user-dashboard"
page: "/system-user-dashboard"
section: "Pending License Requests"
control: "Search field"
action: "Verify that search input with special characters does not break the search or the page"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P3"
classification: "Read-only"
test_type: "Negative"
automation_candidate: true
plan_status: "reviewed"
script_status: "generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: ""
---

# Purpose

Verify that entering special characters (`@`, `#`, `$`, `%`, `&`, `*`, `(`, `)`, `+`, `=`, `[`, `]`, `{`, `}`, `\`, `|`, `<`, `>`, `/`) into the search field does not cause JavaScript errors, page crashes, or unexpected UI behavior.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The user is authenticated on `/system-user-dashboard`.
- The Pending License Requests tab is selected and its list is loaded.

# Test Data

A set of special characters that are commonly used in search fields but are not expected in user names: `@#$%&*()+=[]{}\|<>/`.

# Steps and Expected Results

1. Action: Navigate to the dashboard, ensure the Pending License Requests tab is active, and confirm the search field is visible.
   Expected Result: The search field with placeholder "Search license requests..." is visible.

2. Action: Type a string of special characters into the search field.
   Expected Result: The search field accepts the input without errors and remains visible.

3. Action: Observe the count display and the table.
   Expected Result: The page does not crash; the count display is still present; the table either shows zero results or filters accordingly.

4. Action: Clear the search field.
   Expected Result: The field can be cleared and the full list restored.

# Network Verification

- Request URL: `/system-user-dashboard`
- HTTP Method: GET
- Expected Status: 200
- Payload Presence: N/A

# Expected Final Result

Entering special characters into the search field does not cause a page crash, JavaScript error, or UI breakdown. The search still functions and can be cleared.

# Classification

- Read-only
- Negative

# Restrictions

- Do not include credentials, tokens, cookies, authorization codes, or sensitive payloads.
- Do not repeat data-changing submissions.
- Do not use static environment-specific data.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending