# LIMAS-SUD-2633: Downloaded filename matches accepted value with `_server_license.txt` suffix

**Batch:** SVL-B (Create Server License Dialog)
**Profile:** SUPER_USER_ADMIN_USER
**Evidence Source:** Live UI observation

## Atomic Behavior
The suggested download filename is the user-entered value with `_server_license.txt` appended.

## Preconditions
- Dialog is open with a custom filename

## Steps
1. Enter "my-test-export" as filename
2. Click Apply
3. Capture the download suggested filename

## Expected
- Suggested filename is `my-test-export_server_license.txt`

## Observed
- User input "my-test-export" → download `my-test-export_server_license.txt`
- Pattern: `<userInput>_server_license.txt`