---
test_id: "LIMAS-SUD-1888"
title: "To verify safe restoration clears all selections and returns to clean state"
module: "Floating License Configurations"
page: "Floating License Configurations"
section: "Safe Restoration"
control: "Configuration List"
action: "State Restoration"
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

Verify after selecting a card and restoring, the selection toolbar is hidden and heading/summary are visible.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and on the Floating License Configurations page.
- At least one card is visible.

# Test Data

Use environment variables and the authenticated fixture. No hardcoded group names, card names, or counts.

# Steps and Expected Results

1. Action: Navigate to the Floating License Configurations page and confirm the initial state.
   Expected Result: The page heading and summary text are visible. No selection toolbar is visible.

2. Action: Check the checkbox on the first visible card.
   Expected Result: The selection toolbar appears with count 1.

3. Action: Trigger a safe restoration (e.g., navigate away and back, or invoke the restore mechanism).
   Expected Result: The page reloads to a clean state.

4. Action: Verify the clean state after restoration.
   Expected Result: The selection toolbar is not visible. The page heading and summary text are visible. No cards are selected.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

After safe restoration, the page returns to a clean state: the selection toolbar is hidden, the heading and summary are visible, and no cards remain selected.

# Classification

- Read-only
- Positive
- UI Validation

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not use static environment-specific data.
- Do not hardcode group names, card names, or counts.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending