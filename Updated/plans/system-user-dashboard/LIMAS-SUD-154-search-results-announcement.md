---
test_id: "LIMAS-SUD-154"
title: 'To verify the functionality of "System User Dashboard" → "Pending License Requests" → "Search" → "Results Announcement (Accessibility)"'
module: "system-user-dashboard"
page: "/system-user-dashboard"
section: "Pending License Requests"
control: "Search input"
action: "Document that search results filtering is not announced to screen readers"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P3"
classification: "Read-only"
test_type: "Accessibility"
automation_candidate: true
plan_status: "reviewed"
script_status: "generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/system-user-dashboard/LIMAS-SUD-154-search-results-announcement.spec.ts"
---

# Purpose

Verify that the search input for filtering license requests does not provide live-region announcements when results are filtered, and document this as an accessibility gap.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The user is authenticated on `/system-user-dashboard`.
- At least one pending license request exists in the table.

# Test Data

None.

# Steps and Expected Results

1. Action: Navigate to the dashboard, wait for full render, click the Pending License Requests card, and confirm the table is visible.
   Expected Result: The license request table is visible with rows.

2. Action: Locate the search input and confirm it has the placeholder "Search license requests...".
   Expected Result: The search input is visible with the expected placeholder.

3. Action: Type a filter string into the search input and observe whether any aria-live region or status announcement appears.
   Expected Result: No element with `aria-live="polite"`, `aria-live="assertive"`, or `role="status"` appears that announces the result count.

4. Action: Verify the table rows are filtered client-side but no accessible notification is emitted.
   Expected Result: The filtering is visual-only; no `role="alert"` or live region message is detected.

# Expected Final Result

The search filter operates as a client-side visual filter with no screen-reader announcement of changed results. This is documented as an accessibility gap.

# Classification

- Read-only
- Accessibility

# Restrictions

- Do not include credentials, tokens, cookies, authorization codes, or sensitive payloads.
- Do not repeat data-changing submissions.
- Do not manually navigate to simulate a successful result.
- Do not use static environment-specific data.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending