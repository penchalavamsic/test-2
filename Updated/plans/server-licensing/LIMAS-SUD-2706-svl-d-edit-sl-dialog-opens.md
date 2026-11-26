# Test Plan: LIMAS-SUD-2706 — SVL-D: Edit Standard License Dialog Opens

## Metadata

- **Test ID:** LIMAS-SUD-2706
- **Test Suite:** Server License Management SVL-D
- **Module:** Server License Management SVL-D
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** Clicking "Edit Standard License" on a Standard License card opens a region with accessible name "Edit Standard License" containing an h3 heading and a close button.

## Scope

Verify that the Edit Standard License dialog is implemented as a named region with proper heading and close button. Focus on dialog structure and identity, not field content.

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card expanded, Standard tab active
- Customer has at least one Standard License card

## Test Steps

1. Expand a customer card with at least one Standard License
2. Locate a Standard License card
3. Click the "Edit Standard License" button on the card
4. Assert a region/dialog element appears
5. Assert the region has role "region" (or "dialog") and accessible name "Edit Standard License"
6. Assert the region contains an h3 heading
7. Assert a Close button with accessible name "Close Edit Standard License" is present

## Expected Result

A region with accessible name "Edit Standard License" opens, containing an h3 heading and a Close button labeled "Close Edit Standard License".

## Test Data

- Use runtime discovery for: license names, button labels, heading text
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: a customer with at least one Standard License card

## Notes

- The dialog may be rendered inline on the card or as a modal overlay; discover layout at runtime
