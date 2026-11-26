# Test Plan: LIMAS-SUD-2768 — SVL-E: Create FL Group Field

## Metadata

- **Test ID:** LIMAS-SUD-2768
- **Test Suite:** Server License Management SVL-E
- **Module:** Server License Management SVL-E
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** The Create Floating License form contains a Group combobox pre-filled with a value from the customer's User Groups.

## Scope

Verify that the Group field is a combobox and is pre-filled with a value drawn from the customer's configured User Groups. Discover the pre-filled value and available options at runtime.

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card expanded, Floating tab active
- Create Floating License form is open
- Customer has at least one User Group configured

## Test Steps

1. Open the Create Floating License form
2. Locate the Group field within the form
3. Assert the field is a combobox
4. Assert the combobox has a pre-filled (selected) value
5. Read the selected value at runtime
6. Assert the selected value is non-empty

## Expected Result

The Group combobox is pre-filled with a value from the customer's User Groups (e.g., "QA Import" as observed on BRP).

## Test Data

- Use runtime discovery for: combobox selected value, available options
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: a customer with at least one User Group

## Notes

- BRP observation showed "QA Import" as the pre-filled value
- The pre-filled value depends on the customer's User Groups configuration