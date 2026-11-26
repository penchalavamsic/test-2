---
test_id: "LIMAS-SUD-998"
title: "To verify the functionality of \"User & License Hub\" → \"License List\" → \"Synchronization\" → \"Toolbar Buttons Enable After Selecting User With Licenses\""
module: "User & License Hub"
page: "User & License Hub"
section: "License List"
control: "Synchronization"
action: "Toolbar Buttons Enable After Selecting User With Licenses"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Read-only"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/user-license-hub/user-license-hub-license-synchronization.spec.ts"
---

# Purpose

Verify that after selecting a user who has licenses, the Download, Email, and Add License toolbar buttons become enabled.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is navigated to User & License Hub with user and license cards loaded.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to User & License Hub, wait for load.
   Expected Result: First user auto-selected with licenses. The toolbar buttons (Download, Email, Add License) should become enabled once a user with licenses is selected.

2. Action: Verify each toolbar button's disabled state.
   Expected Result: `downloadButton` is enabled, `emailButton` is enabled, `addLicenseButton` is enabled.

3. Action: Click a different user who also has licenses.
   Expected Result: Toolbar buttons remain enabled.

# Network Verification

No API requests on selection changes.

# Expected Final Result

When a user with licenses is selected, the license toolbar buttons (Download, Email, Add License) are enabled.

# Classification

- Read-only
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode user names, emails, groups, or license counts.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Live UI observation via Playwright MCP: toolbar buttons became enabled after clicking Christian Fuss (3 licenses).