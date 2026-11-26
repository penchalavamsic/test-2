---
test_id: "LIMAS-SUD-1806"
title: "To verify the functionality of \"Reports\" → \"Floating Configurations\" → \"Deleted Mode\" → \"Export Accessibility\""
module: "Reports"
page: "Reports"
section: "Floating Configurations"
control: "Deleted Mode"
action: "Export Accessibility"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
classification: "Reports Floating Configurations RFC-C"
test_type: "Accessibility"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/reports/reports-floating-configurations-deleted.spec.ts"
---

# Purpose

Verify that the Export Excel button in Deleted mode has an accessible name ("Export Excel"), is keyboard-reachable via tabindex, communicates its state, and the download notification is accessible to assistive technology.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated on the Reports page with Floating Configurations selected.
- Deleted mode has been selected and fully loaded.

# Test Data

Accessibility properties are read from the DOM at runtime.

# Steps and Expected Results

1. Action: Locate the Export Excel button and inspect its accessible name.
   Expected Result: The button has an accessible name conveying "Export Excel" (via aria-label, aria-labelledby, or text content). Record the runtime accessible name.

2. Action: Verify the button is keyboard-reachable.
   Expected Result: The button has a tabindex attribute or is a native focusable element, making it reachable via Tab key navigation.

3. Action: Verify the button communicates its state.
   Expected Result: The button's enabled/disabled state is communicated (e.g., via aria-disabled or the disabled attribute). When data is loaded, the button is enabled.

4. Action: Click the button via keyboard (Enter or Space) and observe download notification accessibility.
   Expected Result: A download notification or feedback is provided that is accessible (e.g., via aria-live region, status message, or native download dialog).

5. Action: Verify the button is operable via keyboard alone.
   Expected Result: The button responds to both Enter and Space key presses.

# Network Verification

- No server API requests (client-side export).

# Expected Final Result

The Export Excel button is accessible, keyboard-reachable, communicates its state, and provides accessible download feedback.

# Classification

- Read-only
- Accessibility

# Restrictions

- Do not hardcode accessible names or aria attribute values. Read from the DOM at runtime.
- Do not include credentials, tokens, cookies, or sensitive payloads.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending