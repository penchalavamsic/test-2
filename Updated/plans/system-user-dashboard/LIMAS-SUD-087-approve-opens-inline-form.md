---
test_id: "LIMAS-SUD-087"
title: 'To verify the functionality of "System User Dashboard" → "Pending License Requests" → "Approve Button" → "Approve Opens Inline Form & Button Text Changes to Close"'
module: "system-user-dashboard"
page: "/system-user-dashboard"
section: "Pending License Requests"
control: "Approve button (row-level)"
action: "Click Approve and verify inline form opens with button text changed to Close"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Read-only"
test_type: "Visual"
automation_candidate: true
plan_status: "reviewed"
script_status: "generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: ""
---

# Purpose

Verify that clicking the Approve button on a pending license request row opens an inline approval form and the button text changes to "Close" with expanded/active state.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The user is authenticated on `/system-user-dashboard`.
- At least one pending license request is visible in the Pending License Requests tab.

# Test Data

None — use the first available pending request row.

# Steps and Expected Results

1. Action: Navigate to dashboard, wait for full render, and click the Pending License Requests tab.
   Expected Result: The Pending License Requests tab is active and at least one request row is visible with an Approve button.

2. Action: Click the Approve button on the first pending request row.
   Expected Result: The button text changes from "Approve" to "Close" and an inline form appears below (or within) the row.

3. Action: Verify the button state attributes.
   Expected Result: The button reflects `[expanded]` and `[active]` states (aria-expanded="true").

# Network Verification

- Request URL: N/A (client-side UI toggle)
- HTTP Method: N/A
- Expected Status: N/A
- Payload Presence: N/A
- Visible UI Result: Inline form with License Assignment heading appears, Approve button changes to Close

# Expected Final Result

Clicking Approve opens the inline approval form and the Approve button text becomes "Close" with expanded state.

# Classification

- Read-only
- Visual

# Restrictions

- Do not include credentials, tokens, cookies, authorization codes, or sensitive payloads.
- Do not submit the approval form.
- Do not hardcode User Group, Profile, or Role names.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending