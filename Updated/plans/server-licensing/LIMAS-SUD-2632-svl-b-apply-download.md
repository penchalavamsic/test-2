# LIMAS-SUD-2632: Apply triggers a file download

**Batch:** SVL-B (Create Server License Dialog)
**Profile:** SUPER_USER_ADMIN_USER
**Evidence Source:** Live UI observation

## Atomic Behavior
Clicking Apply triggers a browser download event with the server license file.

## Preconditions
- Dialog is open with a valid filename

## Steps
1. Set a unique filename
2. Listen for download event
3. Click Apply
4. Verify a download is triggered

## Expected
- A Playwright download event fires
- Download completes successfully

## Observed
- Download fires reliably on Apply click
- Dialog closes after download begins