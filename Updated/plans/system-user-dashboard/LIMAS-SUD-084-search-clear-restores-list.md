---
test_id: "LIMAS-SUD-084"
title: 'To verify the functionality of "System User Dashboard" → "Pending License Requests" → "Search" → "Clear search restores original list"'
module: "system-user-dashboard"
page: "/system-user-dashboard"
section: "Pending License Requests"
control: "Search field clear"
action: "Verify that clearing the search field restores the original full list and count"
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

Verify that clearing the search field after performing a search restores the original list of Pending License Requests and the original loaded count.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The user is authenticated on `/system-user-dashboard`.
- The Pending License Requests tab is selected and the full list is loaded.
- A search has been performed that reduced the loaded count.

# Test Data

No hardcoded user names. A search substring is extracted at runtime from a visible row.

# Steps and Expected Results

1. Action: Capture the initial loaded count before any search.
   Expected Result: The initial loaded count is a positive integer.

2. Action: Extract a search substring from the first visible row and type it into the search field.
   Expected Result: The loaded count changes (decreases or stays the same).

3. Action: Capture the loaded count after search.
   Expected Result: A loaded count value is captured as `searchedLoaded`.

4. Action: Clear the search field (select all text and delete, or use the clear button if present).
   Expected Result: The search field is empty.

5. Action: Observe the count display after clearing.
   Expected Result: The loaded count returns to its original value (or approximately the same), indicating the full list has been restored.

# Network Verification

- Request URL: `/system-user-dashboard`
- HTTP Method: GET
- Expected Status: 200
- Payload Presence: Dashboard with Pending License Requests data

# Expected Final Result

After clearing the search field, the loaded count returns to the initial value, confirming the full list is restored.

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