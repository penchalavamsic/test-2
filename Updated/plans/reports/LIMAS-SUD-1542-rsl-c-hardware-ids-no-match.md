---
test_id: "LIMAS-SUD-1542"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Hardware IDs\" → \"No-match Hardware ID returns zero results, empty state, Clear restores\""
module: "Reports"
page: "Reports"
section: "Hardware IDs"
control: "No-Match"
action: "No-match Hardware ID returns zero results, empty state, Clear restores original data"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
classification: "Reports Standard Licenses RSL-C"
test_type: "Negative"
automation_candidate: true
plan_status: "Reviewed"
script_status: "not-generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: ""
---

# Purpose

Verify that entering a Hardware ID that matches no records returns zero results, displays an empty state, shows `loaded=0` and `total=0`, and clicking Clear restores the original unfiltered data.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to the Reports page.
- Standard Licenses card is selected and the filter panel is expanded.
- Unfiltered data is loaded with a non-zero total.

# Test Data

Use `{runtimeNoMatchHardwareId}` as a Hardware ID value known to match zero records.

# Steps and Expected Results

1. Action: Note the unfiltered total count, then type `{runtimeNoMatchHardwareId}` and press Enter.
   Expected Result: A POST request fires.

2. Action: Assert the total count displays 0.
   Expected Result: Filtered total is zero.

3. Action: Assert the loaded count displays 0.
   Expected Result: No rows loaded.

4. Action: Assert an empty state message or visual indicator is visible.
   Expected Result: Empty state is shown.

5. Action: Click Clear and assert the original unfiltered total and rows return.
   Expected Result: Clear restores the default view.

# Network Verification

- Request URL: `POST /api/report/standardlicenses?page=0&size={size}`
- Payload: `{ "hardwareId": ["{runtimeNoMatchHardwareId}"] }`
- Response: `{ content: [], totalElements: 0 }`

# Expected Final Result

A no-match Hardware ID returns zero results with an empty state, and Clear restores the original unfiltered view.

# Classification

- Read-only
- Negative

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode Hardware ID values.
- Do not repeat data-changing submissions.

# Generation Status

- Test script generation: Pending
- CI/CD execution: Pending
- Healing: Pending