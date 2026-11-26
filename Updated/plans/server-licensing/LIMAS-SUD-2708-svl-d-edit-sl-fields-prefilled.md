# Test Plan: LIMAS-SUD-2708 — SVL-D: Edit Standard License Fields Prefilled

## Metadata

- **Test ID:** LIMAS-SUD-2708
- **Test Suite:** Server License Management SVL-D
- **Module:** Server License Management SVL-D
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** The Edit Standard License dialog prefills Maintenance Date, Expiration Date (textbox, YYYY-MM-DD format), Number of Days (spinbutton, initially empty), and Number of Standard Licenses (spinbutton, prefilled from card). A checkbox "Synchronize Maintenance and Expiration dates" is present and unchecked by default.

## Scope

Verify that all form fields in the Edit Standard License dialog are present, have correct input types, and are prefilled with the values from the card. Fields: Maintenance Date, Expiration Date, Number of Days, Number of Standard Licenses, and the Synchronize checkbox.

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card expanded, Standard tab active
- Edit Standard License dialog is open for a specific license
- Original card values for Maintenance, Expiration, and Licenses count have been read

## Test Steps

1. Open the Edit Standard License dialog on a Standard License card
2. Locate the Maintenance Date field — assert it is a textbox with a date value in YYYY-MM-DD format matching the card's Maintenance value
3. Locate the Expiration Date field — assert it is a textbox with a date value in YYYY-MM-DD format matching the card's Expiration value
4. Locate the Number of Days field — assert it is a spinbutton, initially empty
5. Locate the Number of Standard Licenses field — assert it is a spinbutton, prefilled with the card's Licenses quantity
6. Locate the "Synchronize Maintenance and Expiration dates" checkbox — assert it is unchecked

## Expected Result

All five fields are present with correct types and values: Maintenance Date (textbox, card date), Expiration Date (textbox, card date), Number of Days (spinbutton, empty), Number of Standard Licenses (spinbutton, card quantity), and Synchronize checkbox (unchecked).

## Test Data

- Use runtime discovery for: date values, license quantities, field labels
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: a Standard License card with known Maintenance, Expiration, and Licenses values

## Notes

- Date format YYYY-MM-DD is expected but should be verified at runtime
- "Number of Days" initially empty may indicate it is calculated when dates change
