---
test_id: "LIMAS-SUD-083"
title: 'To verify the functionality of "System User Dashboard" → "Pending License Requests" → "Search" → "Count display updates after search"'
module: "system-user-dashboard"
page: "/system-user-dashboard"
section: "Pending License Requests"
control: "Count display"
action: "Verify that the loaded count and total pending count update in the count display after performing a search"
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

Verify that the count display (format: "N loaded·M total pending") updates after a search is performed — the loaded count changes to reflect filtered results and the total count persists from the server.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The user is authenticated on `/system-user-dashboard`.
- The Pending License Requests tab is selected and the count display is visible with initial values.

# Test Data

No hardcoded user names. A search substring is extracted at runtime from the first visible row in the table.

# Steps and Expected Results

1. Action: Capture the initial count display text before any search.
   Expected Result: The text matches the pattern "N loaded·M total pending" where N and M are positive integers.

2. Action: Extract a search substring from the first visible user name in the table.
   Expected Result: A non-empty substring is captured.

3. Action: Type the substring into the search field.
   Expected Result: The count display updates — the loaded count decreases or stays the same, and the total count remains stable.

4. Action: Verify that the count display format is preserved after search ("N loaded·M total pending").
   Expected Result: The count display still follows the same textual pattern, with numeric values for both loaded and total.

# Network Verification

- Request URL: `/system-user-dashboard`
- HTTP Method: GET
- Expected Status: 200
- Payload Presence: Dashboard with Pending License Requests data

# Expected Final Result

After searching, the count display updates to reflect the filtered set: loaded count ≤ initial loaded count, total count remains unchanged, and the format "N loaded·M total pending" is preserved.

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