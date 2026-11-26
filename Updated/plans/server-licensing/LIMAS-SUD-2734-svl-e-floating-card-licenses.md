# Test Plan: LIMAS-SUD-2734 — SVL-E: Floating Card Licenses

## Metadata

- **Test ID:** LIMAS-SUD-2734
- **Test Suite:** Server License Management SVL-E
- **Module:** Server License Management SVL-E
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** Each Floating License card displays a Licenses label and numeric value (e.g., "10") discovered at runtime.

## Scope

Verify that every Floating License card shows a Licenses field with a label and a numeric value. The value represents the number of Floating licenses allocated.

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card expanded, Floating tab active
- Customer has at least one Floating license card

## Test Steps

1. Expand a customer card with at least one Floating license
2. Switch to the Floating tab
3. Locate the first Floating license card
4. Assert a label "Licenses" is visible on the card
5. Assert a corresponding numeric value is visible next to the label (e.g., "10")
6. Assert the value is a positive integer

## Expected Result

Each Floating license card displays a "Licenses" label with a numeric value (e.g., "10").

## Test Data

- Use runtime discovery for: Licenses numeric values
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: at least one Floating license card

## Notes

- The value should be a positive integer