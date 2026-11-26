---
test_id: "LIMAS-SUD-1723"
title: "To verify the functionality of \"Reports\" → \"Floating Licenses\" → \"Export Excel\" → \"Export Disabled in Active Mode with 0 Records\""
module: "Reports"
page: "Reports"
section: "Floating Licenses"
control: "Export Excel"
action: "Export Disabled in Active Mode with 0 Records"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Reports Floating Licenses RFL-E"
test_type: "Negative"
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

Verify the Export Excel button is disabled in Active mode when 0 records are available, and no download fires on click.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses is selected and Active mode is active with 0 records.
- Filters are cleared and collapsed.

# Test Data

All values read dynamically from the DOM. Target: Active mode, zero records.

# Steps and Expected Results

1. Action: Inspect the Export Excel button in the Active mode toolbar.
   Expected Result: The Export button is a native DOM button element.

2. Action: Read the disabled and aria-disabled attributes on the Export button.
   Expected Result: The Export button has attribute `disabled` present, or `aria-disabled="true"`, or both.

3. Action: Programmatically attempt a click on the disabled Export button and observe download events.
   Expected Result: No `download` event is fired. No file download is triggered. The UI does not react.

4. Action: Verify the cursor style on the disabled Export button.
   Expected Result: The cursor does not indicate interactivity (e.g., not `pointer`).

# Network Verification

No network request is sent when clicking the disabled Export button. The active API has already settled with totalElements = 0.

# Expected Final Result

The Export Excel button is disabled in Active mode with 0 records, and no download is initiated on click.

# Classification

- Read-only
- Negative

# Restrictions

- Do not hardcode attribute values — read them from the DOM.
- Do not manually navigate to simulate a successful result.
- Do not use static environment-specific data.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending