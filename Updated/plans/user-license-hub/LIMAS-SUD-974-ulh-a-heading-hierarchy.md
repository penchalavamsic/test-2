---
test_id: "LIMAS-SUD-974"
title: "To verify the functionality of \"User & License Hub\" → \"Accessibility\" → \"Heading Hierarchy\" → \"Single h1 Only\""
module: "User & License Hub"
page: "User & License Hub"
section: "Accessibility"
control: "Heading Hierarchy"
action: "Single h1 Only"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
classification: "Accessibility"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/user-license-hub/user-license-hub-accessibility.spec.ts"
---

# Purpose

Verify that the page has exactly one h1 heading and no h2 for page-level structure.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is navigated to User & License Hub.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to User & License Hub.
   Expected Result: Page loads.

2. Action: Verify there is exactly one h1 heading (the page title) and no h2 in the page structure.
   Expected Result: The page has exactly one h1 element and no h2 elements at the page level.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

The heading hierarchy starts at h1 with no h2 page-level headings.

# Classification

- Accessibility
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Live UI observation via Playwright MCP