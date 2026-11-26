# Test Plan: LIMAS-SUD-2772 — SVL-E: Create FL Product Profile Options

## Metadata

- **Test ID:** LIMAS-SUD-2772
- **Test Suite:** Server License Management SVL-E
- **Module:** Server License Management SVL-E
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** The Product Profile combobox shows available options at runtime. No values are hardcoded.

## Scope

Discover and verify that the Product Profile combobox has selectable options populated at runtime. The options should reflect the server-side configuration, not a static list.

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card expanded, Floating tab active
- Create Floating License form is open

## Test Steps

1. Open the Create Floating License form
2. Locate the Product Profile combobox
3. Expand the combobox to reveal its options
4. Assert at least one option is available
5. Record the option texts at runtime for verification

## Expected Result

The Product Profile combobox contains one or more selectable options populated at runtime.

## Test Data

- Use runtime discovery for: option texts, option count
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: Create Floating License form open

## Notes

- Do not hardcode any option values — discover and record at runtime
- Options may vary by customer, server type, or environment