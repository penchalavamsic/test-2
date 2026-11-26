---
test_id: "LIMAS-SUD-1518"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Infinite Scroll\" → \"No duplicate rows after append\""
module: "Reports"
page: "Reports"
section: "Standard Licenses Infinite Scroll"
control: "Duplicate Prevention"
action: "No duplicate rows exist"
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

Verify that no duplicate rows appear after one additional batch load — within the initial batch, within the new batch, and across batches.

# Preconditions

- Initial batch visible with runtime rows.
- One additional batch load triggered and completed.

# Test Data

Use `ReportsPage.verifyNoDuplicateStandardLicenseRows()` which compares runtime fingerprints in memory across all loaded rows.

# Steps and Expected Results

1. Action: Generate safe runtime fingerprints for all rendered rows after the append.
   Expected Result: Fingerprints computed in memory only.

2. Action: Verify all fingerprints are unique.
   Expected Result: Set of fingerprints has same length as the array — no duplicates.

3. Action: Verify no fingerprint from the initial batch is duplicated in the appended batch.
   Expected Result: Initial fingerprints and appended fingerprints are disjoint.

4. Action: Verify no fingerprint from the appended batch duplicates another within the same batch.
   Expected Result: All new-batch fingerprints are unique.

# Network Verification

- Response's `content` array has no duplicate entries (each object is unique by composite key).

# Expected Final Result

All rendered rows are unique. No duplicates across any batch.

# Classification

- Read-only
- Positive

# Restrictions

- Do not print or persist fingerprints.
- Do not hardcode row data.

# Generation Status

- Test script generation: Pending
- CI/CD execution: Pending
- Healing: Pending