---
test_id: "LIMAS-SUD-1663"
title: "To verify the functionality of \"Reports\" → \"Floating Licenses\" → \"Email Filter\" → \"Input Structure and Enter Trigger\""
module: "Reports"
page: "Reports"
section: "Floating Licenses"
control: "Email Filter"
action: "Input Structure and Enter Trigger"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Reports Floating Licenses RFL-B"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/reports/reports-floating-licenses-filters.spec.ts"
---

# Purpose

Verify the Floating Licenses Email filter is a type=email input with accessible name "Email", placeholder "Enter email", and pressing Enter adds a chip without triggering a server request.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable. Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses is selected, Active mode, Filters expanded.

# Test Data

Use environment variables and runtime fixture. Do not hardcode email values.

# Steps and Expected Results

1. Action: Expand Filters and inspect the Email input.
   Expected Result: Input type is email, accessible name "Email", placeholder "Enter email".

2. Action: Type a test email and press Enter.
   Expected Result: An "Email: {runtimeEmail}" chip appears with a remove button.

3. Action: Observe whether any server API request is triggered.
   Expected Result: No new network request to the backend — filtering is client-side.

# Network Verification

No server request should be triggered by the Email filter.

# Expected Final Result

Email filter accepts input, displays a chip on Enter, and performs client-side filtering without a server round-trip.

# Classification

- Read-only
- Positive

# Restrictions

- Do not hardcode email values. Do not trigger server-side mutations.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending