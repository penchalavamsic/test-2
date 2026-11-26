# LIMAS-SUD-2631: Apply button is enabled when filename is non-empty and non-whitespace

**Batch:** SVL-B (Create Server License Dialog)
**Profile:** SUPER_USER_ADMIN_USER
**Evidence Source:** Live UI observation

## Atomic Behavior
The Apply button is enabled when the filename field contains a non-empty, non-whitespace value.

## Preconditions
- Dialog is open

## Steps
1. Verify Apply is enabled with default filename
2. Clear and enter spaces only — verify Apply is disabled
3. Enter valid text — verify Apply becomes enabled

## Expected
- Apply is enabled for any non-empty, non-whitespace string
- Apply is disabled for empty or whitespace-only

## Observed
- Default value → enabled
- Empty → disabled + invalid
- Whitespace-only → disabled (valid per HTML5 but rejected at app level)
- Any non-whitespace text → enabled