# LIMAS-SUD-2623: Whitespace-only filename disables Apply

**Batch:** SVL-B (Create Server License Dialog)
**Profile:** SUPER_USER_ADMIN_USER
**Evidence Source:** Live UI observation

## Atomic Behavior
When the filename contains only whitespace characters, the Apply button is disabled even though the input passes HTML5 constraint validation.

## Preconditions
- Dialog is open

## Steps
1. Type spaces or tabs only in the filename field
2. Observe the Apply button state

## Expected
- Apply is disabled
- App explicitly rejects whitespace-only values

## Observed
- Three spaces: HTML5 `valid` = true, but Apply `disabled` = true
- App-level rejection of whitespace-only values beyond native validation