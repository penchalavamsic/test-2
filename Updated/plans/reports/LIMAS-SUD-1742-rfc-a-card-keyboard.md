---
test_id: "LIMAS-SUD-1742"
title: "To verify the functionality of \"Reports\" → \"Floating Configurations\" → \"Report Card\" → \"Keyboard Activation\""
module: "Reports"
page: "Reports"
section: "Floating Configurations"
control: "Report Card"
action: "Keyboard Activation"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Reports Floating Configurations RFC-A"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/reports/reports-floating-configurations-shell.spec.ts"
---

# Purpose

Verify the Floating Configurations card responds to Tab focus, Enter and Space key activation, updates aria-pressed, and shows a visible focus indicator.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and on the Reports page.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Press Tab until focus reaches the Floating Configurations card.
   Expected Result: Card receives a visible focus indicator.

2. Action: Press Enter when the card is focused.
   Expected Result: Card is selected; aria-pressed updates to "true". Sibling cards remain unpressed.

3. Action: Press Space when the card is focused (after navigating away and back).
   Expected Result: Card selection toggles correctly; aria-pressed updates accordingly.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

The Floating Configurations card is keyboard-operable via Tab, Enter, and Space, with aria-pressed reflecting selection state and a visible focus indicator.

# Classification

- Read-only
- Positive
- Accessibility

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not use static environment-specific data.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending