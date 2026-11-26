---
test_id: "LIMAS-SUD-832"
title: "To verify the functionality of \"System User Dashboard\" → \"Expiring Floating Configurations\" → \"Search Input\" → \"Keyboard Focus\""
module: "System User Dashboard"
page: "System User Dashboard"
section: "Expiring Floating Configurations"
control: "Search Input"
action: "Keyboard Focus"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Read-only"
test_type: "Positive"
automation_candidate: true
plan_status: "reviewed"
script_status: "generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/system-user-dashboard/LIMAS-SUD-832-efc-e-search-keyboard-focus.spec.ts"
---

# Purpose

Verify the EFC search input can receive keyboard focus.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Dashboard loaded, EFC section selected, Expiration radio checked, zero-data state visible.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to dashboard, click EFC card, wait for initial EFC load, call focus() on the search input.
   Expected Result: The search input is focused.

# Network Verification

- Request URL: N/A
- HTTP Method: N/A
- Expected Status: N/A
- Payload Presence: N/A
- Visible UI Result: The input shows focus indicator.

# Expected Final Result

The EFC search input is keyboard-focusable.

# Classification

- Read-only
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not repeat data-changing submissions.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Live UI observation