---
test_id: "LIMAS-SUD-1725"
title: "To verify the functionality of \"Reports\" → \"Floating Licenses\" → \"Export Excel\" → \"Keyboard Activation of Export\""
module: "Reports"
page: "Reports"
section: "Floating Licenses"
control: "Export Excel"
action: "Keyboard Activation of Export"
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

Verify the Export Excel button is keyboard-reachable, activates on Enter and Space, and shows a visible focus indicator.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses is selected in Deleted mode with records loaded.
- Export button is enabled.

# Test Data

All values read dynamically.

# Steps and Expected Results

1. Action: Press Tab repeatedly until focus lands on the Export Excel button.
   Expected Result: The Export button receives keyboard focus. A visible focus-visible indicator (outline, ring, or border) appears on the button.

2. Action: With focus on Export, press Enter.
   Expected Result: A download event fires. A file download is triggered.

3. Action: Dismiss the download. Navigate focus back to the Export button via Tab.
   Expected Result: Export button receives focus again.

4. Action: With focus on Export, press Space.
   Expected Result: A download event fires. A file download is triggered.

5. Action: Verify the focus-visible indicator remains or reappears during both activations.
   Expected Result: Focus indicator is visible during keyboard interaction.

# Network Verification

No server request is sent during keyboard activation — export is client-side.

# Expected Final Result

The Export Excel button is keyboard-reachable via Tab, activates on both Enter and Space, and shows a visible focus-visible indicator during keyboard interaction.

# Classification

- Read-only
- Positive
- Accessibility

# Restrictions

- Do not hardcode key codes or focus styles.
- Do not manually navigate to simulate a successful result.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending