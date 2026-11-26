# Test Plan: LIMAS-SUD-2786 — SVL-E: Create SL Form Opens

## Metadata

- **Test ID:** LIMAS-SUD-2786
- **Test Suite:** Server License Management SVL-E
- **Module:** Server License Management SVL-E
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** Clicking "Create Standard License" opens a region with accessible name "Create Standard License" containing an h3 heading.

## Scope

Verify that the Create Standard License button opens a properly structured form region with the correct accessible name and heading. This is a structural check for form presence and identity.

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card expanded, Standard tab active
- Create Standard License button is visible

## Test Steps

1. Expand a customer card and switch to the Standard tab
2. Locate the "Create Standard License" button
3. Click the button
4. Assert a region element appears with accessible name "Create Standard License"
5. Assert the region contains an h3 heading

## Expected Result

A `region "Create Standard License"` appears with an h3 heading when the Create Standard License button is clicked.

## Test Data

- Use runtime discovery for: button labels, region accessible name, heading level
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: any customer with Standard tab active

## Notes

- The form may render inline on the card or as a modal overlay; discover layout at runtime