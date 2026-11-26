# Test Plan: LIMAS-SUD-2765 — SVL-E: Create FL Form Opens

## Metadata

- **Test ID:** LIMAS-SUD-2765
- **Test Suite:** Server License Management SVL-E
- **Module:** Server License Management SVL-E
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** Clicking "Create Floating License" opens a region with accessible name "Create Floating License" containing an h3 heading.

## Scope

Verify that the Create Floating License button opens a properly structured form region with the correct accessible name and heading. This is a structural check for form presence and identity.

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card expanded, Floating tab active
- Create Floating License button is visible

## Test Steps

1. Expand a customer card and switch to the Floating tab
2. Locate the "Create Floating License" button
3. Click the button
4. Assert a region element appears with accessible name "Create Floating License"
5. Assert the region contains an h3 heading

## Expected Result

A `region "Create Floating License"` appears with an h3 heading when the Create Floating License button is clicked.

## Test Data

- Use runtime discovery for: button labels, region accessible name, heading level
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: any customer with Floating tab active

## Notes

- The form may render inline on the card or as a modal overlay; discover layout at runtime