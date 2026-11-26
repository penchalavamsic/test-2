---
test_id: "LIMAS-SUD-1564"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Expiration Date\" → \"Same date re-entered: verify whether duplicate request fires, no duplicate simultaneous request, no stale state, Clear restores\""
module: "Reports"
page: "Reports"
section: "Expiration Date"
control: "Same Date Reapply"
action: "Same date entered again, verify whether duplicate request fires, no duplicate simultaneous request, no stale state, Clear restores"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
classification: "Reports Standard Licenses RSL-D"
test_type: "Edge"
automation_candidate: true
plan_status: "Reviewed"
script_status: "not-generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: ""
---

# Purpose

Verify the edge case where the same date already applied in the Expiration Date control is re-entered: observe whether a duplicate POST request is suppressed or fired, ensure no duplicate simultaneous requests occur, and confirm the state does not become stale, with Clear restoring the unfiltered state.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to the Reports page.
- Standard Licenses card is selected, the filter panel is expanded, and the Active tab is selected.
- `{runtimeCurrentDate}` has already been applied in Expiration Date and results are loaded.

# Test Data

Use `{runtimeCurrentDate}` as the already-applied date. Intercept network requests to detect duplicates.

# Steps and Expected Results

1. Action: Note the current filtered state, row count, and most recent request timestamp, then re-enter `{runtimeCurrentDate}` in Expiration Date.
   Expected Result: Observe whether a `change` event fires.

2. Action: Monitor network requests for duplicate POST to `/api/report/standardlicenses` with the same `expirationDate`.
   Expected Result: No duplicate simultaneous request fires; if a request does fire it is at most one.

3. Action: Assert the UI state (chip, counts, rows) remains consistent and does not enter a stale or loading-locked state.
   Expected Result: UI state is stable; chip shows the same date; no flicker or stale data.

4. Action: Click Clear and assert unfiltered data with original counts is restored.
   Expected Result: Clear restores initial state.

# Network Verification

- After re-entering the same date, observe whether the network emits a new POST.
- If a request fires, it must be a single request (no duplicate simultaneous).
- Response shape matches the expected filtered result.

# Expected Final Result

Re-entering the same date either suppresses a redundant request or fires a single request without duplicates; the UI state remains consistent; Clear restores the unfiltered state.

# Classification

- Read-only
- Edge

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode dates or counts.
- Do not repeat data-changing submissions.

# Generation Status

- Test script generation: Pending
- CI/CD execution: Pending
- Healing: Pending