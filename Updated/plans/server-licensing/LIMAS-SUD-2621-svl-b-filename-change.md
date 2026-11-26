# LIMAS-SUD-2621: Filename can be changed to a custom value

**Batch:** SVL-B (Create Server License Dialog)
**Profile:** SUPER_USER_ADMIN_USER
**Evidence Source:** Live UI observation

## Atomic Behavior
The user can replace the initial filename with any custom text, and Apply becomes enabled when the value is non-empty and non-whitespace.

## Preconditions
- Dialog is open

## Steps
1. Clear the filename field
2. Type a custom filename (e.g., "my-custom-name")
3. Verify Apply is enabled

## Expected
- Custom filename is accepted
- Apply is enabled

## Observed
- Custom filenames accepted; Apply enabled for any non-empty, non-whitespace value