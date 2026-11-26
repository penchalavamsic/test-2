# LIMAS-SUD-2636: Initial focus is on the filename input when dialog opens

**Batch:** SVL-B (Create Server License Dialog)
**Profile:** SUPER_USER_ADMIN_USER
**Evidence Source:** Live UI observation

## Atomic Behavior
When the dialog opens, keyboard focus is placed on the "File name" textbox.

## Preconditions
- Dialog is opened via click on Create Server License button

## Steps
1. Open the dialog
2. Check the active element

## Expected
- Active element is the filename textbox

## Observed
- `document.activeElement` is `INPUT#create-sl-filename` on dialog open
- Focus is set reliably on open