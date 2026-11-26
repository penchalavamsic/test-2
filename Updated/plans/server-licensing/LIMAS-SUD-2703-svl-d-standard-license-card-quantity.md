# Test Plan: LIMAS-SUD-2703 — SVL-D: Standard License Card Quantity

## Metadata

- **Test ID:** LIMAS-SUD-2703
- **Test Suite:** Server License Management SVL-D
- **Module:** Server License Management SVL-D
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** Each Standard License card displays a Licenses field with a label and a numeric value discovered at runtime.

## Scope

Verify that the Licenses (quantity) field is present on Standard License cards, showing a numeric value (e.g., "10"). The label and value are discovered at runtime.

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card expanded, Standard tab active
- Customer has at least one Standard license card

## Test Steps

1. Expand a customer card with at least one Standard license
2. Locate a Standard license card
3. Locate the field labeled "Licenses" (or equivalent discovered label)
4. Assert the label is visible
5. Assert a numeric value is displayed (positive integer or zero)
6. Read and log the actual value

## Expected Result

The Licenses field label and a numeric value (e.g., "10") are visible on each Standard license card.

## Test Data

- Use runtime discovery for: license quantities, field label text
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: at least one Standard license card

## Notes

- Value must be numeric; validate it is parseable as an integer
