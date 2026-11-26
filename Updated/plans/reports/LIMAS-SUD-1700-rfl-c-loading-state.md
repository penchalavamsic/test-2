---
test_id: "LIMAS-SUD-1700"
title: "To verify the functionality of \"Reports\" → \"Floating Licenses\" → \"Mode Control\" → \"Loading State During Mode Switch\""
module: "Reports"
page: "Reports"
section: "Floating Licenses"
control: "Mode Control"
action: "Loading State During Mode Switch"
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

Observe the loading indicator during a mode switch: toolbar visibility, previous-mode content retention during loading, count update timing, indicator disappearance, presence of aria-live or aria-busy, and mode control usability during loading. Document if the loading state is too transient to observe.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses is selected, Active mode with data loaded.

# Test Data

All observations are dynamic.

# Steps and Expected Results

1. Action: Click Deleted mode and immediately inspect the UI for a loading indicator (spinner, skeleton, progress bar).
   Expected Result: A loading indicator appears (or document "too transient to observe" if it flashes faster than inspection).

2. Action: While loading, verify the toolbar remains visible.
   Expected Result: Toolbar (mode controls, record count area) is still visible.

3. Action: Verify previous-mode content (Active rows) remains during loading, or is replaced by the indicator.
   Expected Result: Document whether Active rows persist during loading or are replaced.

4. Action: Wait for loading to complete and verify the count updates.
   Expected Result: Count transitions from previous value to Deleted value after the indicator disappears.

5. Action: Verify the loading indicator disappears after the request settles.
   Expected Result: No loading indicator remains.

6. Action: Inspect for aria-live or aria-busy attributes on the loading region.
   Expected Result: Document presence or absence of aria-live/aria-busy.

7. Action: Verify mode controls remain usable during loading (click Active while Deleted is loading).
   Expected Result: Mode buttons remain interactive; a new click is registered.

# Network Verification

The Deleted API request is in flight during the loading observation.

# Expected Final Result

Loading indicator is observable (or documented as transient), toolbar stays visible, counts update after loading, indicator disappears, and mode controls remain usable during loading.

# Classification

- Read-only
- Positive
- Visual

# Restrictions

- Do not hardcode timing thresholds.
- Document transient behavior honestly if indicator is too fast to capture.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending