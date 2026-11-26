# Test Plan: LIMAS-SUD-2791 — SVL-E: Create SL Profile Role Enables

## Metadata

- **Test ID:** LIMAS-SUD-2791
- **Test Suite:** Server License Management SVL-E
- **Module:** Server License Management SVL-E
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** The Profile Role combobox becomes enabled after selecting a Product Profile. (Assumed behavior from dependent dropdown pattern.)

## Scope

Verify the dependent dropdown behavior: selecting a Product Profile enables the previously disabled Profile Role combobox. Discover the behavior at runtime and confirm the cascade.

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card expanded, Standard tab active
- Create Standard License form is open
- Profile Role is initially disabled

## Test Steps

1. Open the Create Standard License form
2. Confirm Profile Role combobox is disabled
3. Select an option from the Product Profile combobox
4. Assert the Profile Role combobox is now enabled
5. Assert the Profile Role combobox has available options (or placeholder still visible but interactive)

## Expected Result

The Profile Role combobox transitions from disabled to enabled after a Product Profile is selected.

## Test Data

- Use runtime discovery for: disabled/enabled state transitions, available options
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: Create Standard License form with at least one selectable Product Profile

## Notes

- This is assumed behavior based on the dependent dropdown pattern observed elsewhere in the UI
- Verify at runtime — the exact enable condition may differ from assumption