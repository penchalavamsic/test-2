# Test Plan: LIMAS-SUD-2805 — SVL-E: Create SL Focus Return

## Metadata

- **Test ID:** LIMAS-SUD-2805
- **Test Suite:** Server License Management SVL-E
- **Module:** Server License Management SVL-E
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** After closing the Create Standard License form, focus returns to the "Create Standard License" button that triggered it.

## Scope

Verify proper focus restoration after form dismissal. Focus should return to the trigger button regardless of dismissal method (Escape, Cancel, or Close).

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card expanded, Standard tab active
- Create Standard License form has been closed

## Test Steps

1. Open the Create Standard License form
2. Press Escape to close
3. Assert the active element is the "Create Standard License" button
4. Reopen the form
5. Click Cancel to close
6. Assert the active element is the "Create Standard License" button
7. Reopen the form
8. Click the Close button ("Close Create Standard License")
9. Assert the active element is the "Create Standard License" button

## Expected Result

Focus returns to the "Create Standard License" button after Escape, Cancel, and Close dismissal.

## Test Data

- Use runtime discovery for: focused element, button accessible name
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: Create Standard License form can be opened and closed

## Notes

- Test all three dismissal methods (Escape, Cancel, Close) for focus return
- Focus management is critical for keyboard accessibility