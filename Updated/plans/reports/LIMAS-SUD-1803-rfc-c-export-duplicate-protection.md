---
test_id: "LIMAS-SUD-1803"
title: "To verify the functionality of \"Reports\" → \"Floating Configurations\" → \"Deleted Mode\" → \"Export Duplicate Protection\""
module: "Reports"
page: "Reports"
section: "Floating Configurations"
control: "Deleted Mode"
action: "Export Duplicate Protection"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
classification: "Reports Floating Configurations RFC-C"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/reports/reports-floating-configurations-deleted.spec.ts"
---

# Purpose

Verify that two rapid Export clicks both produce valid downloads, neither workbook is corrupt, and the file contents are not doubled or corrupted by the rapid sequential generation.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated on the Reports page with Floating Configurations selected.
- Deleted mode has been selected and fully loaded.

# Test Data

Two downloads are captured with distinct filenames at runtime.

# Steps and Expected Results

1. Action: Set up download listeners to capture two sequential downloads.
   Expected Result: Two download handlers are registered.

2. Action: Click Export Excel twice in rapid succession.
   Expected Result: Two download events fire. Two files are saved with distinct temporary filenames.

3. Action: Validate both workbooks.
   Expected Result: Both files open as valid .xlsx workbooks. Neither is corrupt, HTML, or an error response.

4. Action: Compare the two workbooks.
   Expected Result: Both workbooks have the same row count, same sheet name, same column headers. The content is not doubled or corrupted in either file.

5. Action: Verify each file is independently valid.
   Expected Result: Each file can be opened and parsed independently. Both have identical structure and data.

# Network Verification

- No server API requests fire during either Export click (client-side).

# Expected Final Result

Two rapid Export clicks produce two independent, valid, identical workbooks with no corruption or doubled content.

# Classification

- Read-only
- Positive

# Restrictions

- Do not hardcode filenames or workbook contents. Validate dynamically at runtime.
- Do not include credentials, tokens, cookies, or sensitive payloads.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending