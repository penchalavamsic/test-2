---
test_id: "LIMAS-SUD-1656"
title: "To verify the functionality of \"Reports\" → \"Floating Licenses\" → \"Loading State\" → \"Loading Indicator and Count Update\""
module: "Reports"
page: "Reports"
section: "Floating Licenses"
control: "Loading State"
action: "Loading Indicator and Count Update"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Reports Floating Licenses RFL-A"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/reports/reports-floating-licenses-shell.spec.ts"
---

# Purpose

Observe the natural loading behavior when selecting Floating Licenses: spinner/skeleton/indicator, toolbar and table-shell visibility, count update timing, and indicator disappearance.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- On the Reports page, Standard Licenses is selected.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Click Floating Licenses card and immediately observe the UI.
   Expected Result: A loading indicator (spinner, skeleton, or progress) may appear briefly.

2. Action: Observe toolbar and data area during loading.
   Expected Result: Toolbar remains visible; data area updates when response arrives.

3. Action: Wait for the request to complete.
   Expected Result: Loading indicator disappears; counts stabilize.

4. Action: Verify the page does not lose focus during loading.
   Expected Result: Focus remains stable; no unexpected focus shifts.

# Network Verification

Observe the request lifecycle from initiation to completion.

# Expected Final Result

Loading transition is smooth: indicator appears during request, disappears after, counts stabilize, focus preserved.

# Classification

- Read-only
- Positive

# Restrictions

- Do not use fixed waits — rely on response/UI state.
- Do not block or delay the backend.
- Do not include credentials, tokens, cookies, or sensitive payloads.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending