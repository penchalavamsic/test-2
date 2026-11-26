---
test_id: "LIMAS-AUTH-039"
title: "To verify the functionality of \"Authentication\" → \"Session\" → \"Five-cycle Login → Sign Out reliability\""
module: "Authentication"
page: "System User Dashboard"
section: "Session"
control: "Sign Out"
action: "Reliability"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "Critical"
classification: "Read-only"
test_type: "Reliability"
automation_candidate: true
plan_status: "reviewed"
script_status: "not-generated"
environment_variables:
  - LIMAS_BASE_URL
  - LIMAS_SUPER_USER_ADMIN_USER_USERNAME
  - LIMAS_SUPER_USER_ADMIN_USER_PASSWORD
test_data: {}
related_script: ""
---

# Purpose

Verify that the Login → Sign Out cycle is reliable by repeating it five consecutive times.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Valid credentials for `SUPER_USER_ADMIN_USER` are configured.

# Test Data

Credential variable names from the profile are read at runtime.

# Steps and Expected Results

1. Action: For five consecutive cycles, perform: login → verify dashboard → sign out → verify login page.
   Expected Result: Each cycle succeeds. Dashboard is visible after each login, login page after each sign-out.

2. Action: Stop immediately on first failure.
   Expected Result: Test reports which cycle failed and the reason.

# Network Verification

- Request URL: `/system-user-dashboard` (per login), `/` (per logout)
- Expected Status: 200 each way
- Visible UI Result: Dashboard and login page alternate correctly

# Expected Final Result

Five consecutive Login → Sign Out cycles complete successfully.

# Classification

- Read-only
- Reliability

# Restrictions

- Do not include credentials, tokens, cookies, authorization codes, or sensitive payloads.
- Do not use static environment-specific data.

# Generation Status

- Test script generation: Pending
- CI/CD execution: Pending
- Healing: Pending
