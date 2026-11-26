---
test_id: "LIMAS-SUD-1061"
title: "To verify the functionality of \"User & License Hub\" → \"User List\" → \"Pagination\" → \"Final Page Boundary State\""
module: "User & License Hub"
page: "User & License Hub"
section: "User List"
control: "Pagination"
action: "Final Page Boundary State"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
classification: "Read-only"
test_type: "Boundary"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Not Started"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/user-license-hub/user-license-hub-pagination-boundaries.spec.ts"
---

# Purpose

Verify the final page boundary state — not directly reachable through a bounded number of Next clicks in a short test session when total pages is large. This plan defines the expected source-supported behavior: on the final page, Next should be disabled, Previous should be enabled, and the showing range should end at total (e.g., 1821–1823 of 1823 when size=20).

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is navigated to the final page (direct navigation via API page parameter or sufficient Next clicks).

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to the final page (page = totalPages) via API page parameter direct navigation or by navigating forward until Next is disabled.
   Expected Result: "Page {m} of {m}" displayed where current page equals total pages.

2. Action: Check Next button state.
   Expected Result: Next is disabled (disabled attribute or aria-disabled="true").

3. Action: Check Previous button state.
   Expected Result: Previous is enabled.

4. Action: Verify the showing range.
   Expected Result: "Showing {total - remainder + 1}–{total} of {total}" where remainder = total % pageSize (or pageSize if remainder=0). End equals total.

5. Action: Verify visible card count equals the remainder on the last page.
   Expected Result: Card count = total % pageSize (or pageSize if divisible).

# Network Verification

GET /api/users/f with page = totalPages - 1 (API 0-based); no POST/PUT/PATCH/DELETE.

# Expected Final Result

Final page has Next disabled, Previous enabled, showing range ends at total, and only remaining records are displayed.

# Classification

- Read-only
- Boundary
- Source-supported (not live-observable in short session due to 92 pages)

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Use direct page= parameter navigation if available; otherwise mark as deferred.

# Generation Status

- Test script generation: Not Started (deferred — requires direct final-page navigation mechanism or 91 Next clicks)
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Source-supported: with 1823 total and size 20, final page = 92, remainder = 3. Expected: "Showing 1821–1823 of 1823", Next disabled, Previous enabled.