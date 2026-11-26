---
test_id: "LIMAS-SUD-1702"
title: "To verify the functionality of \"Reports\" → \"Floating Licenses\" → \"Mode Control\" → \"Accessibility — Mode Change, Loading, Count, and Focus Announcements\""
module: "Reports"
page: "Reports"
section: "Floating Licenses"
control: "Mode Control"
action: "Accessibility — Mode Change, Loading, Count, and Focus Announcements"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
classification: "Reports Floating Licenses RFL-C"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
execution_status: "Not Run"
ci_cd_execution: "Pending"
healing: "Pending"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/reports/reports-floating-licenses-active-deleted.spec.ts"
---

# Purpose

Verify that mode changes are announced to assistive technology: mode-change announcement when switching Active ↔ Deleted, loading-state announcement during API fetch, count-update announcement after data loads, Deleted results announcement, and focus stability after switching (focus does not jump unexpectedly).

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses is selected, Active mode.

# Test Data

All observations dynamic.

# Steps and Expected Results

1. Action: Place focus on the Deleted button, activate it, and inspect the live region announcement (if any).
   Expected Result: A mode-change announcement is communicated (e.g., via aria-live region or role="status").

2. Action: During the Deleted API fetch, inspect for a loading-state announcement.
   Expected Result: A loading announcement (e.g., "Loading" or aria-busy) is communicated.

3. Action: After the Deleted data loads, inspect for a count-update announcement.
   Expected Result: The new record count is announced (e.g., "{n} results loaded").

4. Action: Inspect for a Deleted results announcement.
   Expected Result: The results region communicates that it now shows Deleted license records.

5. Action: After switching, verify focus stability.
   Expected Result: Focus remains on or near the mode control group — it does not jump to an unrelated element.

6. Action: Switch back to Active and repeat the announcement checks.
   Expected Result: Active mode announcement, loading announcement, count announcement, and results announcement are communicated similarly.

# Network Verification

No specific network assertions beyond tracking request completion for announcement timing.

# Expected Final Result

Mode changes announce mode, loading, counts, and results to assistive technology, and focus remains stable after switching.

# Classification

- Read-only
- Positive
- Accessibility

# Restrictions

- Use Playwright accessibility snapshot or aria-live region inspection.
- Document any missing announcements as accessibility gaps.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending