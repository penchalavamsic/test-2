---
test_id: "LIMAS-SUD-1521"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Infinite Scroll\" → \"Scroll position does not reset unexpectedly\""
module: "Reports"
page: "Reports"
section: "Standard Licenses Infinite Scroll"
control: "Scroll Stability"
action: "Position stable after append"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Reports Standard Licenses RSL-B"
test_type: "Positive"
automation_candidate: true
plan_status: "draft"
script_status: "not-generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: ""
---

# Purpose

Verify that after an additional batch load, the scroll position does not reset to the top of the page or table unexpectedly.

# Preconditions

- Initial batch visible.
- Scroll container identified.

# Test Data

Capture `window.scrollY` and the scroll container's `scrollTop` before and after the append.

# Steps and Expected Results

1. Action: Scroll to the trigger boundary.
   Expected Result: Scroll position at or near the bottom of the viewport.

2. Action: Record scroll position immediately before the next-page request fires.
   Expected Result: Runtime `scrollY` recorded.

3. Action: Wait for the request to settle.
   Expected Result: New rows appended.

4. Action: Record scroll position after append.
   Expected Result: Scroll position at or below the trigger point — not reset to 0.

5. Action: Verify the table did not jump to the top.
   Expected Result: The first visible row after append is not row index 0 (unless already scrolled that high).

# Network Verification

No additional API verification needed.

# Expected Final Result

Scroll position remains near its continuation point after the append. No unexpected reset to top.

# Classification

- Read-only
- Positive

# Restrictions

- Do not hardcode scroll positions.

# Generation Status

- Test script generation: Pending
- CI/CD execution: Pending
- Healing: Pending