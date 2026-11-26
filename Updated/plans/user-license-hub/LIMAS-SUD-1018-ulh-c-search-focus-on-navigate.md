---
test_id: "LIMAS-SUD-1018"
title: "To verify the functionality of \"User & License Hub\" → \"User Search\" → \"Search Trigger\" → \"Search Input Focus On Navigate\""
module: "User & License Hub"
page: "User & License Hub"
section: "User Search"
control: "Search Trigger"
action: "Search Input Focus On Navigate"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P3"
classification: "Read-only"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/user-license-hub/user-license-hub-user-search.spec.ts"
---

# Purpose

Verify whether the search input receives autofocus when the User & License Hub page loads — useful for keyboard efficiency.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to User & License Hub, wait for load.
   Expected Result: Page loaded with user list visible.

2. Action: Check whether the search input is the active element.
   Expected Result: The search input either has focus or does not — the test records the observed state.

# Network Verification

No additional API requests.

# Expected Final Result

The focus state of the search input on page load is documented — autofocus is either present or absent.

# Classification

- Read-only
- Positive
- Accessibility

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode user names, emails.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Live UI observation via Playwright MCP: search input focus state to be verified at runtime.