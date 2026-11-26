---
test_id: "LIMAS-SUD-1576"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Date Clear\" → \"Global Clear with core filter plus date resets both, Profile Role clears and disables, single POST, unfiltered data returns\""
module: "Reports"
page: "Reports"
section: "Date Clear"
control: "Global Clear Core + Date"
action: "One core filter plus one date populated, Clear resets both core and date filters, Profile Role clears and disables, single POST, unfiltered data returns, all filter inputs empty"
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

Verify that clicking the global Clear button when one core filter (Profile Role) and one date filter (Expiration Date) are both populated resets all filters including both categories, clears Profile Role and returns it to the disabled state, fires a single POST with all fields reset, returns unfiltered data, and leaves all filter inputs empty.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to the Reports page.
- Standard Licenses card is selected, the filter panel is expanded, and the Active tab is selected.
- A Product Profile has been selected (enabling Profile Role), a Profile Role has been selected, and Expiration Date has a date applied (`{runtimeCurrentDate}`). Filtered results are displayed.

# Test Data

Use `{runtimeCurrentDate}` as the applied date. Use a product-profile and profile-role combination from available options. Intercept network requests.

# Steps and Expected Results

1. Action: Apply a Product Profile, select a Profile Role, and populate Expiration Date with `{runtimeCurrentDate}`. Confirm filtered results display.
   Expected Result: Profile Role has a value; Expiration Date chip is visible; filtered state active.

2. Action: Click the global Clear button.
   Expected Result: A single POST request fires.

3. Action: Assert all core filter inputs (email, hardware IDs, user group, product profile, profile role) are empty.
   Expected Result: All core filter fields cleared.

4. Action: Assert Profile Role is disabled (no product profile selected to enable it).
   Expected Result: Profile Role control is in disabled state.

5. Action: Assert all date inputs (Expiration, Maintenance, Created, Modified) are empty.
   Expected Result: All four date controls cleared.

6. Action: Assert all filter chips are removed.
   Expected Result: No filter chips visible.

7. Action: Assert the POST body contains all filter fields as null/empty with `page=0`.
   Expected Result: No filter values in body.

8. Action: Assert unfiltered data is returned and counts match the original unfiltered values.
   Expected Result: Counts restored.

9. Action: Assert only a single POST request was triggered.
   Expected Result: No duplicate reset requests.

# Network Verification

- Clear triggers: `POST /api/report/standardlicenses?page=0&size=10`
- Body: all filter fields as null/empty
- Response: full unfiltered paginated JSON
- Exactly one request

# Expected Final Result

Global Clear with a core filter and a date filter resets both categories, disables Profile Role, fires a single POST, and fully restores the unfiltered state.

# Classification

- Read-only
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode dates, profile names, or counts.
- Do not repeat data-changing submissions.

# Generation Status

- Test script generation: Pending
- CI/CD execution: Pending
- Healing: Pending