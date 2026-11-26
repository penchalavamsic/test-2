---
test_id: "LIMAS-SUD-1053"
title: "To verify the functionality of \"User & License Hub\" → \"User List\" → \"Pagination\" → \"Visible Card Count Matches Selected Size\""
module: "User & License Hub"
page: "User & License Hub"
section: "User List"
control: "Pagination"
action: "Visible Card Count Matches Selected Size"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Read-only"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/user-license-hub/user-license-hub-page-size.spec.ts"
---

# Purpose

Verify the number of visible user cards matches the selected rows-per-page value (or total if less than the page size on the last page). Test on the first page where total > size.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is navigated to User & License Hub with total users > max available page size.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Capture current page size and count visible user cards.
   Expected Result: Visible card count equals current page size.

2. Action: Select a smaller page size and count visible cards.
   Expected Result: Visible card count equals the new smaller size.

3. Action: Select a larger page size and count visible cards.
   Expected Result: Visible card count equals the new larger size (or total if total < size).

4. Action: Restore original page size.
   Expected Result: Visible card count returns to original size.

# Network Verification

GET requests with page=0 and corresponding size parameters.

# Expected Final Result

Visible card count always equals the selected page size on the first page.

# Classification

- Read-only
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode size values or card counts.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Live UI observation via Playwright MCP: size 20 → 20 cards; size 10 → 10 cards; size 25 → 25 cards on page 1.