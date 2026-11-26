# Test Plan: LIMAS-SUD-2741 — SVL-E: Edit FL Dialog Opens

## Metadata

- **Test ID:** LIMAS-SUD-2741
- **Test Suite:** Server License Management SVL-E
- **Module:** Server License Management SVL-E
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** Clicking "Edit Floating License" on a Floating License card opens a region with accessible name "Edit Floating License" containing an h3 heading and a close button.

## Scope

Verify that the Edit Floating License dialog is implemented as a named region with proper heading and close button. Focus on dialog structure and identity, not field content.

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card expanded, Floating tab active
- Customer has at least one Floating License card

## Test Steps

1. Expand a customer card with at least one Floating License
2. Switch to the Floating tab
3. Locate a Floating License card
4. Click the "Edit Floating License" button on the card
5. Assert a region/dialog element appears
6. Assert the region has role "region" (or "dialog") and accessible name "Edit Floating License"
7. Assert the region contains an h3 heading
8. Assert a Close button with accessible name "Close Edit Floating License" is present

## Expected Result

A region with accessible name "Edit Floating License" opens, containing an h3 heading and a Close button labeled "Close Edit Floating License".

## Test Data

- Use runtime discovery for: license names, button labels, heading text
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: a customer with at least one Floating License card

## Notes

- The dialog may be rendered inline on the card or as a modal overlay; discover layout at runtime