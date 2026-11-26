---
test_id: "LIMAS-SUD-1706"
title: "To verify the functionality of \"Reports\" → \"Floating Licenses\" → \"Deleted Infinite Scroll\" → \"Scroll Container Structure and Dimensions\""
module: "Reports"
page: "Reports"
section: "Floating Licenses"
control: "Deleted Infinite Scroll"
action: "Scroll Container Structure and Dimensions"
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

Identify and inspect the Deleted view scroll container: CSS properties (overflow-y:auto, flex-1, min-h-[260px]), DOM dimensions (scrollHeight, clientHeight, scrollTop), parent hierarchy within the Floating Licenses panel, and accessible role assignment.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses is selected, Deleted mode is activated, initial batch has settled.

# Test Data

All CSS and dimension values read dynamically. Use placeholders: {runtimeDeletedTotal}, {runtimeScrollHeight}, {runtimeClientHeight}, {runtimeScrollTop}.

# Steps and Expected Results

1. Action: Locate the scroll container element within the Deleted table area.
   Expected Result: A scrollable container exists and is distinct from the page-level scroll.

2. Action: Read the container's computed CSS properties (overflow-y, flex, min-height).
   Expected Result: overflow-y is "auto" (or "scroll"), flex properties include "flex: 1 1 0%" or equivalent, min-height is at least 260px.

3. Action: Read scrollHeight, clientHeight, and scrollTop at rest (before any user scroll).
   Expected Result: scrollHeight ≥ clientHeight when {runtimeDeletedTotal} exceeds one batch; scrollTop is 0.

4. Action: Trace the container's parent hierarchy within the Deleted panel.
   Expected Result: Container is properly nested inside the Floating Licenses → Deleted content area, not a standalone element.

5. Action: Inspect the container's accessible role.
   Expected Result: Container has an ARIA role appropriate for a scrollable region (e.g., role or implicit semantics from a region with overflow).

# Network Verification

Only the initial Deleted GET request is observed; no continuation request fired during inspection.

# Expected Final Result

The Deleted scroll container has overflow-y:auto, flex-1 styling, min-height ≥ 260px, measurable scrollHeight/clientHeight/scrollTop, correct parent hierarchy, and an appropriate accessible role.

# Classification

- Read-only
- Positive
- Visual

# Restrictions

- Do not scroll to the trigger threshold.
- Do not hardcode pixel values.
- Do not hardcode class names or structure selectors.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending