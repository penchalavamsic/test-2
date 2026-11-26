---
test_id: "LIMAS-SUD-064"
title: 'To verify the functionality of "System User Dashboard" → "Pending License Requests" → "Count Display" → "Counts are Non-Negative Numbers"'
module: "system-user-dashboard"
page: "/system-user-dashboard"
section: "Pending License Requests"
control: "Count display (loaded and total numbers)"
action: "Verify both loaded and total counts are numbers ≥ 0"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
classification: "Read-only"
test_type: "Data"
automation_candidate: true
plan_status: "reviewed"
script_status: "generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: ""
---

# Purpose

Verify that both the "loaded" and "total pending" numbers in the count display are parseable as integers ≥ 0, and that the loaded count does not exceed the total count.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The user is authenticated on `/system-user-dashboard`.

# Test Data

None.

# Steps and Expected Results

1. Action: Navigate to the dashboard and wait for full render.
   Expected Result: The count display is visible.

2. Action: Extract the "loaded" number from the count display text.
   Expected Result: The loaded value is a non-negative integer.

3. Action: Extract the "total pending" number from the count display text.
   Expected Result: The total value is a non-negative integer.

4. Action: Compare loaded and total counts.
   Expected Result: loaded ≤ total pending.

# Expected Final Result

Both count values are valid non-negative integers with loaded count not exceeding the total.

# Classification

- Read-only
- Data

# Restrictions

- Do not include credentials, tokens, cookies, authorization codes, or sensitive payloads.
- Do not hardcode specific numbers.
- Do not use static environment-specific data.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending