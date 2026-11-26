---
test_id: "LIMAS-SUD-1878"
title: "To verify selection toolbar shows accurate count when two cards are selected"
module: "Floating License Configurations"
page: "Floating License Configurations"
section: "Multiple Selection"
control: "Selection Toolbar"
action: "Multi-Select Count"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Floating License Configurations FLC-C"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/floating-license-configurations/floating-license-configurations-cards.spec.ts"
---

# Purpose

Verify selection count shows 2 when two cards are checked. Data-dependent when fewer than 2 cards exist.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and on the Floating License Configurations page.
- At least two cards are visible (skip the test gracefully if fewer than 2 cards exist).

# Test Data

Use environment variables and the authenticated fixture. No hardcoded group names, card names, or counts.

# Steps and Expected Results

1. Action: Navigate to the Floating License Configurations page.
   Expected Result: Page loads and cards are visible.

2. Action: Query all visible card checkboxes. If fewer than 2 exist, skip the remainder of the test.
   Expected Result: At least two card checkboxes are available.

3. Action: Check the checkbox on the first visible card and on the second visible card.
   Expected Result: The selection toolbar becomes visible.

4. Action: Read the selection count displayed in the toolbar.
   Expected Result: The selection count equals 2.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

The selection toolbar displays "2" as the count when exactly two cards are checked.

# Classification

- Read-only
- Positive
- UI Validation
- Data-dependent (card count)

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not use static environment-specific data.
- Do not hardcode group names, card names, or counts.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending