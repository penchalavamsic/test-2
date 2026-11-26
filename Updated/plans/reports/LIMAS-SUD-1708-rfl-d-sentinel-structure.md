---
test_id: "LIMAS-SUD-1708"
title: "To verify the functionality of \"Reports\" → \"Floating Licenses\" → \"Deleted Infinite Scroll\" → \"Sentinel Element Structure and Role\""
module: "Reports"
page: "Reports"
section: "Floating Licenses"
control: "Deleted Infinite Scroll"
action: "Sentinel Element Structure and Role"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Reports Floating Licenses RFL-D"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
execution_status: "Not Run"
ci_cd_execution: "Pending"
healing: "Pending"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/reports/reports-floating-licenses-deleted-infinite-scroll.spec.ts"
---

# Purpose

Identify the sentinel element inside the Deleted scroll container: its DOM structure (div.h-4), aria-hidden="true" attribute, height (16px), visibility condition (loaded < total), position relative to the scroll container bottom, and its role in the IntersectionObserver continuation mechanism.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses is selected, Deleted mode is activated, initial batch has settled, and {runtimeDeletedTotal} > {runtimeLoaded} (more data available).

# Test Data

All values read dynamically. Use placeholders: {runtimeDeletedTotal}, {runtimeLoaded}, {runtimeSentinelHeight}.

# Steps and Expected Results

1. Action: Locate the sentinel element inside the scroll container.
   Expected Result: A div element with class including "h-4" and aria-hidden="true" is present within the scroll container, positioned after the last loaded row.

2. Action: Measure the sentinel's rendered height.
   Expected Result: Height is {runtimeSentinelHeight} (approximately 16px).

3. Action: Verify the sentinel's aria-hidden attribute.
   Expected Result: aria-hidden="true" — the sentinel is hidden from assistive technology.

4. Action: Verify the sentinel is visible when loaded < total.
   Expected Result: Sentinel is present in the DOM and within the scroll container viewport when {runtimeLoaded} < {runtimeDeletedTotal}.

5. Action: Verify the sentinel's role in the IntersectionObserver mechanism by confirming it has no click or manual trigger.
   Expected Result: The sentinel is a passive element observed via IntersectionObserver — no onClick handler or manual activation is required.

6. Action: Measure the sentinel's position relative to the scroll container bottom.
   Expected Result: Sentinel is located near the bottom of the scroll container's scrollable content (its offsetTop is close to the last row's bottom edge).

# Network Verification

Only the initial Deleted GET is observed during inspection; no continuation request fires from inspection alone.

# Expected Final Result

The sentinel is a div.h-4[aria-hidden="true"] with 16px height, visible when more data is available, positioned after the last row, and used by an IntersectionObserver to trigger continuations.

# Classification

- Read-only
- Positive
- Visual

# Restrictions

- Do not scroll to the sentinel's trigger threshold.
- Do not hardcode class names or structure selectors.
- Do not hardcode sentinel height.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending