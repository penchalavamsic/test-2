# LIMAS-SUD-2626: Downloaded filename appends `_server_license.txt`

**Batch:** SVL-B (Create Server License Dialog)
**Profile:** SUPER_USER_ADMIN_USER
**Evidence Source:** Live UI observation

## Atomic Behavior
The downloaded filename is always `<user-input>_server_license.txt`, regardless of what extension the user types.

## Preconditions
- Dialog is open with a custom filename

## Steps
1. Type "noextname" (no extension) as filename
2. Click Apply
3. Verify the suggested download filename

## Expected
- Suggested filename is `noextname_server_license.txt`

## Observed
- Input "noextname" → downloaded as `noextname_server_license.txt`
- Input "my-file.txt" → downloaded as `my-file_server_license.txt`
- UI always appends `_server_license.txt` to user input