---
test_id: "LIMAS-SUD-1519"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Infinite Scroll\" → \"No duplicate next-page requests\""
module: "Reports"
page: "Reports"
section: "Standard Licenses Infinite Scroll"
control: "Duplicate Requests"
action: "No duplicate next-page request"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Reports Standard Licenses RSL-B"
test_type: "Positive"
automation_candidate: true
plan_status: "draft"
script_status: "not-generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: ""
---

# Purpose

Verify that during exactly one additional batch load, no duplicate request (same page number) is sent.

# Preconditions

- Initial batch visible.
- Scroll observer active for the next-page request.

# Test Data

Use Playwright network interception to track all GET requests to `/api/report/allstandardlicenses`.

# Steps and Expected Results

1. Action: Record all API requests to the Standard Licenses endpoint before the scroll action.
   Expected Result: Baseline request list captured.

2. Action: Trigger exactly one additional load.
   Expected Result: One or more new requests fire.

3. Action: Collect all new request URLs after the trigger.
   Expected Result: Each page parameter value appears exactly once across all requests.

4. Action: Verify no page value was requested more than once.
   Expected Result: Unique page numbers only.

# Network Verification

- Each `page=n` value appears in exactly one request URL.
- No re-fetch of the same page.

# Expected Final Result

No duplicate requests for the same page number.

# Classification

- Read-only
- Positive

# Restrictions

- Do not hardcode page numbers.

# Generation Status

- Test script generation: Pending
- CI/CD execution: Pending
- Healing: Pending