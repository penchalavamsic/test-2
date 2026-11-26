# Test Plan: LIMAS-SUD-2757 — SVL-E: Edit FL Initial Focus

## Metadata

- **Test ID:** LIMAS-SUD-2757
- **Test Suite:** Server License Management SVL-E
- **Module:** Server License Management SVL-E
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** When the Edit Floating License dialog opens, keyboard focus lands on a reasonable first field within the dialog.

## Scope

Verify that focus management places the user on an interactive element inside the Edit Floating License dialog when it opens, rather than leaving focus on the trigger button or at the top of the page.

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card expanded, Floating tab active
- Edit Floating License dialog has just been opened

## Test Steps

1. Click the "Edit Floating License" button on a Floating License card
2. After the dialog appears, query the active element
3. Assert the active element is within the dialog region
4. Assert the active element is an interactive control (textbox, spinbutton, or combobox)

## Expected Result

Focus lands on a reasonable first field inside the Edit Floating License dialog — typically the first editable input.

## Test Data

- Use runtime discovery for: focused element, dialog structure
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: a Floating License card with Edit button

## Notes

- Discover the actual focused element at runtime — do not assume a specific field id
- Focus should be inside the dialog, not on the trigger button