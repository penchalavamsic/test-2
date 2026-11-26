# LIMAS-SUD-2655: Clicking Add Group opens an inline form

**Batch:** SVL-C (Edit Customer Dialog)
**Profile:** SUPER_USER_ADMIN_USER
**Evidence Source:** Live UI observation

## Atomic Behavior
Clicking the "Add Group" button opens an inline form with a "New group name" textbox, Cancel, and Add buttons.

## Preconditions
- Edit Customer dialog is open
- User Groups section is visible

## Steps
1. Open the Edit Customer dialog
2. Click "Add Group" in the User Groups section
3. Verify an inline form appears

## Expected
- A textbox for "New group name" appears within the User Groups section
- Cancel button is present in the inline form
- Add button is present in the inline form

## Observed
- Inline form with "New group name" textbox, Cancel, and Add buttons appears after clicking "Add Group"