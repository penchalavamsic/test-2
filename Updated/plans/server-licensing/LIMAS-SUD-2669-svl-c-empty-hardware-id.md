# LIMAS-SUD-2669: Clearing the Hardware ID field enables Apply

**Batch:** SVL-C (Edit Customer Dialog)
**Profile:** SUPER_USER_ADMIN_USER
**Evidence Source:** Live UI observation

## Atomic Behavior
Clearing the Hardware ID field so it is empty is treated as a change from the pre-filled value, enabling the Apply button.

## Preconditions
- Edit Customer dialog is open with Hardware ID pre-filled
- Apply is initially disabled

## Steps
1. Open the Edit Customer dialog
2. Clear the Hardware ID field (select all and delete, leaving it empty)
3. Verify the Apply button state

## Expected
- Apply button is enabled
- An empty Hardware ID is treated as a change from the original value

## Observed
- Apply enabled when Hardware ID is cleared to empty