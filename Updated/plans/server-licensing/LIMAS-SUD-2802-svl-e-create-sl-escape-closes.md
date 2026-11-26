# Test Plan: LIMAS-SUD-2802 — SVL-E: Create SL Escape Closes

## Metadata

- **Test ID:** LIMAS-SUD-2802
- **Test Suite:** Server License Management SVL-E
- **Module:** Server License Management SVL-E
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** Pressing the Escape key while the Create Standard License form is open closes the form without creating a license.

## Scope

Verify that the Escape key is a functional dismissal mechanism for the Create Standard License form, consistent with standard dialog UX patterns. No license is created.

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card expanded, Standard tab active
- Create Standard License form is open with focus inside it

## Test Steps

1. Open the Create Standard License form
2. Fill one or more fields (e.g., enter a Licenses value)
3. Press the Escape key
4. Assert the form region is removed or no longer visible
5. Assert the Standard tab badge count is unchanged

## Expected Result

Pressing Escape closes the Create Standard License form. No Standard License is created.

## Test Data

- Use runtime discovery for: badge count, form visibility
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: Create Standard License form open

## Notes

- Escape should behave identically to Cancel and Close — dismiss without creating