---
test_id: "LIMAS-SUD-1698"
title: "To verify the functionality of \"Reports\" → \"Floating Licenses\" → \"Mode Control\" → \"Deleted to Active Switching — Full Restoration\""
module: "Reports"
page: "Reports"
section: "Floating Licenses"
control: "Mode Control"
action: "Deleted to Active Switching — Full Restoration"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
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

Verify that switching from Deleted mode (with filters applied) back to Active mode fully restores the Active state: Active becomes pressed, Deleted unpressed, Active API contract used, initial page/offset restored, Deleted rows removed, Active counts/state return, scroll resets, sentinel resets, and route stays /reports.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses is selected, Deleted mode is active with filters applied (e.g., Product Profile + Expiration Date).

# Test Data

Use placeholders: {runtimeProfile}, {runtimeDate}.

# Steps and Expected Results

1. Action: In Deleted mode, apply one or more filters and note the filtered state.
   Expected Result: Filters are applied, chips visible.

2. Action: Click the Active mode button.
   Expected Result: Active button aria-pressed becomes "true". Deleted button aria-pressed becomes "false".

3. Action: Verify the Active API contract is used.
   Expected Result: A GET request to the Active floating licenses endpoint (allfloatinglicenses) is observed with page=0 and appropriate size.

4. Action: Verify Deleted rows are removed from the DOM.
   Expected Result: No Deleted-specific rows remain.

5. Action: Verify Active counts and state are restored.
   Expected Result: Toolbar shows Active record counts matching the Active API response.

6. Action: Verify scroll resets to top.
   Expected Result: Scroll position is at top.

7. Action: Verify the sentinel is reset for Active mode.
   Expected Result: Sentinel is positioned for the Active infinite-scroll container.

8. Action: Verify route remains /reports.
   Expected Result: Browser URL path is /reports.

# Network Verification

A GET request to the Active allfloatinglicenses endpoint with page=0 is triggered.

# Expected Final Result

Switching Deleted → Active fully restores Active mode with correct API, counts, scroll, sentinel, and route — Deleted state is cleanly removed.

# Classification

- Read-only
- Positive

# Restrictions

- Do not hardcode API paths, counts, or scroll values.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending