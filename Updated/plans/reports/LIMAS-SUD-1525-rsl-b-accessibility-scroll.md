---
test_id: "LIMAS-SUD-1525"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Infinite Scroll\" → \"Scroll region semantics and keyboard reachability\""
module: "Reports"
page: "Reports"
section: "Standard Licenses Infinite Scroll"
control: "Accessibility"
action: "Scroll region semantics and keyboard reachability"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
classification: "Reports Standard Licenses RSL-B"
test_type: "Accessibility"
automation_candidate: true
plan_status: "draft"
script_status: "not-generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: ""
---

# Purpose

Verify scroll-region semantics, keyboard reachability, loading-state announcement, loaded-count update announcement, appended-content announcement, focus stability, end-of-data communication, and visible focus indicator.

# Preconditions

- Standard Licenses page with initial batch visible.

# Test Data

Inspect DOM for `aria-live`, `aria-busy`, `role` attributes on scroll region, and focus behavior.

# Steps and Expected Results

1. **Scroll-region semantics**: Verify the scroll container and table have appropriate roles (`table`, `rowgroup`, `row`, `columnheader`, `cell`).

2. **Keyboard reachability**: Verify the scrollable region can be scrolled via keyboard (Arrow keys, PageDown, End). Check `tabindex` on scrollable elements.

3. **Loading-state announcement**: Verify an `aria-live` region exists for dynamic announcements. Document the `aria-live` value (`polite`/`assertive`) and container.

4. **Loaded-count update announcement**: Verify the loaded-total text is discoverable and updates are reflected in the DOM (not necessarily announced live if screen-reader user navigates to it).

5. **Appended-content announcement**: Verify the `aria-live` region or table updates when new rows are appended. Check if `aria-busy` is toggled on the table or container during load.

6. **Focus stability**: Verify that focus does not shift unexpectedly during or after an append. Tab through focusable elements before and after scroll.

7. **End-of-data communication**: Verify that when no more pages are available, the absence of further loading is communicated (e.g., sentinel `aria-hidden="true"`, or text indicating end).

8. **Visible focus indicator**: Verify all focusable elements within the scroll area show a visible focus ring when focused.

# Network Verification

No API verification beyond existing request tracking.

# Expected Final Result

All accessibility checks documented. Gaps noted without creating one case per missing attribute.

# Classification

- Read-only
- Accessibility

# Restrictions

- Do not create one case per missing ARIA attribute.
- Do not hardcode row data.

# Generation Status

- Test script generation: Pending
- CI/CD execution: Pending
- Healing: Pending