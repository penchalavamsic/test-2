---
test_id: "LIMAS-SUD-982"
title: "To verify the functionality of \"User & License Hub\" → \"User List\" → \"Selection\" → \"Selection Does Not Open Dialog\""
module: "User & License Hub"
page: "User & License Hub"
section: "User List"
control: "Selection"
action: "Selection Does Not Open Dialog"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
classification: "Read-only"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/user-license-hub/user-license-hub-user-selection.spec.ts"
---

# Purpose

Verify that clicking a user card to select it does not open any modal dialog, popup, or overlay.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is navigated to User & License Hub with user cards loaded.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to User & License Hub, wait for load.
   Expected Result: No dialog is open.

2. Action: Click a different user card.
   Expected Result: No dialog, no role="dialog" element, no [role="alertdialog"], no modal overlay appears. License panel updates in-place.

# Network Verification

No API requests triggered by selection click.

# Expected Final Result

Selecting a user card does not produce any dialog or overlay — the UI updates inline.

# Classification

- Read-only
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode user names, emails, groups, or card indexes.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Live UI observation via Playwright MCP: no dialog opens on selection; Edit/Delete buttons are separate click targets inside card.