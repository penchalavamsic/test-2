# LIMAS-SUD-2630: Escape key closes the dialog safely

**Batch:** SVL-B (Create Server License Dialog)
**Profile:** SUPER_USER_ADMIN_USER
**Evidence Source:** Live UI observation

## Atomic Behavior
Pressing the Escape key closes the dialog without triggering a download, and focus returns to the trigger button.

## Preconditions
- Dialog is open with focus inside it

## Steps
1. Press Escape
2. Verify dialog is closed
3. Verify no download occurred
4. Verify focus returned to Create Server License button

## Expected
- Dialog is removed
- Focus is on the Create Server License button (active element)

## Observed
- Escape closes dialog
- Focus returns to Create Server License button (`[active]`)