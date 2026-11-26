# LIMAS-SUD-2637: Tab order inside the dialog follows filename → Cancel → Apply

**Batch:** SVL-B (Create Server License Dialog)
**Profile:** SUPER_USER_ADMIN_USER
**Evidence Source:** Live UI observation

## Atomic Behavior
Tab navigation inside the dialog cycles through: filename input → Cancel → Apply, then exits the dialog.

## Preconditions
- Dialog is open

## Steps
1. Press Tab from the filename field — focus should move to Cancel
2. Press Tab again — focus should move to Apply
3. Press Tab again — focus exits the dialog

## Expected
- Tab order: filename → Cancel → Apply → outside

## Observed
- filename → Tab → Cancel → Tab → Apply → Tab → Standard tab (outside dialog)
- Close button is NOT in the tab order
- No focus trap — focus can leave the dialog