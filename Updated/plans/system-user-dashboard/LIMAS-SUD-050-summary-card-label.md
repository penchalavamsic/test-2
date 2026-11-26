---
test_id: "LIMAS-SUD-050"
title: 'To verify the functionality of "System User Dashboard" → "Summary Cards" → "Card Content" → "Label Text Visible"'
module: "system-user-dashboard"
page: "/system-user-dashboard"
section: "Summary Cards"
control: "Label paragraph inside each card"
action: "Verify each card has its label text visible"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
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

Verify that each of the 4 summary cards has its label text visible. The observable labels are: "Pending License Requests", "Expiring Licenses", "Floating Configs", and "Floating Licenses".

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The user is authenticated on `/system-user-dashboard`.

# Test Data

The expected labels are derived from the observed accessible names of the card buttons.

# Steps and Expected Results

1. Action: Navigate to the dashboard and wait for full render.
   Expected Result: All 4 summary cards are visible.

2. Action: Locate each card by its accessible name and verify it is visible.
   Expected Result: Cards with names matching "Pending License Requests", "Expiring Licenses", "Floating Configs", and "Floating Licenses" are all visible.

3. Action: Verify each card contains non-empty text content beyond the count.
   Expected Result: Each card has a visible label paragraph.

# Expected Final Result

Each of the 4 summary cards displays its label text visibly alongside its count badge.

# Classification

- Read-only
- Visual

# Restrictions

- Do not include credentials, tokens, cookies, authorization codes, or sensitive payloads.
- Do not hardcode specific label text that may change between environments.
- Do not use static environment-specific data.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending