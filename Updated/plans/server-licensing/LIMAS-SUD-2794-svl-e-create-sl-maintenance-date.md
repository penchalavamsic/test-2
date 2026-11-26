# Test Plan: LIMAS-SUD-2794 — SVL-E: Create SL Maintenance Date

## Metadata

- **Test ID:** LIMAS-SUD-2794
- **Test Suite:** Server License Management SVL-E
- **Module:** Server License Management SVL-E
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** The Create Standard License form contains a "Maintenance Date" textbox that is initially empty.

## Scope

Verify that the Maintenance Date field is a textbox that starts empty, to be filled by the user. Discover its expected format at runtime.

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card expanded, Standard tab active
- Create Standard License form is open
- No fields have been filled

## Test Steps

1. Open the Create Standard License form
2. Locate the "Maintenance Date" field within the form
3. Assert the field is a textbox (or date input)
4. Assert the field is empty — no default value pre-filled

## Expected Result

The Maintenance Date textbox is present and empty initially.

## Test Data

- Use runtime discovery for: field role, field value, date format
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: Create Standard License form open with no fields filled

## Notes

- Discover the expected date format at runtime (e.g., YYYY-MM-DD, MM/DD/YYYY)
- The field may render as a native date input or a plain textbox with format validation