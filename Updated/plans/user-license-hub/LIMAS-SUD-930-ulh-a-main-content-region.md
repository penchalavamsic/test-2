---
test_id: "LIMAS-SUD-930"
title: "To verify the functionality of \"User & License Hub\" → \"Page Shell\" → \"Main Region\" → \"Main Content Region\""
module: "User & License Hub"
page: "User & License Hub"
section: "Page Shell"
control: "Main Region"
action: "Main Content Region"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Read-only"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/user-license-hub/user-license-hub-navigation-shell.spec.ts"
---

# Purpose

Verify that the User & License Hub page has a main content region.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is navigated to User & License Hub.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to User & License Hub.
   Expected Result: Page loads.

2. Action: Verify the main element is visible.
   Expected Result: A `<main>` element is visible in the DOM.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

The page contains a visible main content region.

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

- Live UI observation via Playwright MCP