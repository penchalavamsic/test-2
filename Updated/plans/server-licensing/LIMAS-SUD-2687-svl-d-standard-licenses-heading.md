# Test Plan: LIMAS-SUD-2687 — SVL-D: Standard Licenses Heading

## Metadata

- **Test ID:** LIMAS-SUD-2687
- **Test Suite:** Server License Management SVL-D
- **Module:** Server License Management SVL-D
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** The h2 heading "Standard Licenses" is visible within the expanded customer card.

## Scope

Verify that the Standard Licenses section is introduced by a semantic h2 heading with text "Standard Licenses". This heading provides structural navigation for all users.

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card is expanded

## Test Steps

1. Expand a customer card
2. Locate the heading element with text "Standard Licenses"
3. Assert the heading level is h2 (level 2)
4. Assert the heading is visible

## Expected Result

An h2 heading "Standard Licenses" is visible inside the expanded customer card.

## Test Data

- Use runtime discovery for: customer names
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: any expanded customer card

## Notes

- Heading serves as the section landmark for the Standard Licenses content
