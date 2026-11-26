---
test_id: "LIMAS-SUD-1726"
title: "To verify the functionality of \"Reports\" → \"Floating Licenses\" → \"Export Excel\" → \"Client-Side Export Contract\""
module: "Reports"
page: "Reports"
section: "Floating Licenses"
control: "Export Excel"
action: "Client-Side Export Contract"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
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

Verify the Export is entirely client-side: uses xlsx.js, fires a download event with the correct filename and MIME type, and each click produces exactly one download.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses is selected in Deleted mode with records loaded.
- `xlsx.js` library is available in the application bundle.
- Export button is enabled.

# Test Data

All values read dynamically. Filename and MIME type captured from the download event.

# Steps and Expected Results

1. Action: Set up a network request observer and download event listener before clicking Export.
   Expected Result: Observers are active.

2. Action: Click the Export Excel button once.
   Expected Result: A `download` event fires. No new API/network request is sent to the server (export is client-side).

3. Action: Inspect the download event payload.
   Expected Result: The download filename is "{runtimeFilename}". The MIME type is captured from the event.

4. Action: Verify the xlsx.js library is the source of the export.
   Expected Result: The export is generated via xlsx.js (e.g., `XLSX.write` or `writeFile` is invoked) without a server round-trip.

5. Action: Verify exactly one download event fired for the single click.
   Expected Result: Download event count equals 1 — no duplicate downloads from a single click.

# Network Verification

No API request is sent to the server during or after the Export click. All prior data-fetching requests are already settled.

# Expected Final Result

Export is entirely client-side via xlsx.js, fires exactly one download event per click, with filename "{runtimeFilename}" and a valid MIME type, and no server request is made.

# Classification

- Read-only
- Positive

# Restrictions

- Do not hardcode the xlsx.js function names — detect from the bundle.
- Do not hardcode the filename or MIME type — capture from the download event.
- Do not manually navigate to simulate a successful result.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending