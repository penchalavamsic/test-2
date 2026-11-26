---
test_id: "LIMAS-SUD-968"
title: "To verify the functionality of \"User & License Hub\" → \"License List\" → \"Container\" → \"Scrollable License List\""
module: "User & License Hub"
page: "User & License Hub"
section: "License List"
control: "Container"
action: "Scrollable License List"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
classification: "Read-only"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/user-license-hub/user-license-hub-license-list.spec.ts"
---

# Purpose

Verify that the license cards panel is independently scrollable.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is navigated to User & License Hub with license cards loaded.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to User & License Hub and wait for license card load.
   Expected Result: License cards are rendered.

2. Action: Verify the license panel has scrollable overflow.
   Expected Result: The container's overflow style allows scrolling.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

The license cards panel allows independent vertical scrolling.

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