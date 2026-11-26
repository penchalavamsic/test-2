# Test Plan: LIMAS-SUD-2702 — SVL-D: Standard License Card Profile Role

## Metadata

- **Test ID:** LIMAS-SUD-2702
- **Test Suite:** Server License Management SVL-D
- **Module:** Server License Management SVL-D
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** Each Standard License card displays a Profile Role field with a label and a value discovered at runtime.

## Scope

Verify that the Profile Role field is present on Standard License cards and contains a readable label and value. Example values observed: "FULL", "Engineer", "All".

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card expanded, Standard tab active
- Customer has at least one Standard license card

## Test Steps

1. Expand a customer card with at least one Standard license
2. Locate a Standard license card
3. Locate the field labeled "Profile Role" (or equivalent discovered label)
4. Assert the label is visible
5. Assert a non-empty value is displayed alongside the label
6. Read and log the actual value

## Expected Result

The Profile Role field label and value are visible on each Standard license card. Values (e.g., "FULL", "Engineer", "All") are discovered at runtime.

## Test Data

- Use runtime discovery for: profile role values, field label text
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: at least one Standard license card

## Notes

- Profile role values are domain-specific; do not assert specific values, only presence
