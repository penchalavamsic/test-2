# Test Plan: LIMAS-SUD-2788 — SVL-E: Create SL Close Button

## Metadata

- **Test ID:** LIMAS-SUD-2788
- **Test Suite:** Server License Management SVL-E
- **Module:** Server License Management SVL-E
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** The Create Standard License form includes a visible "Close Create Standard License" button.

## Scope

Verify that a Close button with the correct accessible name is present in the Create Standard License form, providing a standard dismissal control alongside Cancel and Escape.

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card expanded, Standard tab active
- Create Standard License form is open

## Test Steps

1. Open the Create Standard License form
2. Locate the Close button within the form region
3. Assert the button has accessible name "Close Create Standard License"
4. Assert the button is visible and interactive

## Expected Result

A "Close Create Standard License" button is visible in the form.

## Test Data

- Use runtime discovery for: button accessible name, visibility
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: Create Standard License form open

## Notes

- The Close button pattern matches other SVL forms (Close Edit Floating License, etc.)
- Discover the exact accessible name at runtime