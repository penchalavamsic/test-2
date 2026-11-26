---
test_id: "LIMAS-SUD-1608"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Deleted Mode\" → \"Mode switch with active date filter\" → \"Active has date range, switch to Deleted, Deleted loads fresh\""
module: "Reports"
page: "Reports"
section: "Deleted Mode"
control: "Mode switch with active date filter"
action: "Apply an Expiration Date filter in Active mode. Switch to Deleted. Verify Deleted loads fresh unfiltered state — no date chip, no date in inputs, '433 records'. Switch back to Active. Verify Active loads fresh with '2,699 records', no date filter carried back."
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Reports Standard Licenses RSL-E"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "not-generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: ""
---

# Purpose

Verify that date filters applied in Active mode are not persisted when switching to Deleted mode, and that switching back to Active also loads a fresh state.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to the Reports page.
- Standard Licenses card is selected; Active mode is the default.

# Test Data

Use `{runtimeCurrentDate}` as the Expiration Date value. Monitor network requests.

# Steps and Expected Results

1. Action: In Active mode, expand the filter panel and fill Expiration Date with `{runtimeCurrentDate}`. Wait for the filtered POST response.
   Expected Result: Date chip visible; filtered count < 2,699; Expiration Date input shows `{runtimeCurrentDate}`.

2. Action: Click the Deleted button.
   Expected Result: Mode switch initiated.

3. Action: Wait for `GET /api/report/allstandarddeleted?page=0&size=500` to complete.
   Expected Result: Deleted data loaded.

4. Action: Assert no date filter chip is visible in Deleted mode.
   Expected Result: Date chip from Active session is gone.

5. Action: Assert the Expiration Date input is empty in the Deleted filter panel.
   Expected Result: Date input cleared.

6. Action: Assert toolbar shows "433 records" (unfiltered Deleted total).
   Expected Result: Deleted loads full dataset, not the date-filtered subset from Active.

7. Action: Click the Active button.
   Expected Result: Switch back to Active.

8. Action: Wait for `GET /api/report/allstandardlicenses?page=0&size=10` to complete.
   Expected Result: Active data loaded.

9. Action: Assert no date chip visible in Active mode, Expiration Date input is empty, and toolbar shows "2,699 records".
   Expected Result: Active loads fresh unfiltered state; date filter not carried back.

# Network Verification

- Deleted GET request: no date filter params.
- Active GET request after return: no date filter params.

# Expected Final Result

Date filters do not persist across mode switches in either direction. Each mode loads its own fresh unfiltered state.

# Classification

- Read-only
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode dates.
- Do not repeat data-changing submissions.

# Generation Status

- Test script generation: Pending
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Live UI observation via Playwright MCP