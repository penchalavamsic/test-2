# Test Plan: LIMAS-SUD-2737 — SVL-E: Floating Card Maintenance Date

## Metadata

- **Test ID:** LIMAS-SUD-2737
- **Test Suite:** Server License Management SVL-E
- **Module:** Server License Management SVL-E
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** Each Floating License card displays a Maintenance label and a date value discovered at runtime.

## Scope

Verify that every Floating License card shows a Maintenance field with a label and a date value. The specific date is discovered at runtime.

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card expanded, Floating tab active
- Customer has at least one Floating license card

## Test Steps

1. Expand a customer card with at least one Floating license
2. Switch to the Floating tab
3. Locate the first Floating license card
4. Assert a label "Maintenance" is visible on the card
5. Assert a corresponding date value is visible next to the label
6. Assert the date value is non-empty

## Expected Result

Each Floating license card displays a "Maintenance" label with a date value.

## Test Data

- Use runtime discovery for: Maintenance date values
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: at least one Floating license card

## Notes

- Date format (e.g., YYYY-MM-DD) should be verified at runtime