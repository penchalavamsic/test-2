---
test_id: "LIMAS-SUD-1516"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Infinite Scroll\" → \"New rows append without replacing existing rows\""
module: "Reports"
page: "Reports"
section: "Standard Licenses Infinite Scroll"
control: "Row Append"
action: "New rows append preserving existing"
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

Verify that after an additional batch load, new rows are appended to the table and all previously rendered rows remain present and unchanged.

# Preconditions

- Initial batch visible with runtime row count.
- One additional batch load triggered and completed.
- No duplicate API requests.

# Test Data

Use `ReportsPage.getStandardLicenseRuntimeFingerprints()` to capture row fingerprints in memory (not persisted). Compare before and after the append.

# Steps and Expected Results

1. Action: Capture runtime fingerprints of all existing rows before the additional load.
   Expected Result: Fingerprints stored in memory only.

2. Action: Trigger exactly one additional batch load.
   Expected Result: New request completes.

3. Action: Verify total row count increased by the batch size from the response `numberOfElements`.
   Expected Result: `newRowCount = initialRowCount + batchSize`.

4. Action: Verify all initial-row fingerprints match the corresponding rows in the updated table.
   Expected Result: No initial row was replaced, removed, or altered.

5. Action: Verify the appended rows are distinct from the initial rows.
   Expected Result: No fingerprint from the appended batch matches any initial fingerprint.

6. Action: Verify table headers and column alignment remain unchanged.
   Expected Result: Same six column headers, same column count per row.

# Network Verification

- Response `content` array length = `numberOfElements`.

# Expected Final Result

Rows append below existing rows. No existing rows are replaced. Headers unchanged. Column alignment consistent.

# Classification

- Read-only
- Positive

# Restrictions

- Do not print or persist row fingerprints.
- Do not hardcode row data or batch sizes.

# Generation Status

- Test script generation: Pending
- CI/CD execution: Pending
- Healing: Pending