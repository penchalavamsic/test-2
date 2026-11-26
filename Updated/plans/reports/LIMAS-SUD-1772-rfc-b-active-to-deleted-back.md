---
test_id: "LIMAS-SUD-1772"
title: "To verify the functionality of \"Reports\" → \"Floating Configurations\" → \"Configuration Mode\" → \"Active-to-Deleted Roundtrip Switching\""
module: "Reports"
page: "Reports"
section: "Floating Configurations"
control: "Configuration Mode"
action: "Active-to-Deleted Roundtrip Switching"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Reports Floating Configurations RFC-B"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/reports/reports-floating-configurations-error-deleted.spec.ts"
---

# Purpose

Verify that switching Active→Deleted→Active→Deleted uses the correct API endpoint at each step (Active: report/all, Deleted: report/alldeleted), toggles aria-pressed state correctly, and never mixes stale data between modes.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated on the Reports page with Floating Configurations selected.
- Active mode is initially selected (default).

# Test Data

Use environment variables and the authenticated fixture. API endpoints are verified at each switch step.

# Steps and Expected Results

1. Action: Switch Active → Deleted. Capture the request.
   Expected Result: GET request to report/alldeleted is sent. Deleted aria-pressed="true". Active aria-pressed="false". Deleted data loads.

2. Action: Switch Deleted → Active. Capture the request.
   Expected Result: GET request to report/all is sent. Active aria-pressed="true". Deleted aria-pressed="false". Active error state (500) appears.

3. Action: Switch Active → Deleted again. Capture the request.
   Expected Result: GET request to report/alldeleted is sent. Deleted aria-pressed="true". Active aria-pressed="false". Deleted data loads again.

4. Action: Verify no stale data mixing at any step.
   Expected Result: At each step, only data from the currently selected mode is displayed. No Active data appears in Deleted view, and no Deleted data appears in Active view.

# Network Verification

- Switch 1 (Active→Deleted): GET report/alldeleted?page={runtimePage}&size={runtimeSize}
- Switch 2 (Deleted→Active): GET report/all?page={runtimePage}&size={runtimeSize}
- Switch 3 (Active→Deleted): GET report/alldeleted?page={runtimePage}&size={runtimeSize}
- Each switch uses the correct endpoint for the target mode.

# Expected Final Result

Each mode switch uses its correct endpoint, toggles aria-pressed correctly, and no stale data from one mode pollutes the other.

# Classification

- Read-only
- Positive

# Restrictions

- Do not hardcode endpoint paths, page, or size values.
- Do not include credentials, tokens, cookies, or sensitive payloads.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending