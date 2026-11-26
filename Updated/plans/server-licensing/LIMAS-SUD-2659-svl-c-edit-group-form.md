# LIMAS-SUD-2659: Clicking Edit group transforms the row into an editable form

**Batch:** SVL-C (Edit Customer Dialog)
**Profile:** SUPER_USER_ADMIN_USER
**Evidence Source:** Live UI observation

## Atomic Behavior
Clicking "Edit group <name>" transforms the group row into an editable textbox with Cancel and Apply buttons.

## Preconditions
- Edit Customer dialog is open with at least one existing group row

## Steps
1. Open the Edit Customer dialog
2. Locate an existing group row (e.g., "testGroup")
3. Click "Edit group testGroup"
4. Verify the row transforms

## Expected
- The group name becomes an editable textbox pre-filled with the current name
- Cancel and Apply buttons appear in the row
- The main Apply button may be disabled (inline Apply handles the group-level save)

## Observed
- Group row transforms into editable textbox with Cancel and Apply buttons