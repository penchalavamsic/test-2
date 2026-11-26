---
test_id: "LIMAS-SUD-1790"
title: "To verify the functionality of \"Reports\" → \"Floating Configurations\" → \"Deleted Mode\" → \"Filter Client-Side Contract\""
module: "Reports"
page: "Reports"
section: "Floating Configurations"
control: "Deleted Mode"
action: "Filter Client-Side Contract"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Reports Floating Configurations RFC-C"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/reports/reports-floating-configurations-deleted.spec.ts"
---

# Purpose

Verify that filtering in Deleted mode is entirely client-side: no server requests fire during filter input, only the initial page-0 and page-1 GET requests to alldeleted are observed, and all filter operations act on preloaded data.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated on the Reports page with Floating Configurations selected.
- Deleted mode has been selected and fully loaded.

# Test Data

Filter values are chosen from the loaded dataset at runtime.

# Steps and Expected Results

1. Action: Set up network interception after Deleted mode fully loads.
   Expected Result: The initial two GET requests (page=0, page=1) to alldeleted have completed. No further requests are pending.

2. Action: Type into "Deleted By" filter. Observe network.
   Expected Result: No new API requests are fired.

3. Action: Type into "Created By" filter. Observe network.
   Expected Result: No new API requests are fired.

4. Action: Type into "Group Name" filter. Observe network.
   Expected Result: No new API requests are fired.

5. Action: Click Clear. Observe network.
   Expected Result: If a reload is triggered, a GET may fire; if not, no request. Record the runtime behavior.

6. Action: Confirm that all filter operations (input, clear, combined) are client-side.
   Expected Result: The total API request count after the initial two page loads is zero (or one reload GET on Clear, depending on implementation).

# Network Verification

- Initial: GET {runtimeBaseUrl}/api/report/alldeleted?page=0&size={runtimeSize} → 200
- Initial: GET {runtimeBaseUrl}/api/report/alldeleted?page=1&size={runtimeSize} → 200
- During filter input: No requests
- On Clear: Record whether a GET fires or not at runtime.

# Expected Final Result

All filter operations in Deleted mode are client-side. No server requests fire during filter input; only the initial data-fetch requests are observed.

# Classification

- Read-only
- Positive

# Restrictions

- Do not hardcode API paths, page, or size values. Read dynamically.
- Do not include credentials, tokens, cookies, or sensitive payloads.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending