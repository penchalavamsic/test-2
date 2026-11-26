---
test_id: "LIMAS-SUD-1532"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Email Filter\" → \"Trigger on Enter key with debounce, POST request, page reset to 0, size preserved\""
module: "Reports"
page: "Reports"
section: "Email Filter"
control: "Email Filter"
action: "Trigger on Enter key, debounce behavior, request via POST /api/report/standardlicenses, page reset to 0, size preserved"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Reports Standard Licenses RSL-C"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "not-generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: ""
---

# Purpose

Verify that typing an email value and pressing Enter triggers a POST request to `/api/report/standardlicenses` after debounce, with `page` reset to 0 and `size` preserved at its current value.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to the Reports page.
- Standard Licenses card is selected and the filter panel is expanded.
- An initial data load has completed.

# Test Data

Use `{runtimeEmail}` as a placeholder email value.

# Steps and Expected Results

1. Action: Type `{runtimeEmail}` into the Email input and press Enter.
   Expected Result: After a debounce interval, a POST request to `/api/report/standardlicenses` fires.

2. Action: Verify the request query string contains `page=0`.
   Expected Result: Page parameter is reset to 0.

3. Action: Verify the request query string contains the `size` parameter with the same value as the initial load.
   Expected Result: Size parameter is preserved.

4. Action: Verify the request body includes the `email` field with the typed value as a string.
   Expected Result: Email value is submitted correctly in the POST body.

# Network Verification

- Request URL: `POST /api/report/standardlicenses?page=0&size={size}`
- HTTP Method: POST
- Expected Status: 200
- Payload: `{ "email": "{runtimeEmail}" }` as a JSON string field

# Expected Final Result

Pressing Enter after typing an email triggers a debounced POST request with `page=0` and size preserved.

# Classification

- Data-changing (read-only filter request)
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode email addresses.
- Do not repeat data-changing submissions.

# Generation Status

- Test script generation: Pending
- CI/CD execution: Pending
- Healing: Pending