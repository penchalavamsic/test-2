# Test Plan: LIMAS-SUD-2742 — SVL-E: Edit FL Heading

## Metadata

- **Test ID:** LIMAS-SUD-2742
- **Test Suite:** Server License Management SVL-E
- **Module:** Server License Management SVL-E
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** The Edit Floating License dialog contains an h3 heading "Edit Floating License".

## Scope

Verify that the dialog heading is an h3 element with the exact text "Edit Floating License". This heading provides the title for the editing form.

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card expanded, Floating tab active
- Edit Floating License dialog is open

## Test Steps

1. Open the Edit Floating License dialog on a Floating License card
2. Locate the heading element within the dialog region
3. Assert the heading level is h3 (level 3)
4. Assert the heading text is "Edit Floating License"

## Expected Result

An h3 heading "Edit Floating License" is visible within the dialog.

## Test Data

- Use runtime discovery for: heading text, heading level
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: any Floating License card with Edit dialog open

## Notes

- The heading should match the pattern established by SVL-D's "Edit Standard License" heading