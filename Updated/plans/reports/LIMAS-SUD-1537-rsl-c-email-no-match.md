---
test_id: "LIMAS-SUD-1537"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Email Filter\" → \"No-match email returns zero results with empty state and Clear restores\""
module: "Reports"
page: "Reports"
section: "Email Filter"
control: "No-Match"
action: "No-match email returns zero results, empty state message, loaded=0 total=0, Clear restores original data"
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

Verify that entering an email value that matches no records returns zero results, displays an empty state message, shows `loaded=0` and `total=0`, and clicking Clear restores the original unfiltered data.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to the Reports page.
- Standard Licenses card is selected and the filter panel is expanded.
- Initial unfiltered data is loaded with a non-zero total.

# Test Data

Use `{runtimeNoMatchEmail}` as an email value known to match zero records.

# Steps and Expected Results

1. Action: Note the unfiltered total count, then type `{runtimeNoMatchEmail}` and press Enter.
   Expected Result: A POST request fires.

2. Action: Assert the total count displays 0.
   Expected Result: Filtered total is zero.

3. Action: Assert the loaded count displays 0.
   Expected Result: No rows are loaded.

4. Action: Assert an empty state message or visual indicator is visible (e.g., "No results found" or empty table body).
   Expected Result: Empty state is shown to the user.

5. Action: Click the Clear button.
   Expected Result: Original unfiltered total count is restored and data rows reappear.

# Network Verification

- Request URL: `POST /api/report/standardlicenses?page=0&size={size}`
- Payload: `{ "email": "{runtimeNoMatchEmail}" }`
- Response: `{ content: [], totalElements: 0 }` with zero results

# Expected Final Result

A no-match email returns zero results with an empty state, and Clear restores the original unfiltered view.

# Classification

- Read-only
- Negative

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode email addresses.
- Do not repeat data-changing submissions.

# Generation Status

- Test script generation: Pending
- CI/CD execution: Pending
- Healing: Pending