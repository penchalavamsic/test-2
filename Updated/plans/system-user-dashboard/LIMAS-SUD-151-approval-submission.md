---
test_id: "LIMAS-SUD-151"
title: 'To verify the functionality of "System User Dashboard" → "Pending License Requests" → "Approve Request" → "Submit Approval"'
module: "system-user-dashboard"
page: "/system-user-dashboard"
section: "Pending License Requests"
control: "Approve Request submit"
action: "Submit a valid approval and verify the request is removed from pending"
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
  - "TEST_USER_GROUP"
  - "TEST_PROFILE"
  - "TEST_ROLE"
  - "TEST_EXPIRATION_DATE"
  - "TEST_MAINTENANCE_DATE"
test_data:
  TEST_RECORD_IDENTIFIER: "Runtime request ID used to locate the pending request"
  TEST_USER_GROUP: "Runtime User Group name"
  TEST_PROFILE: "Runtime Profile name"
  TEST_ROLE: "Runtime Role name"
  TEST_EXPIRATION_DATE: "Runtime expiration date"
  TEST_MAINTENANCE_DATE: "Runtime maintenance date"
related_script: ""
---

# Purpose

Submit a valid approval for a pending license request and verify the API call, the pending count decrement, and the request removal from the list.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- A dedicated disposable pending request exists, identified by `${TEST_RECORD_IDENTIFIER}`.
- Test data (`${TEST_USER_GROUP}`, `${TEST_PROFILE}`, `${TEST_ROLE}`, `${TEST_EXPIRATION_DATE}`, `${TEST_MAINTENANCE_DATE}`) is configured.

# Test Data

All values from environment variables. Do not hardcode.

# Steps and Expected Results

1. Action: Navigate to the pending request identified by `${TEST_RECORD_IDENTIFIER}` using search.
   Expected Result: The specific request row is visible.

2. Action: Click Approve on that row.
   Expected Result: Inline form opens with Close button and License Assignment heading.

3. Action: Select `${TEST_USER_GROUP}`.
   Expected Result: User Group value displayed.

4. Action: Select `${TEST_PROFILE}`.
   Expected Result: Profile value displayed; Role and Expiration Date fields appear.

5. Action: Select `${TEST_ROLE}`.
   Expected Result: Role value displayed.

6. Action: Set `${TEST_EXPIRATION_DATE}`.
   Expected Result: Expiration Date displayed.

7. Action: If Maintenance Date is enabled, set `${TEST_MAINTENANCE_DATE}`.
   Expected Result: Maintenance Date displayed.

8. Action: Verify Approve Request is enabled and click it exactly once.
   Expected Result: Button clicked.

9. Action: Wait for the observed API request.
   Expected Result: A PUT request is sent to the license assignment endpoint.

10. Action: Verify HTTP method, sanitized URL, and response status.
    Expected Result: PUT, URL matches expected pattern, status 200.

11. Action: Verify the pending count decreases.
    Expected Result: Pending count decrements by at least 1.

12. Action: Verify the approved request is removed from the pending list.
    Expected Result: Request row no longer present.

# Network Verification

- Request URL: Expected pattern matching the API approval endpoint.
- HTTP Method: PUT (expected).
- Expected Status: 200 OK.
- Payload Presence: Must include User Group, Profile, Role, Expiration Date, and Maintenance Date.
- Visible UI Result: Pending count decrements; request row removed.

# Expected Final Result

The approval is submitted, the API returns success, and the pending request is removed from the list.

# Classification

- Data-changing
- Positive

# Restrictions

- Must use dedicated disposable test data only.
- Submit exactly once.
- Do not select an arbitrary request.
- CI/CD controls execution.
- Do not hardcode API contract values not confirmed by live observation.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending