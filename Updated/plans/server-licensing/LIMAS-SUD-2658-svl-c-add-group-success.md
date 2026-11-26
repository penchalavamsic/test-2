# LIMAS-SUD-2658: Adding a unique group name successfully adds it to the list

**Batch:** SVL-C (Edit Customer Dialog)
**Profile:** SUPER_USER_ADMIN_USER
**Evidence Source:** Live UI observation

## Atomic Behavior
Entering a unique group name and clicking Add successfully adds it to the User Groups list and enables the main Apply button.

## Preconditions
- Edit Customer dialog is open
- Add Group inline form is visible and other fields are unchanged

## Steps
1. Open the Edit Customer dialog
2. Click "Add Group"
3. Enter a unique group name not already in the list
4. Click Add
5. Verify the group appears in the User Groups list
6. Verify the main Apply button becomes enabled

## Expected
- The new group appears in the User Groups list with Edit and Delete buttons
- The inline form closes
- The main Apply button is enabled

## Observed
- New group added to list with its name, Edit, and Delete buttons
- Apply button enabled