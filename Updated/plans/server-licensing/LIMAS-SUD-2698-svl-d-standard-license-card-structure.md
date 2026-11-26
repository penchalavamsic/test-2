# Test Plan: LIMAS-SUD-2698 — SVL-D: Standard License Card Structure

## Metadata

- **Test ID:** LIMAS-SUD-2698
- **Test Suite:** Server License Management SVL-D
- **Module:** Server License Management SVL-D
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** Each Standard License card contains a type label "Standard License", a heading (h3), fields for Profile Role, Licenses, Maintenance, and Expiration, plus Edit and Delete buttons.

## Scope

Verify the complete structural anatomy of a Standard License card. Every card must have the standard set of elements: a type label, a heading, four data fields, and two action buttons.

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card expanded, Standard tab active
- Customer has at least one Standard license card

## Test Steps

1. Expand a customer card with at least one Standard license
2. Locate the first Standard license card
3. Assert a type label "Standard License" is present (may be a badge or prefix text)
4. Assert an h3 heading is present with the license name
5. Assert a field labeled "Profile Role" with a value is present
6. Assert a field labeled "Licenses" with a numeric value is present
7. Assert a field labeled "Maintenance" with a date value is present
8. Assert a field labeled "Expiration" with a date value is present
9. Assert an "Edit" button is present
10. Assert a "Delete" button is present

## Expected Result

Each Standard License card has: "Standard License" type label, h3 heading, Profile Role, Licenses, Maintenance, Expiration fields, and Edit/Delete buttons.

## Test Data

- Use runtime discovery for: license names, field values, button labels
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: a customer with at least one Standard license

## Notes

- Field labels may vary slightly at runtime; discover exact strings
