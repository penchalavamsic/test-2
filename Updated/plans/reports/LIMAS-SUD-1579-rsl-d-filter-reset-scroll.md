---
test_id: "LIMAS-SUD-1579"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Filter Reset\" → \"Applying date filter after infinite scroll resets to page=0, stale rows removed, scroll resets, sentinel recalculated\""
module: "Reports"
page: "Reports"
section: "Filter Reset"
control: "Infinite-Scroll Reset"
action: "Initial page had scrolled rows appended, applying date filter resets to page=0, stale appended rows removed, loaded count resets to filtered batch size, scroll position resets, sentinel recalculates, no stale continuation requests"
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

Verify that applying a date filter after infinite-scroll pages have been appended resets the view to `page=0`, removes all stale appended rows, resets the loaded count to the filtered batch size, resets the scroll position, recalculates the sentinel element, and does not fire stale continuation requests.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to the Reports page.
- Standard Licenses card is selected, the filter panel is expanded, and the Active tab is selected.
- Multiple infinite-scroll pages have been loaded (e.g., scrolled to load page 1, 2, 3).

# Test Data

Use `{runtimeCurrentDate}` as the date filter trigger. Track scroll position and sentinel element.

# Steps and Expected Results

1. Action: Scroll the unfiltered table to trigger at least two additional page loads; verify rows are appended.
   Expected Result: Table contains rows from page 0, 1, and 2.

2. Action: Note the current scroll position and loaded count, then apply Expiration Date with `{runtimeCurrentDate}`.
   Expected Result: A POST request with `page=0` and `expirationDate` fires.

3. Action: Assert only rows from the new filtered `page=0` response are visible (no stale rows from previous unfiltered pages).
   Expected Result: Stale appended rows are removed.

4. Action: Assert the loaded count resets to the filtered batch size (≤10).
   Expected Result: Loaded count reflects filtered `size`.

5. Action: Assert the scroll position has reset to the top of the table or scroll container.
   Expected Result: Scroll is reset.

6. Action: Assert the sentinel element (intersection observer trigger) is recalculated and positioned after the new filtered rows.
   Expected Result: Sentinel correctly placed for the filtered result set.

7. Action: Scroll to trigger the next filtered page load and assert the request uses the filtered criteria (not the unfiltered continuation).
   Expected Result: Subsequent infinite scroll uses the date filter context.

# Network Verification

- Filter request: `POST /api/report/standardlicenses?page=0&size=10` with `expirationDate`.
- Next scroll request: same `expirationDate` with `page=1`.
- No unfiltered pages appended after date filter.

# Expected Final Result

Applying a date filter after infinite scroll resets to `page=0`, removes stale rows, resets scroll, and recalculates the sentinel.

# Classification

- Read-only
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode dates, scroll positions, or page numbers.
- Do not repeat data-changing submissions.

# Generation Status

- Test script generation: Pending
- CI/CD execution: Pending
- Healing: Pending