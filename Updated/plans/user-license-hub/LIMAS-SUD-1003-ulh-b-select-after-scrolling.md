---
test_id: "LIMAS-SUD-1003"
title: "To verify the functionality of \"User & License Hub\" → \"User List\" → \"Scrolling\" → \"Can Select User After Scrolling To New View\""
module: "User & License Hub"
page: "User & License Hub"
section: "User List"
control: "Scrolling"
action: "Can Select User After Scrolling To New View"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Read-only"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/user-license-hub/user-license-hub-panel-scrolling.spec.ts"
---

# Purpose

Verify that a user can be selected after scrolling to a previously not-visible set of user cards.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is navigated to User & License Hub with user cards loaded.

# Test Data

Use environment variables and the authenticated fixture. Runtime card index from scrolled view.

# Steps and Expected Results

1. Action: Navigate to User & License Hub, wait for load.
   Expected Result: User cards 1–{runtimeVisibleCount} visible, first card auto-selected.

2. Action: Scroll the user panel to bring cards {runtimeScrollIndexStart}–{runtimeScrollIndexEnd} into view.
   Expected Result: New cards are visible.

3. Action: Click one of the newly visible cards.
   Expected Result: That card becomes selected (green ring). License panel synchronizes to the new user.

# Network Verification

No API requests triggered by scrolling or selection.

# Expected Final Result

After scrolling to a new visible set, users can still be selected normally — selection and license synchronization work correctly.

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

- Live UI observation via Playwright MCP: can select users after scrolling to new visible set; license panel synchronizes correctly.