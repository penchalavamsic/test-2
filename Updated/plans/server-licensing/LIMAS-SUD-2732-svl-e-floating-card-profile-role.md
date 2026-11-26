# Test Plan: LIMAS-SUD-2732 — SVL-E: Floating Card Profile Role

## Metadata

- **Test ID:** LIMAS-SUD-2732
- **Test Suite:** Server License Management SVL-E
- **Module:** Server License Management SVL-E
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** Each Floating License card displays a Profile Role label and value (e.g., "2020-R2", "manager") discovered at runtime.

## Scope

Verify that every Floating License card shows a Profile Role field with both label and value. The specific role value is discovered at runtime.

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card expanded, Floating tab active
- Customer has at least one Floating license card

## Test Steps

1. Expand a customer card with at least one Floating license
2. Switch to the Floating tab
3. Locate the first Floating license card
4. Assert a label "Profile Role" is visible on the card
5. Assert a corresponding value is visible next to the label (non-empty)
6. Read and record the value (e.g., "2020-R2", "manager")

## Expected Result

Each Floating license card displays a "Profile Role" label with a non-empty value (e.g., "2020-R2", "manager").

## Test Data

- Use runtime discovery for: Profile Role values
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: at least one Floating license card

## Notes

- The Profile Role value is domain-specific and discovered at runtime