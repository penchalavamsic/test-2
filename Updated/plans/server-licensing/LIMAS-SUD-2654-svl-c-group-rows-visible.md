# LIMAS-SUD-2654: Existing User Group rows display with Edit and Delete buttons

**Batch:** SVL-C (Edit Customer Dialog)
**Profile:** SUPER_USER_ADMIN_USER
**Evidence Source:** Live UI observation

## Atomic Behavior
Each existing User Group row displays the group name along with "Edit group <name>" and "Delete group <name>" buttons.

## Preconditions
- Edit Customer dialog is open on a customer card with existing user groups (e.g., AATestCustomer: testGroup)

## Steps
1. Open the Edit Customer dialog
2. Locate the User Groups section
3. Verify each group row shows the group name
4. Verify each row has an "Edit group <name>" button
5. Verify each row has a "Delete group <name>" button

## Expected
- Each group row displays the group name
- "Edit group <name>" button has accessible name including the specific group name
- "Delete group <name>" button has accessible name including the specific group name

## Observed
- Group name "testGroup" visible in the row
- "Edit group testGroup" and "Delete group testGroup" buttons present