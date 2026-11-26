---
test_id: "LIMAS-SUD-1797"
title: "To verify the functionality of \"Reports\" → \"Floating Configurations\" → \"Deleted Mode\" → \"Export Client-Side Contract\""
module: "Reports"
page: "Reports"
section: "Floating Configurations"
control: "Deleted Mode"
action: "Export Client-Side Contract"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
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

Verify that clicking Export Excel in Deleted mode triggers a client-side download without firing any server API request, the file is generated via xlsx.js, the suggested filename is "limas-reports.xlsx", and exactly one download event fires per click.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated on the Reports page with Floating Configurations selected.
- Deleted mode has been selected and fully loaded.

# Test Data

The download filename, MIME type, and file size are captured at runtime from the download event.

# Steps and Expected Results

1. Action: Set up network interception and download event listener before clicking Export.
   Expected Result: No pending API requests. Download listener is registered.

2. Action: Click the Export Excel button.
   Expected Result: A download event fires. No server API request is triggered.

3. Action: Verify the download metadata.
   Expected Result: The suggested filename is "limas-reports.xlsx". Exactly one download event fires per click.

4. Action: Verify client-side generation.
   Expected Result: No API request was made. The export is generated entirely client-side (via xlsx.js or equivalent library).

5. Action: Verify the download completes successfully.
   Expected Result: The download stream is received. The file size is {runtimeExportSize} (non-zero, approximately 140KB at runtime).

# Network Verification

- No server API requests are fired during or after the Export click.
- The download is generated client-side.

# Expected Final Result

Clicking Export Excel triggers a client-side download with filename "limas-reports.xlsx", one download per click, zero server requests.

# Classification

- Read-only
- Positive

# Restrictions

- Do not hardcode filenames, sizes, or MIME types. Read dynamically at runtime.
- Do not include credentials, tokens, cookies, or sensitive payloads.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending