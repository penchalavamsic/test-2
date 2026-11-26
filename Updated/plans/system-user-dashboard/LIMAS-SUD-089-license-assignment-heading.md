---
test_id: "LIMAS-SUD-089"
title: 'To verify the functionality of "System User Dashboard" → "Pending License Requests" → "Inline Form" → "License Assignment Heading Visibility"'
module: "system-user-dashboard"
page: "/system-user-dashboard"
section: "Pending License Requests"
control: "License Assignment heading (paragraph)"
action: "Verify heading text is visible when inline form is open"
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

Verify that when the inline approval form is open, a "License Assignment" heading (paragraph) is visible to label the form section.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The user is authenticated on `/system-user-dashboard`.
- The inline approval form is open.

# Test Data

None.

# Steps and Expected Results

1. Action: Navigate to dashboard, switch to Pending License Requests tab, click Approve on first row.
   Expected Result: Inline form opens.

2. Action: Locate a paragraph or heading element with text "License Assignment" within the opened form area.
   Expected Result: The "License Assignment" text is visible.

# Network Verification

- Request URL: N/A (static form label)
- HTTP Method: N/A
- Expected Status: N/A
- Payload Presence: N/A
- Visible UI Result: "License Assignment" heading displayed

# Expected Final Result

The "License Assignment" heading is visible inside the opened inline approval form.

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