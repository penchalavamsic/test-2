---
test_id: "LIMAS-SUD-1555"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Filter Reset\" → \"Applying filter resets to page=0, removes appended rows, resets scroll, recalculates sentinel\""
module: "Reports"
page: "Reports"
section: "Filter Reset"
control: "Infinite Scroll"
action: "Applying filter resets to page=0, existing appended rows removed, scroll position resets, sentinel recalculated, no stale pages appended"
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

Verify that applying an RSL-C filter after infinite-scroll pages have been appended resets the view to `page=0`, removes all appended rows, resets the scroll position, recalculates the sentinel element, and does not append stale pages.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to the Reports page.
- Standard Licenses card is selected and the filter panel is expanded.
- Multiple infinite-scroll pages have been loaded (e.g., scrolled to load page 1, 2, 3).

# Test Data

Use `{runtimeEmail}` as the filter trigger. Track scroll position and sentinel element.

# Steps and Expected Results

1. Action: Scroll to trigger at least two additional page loads and verify rows are appended.
   Expected Result: Table contains rows from page 0, 1, and 2.

2. Action: Note the current scroll position and number of visible rows, then apply the Email filter with `{runtimeEmail}`.
   Expected Result: A POST request with `page=0` fires.

3. Action: Assert only rows from the new `page=0` filtered response are visible (no stale rows from previous pages).
   Expected Result: Stale appended rows are removed.

4. Action: Assert the scroll position has reset to the top of the table or scroll container.
   Expected Result: Scroll is reset.

5. Action: Assert the sentinel element (intersection observer trigger) is recalculated and positioned after the new rows.
   Expected Result: Sentinel is correctly placed for the filtered result set.

6. Action: Scroll to trigger the next filtered page load and assert the request uses the filtered criteria.
   Expected Result: Subsequent infinite scroll uses the correct filter context.

# Network Verification

- Filter request: `POST /api/report/standardlicenses?page=0&size={size}` with filter body.
- Next scroll request: same filter body with `page=1`.
- No unfiltered pages appended after filter.

# Expected Final Result

Filtering resets infinite scroll state: `page=0`, stale rows removed, scroll reset, sentinel recalculated.

# Classification

- Read-only
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode email addresses, scroll positions, or page numbers.
- Do not repeat data-changing submissions.

# Generation Status

- Test script generation: Pending
- CI/CD execution: Pending
- Healing: Pending