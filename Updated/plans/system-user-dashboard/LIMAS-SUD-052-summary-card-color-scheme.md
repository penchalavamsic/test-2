---
test_id: "LIMAS-SUD-052"
title: 'To verify the functionality of "System User Dashboard" → "Summary Cards" → "Card Appearance" → "Distinct Color Schemes Per Card"'
module: "system-user-dashboard"
page: "/system-user-dashboard"
section: "Summary Cards"
control: "CSS color classes on each card"
action: "Verify each card has a distinct color scheme (sky-blue, lime, violet, slate) in light mode"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P3"
classification: "Read-only"
test_type: "Visual"
automation_candidate: true
plan_status: "reviewed"
script_status: "generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: ""
---

# Purpose

Verify that the 4 summary cards have visually distinct color schemes in light mode. Based on observation: Pending License Requests uses sky-blue, Expiring Licenses uses lime, Floating Configs uses violet, and Floating Licenses uses slate.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The user is authenticated on `/system-user-dashboard`.
- The theme is light mode (the initial state).

# Test Data

None — color verification uses computed styles.

# Steps and Expected Results

1. Action: Navigate to the dashboard and wait for full render in light mode.
   Expected Result: Theme is light mode.

2. Action: Locate each of the 4 summary cards by their accessible names.
   Expected Result: All 4 cards are visible.

3. Action: Extract the computed background color or a distinguishing CSS class/token from each card.
   Expected Result: The 4 cards have distinct background colors (no two cards share the same color).

4. Action: Verify the active/pressed card has a visually distinct appearance from the inactive cards.
   Expected Result: The pressed card (Pending License Requests) has a different visual treatment than the unpressed cards.

# Expected Final Result

Each of the 4 summary cards has a distinct color scheme, with the active card visually differentiated.

# Classification

- Read-only
- Visual

# Restrictions

- Do not include credentials, tokens, cookies, authorization codes, or sensitive payloads.
- Do not hardcode hex color values — verify distinctness dynamically.
- Do not use static environment-specific data.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending