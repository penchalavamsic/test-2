---
test_id: "LIMAS-SUD-1578"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Core Filter + Date\" → \"Email filter plus Expiration Date, both chips visible, POST with email and expirationDate, filtered counts update, rows match both criteria, Clear restores\""
module: "Reports"
page: "Reports"
section: "Core Filter + Date"
control: "Email + Expiration"
action: "Email filter applied with runtime email (Enter trigger), Expiration Date filled with runtime date, both chips visible, POST body contains both email string and expirationDate timestamp, page=0, filtered counts update, rows match both criteria, Clear restores unfiltered data"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Reports Standard Licenses RSL-D"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "not-generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: ""
---

# Purpose

Verify that combining a core filter (Email) with a date filter (Expiration Date) displays both filter chips, sends a POST body containing both the `email` string and `expirationDate` timestamp with `page=0`, updates filtered counts, ensures visible rows match both criteria, and Clear restores the unfiltered state.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to the Reports page.
- Standard Licenses card is selected, the filter panel is expanded, and the Active tab is selected.
- All filters are in their default empty state.

# Test Data

Use `{runtimeEmail}` as the email filter value and `{runtimeCurrentDate}` for Expiration Date. Intercept network requests.

# Steps and Expected Results

1. Action: Type `{runtimeEmail}` in the Email filter input and press Enter to apply.
   Expected Result: Email filter chip appears; filtered results load.

2. Action: Set Expiration Date to `{runtimeCurrentDate}` via the native picker.
   Expected Result: A new POST fires; the `Exp: {runtimeCurrentDate}` chip appears alongside the email chip.

3. Action: Assert both filter chips are visible simultaneously (email chip and Exp chip).
   Expected Result: Two distinct chips present.

4. Action: Parse the POST body and assert it contains both `email` as a string equal to `{runtimeEmail}` and `expirationDate` as an ISO UTC timestamp with `page=0`.
   Expected Result: Body: `{ email: "{runtimeEmail}", expirationDate: "...", page: 0, size: 10 }`.

5. Action: Assert the filtered total count updates to reflect the combined criteria.
   Expected Result: Toolbar count matches combined filtered `totalElements`.

6. Action: Assert visible rows satisfy both the email criterion and the date criterion.
   Expected Result: Rows match both filter criteria.

7. Action: Click Clear and assert unfiltered data with original counts returns, both chips are removed, and all filter inputs are empty.
   Expected Result: Clear fully restores unfiltered state.

# Network Verification

- POST to `/api/report/standardlicenses?page=0&size=10`
- Body contains: `email` (string), `expirationDate` (ISO UTC), `page`, `size`, plus other null fields
- Response: paginated JSON filtered by both criteria

# Expected Final Result

Combining Email and Expiration Date filters sends a single POST with both fields, displays both chips, returns intersected results, and Clear restores the full unfiltered state.

# Classification

- Read-only
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode email addresses, dates, or counts.
- Do not repeat data-changing submissions.

# Generation Status

- Test script generation: Pending
- CI/CD execution: Pending
- Healing: Pending