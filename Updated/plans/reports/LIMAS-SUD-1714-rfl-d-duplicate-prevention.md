---
test_id: "LIMAS-SUD-1714"
title: "To verify the functionality of \"Reports\" → \"Floating Licenses\" → \"Deleted Infinite Scroll\" → \"Duplicate Prevention — Rows and Requests\""
module: "Reports"
page: "Reports"
section: "Floating Licenses"
control: "Deleted Infinite Scroll"
action: "Duplicate Prevention — Rows and Requests"
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

After a continuation appends new rows, verify no duplicate rows exist in the table (content fingerprints are unique across all rows) and no duplicate requests are sent (every observed page value is unique with exactly one request per page).

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses is selected, Deleted mode is activated, initial batch (page=0) has settled, and {runtimeDeletedTotal} > {runtimeLoaded}.

# Test Data

All values read dynamically. Use placeholders: {runtimeLoaded}, {runtimePage}.

# Steps and Expected Results

1. Action: After the initial batch settles, sample content fingerprints from several rows spread across the loaded set (first, middle, last).
   Expected Result: Each sampled row has a distinct fingerprint (unique combination of Profile, Role, Email, Hardware ID).

2. Action: Trigger a continuation (scroll to sentinel, wait for settle). Sample fingerprints from the newly appended rows.
   Expected Result: Each newly appended row has a unique fingerprint — no duplicate matches any previously existing row.

3. Action: Verify all rows (old + new) together have only unique fingerprints.
   Expected Result: The total set of row fingerprints has no duplicates; every row is distinct.

4. Action: Verify that only one request was observed per page value.
   Expected Result: Page=0 appears once (initial), page=1 appears once (first continuation), with no repeated page values.

5. Action: Verify that no request fires to a page already loaded.
   Expected Result: Network log shows each page value appears exactly one time.

# Network Verification

Track all GET requests to the Deleted endpoint. Every page query parameter value must appear exactly once.

# Expected Final Result

No duplicate rows (unique content fingerprints across all loaded rows) and no duplicate requests (each page value used exactly once).

# Classification

- Read-only
- Positive

# Restrictions

- Do not hardcode row content or page values.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending