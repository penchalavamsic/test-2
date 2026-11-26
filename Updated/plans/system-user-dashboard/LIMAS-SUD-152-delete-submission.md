---
test_id: "LIMAS-SUD-152"
title: 'To verify the functionality of "System User Dashboard" → "Pending License Requests" → "Delete" → "Submit Deletion"'
module: "system-user-dashboard"
page: "/system-user-dashboard"
section: "Pending License Requests"
control: "Delete button"
action: "Delete a pending request and verify the API call and count update"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P0"
classification: "Data-changing"
test_type: "API/Functional"
automation_candidate: true
plan_status: "reviewed"
script_status: "generated"
environment_variables:
  - "LIMAS_BASE_URL"
  - "LIMAS_SUPER_USER_ADMIN_USER_USERNAME"
  - "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"
  - "TEST_RECORD_IDENTIFIER"
  - "DEDICATED_DISPOSABLE_REQUEST"
test_data:
  TEST_RECORD_IDENTIFIER: "Runtime request ID (e.g., LR-XXXXX) used to locate the pending request"
  DEDICATED_DISPOSABLE_REQUEST: "Must be true — ensures a safe dedicated request is used"
related_script: ""
---

# Purpose

Delete a pending license request and verify the DELETE API call, the pending count decrement, and the request removal from the list.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- A dedicated disposable pending request exists, identified by `${TEST_RECORD_IDENTIFIER}`.
- `${DEDICATED_DISPOSABLE_REQUEST}` is set to `true`.

# Important: Delete is immediate

Confirmed by live observation: clicking the Delete button immediately sends the DELETE request. There is no confirmation dialog. The delete action is irreversible through the UI.

# Test Data

All values from environment variables. Do not hardcode.

# Steps and Expected Results

1. Action: Search for the pending request identified by `${TEST_RECORD_IDENTIFIER}`.
   Expected Result: The specific request row is visible.

2. Action: Click the Delete button on that row exactly once.
   Expected Result: Delete button clicked.

3. Action: Wait for the observed API request.
   Expected Result: A DELETE request is sent.

4. Action: Verify HTTP method, sanitized URL, and response status.
   Expected Result: DELETE, URL matches expected pattern, status 200.

5. Action: Verify the pending count decreases.
   Expected Result: Pending count decrements by at least 1.

6. Action: Verify the deleted request is removed from the list.
   Expected Result: Request row no longer present.

# Network Verification

- Request URL: Expected pattern matching the API deletion endpoint.
- HTTP Method: DELETE.
- Expected Status: 200 OK.
- Visible UI Result: Pending count decrements; request row removed.

# Expected Final Result

The request is deleted, the API returns success, and the pending list is updated.

# Classification

- Data-changing
- Positive

# Restrictions

- Must use dedicated disposable test data only.
- Submit exactly once.
- Do not select an arbitrary request.
- CI/CD controls execution.
- Note: No confirmation dialog — deletion is immediate.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending