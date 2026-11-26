# Test Plan: LIMAS-SUD-2724 — SVL-E: Floating Section Description

## Metadata

- **Test ID:** LIMAS-SUD-2724
- **Test Suite:** Server License Management SVL-E
- **Module:** Server License Management SVL-E
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** A description paragraph is visible below the "Standard Licenses" heading, providing context for the license section.

## Scope

Verify that a descriptive text element is visible below the h2 "Standard Licenses" heading. This description provides contextual information about the license management section.

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card is expanded

## Test Steps

1. Expand a customer card
2. Locate the h2 heading "Standard Licenses"
3. Assert a paragraph or descriptive text element follows the heading
4. Assert the description text is visible and non-empty

## Expected Result

A visible description paragraph appears below the "Standard Licenses" heading, providing section context.

## Test Data

- Use runtime discovery for: description text content
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: any expanded customer card

## Notes

- The exact description text is discovered at runtime