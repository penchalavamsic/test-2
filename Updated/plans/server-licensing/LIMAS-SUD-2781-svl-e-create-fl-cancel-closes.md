# Test Plan: LIMAS-SUD-2781 — SVL-E: Create FL Cancel Closes

## Metadata

- **Test ID:** LIMAS-SUD-2781
- **Test Suite:** Server License Management SVL-E
- **Module:** Server License Management SVL-E
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** Clicking the Cancel button in the Create Floating License form closes the form without creating a license.

## Scope

Verify that the Cancel button safely dismisses the Create Floating License form. No floating license should be created on cancel.

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card expanded, Floating tab active
- Create Floating License form is open

## Test Steps

1. Open the Create Floating License form
2. Fill one or more fields (e.g., enter a Licenses value, select a Product Profile)
3. Click the Cancel button
4. Assert the form region is removed or no longer visible
5. Assert the Floating tab badge count is unchanged (no new license created)

## Expected Result

The form closes on Cancel. No Floating License is created — badge count remains unchanged.

## Test Data

- Use runtime discovery for: badge count, form visibility
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: Create Floating License form open

## Notes

- Cancel should behave identically to Close — dismiss without creating
- Verify badge count before and after to confirm no creation occurred