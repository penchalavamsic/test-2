---
test_id: "LIMAS-SUD-1568"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Maintenance Date\" → \"Clear Maintenance Date individually, input empties, POST with maintenanceDate=null, unfiltered data returns, page=0, no other field altered\""
module: "Reports"
page: "Reports"
section: "Maintenance Date"
control: "Clear"
action: "Clear Maintenance Date individually, input empties, POST with maintenanceDate=null, unfiltered data returns, page=0, no other field altered"
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

Verify that individually clearing the Maintenance Date filter via chip Remove empties the input, fires a POST with `maintenanceDate` as `null`, returns unfiltered data with `page=0`, restores original counts, and leaves all other filter controls unchanged.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to the Reports page.
- Standard Licenses card is selected, the filter panel is expanded, and the Active tab is selected.
- Maintenance Date has a date applied (`{runtimeCurrentDate}`) and filtered results are displayed.

# Test Data

Use `{runtimeCurrentDate}` as the initially applied date. Intercept network requests.

# Steps and Expected Results

1. Action: Apply `{runtimeCurrentDate}` in Maintenance Date and confirm the filtered state.
   Expected Result: `Maint: {runtimeCurrentDate}` chip visible; filtered results loaded.

2. Action: Click the Remove (×) button on the Maintenance Date filter chip.
   Expected Result: The chip is removed; the Maintenance Date input becomes empty.

3. Action: Assert a POST fires with `page=0` and `maintenanceDate` as `null` or not present.
   Expected Result: Body does not contain a date value for `maintenanceDate`.

4. Action: Assert unfiltered data returns and the total count matches the original unfiltered value.
   Expected Result: Counts restored to unfiltered state.

5. Action: Assert no other filter controls (email, hardware IDs, user group, product profile, profile role, other date fields) are altered.
   Expected Result: All other filters remain unchanged.

# Network Verification

- After clear, POST includes `maintenanceDate: null` or omits the field; `page=0`.
- Response returns full unfiltered paginated JSON.

# Expected Final Result

Individually clearing Maintenance Date via chip Remove empties the input, fires a POST without the date, restores unfiltered data, and leaves other filters unchanged.

# Classification

- Read-only
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode dates or counts.
- Do not repeat data-changing submissions.

# Generation Status

- Test script generation: Pending
- CI/CD execution: Pending
- Healing: Pending