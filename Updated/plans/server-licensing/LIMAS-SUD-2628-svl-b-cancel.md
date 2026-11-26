# LIMAS-SUD-2628: Cancel closes the dialog without downloading

**Batch:** SVL-B (Create Server License Dialog)
**Profile:** SUPER_USER_ADMIN_USER
**Evidence Source:** Live UI observation

## Atomic Behavior
Clicking the Cancel button closes the dialog without triggering a download.

## Preconditions
- Dialog is open

## Steps
1. Set a custom filename
2. Click Cancel
3. Verify dialog is closed and no download occurred

## Expected
- Dialog region is removed
- No download is triggered
- Focus returns to the Create Server License button

## Observed
- Dialog closes on Cancel click
- Focus returns to Create Server License button