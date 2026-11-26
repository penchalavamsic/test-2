# LIMAS-SUD-2624: Special characters in filename are accepted

**Batch:** SVL-B (Create Server License Dialog)
**Profile:** SUPER_USER_ADMIN_USER
**Evidence Source:** Live UI observation

## Atomic Behavior
Special characters including parentheses, dots, hyphens, underscores, and spaces are accepted in the filename field.

## Preconditions
- Dialog is open

## Steps
1. Type a filename with special characters: "my-file_123 (test).key"
2. Verify Apply is enabled

## Expected
- Filename with special characters is accepted
- Apply is enabled

## Observed
- `my-file_123 (test).key` accepted, Apply enabled
- No special-character restrictions observed