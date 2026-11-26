---
test_id: "LIMAS-SUD-1517"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Infinite Scroll\" → \"Loaded count increases and stays within total\""
module: "Reports"
page: "Reports"
section: "Standard Licenses Infinite Scroll"
control: "Loaded Count"
action: "Increases correctly and never exceeds total"
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

Verify the loaded-versus-total text updates correctly after an additional batch load and that loaded count never exceeds total count.

# Preconditions

- Initial batch visible with loaded < total.
- One additional batch load triggered and completed.

# Test Data

Use `ReportsPage.getStandardLicenseLoadedState()` before and after the additional load.

# Steps and Expected Results

1. Action: Parse initial loaded and total from the loaded-total text.
   Expected Result: `initialLoaded > 0`, `initialTotal > 0`, `initialLoaded < initialTotal`.

2. Action: Trigger one additional batch load.
   Expected Result: Request completes successfully.

3. Action: Parse updated loaded and total.
   Expected Result: `updatedLoaded > initialLoaded`.

4. Action: Verify loaded count increased by at most the runtime batch size.
   Expected Result: `updatedLoaded - initialLoaded ≤ runtimeBatchSize`.

5. Action: Verify total count remained unchanged.
   Expected Result: `updatedTotal = initialTotal`.

6. Action: Verify loaded ≤ total.
   Expected Result: `updatedLoaded ≤ updatedTotal`.

# Network Verification

- Response `numberOfElements` and `totalElements` are consistent with UI loaded/total.

# Expected Final Result

Loaded count increases correctly. Loaded never exceeds total. Total unchanged.

# Classification

- Read-only
- Positive

# Restrictions

- Do not hardcode loaded, total, or batch size values.

# Generation Status

- Test script generation: Pending
- CI/CD execution: Pending
- Healing: Pending