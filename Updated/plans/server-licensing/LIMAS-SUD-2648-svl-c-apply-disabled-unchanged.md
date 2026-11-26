# LIMAS-SUD-2648: Apply is disabled when no field has been changed

**Batch:** SVL-C (Edit Customer Dialog)
**Profile:** SUPER_USER_ADMIN_USER
**Evidence Source:** Live UI observation

## Atomic Behavior
The Apply button is disabled when the dialog opens and no field has been modified from its initial pre-filled value.

## Preconditions
- Edit Customer dialog is open with fields pre-filled

## Steps
1. Open the Edit Customer dialog
2. Do not modify any field
3. Verify the Apply button state

## Expected
- Apply button is disabled
- No change has been made to customer name, hardware ID, or server type

## Observed
- Apply button is disabled on dialog open
- Button enables only after a field value differs from its initial state