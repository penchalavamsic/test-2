# LIMAS-SUD-2619: File name field is visible and editable

**Batch:** SVL-B (Create Server License Dialog)
**Profile:** SUPER_USER_ADMIN_USER
**Evidence Source:** Live UI observation

## Atomic Behavior
The dialog contains a visible, editable "File name" text input.

## Preconditions
- Dialog is open

## Steps
1. Open the Create Server License dialog
2. Locate the "File name" textbox

## Expected
- Textbox labeled "File name" is visible
- Field is editable (not read-only, not disabled)
- Field has a pre-filled initial value

## Observed
- Input with `id="create-sl-filename"`, type `text`
- Editable, not disabled, not read-only
- Pre-filled with `<CustomerName>_server_license.txt`