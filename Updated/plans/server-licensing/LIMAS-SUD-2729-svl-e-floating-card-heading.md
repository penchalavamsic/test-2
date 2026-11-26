# Test Plan: LIMAS-SUD-2729 — SVL-E: Floating Card Heading

## Metadata

- **Test ID:** LIMAS-SUD-2729
- **Test Suite:** Server License Management SVL-E
- **Module:** Server License Management SVL-E
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** Each Floating License card has an h3 heading with the license name (e.g., "Authoring Suite 2", "STIHL EOL Tester") discovered at runtime.

## Scope

Verify that every Floating License card has an h3 heading whose text reflects the actual license name. License names are domain-specific and discovered at runtime.

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card expanded, Floating tab active
- Customer has at least one Floating license card

## Test Steps

1. Expand a customer card with at least one Floating license
2. Switch to the Floating tab
3. Locate the h3 heading on each Floating license card
4. Read the heading text
5. Assert the heading is non-empty
6. Assert the heading uses h3 (level 3)

## Expected Result

Each Floating license card has an h3 heading whose text is the license name (e.g., "Authoring Suite 2", "STIHL EOL Tester" as observed at inspection time; actual names discovered at runtime).

## Test Data

- Use runtime discovery for: license names, heading text
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: at least one Floating license card

## Notes

- License names are domain-specific and discovered at runtime
- All cards should have a heading; validate each if multiple exist