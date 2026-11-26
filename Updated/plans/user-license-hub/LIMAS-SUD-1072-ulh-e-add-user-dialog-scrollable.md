---
test_id: "LIMAS-SUD-1072"
title: "To verify the functionality of \"User & License Hub\" → \"Add User Dialog\" → \"Dialog Structure\" → \"Internal Scrollbar\""
module: "User & License Hub"
page: "User & License Hub"
section: "Add User Dialog"
control: "Dialog Structure"
action: "Internal Scrollbar"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
classification: "User & License Hub ULH-E"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/user-license-hub/user-license-hub-add-user.spec.ts"
---

# Purpose

Verify the Add User dialog body has an internal scrollbar when its content extends beyond the visible area, and the footer buttons (Cancel, Save) remain fixed.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is navigated to User & License Hub.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Open the Add User dialog.
   Expected Result: Dialog visible.

2. Action: Check dialog body for overflow scrolling.
   Expected Result: The form content area has an overflow-y style (auto or scroll), enabling scroll when content overflows.

3. Action: Verify Cancel and Save buttons are reachable.
   Expected Result: Footer buttons are visible and not hidden behind scroll.

# Network Verification

No API verification needed.

# Expected Final Result

Dialog body scrolls internally while footer remains accessible.

# Classification

- Read-only
- Positive
- Visual

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not submit the form.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Live UI observation via Playwright MCP: Fields extend beyond visible area, dialog scrollable, footer fixed.