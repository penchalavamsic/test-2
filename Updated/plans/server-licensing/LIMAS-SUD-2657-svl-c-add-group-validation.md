# LIMAS-SUD-2657: Adding a duplicate group name shows validation alert

**Batch:** SVL-C (Edit Customer Dialog)
**Profile:** SUPER_USER_ADMIN_USER
**Evidence Source:** Live UI observation

## Atomic Behavior
Entering a group name that already exists and clicking Add shows an alert "A user group with this name already exists." The inline form remains open.

## Preconditions
- Edit Customer dialog is open with at least one existing group (e.g., testGroup)
- Add Group inline form is visible

## Steps
1. Open the Edit Customer dialog
2. Click "Add Group"
3. Enter the name of an already-existing group (e.g., "testGroup")
4. Click Add
5. Observe the validation response

## Expected
- Alert appears with text "A user group with this name already exists."
- The inline form remains open for correction
- No duplicate is added to the list

## Observed
- Alert "A user group with this name already exists." displayed
- Add Group form stays open