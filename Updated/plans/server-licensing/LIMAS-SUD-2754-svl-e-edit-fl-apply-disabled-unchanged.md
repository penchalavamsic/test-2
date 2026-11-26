# Test Plan: LIMAS-SUD-2754 — SVL-E: Edit FL Apply Disabled Unchanged

## Metadata

- **Test ID:** LIMAS-SUD-2754
- **Test Suite:** Server License Management SVL-E
- **Module:** Server License Management SVL-E
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** The Apply button is disabled when the Edit Floating License dialog opens and no field has been modified from its initial pre-filled value.

## Scope

Verify that the Apply button is in a disabled state immediately when the dialog opens, before any user interaction. This prevents accidental no-op submissions.

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card expanded, Floating tab active
- Edit Floating License dialog is open

## Test Steps

1. Open the Edit Floating License dialog on a Floating License card
2. Do not modify any field
3. Locate the Apply button
4. Assert the Apply button is disabled (aria-disabled="true" or disabled attribute)

## Expected Result

The Apply button is disabled on dialog open when no changes have been made.

## Test Data

- Use runtime discovery for: button state attribute
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: any Floating License card with Edit dialog open

## Notes

- Verify the disabled state immediately after dialog opens — do not touch any field first