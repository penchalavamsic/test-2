# Test Plan: LIMAS-SUD-2792 — SVL-E: Create SL Product Profile Options

## Metadata

- **Test ID:** LIMAS-SUD-2792
- **Test Suite:** Server License Management SVL-E
- **Module:** Server License Management SVL-E
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** The Product Profile combobox in the Create Standard License form shows the available product profile options at runtime.

## Scope

Verify that the Product Profile combobox is populated with available options when opened, and that the options are discoverable at runtime. Do not hardcode any specific option names.

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card expanded, Standard tab active
- Create Standard License form is open
- Product profiles are available in the system

## Test Steps

1. Open the Create Standard License form
2. Locate the Product Profile combobox
3. Click or focus the combobox to expose options
4. Assert the combobox has at least one option available
5. Record the available options at runtime for use in dependent tests

## Expected Result

The Product Profile combobox shows available options from the system. Option count is at least 1.

## Test Data

- Use runtime discovery for: option list, option count, option labels
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: Create Standard License form open with product profiles available

## Notes

- Options are environment-dependent; do not hardcode expected values
- The option list may be loaded asynchronously — allow time for population