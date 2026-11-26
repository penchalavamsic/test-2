# LIMAS-SUD-2625: Long filenames are accepted

**Batch:** SVL-B (Create Server License Dialog)
**Profile:** SUPER_USER_ADMIN_USER
**Evidence Source:** Live UI observation

## Atomic Behavior
Long filenames (62+ characters) are accepted without truncation or error.

## Preconditions
- Dialog is open

## Steps
1. Type a 62-character filename
2. Verify Apply is enabled
3. Verify entire value is preserved

## Expected
- Apply is enabled
- Full text is preserved in the input

## Observed
- 62-character filename accepted, Apply enabled
- Input has no maxLength attribute
- No truncation observed