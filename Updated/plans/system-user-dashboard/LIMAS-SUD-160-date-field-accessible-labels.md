---
test_id: "LIMAS-SUD-160"
title: 'To verify the functionality of "System User Dashboard" → "Approve Form" → "Date Fields" → "Accessible Labels (Accessibility)"'
module: "system-user-dashboard"
page: "/system-user-dashboard"
section: "Approve Form"
control: "Date fields (Expiration Date, Maintenance Date)"
action: "Verify date fields have accessible labels or document as missing"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P3"
classification: "Read-only"
test_type: "Accessibility"
automation_candidate: true
plan_status: "reviewed"
script_status: "generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/system-user-dashboard/LIMAS-SUD-160-date-field-accessible-labels.spec.ts"
---

# Purpose

Verify whether the date input fields in the Approve form (Expiration Date and Maintenance Date) have accessible labels via aria-label, aria-labelledby, or associated `<label>` elements, and document any gaps.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The user is authenticated on `/system-user-dashboard`.
- At least one pending license request with an Approve button exists.

# Test Data

None.

# Steps and Expected Results

1. Action: Navigate to the dashboard, wait for full render, click the Pending License Requests card, and open the Approve form.
   Expected Result: The Approve form is visible.

2. Action: Inspect the Expiration Date input for accessible labeling (aria-label, aria-labelledby, or associated `<label>`).
   Expected Result: Document whether the field has an accessible label. The visual label "Expiration Date*" exists but may not be programmatically associated.

3. Action: Inspect the Maintenance Date input for accessible labeling (aria-label, aria-labelledby, or associated `<label>`).
   Expected Result: Document whether the field has an accessible label. The visual label "Maintenance Date" exists but may not be programmatically associated.

4. Action: Close the form.
   Expected Result: The form closes.

# Expected Final Result

The date fields' accessible labeling status is documented. If labels are missing, this is recorded as an accessibility gap.

# Classification

- Read-only
- Accessibility

# Restrictions

- Do not include credentials, tokens, cookies, authorization codes, or sensitive payloads.
- Do not repeat data-changing submissions.
- Do not manually navigate to simulate a successful result.
- Do not use static environment-specific data.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending