# Test Plan: LIMAS-SUD-2747 — SVL-E: Edit FL Number of Days

## Metadata

- **Test ID:** LIMAS-SUD-2747
- **Test Suite:** Server License Management SVL-E
- **Module:** Server License Management SVL-E
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** The Edit Floating License dialog contains a spinbutton labeled "Number of Days" that is initially empty.

## Scope

Verify the Number of Days field in the Edit Floating License dialog: it must be a spinbutton, have the correct label, and be initially empty (no prefilled value).

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card expanded, Floating tab active
- Edit Floating License dialog is open

## Test Steps

1. Open the Edit Floating License dialog on a Floating License card
2. Locate the "Number of Days" field
3. Assert it is a spinbutton (or input with type number)
4. Assert the field is initially empty (no prefilled value)

## Expected Result

The "Number of Days" spinbutton is present and initially empty.

## Test Data

- Use runtime discovery for: field labels, field types
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: any Floating License card with Edit dialog open

## Notes

- "Number of Days" initially empty may indicate it is calculated when dates change