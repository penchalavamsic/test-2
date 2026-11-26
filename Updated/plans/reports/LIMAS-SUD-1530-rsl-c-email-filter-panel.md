---
test_id: "LIMAS-SUD-1530"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Email Filter\" → \"Filter Panel expanded with five RSL-C controls visible and Profile Role disabled\""
module: "Reports"
page: "Reports"
section: "Email Filter"
control: "Filter Panel"
action: "Panel expanded, five RSL-C controls visible, Profile Role disabled, date controls untouched, no request on expand"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Reports Standard Licenses RSL-C"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "not-generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: ""
---

# Purpose

Verify that when the Standard Licenses filter panel is expanded, exactly five RSL-C filter controls (Email, Hardware IDs, User Group, Product Profile, Profile Role) are visible, the Profile Role control is disabled, date controls remain in their default untouched state, and no API request is triggered solely by expanding the panel.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to the Reports page.
- Standard Licenses card is selected.

# Test Data

Use runtime locators for the five RSL-C filter controls: Email searchbox, Hardware IDs searchbox, User Group combobox, Product Profile combobox, Profile Role combobox.

# Steps and Expected Results

1. Action: Navigate to the Reports page, select the Standard Licenses card, and expand the filter panel.
   Expected Result: The filter panel is expanded; no POST request to `/api/report/standardlicenses` fires during expansion.

2. Action: Assert the Email searchbox is visible and of input type text/search.
   Expected Result: Email control is present and interactive.

3. Action: Assert the Hardware IDs searchbox is visible.
   Expected Result: Hardware IDs control is present.

4. Action: Assert the User Group combobox is visible.
   Expected Result: User Group control is present.

5. Action: Assert the Product Profile combobox is visible.
   Expected Result: Product Profile control is present.

6. Action: Assert the Profile Role combobox is visible and in a disabled state.
   Expected Result: Profile Role control is present but disabled.

7. Action: Assert all date controls (Expiration Date, Maintenance Date, License Created Date, License Modified Date) are in their default empty/untouched state.
   Expected Result: Date controls are unchanged.

# Network Verification

- No POST request to `/api/report/standardlicenses` on panel expand alone.
- Network observer confirms zero outgoing filter requests during expand.

# Expected Final Result

The filter panel displays five RSL-C controls with Profile Role disabled, date controls untouched, and no filter request is made on expand.

# Classification

- Read-only
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode control names, labels, or DOM identifiers.
- Do not repeat data-changing submissions.

# Generation Status

- Test script generation: Pending
- CI/CD execution: Pending
- Healing: Pending