---
test_id: "LIMAS-SUD-1581"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"No-Result State\" → \"No-match date: loaded=0 total=0, toolbar base unchanged, empty state, headers present, chip visible, Clear accessible\""
module: "Reports"
page: "Reports"
section: "No-Result State"
control: "No-Match Date"
action: "Date unlikely to produce records entered, loaded=0 total=0, toolbar base count unchanged, empty state appears, table headers present, date value visible in chip, Clear accessible, Active stays pressed, Clear restores initial data"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
classification: "Reports Standard Licenses RSL-D"
test_type: "Negative"
automation_candidate: true
plan_status: "Reviewed"
script_status: "not-generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: ""
---

# Purpose

Verify the no-result state when a date unlikely to produce matching records is entered: loaded count shows 0, filtered total shows 0, the toolbar base count remains unchanged, the empty state UI is displayed, table headers remain visible, the date value is visible in the filter chip, the Clear button is accessible, the Active tab stays pressed, and Clear restores initial data.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to the Reports page.
- Standard Licenses card is selected, the filter panel is expanded, and the Active tab is selected.
- Unfiltered data is loaded with a non-zero total.

# Test Data

Use `{runtimeNoMatchDate}` — a date extremely unlikely to produce matching records (e.g., far in the past or future).

# Steps and Expected Results

1. Action: Set Expiration Date to `{runtimeNoMatchDate}`.
   Expected Result: A POST fires; the response returns `totalElements: 0` and `content: []`.

2. Action: Assert the loaded count is 0 and the filtered total is 0.
   Expected Result: Loaded=0, total=0.

3. Action: Assert the toolbar base count (e.g., total Active records) is unchanged.
   Expected Result: The base count from the unfiltered initial load is still displayed.

4. Action: Assert the empty state UI is displayed (e.g., a "No results found" message or similar).
   Expected Result: Empty state message visible.

5. Action: Assert the table headers are still present and visible.
   Expected Result: Column headers persist even with zero rows.

6. Action: Assert the filter chip `Exp: {runtimeNoMatchDate}` is visible with the date and a Remove button.
   Expected Result: Chip shows the applied no-match date.

7. Action: Assert the Clear button is accessible and visible.
   Expected Result: Clear is available to reset the filter.

8. Action: Assert the Active tab remains in the pressed/selected state.
   Expected Result: Active tab stays pressed.

9. Action: Click Clear and assert the unfiltered data with full counts returns.
   Expected Result: Clear restores initial data.

# Network Verification

- POST returns `{ totalElements: 0, content: [] }` with 200 status.
- No error state or broken UI.

# Expected Final Result

A no-match date filter displays a proper empty state with 0 counts, preserves table headers and toolbar base count, keeps the chip and Clear accessible, and Clear restores initial data.

# Classification

- Read-only
- Negative

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode dates or counts.
- Do not repeat data-changing submissions.

# Generation Status

- Test script generation: Pending
- CI/CD execution: Pending
- Healing: Pending