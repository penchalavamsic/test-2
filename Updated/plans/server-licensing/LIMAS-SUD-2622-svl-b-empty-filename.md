# LIMAS-SUD-2622: Empty filename disables Apply

**Batch:** SVL-B (Create Server License Dialog)
**Profile:** SUPER_USER_ADMIN_USER
**Evidence Source:** Live UI observation

## Atomic Behavior
When the filename field is empty, the Apply button is disabled and the input is marked invalid.

## Preconditions
- Dialog is open

## Steps
1. Clear the filename field
2. Observe the Apply button state

## Expected
- Apply is disabled
- Input shows invalid state (browser-native)

## Observed
- Apply `disabled` when filename is empty
- Input marked `[invalid]` by browser