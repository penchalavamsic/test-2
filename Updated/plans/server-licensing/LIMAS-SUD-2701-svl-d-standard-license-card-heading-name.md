# Test Plan: LIMAS-SUD-2701 — SVL-D: Standard License Card Heading Name

## Metadata

- **Test ID:** LIMAS-SUD-2701
- **Test Suite:** Server License Management SVL-D
- **Module:** Server License Management SVL-D
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** The h3 heading on each Standard License card matches the license name discovered at runtime.

## Scope

Verify that the heading text of a Standard License card reflects the actual license name (e.g., "APP-FCDS-USER", "DDM"). The specific value is discovered at runtime.

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card expanded, Standard tab active
- Customer has at least one Standard license card

## Test Steps

1. Expand a customer card with at least one Standard license
2. Locate the h3 heading on the first Standard license card
3. Read the heading text
4. Assert the heading is non-empty
5. Assert the heading uses h3 (level 3)

## Expected Result

Each Standard license card has an h3 heading whose text is the license name (e.g., "APP-FCDS-USER", "DDM" as observed at inspection time; actual names discovered at runtime).

## Test Data

- Use runtime discovery for: license names, heading text
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: at least one Standard license card

## Notes

- License names are domain-specific and discovered at runtime
- All cards should have a heading; validate each if multiple exist
