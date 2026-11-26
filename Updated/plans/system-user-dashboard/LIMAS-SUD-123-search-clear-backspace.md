---
test_id: "LIMAS-SUD-123"
title: 'To verify the functionality of "System User Dashboard" → "Pending License Requests" → "Search" → "Clear via backspace"'
module: "system-user-dashboard"
page: "/system-user-dashboard"
section: "Pending License Requests"
control: "Search field"
action: "Verify that deleting all characters with backspace restores the full list"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
classification: "Read-only"
test_type: "Functional"
automation_candidate: true
plan_status: "reviewed"
script_status: "generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: ""
---

# Purpose

Verify that deleting all characters from the search field using backspace restores the original full list and loaded count, behaving equivalently to the clear action.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The user is authenticated on `/system-user-dashboard`.
- The Pending License Requests tab is selected and the list is loaded.
- A search has been performed.

# Test Data

No hardcoded user names. A search substring is extracted at runtime from a visible row.

# Steps and Expected Results

1. Action: Capture the initial loaded count before any search.
   Expected Result: The initial loaded count is a positive integer.

2. Action: Extract a search substring from the first visible row and type it into the search field.
   Expected Result: The search field contains the typed text.

3. Action: Delete all characters from the search field by pressing Backspace for each character.
   Expected Result: The search field becomes empty.

4. Action: Observe the count display after clearing via backspace.
   Expected Result: The loaded count returns to the initial value, confirming the full list is restored.

# Network Verification

- Request URL: `/system-user-dashboard`
- HTTP Method: GET
- Expected Status: 200
- Payload Presence: Dashboard HTML with Pending License Requests data

# Expected Final Result

Deleting all characters from the search field with backspace restores the original loaded count.

# Classification

- Read-only
- Functional

# Restrictions

- Do not include credentials, tokens, cookies, authorization codes, or sensitive payloads.
- Do not repeat data-changing submissions.
- Do not use static environment-specific data.
- Do not hardcode user names — extract at runtime.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending