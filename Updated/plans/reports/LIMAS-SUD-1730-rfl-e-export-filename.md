---
test_id: "LIMAS-SUD-1730"
title: "To verify the functionality of \"Reports\" → \"Floating Licenses\" → \"Export Excel\" → \"Download Filename Validation\""
module: "Reports"
page: "Reports"
section: "Floating Licenses"
control: "Export Excel"
action: "Download Filename Validation"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
classification: "Reports Floating Licenses RFL-E"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
execution_status: "Not Run"
ci_cd_execution: "Pending"
healing: "Pending"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/reports/reports-floating-licenses-export.spec.ts"
---

# Purpose

Verify the exported file's suggested filename is "{runtimeSuggestedFilename}", contains no path separators, no credentials or tokens, and has the `.xlsx` extension.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses is selected in Deleted mode with records loaded.
- Export button is enabled.

# Test Data

Filename captured dynamically from the download event's suggested filename.

# Steps and Expected Results

1. Action: Click Export and capture the download event's suggested filename as {runtimeSuggestedFilename}.
   Expected Result: {runtimeSuggestedFilename} is a nonempty string.

2. Action: Inspect {runtimeSuggestedFilename} for the extension.
   Expected Result: {runtimeSuggestedFilename} ends with `.xlsx`.

3. Action: Inspect {runtimeSuggestedFilename} for path separators (`/` or `\`).
   Expected Result: {runtimeSuggestedFilename} contains no path separators — it is a plain filename, not a path.

4. Action: Inspect {runtimeSuggestedFilename} for credential or token patterns (e.g., `Bearer`, `token=`, `auth`, `session`, `jwt`).
   Expected Result: {runtimeSuggestedFilename} contains no credentials, tokens, or session identifiers.

5. Action: Verify {runtimeSuggestedFilename} is consistent across multiple exports.
   Expected Result: Two consecutive exports produce the same suggested filename.

# Network Verification

No API request is sent during Export.

# Expected Final Result

The exported file's suggested filename is "{runtimeSuggestedFilename}", a plain `.xlsx` filename with no path separators, no credentials, and consistent across exports.

# Classification

- Read-only
- Positive

# Restrictions

- Do not hardcode the filename — capture it dynamically.
- Do not assume a specific filename format beyond `.xlsx`.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending