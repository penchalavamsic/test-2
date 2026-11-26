---
test_id: "LIMAS-SUD-1528"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Infinite Scroll\" → \"Sentinel is present and aria-hidden\""
module: "Reports"
page: "Reports"
section: "Standard Licenses Infinite Scroll"
control: "Sentinel Element"
action: "Present and aria-hidden in scroll container"
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

Verify the sentinel element is present within the scroll container, has the expected structure, and is marked `aria-hidden="true"` so it does not interfere with screen readers.

# Preconditions

- Standard Licenses page with initial batch visible.

# Test Data

Inspect the scroll container for the sentinel `<div class="h-4" aria-hidden="true">`.

# Steps and Expected Results

1. Action: Locate the scroll container.
   Expected Result: Container identified.

2. Action: Find the sentinel element as the last child of the scroll container.
   Expected Result: `<div class="h-4" aria-hidden="true">` found.

3. Action: Verify `aria-hidden="true"` on the sentinel.
   Expected Result: Sentinel is hidden from assistive technology.

4. Action: Verify the sentinel has zero or minimal text content.
   Expected Result: No visible text in the sentinel.

5. Action: Verify the sentinel has a defined height (via `h-4` class = 1rem/16px).
   Expected Result: Sentinel has non-zero computed height.

# Network Verification

No API verification needed.

# Expected Final Result

Sentinel present, aria-hidden, and properly sized for IntersectionObserver.

# Classification

- Read-only
- Positive

# Restrictions

- Do not hardcode element references.

# Generation Status

- Test script generation: Pending
- CI/CD execution: Pending
- Healing: Pending