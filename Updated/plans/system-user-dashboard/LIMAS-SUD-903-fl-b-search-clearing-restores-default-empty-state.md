---
test_id: "LIMAS-SUD-903"
title: "To verify the functionality of \"System User Dashboard\" → \"Floating Licenses\" → \"Search\" → \"Search Clearing Restores Default Empty State\""
module: "System User Dashboard"
page: "System User Dashboard"
section: "Floating Licenses"
control: "Search"
action: "Search Clearing Restores Default Empty State"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Read-only"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/system-user-dashboard/floating-licenses/floating-licenses-search-behavior.spec.ts"
---

# Purpose

Verify that clearing the search field restores the default empty state (heading and subtext).

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses section is loaded with zero data.

# Test Data

Use a runtime-provided search term via `TEST_FL_SEARCH_USER_ID`.

# Steps and Expected Results

1. Action: Navigate to System User Dashboard, wait for full render, select Floating Licenses, wait for initial GET.
   Expected Result: Default empty state: "No floating licenses found" / "No floating licenses match the selected expiration criteria."

2. Action: Fill search with `TEST_FL_SEARCH_USER_ID`.
   Expected Result: No-match state: "No matching floating licenses found" / "Try a different user ID, profile, hardware ID, or role."

3. Action: Clear the search field (fill with empty string).
   Expected Result: Default empty state returns: heading reverts to "No floating licenses found", subtext reverts to "No floating licenses match the selected expiration criteria." No API request is triggered.

# Network Verification

- Request URL: N/A (no request expected on clear)
- HTTP Method: N/A
- Expected Status: N/A
- Payload Presence: N/A
- Visible UI Result: Default empty state restored.

# Expected Final Result

Clearing the search restores the default empty-state text without any network activity.

# Classification

- Read-only
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not repeat data-changing submissions.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Live UI observation via Playwright MCP: fill('') restored default empty state.