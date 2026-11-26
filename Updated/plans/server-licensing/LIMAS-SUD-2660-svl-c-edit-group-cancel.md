# LIMAS-SUD-2660: Cancelling group edit reverts the name to its original value

**Batch:** SVL-C (Edit Customer Dialog)
**Profile:** SUPER_USER_ADMIN_USER
**Evidence Source:** Live UI observation

## Atomic Behavior
Clicking Cancel during an inline group edit reverts the group name to its original value and exits edit mode.

## Preconditions
- Edit Customer dialog is open
- A group row is in edit mode with a modified name

## Steps
1. Open the Edit Customer dialog
2. Click "Edit group <name>" on an existing group
3. Change the group name in the textbox
4. Click Cancel
5. Verify the group name reverts

## Expected
- The group name reverts to its original value
- The row returns to display mode (name + Edit/Delete buttons)
- The main Apply button does not enable (no net change from this action)

## Observed
- Group name reverts to original
- Row exits edit mode