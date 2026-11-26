# Test Plan: LIMAS-SUD-2684 — SVL-D: Delete Customer Initial Focus

## Metadata

- **Test ID:** LIMAS-SUD-2684
- **Test Suite:** Server License Management SVL-D
- **Module:** Server License Management SVL-D
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** When the confirmation dialog opens, initial focus is placed on a reasonable element within the dialog.

## Scope

Verify that focus management moves keyboard focus into the confirmation dialog when it opens. The focused element should be a logical first interactive control (e.g., Cancel button, Confirm button, or the dialog heading).

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer with zero licenses is expanded
- Delete Customer button is focused or focus is near it

## Test Steps

1. Ensure focus is on or near the "Delete Customer" button
2. Click "Delete Customer" to open the confirmation dialog
3. Query the currently focused element
4. Assert the focused element is inside the confirmation dialog region
5. Assert the focused element is a reasonable first target (button, heading, or close control)

## Expected Result

Focus moves into the dialog. The focused element is within the dialog region and is a logical initial target for keyboard interaction.

## Test Data

- Use runtime discovery for: customer name, focused element role/name
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: a customer with zero Standard and zero Floating licenses

## Notes

- "Reasonable" includes: Cancel button, Confirm/Delete button, or the dialog heading
- Focus must not remain on the triggering button outside the dialog
