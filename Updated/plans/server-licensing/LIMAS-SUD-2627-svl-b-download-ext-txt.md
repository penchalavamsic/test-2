# LIMAS-SUD-2627: Downloaded file has .txt extension

**Batch:** SVL-B (Create Server License Dialog)
**Profile:** SUPER_USER_ADMIN_USER
**Evidence Source:** Live UI observation

## Atomic Behavior
The downloaded server license file always has a `.txt` extension.

## Preconditions
- Dialog is open

## Steps
1. Set a filename without ".txt" extension
2. Click Apply
3. Verify the download filename extension

## Expected
- Suggested filename ends with `.txt`

## Observed
- Input "noextname" → download `noextname_server_license.txt` (`.txt` extension always present)