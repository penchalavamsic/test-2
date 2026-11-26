---
test_id: "LIMAS-SUD-049"
title: 'To verify the functionality of "System User Dashboard" → "Summary Cards" → "Card Content" → "Count Badge is Numeric and Visible"'
module: "system-user-dashboard"
page: "/system-user-dashboard"
section: "Summary Cards"
control: "Count badge (number element inside each card)"
action: "Verify each card's count badge contains a numeric value"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
classification: "Read-only"
test_type: "Visual"
automation_candidate: true
plan_status: "reviewed"
script_status: "generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: ""
---

# Purpose

Verify that each of the 4 summary cards contains a numeric count badge that is visible and is a valid non-negative integer.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The user is authenticated on `/system-user-dashboard`.

# Test Data

None — counts are verified dynamically.

# Steps and Expected Results

1. Action: Navigate to the dashboard and wait for full render.
   Expected Result: All 4 summary cards are visible.

2. Action: For each card, locate the count number displayed within the card.
   Expected Result: A numeric text element is visible inside the card.

3. Action: Parse the text content as an integer.
   Expected Result: The parsed value is a number ≥ 0.

# Expected Final Result

Every summary card displays a visible numeric count badge that is parseable as a non-negative integer.

# Classification

- Read-only
- Visual

# Restrictions

- Do not include credentials, tokens, cookies, authorization codes, or sensitive payloads.
- Do not hardcode specific count values — verify dynamically.
- Do not use static environment-specific data.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending