# LIMAS-SUD-2665: Tab order follows expected sequence inside the dialog

**Batch:** SVL-C (Edit Customer Dialog)
**Profile:** SUPER_USER_ADMIN_USER
**Evidence Source:** Live UI observation

## Atomic Behavior
Pressing Tab inside the Edit Customer dialog navigates through interactive elements in the order: Customer name → Hardware ID → Server type radios → User Groups controls → System User controls → Cancel → Apply.

## Preconditions
- Edit Customer dialog is open
- Focus is on the Customer name field

## Steps
1. Open the Edit Customer dialog
2. Press Tab repeatedly and record each focused element
3. Verify the sequence: Customer name → Hardware ID → Server type radios → (User Groups controls) → (System User controls) → Cancel → Apply

## Expected
- Tab order: edit-cust-name → edit-hwid → Server type radiogroup → User Group interactive elements → System User buttons → Cancel button → Apply button
- No interactive element inside the dialog is skipped

## Observed
- Tab sequence follows: Customer name → Hardware ID → Server type radios → User Groups controls → System User controls → Cancel → Apply