# Test Plan: LIMAS-SUD-2713 — SVL-D: Edit Standard License Initial Focus

## Metadata

- **Test ID:** LIMAS-SUD-2713
- **Test Suite:** Server License Management SVL-D
- **Module:** Server License Management SVL-D
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** When the Edit Standard License dialog opens, keyboard focus is placed on the first editable field, expected to be the Maintenance Date textbox.

## Scope

Verify that the dialog manages focus correctly on open, placing the user on the Maintenance Date field so they can immediately begin editing. This is a keyboard accessibility requirement.

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card expanded, Standard tab active
- "Edit Standard License" button is accessible (via click or programmatic focus)

## Test Steps

1. Click the "Edit Standard License" button on a Standard License card
2. Wait for the dialog to appear
3. Assert the dialog is open and visible
4. Assert the active (focused) element is the Maintenance Date field (a textbox)
5. Assert the focused field has a date value matching the card's Maintenance date

## Expected Result

Focus lands on the Maintenance Date textbox when the Edit Standard License dialog opens.

## Test Data

- Use runtime discovery for: field element roles, field values
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: any Standard License card with Edit button

## Notes

- If the Maintenance Date is not the first field at runtime, document the actual focused field
- Focus placement should happen automatically without additional user interaction
