---
test_id: "LIMAS-SUD-1737"
title: "To verify the functionality of \"Reports\" → \"Floating Licenses\" → \"Export Excel\" → \"Accessibility of Export Button\""
module: "Reports"
page: "Reports"
section: "Floating Licenses"
control: "Export Excel"
action: "Accessibility of Export Button"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
classification: "Reports Floating Licenses RFL-E"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
execution_status: "Not Run"
ci_cd_execution: "Pending"
healing: "Pending"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/reports/reports-floating-licenses-export.spec.ts"
---

# Purpose

Verify the Export Excel button meets accessibility requirements: correct accessible name, disabled state communicated in Active, enabled state in Deleted, keyboard activation, focus-visible indicator, and download completion communicated without error/loading indicator (client-side is instant).

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses is selected.
- Both Active (0 records) and Deleted (records present) modes are available.

# Test Data

All values read dynamically from the DOM.

# Steps and Expected Results

1. Action: In Active mode (0 records), inspect the Export button's accessible name.
   Expected Result: Accessible name is "Export Excel".

2. Action: In Active mode, verify the disabled state is communicated to assistive technology.
   Expected Result: The button has `disabled` attribute present or `aria-disabled="true"`.

3. Action: Switch to Deleted mode and inspect the Export button's accessible name and enabled state.
   Expected Result: Accessible name remains "Export Excel". The button is enabled — no `disabled` attribute, `aria-disabled` absent or `"false"`.

4. Action: Focus the Export button via Tab in Deleted mode and verify the focus-visible indicator.
   Expected Result: A visible focus-visible ring, outline, or border appears on the button.

5. Action: Activate Export via keyboard (Enter or Space).
   Expected Result: A download fires immediately with no loading indicator or spinner — client-side export is instant.

6. Action: Verify that after the download fires, no error indicator, toast, or loading message appears.
   Expected Result: The UI remains stable. No error or loading communication is shown (client-side export completes instantly).

7. Action: Verify the Export button remains focusable and enabled after the export.
   Expected Result: Button is still enabled and focusable for subsequent exports.

# Network Verification

No API request is sent during Export.

# Expected Final Result

The Export Excel button has accessible name "Export Excel", communicates disabled/enabled state correctly per mode, supports keyboard activation with focus-visible indicator, and provides instant download without error/loading indicators.

# Classification

- Read-only
- Positive
- Accessibility

# Restrictions

- Do not hardcode aria attributes or focus styles — read dynamically.
- Do not manually navigate to simulate a successful result.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending