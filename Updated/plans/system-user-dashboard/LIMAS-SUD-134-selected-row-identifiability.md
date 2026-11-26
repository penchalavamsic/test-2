---
test_id: "LIMAS-SUD-134"
title: 'To verify the functionality of "System User Dashboard" → "Pending License Requests" → "Inline Form" → "Selected Row Remains Visually Distinct When Form Open"'
module: "system-user-dashboard"
page: "/system-user-dashboard"
section: "Pending License Requests"
control: "Table row with open form"
action: "Verify the row with an open inline form remains visually distinct from other rows"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
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

Verify that the table row which has an open inline approval form remains visually identifiable — for example, the row retains its Approve/Close button state indicating the form belongs to that row.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The user is authenticated on `/system-user-dashboard`.
- At least one pending license request row is visible with an Approve button.
- The inline approval form is open on that row.

# Test Data

None.

# Steps and Expected Results

1. Action: Click Approve on a row to open the form.
   Expected Result: The button on that row changes to "Close" with aria-expanded="true".

2. Action: Inspect other rows.
   Expected Result: Other rows' Approve buttons still read "Approve" and are not expanded. Only the row with the open form has a "Close" button.

3. Action: Verify the form is positioned within or directly after the row.
   Expected Result: The form is visually associated with the selected row (the row with "Close" button).

# Network Verification

- Request URL: N/A
- HTTP Method: N/A
- Expected Status: N/A
- Payload Presence: N/A
- Visible UI Result: Only one row has "Close" + expanded state; form is associated with that row

# Expected Final Result

The row with an open form is uniquely identifiable by its "Close" button and expanded state, distinguishing it from all other rows.

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