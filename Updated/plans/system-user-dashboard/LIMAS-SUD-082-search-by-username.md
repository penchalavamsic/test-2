---
test_id: "LIMAS-SUD-082"
title: 'To verify the functionality of "System User Dashboard" → "Pending License Requests" → "Search" → "Search by user name"'
module: "system-user-dashboard"
page: "/system-user-dashboard"
section: "Pending License Requests"
control: "Search field"
action: "Search by user name — typing a partial user name reduces the loaded count"
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

Verify that typing a partial user name into the "Search license requests…" field reduces the number of loaded license requests visible in the count display.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The user is authenticated on `/system-user-dashboard`.
- The Pending License Requests tab is selected and has loaded its list with a count display visible.

# Test Data

No hardcoded user names. The test captures the initial total count from the count display at runtime, then types a substring of the first visible user name from the table into the search field.

# Steps and Expected Results

1. Action: Navigate to the dashboard and ensure the Pending License Requests tab is active and the list is loaded.
   Expected Result: The count display contains the initial "loaded·total pending" text.

2. Action: Extract the initial total pending count from the count display text (the number after "total").
   Expected Result: A positive integer is captured as `initialTotal`.

3. Action: Locate the first user name text visible in the Pending License Requests table body. Extract a substring (e.g., first 3–4 characters) to use as a search term.
   Expected Result: A non-empty search substring is captured from the table.

4. Action: Type the extracted substring into the search textbox (placeholder "Search license requests...").
   Expected Result: The search field receives the input.

5. Action: Observe the loaded count portion of the count display.
   Expected Result: The loaded count is ≤ `initialTotal` (reduced or equal, depending on match scope).

# Network Verification

- Request URL: `/system-user-dashboard`
- HTTP Method: GET
- Expected Status: 200
- Payload Presence: Dashboard HTML with Pending License Requests data

# Expected Final Result

Typing a substring of a visible user name into the search field reduces the loaded count. The loaded count after searching is less than or equal to the initial loaded count.

# Classification

- Read-only
- Functional

# Restrictions

- Do not include credentials, tokens, cookies, authorization codes, or sensitive payloads.
- Do not repeat data-changing submissions.
- Do not use static environment-specific data.
- Do not hardcode user names from the environment — extract them at runtime.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending