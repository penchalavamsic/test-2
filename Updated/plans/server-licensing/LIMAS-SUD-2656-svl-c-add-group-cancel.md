# LIMAS-SUD-2656: Cancel dismisses the Add Group form without adding a group

**Batch:** SVL-C (Edit Customer Dialog)
**Profile:** SUPER_USER_ADMIN_USER
**Evidence Source:** Live UI observation

## Atomic Behavior
Clicking Cancel in the Add Group inline form dismisses the form without adding a new group to the list.

## Preconditions
- Edit Customer dialog is open
- Add Group inline form is visible

## Steps
1. Open the Edit Customer dialog
2. Click "Add Group" to open the inline form
3. Type a group name into the textbox
4. Click Cancel
5. Verify the form is dismissed

## Expected
- The inline form is removed
- The User Groups list is unchanged (no new group added)
- The Apply button remains disabled (assuming no other changes)

## Observed
- Inline form dismissed on Cancel
- No group added to the list