---
test_id: "LIMAS-SUD-1796"
title: "To verify the functionality of \"Reports\" → \"Floating Configurations\" → \"Deleted Mode\" → \"Export Button State\""
module: "Reports"
page: "Reports"
section: "Floating Configurations"
control: "Deleted Mode"
action: "Export Button State"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Reports Floating Configurations RFC-C"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/reports/reports-floating-configurations-deleted.spec.ts"
---

# Purpose

Verify that the Export Excel button in Deleted mode is enabled when data is loaded, has an accessible name, has a tabindex for keyboard reachability, shows a cursor pointer on hover, and is not disabled.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated on the Reports page with Floating Configurations selected.
- Deleted mode has been selected and fully loaded.

# Test Data

Button properties are read from the DOM at runtime.

# Steps and Expected Results

1. Action: Locate the Export Excel button after Deleted mode fully loads.
   Expected Result: The button is visible in the UI.

2. Action: Verify the button is enabled.
   Expected Result: The button is not disabled. Its disabled attribute is absent or false.

3. Action: Verify the button's accessible name.
   Expected Result: The button has an accessible name (e.g., "Export Excel"). Record the runtime accessible name.

4. Action: Verify the button is keyboard-reachable.
   Expected Result: The button has a tabindex attribute, making it reachable via keyboard navigation.

5. Action: Verify cursor style on hover.
   Expected Result: The button shows a pointer cursor when hovered.

# Network Verification

- No API requests are triggered by inspecting button properties.

# Expected Final Result

The Export Excel button is enabled, has an accessible name, is keyboard-reachable, and shows a pointer cursor, ready for user interaction.

# Classification

- Read-only
- Positive

# Restrictions

- Do not hardcode the button's accessible name. Read from the DOM at runtime.
- Do not include credentials, tokens, cookies, or sensitive payloads.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending