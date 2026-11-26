---
test_id: "LIMAS-SUD-1661"
title: "To verify the functionality of \"Reports\" → \"Floating Licenses\" → \"Accessibility\" → \"Filters and Export Accessibility\""
module: "Reports"
page: "Reports"
section: "Floating Licenses"
control: "Accessibility"
action: "Filters and Export Accessibility"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
classification: "Reports Floating Licenses RFL-A"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/reports/reports-floating-licenses-shell.spec.ts"
---

# Purpose

Verify filter label associations, disabled dependency announcement, Clear accessible name, Export accessible name, and the Filters aria-expanded gap.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses is selected on the Reports page.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Expand filters and verify each filter control has an associated label.
   Expected Result: Each input has a corresponding label or accessible name.

2. Action: Verify the disabled Profile Role control announces its disabled state.
   Expected Result: Profile Role is programmatically disabled.

3. Action: Verify the Clear button has accessible name "Clear".
   Expected Result: Clear button role is button, name is "Clear".

4. Action: Verify the Export button has accessible name "Export Excel".
   Expected Result: Export button text communicates its purpose.

5. Action: Verify the Filters button lacks aria-expanded.
   Expected Result: The Filters button does not have aria-expanded (accessibility gap).

6. Action: Verify filter inputs have appropriate types (email, search, date).
   Expected Result: Email input has type=email, Hardware IDs has type=search, dates have type=date.

# Network Verification

No API verification needed.

# Expected Final Result

Filter and Export controls have appropriate labels and types; the Filters button's missing aria-expanded is documented as a gap.

# Classification

- Read-only
- Positive
- Accessibility

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not enter filter values.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending