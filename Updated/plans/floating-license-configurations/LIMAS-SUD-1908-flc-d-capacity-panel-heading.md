---
test_id: "LIMAS-SUD-1908"
title: "Capacity button opens inline panel with Update Capacity heading"
module: "Floating License Configurations"
page: "Floating License Configurations"
section: "Capacity Panel"
control: "Capacity Button"
action: "Open capacity panel"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Floating License Configurations FLC-D"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/floating-license-configurations/floating-license-configurations-bulk-actions.spec.ts"
---

# Purpose

Verify that clicking the Capacity button in the selection toolbar opens an inline panel with the Update Capacity heading.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and on the Floating License Configurations page.
- A runtime group with configurations is selected.
- A configuration card is selected so the selection toolbar is visible.

# Test Data

Use environment variables and the authenticated fixture. No hardcoded group names, card names, or counts.

# Steps and Expected Results

1. Action: Navigate to the Floating License Configurations page and select a runtime group.
   Expected Result: Page loads and configuration cards are visible.

2. Action: Select the first visible card to activate the selection toolbar.
   Expected Result: Selection toolbar appears.

3. Action: Click the Capacity button to open the Capacity panel.
   Expected Result: The Capacity panel opens.

4. Action: Assert that the Capacity panel heading is visible.
   Expected Result: The heading "Update Capacity" is visible in the panel.

5. Action: Close the Capacity panel and clear all card selections.
   Expected Result: Panel closes and selections are cleared.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

The Capacity button opens an inline panel whose heading confirms it is the Update Capacity panel.

# Classification

- Read-only
- Positive
- UI Interaction

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not use static environment-specific data.
- Do not hardcode group names, card names, or counts.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending