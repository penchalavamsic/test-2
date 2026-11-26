---
test_id: "LIMAS-SUD-1536"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Email Filter\" → \"Partial email fragment filtering returns matching rows with substring match\""
module: "Reports"
page: "Reports"
section: "Email Filter"
control: "Partial Email"
action: "Partial email fragment filtering returns matching rows (substring match), page=0, filtered count update"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
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

Verify that entering a partial email fragment (substring, such as a domain or a prefix) triggers a filter request with `page=0`, returns only rows whose email column contains the fragment, and updates the filtered count accordingly.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to the Reports page.
- Standard Licenses card is selected and the filter panel is expanded.
- Unfiltered data contains multiple email addresses with a common substring.

# Test Data

Use `{runtimePartialEmail}` as a partial email fragment known to match at least one row.

# Steps and Expected Results

1. Action: Type `{runtimePartialEmail}` into the Email input and press Enter.
   Expected Result: A POST request fires with `page=0`.

2. Action: Assert the filtered total count is greater than 0 and less than the unfiltered total.
   Expected Result: Partial match returns a subset of rows.

3. Action: Assert every visible row's email column contains `{runtimePartialEmail}` as a substring (case-insensitive match).
   Expected Result: Substring matching is in effect; no rows lack the fragment.

4. Action: Assert the loaded count equals the number of visible rows.
   Expected Result: Loaded count is consistent.

# Network Verification

- Request URL: `POST /api/report/standardlicenses?page=0&size={size}`
- Payload: `{ "email": "{runtimePartialEmail}" }`

# Expected Final Result

Partial email fragments produce substring-matched filtered results with correct counts.

# Classification

- Read-only
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode email fragments or row data.
- Do not repeat data-changing submissions.

# Generation Status

- Test script generation: Pending
- CI/CD execution: Pending
- Healing: Pending