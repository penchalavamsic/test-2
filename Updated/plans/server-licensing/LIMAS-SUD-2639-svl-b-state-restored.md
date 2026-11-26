# LIMAS-SUD-2639: Dialog state resets to initial filename on reopen

**Batch:** SVL-B (Create Server License Dialog)
**Profile:** SUPER_USER_ADMIN_USER
**Evidence Source:** Live UI observation

## Atomic Behavior
After closing and reopening the dialog, the filename resets to `<CustomerName>_server_license.txt`.

## Preconditions
- Dialog was previously opened, a custom filename was set, and dialog was closed

## Steps
1. Open dialog, change filename to "custom-name", close dialog
2. Reopen dialog on same card
3. Verify filename has reset

## Expected
- Filename is back to `<CustomerName>_server_license.txt`
- Previous custom value is not retained

## Observed
- Filename always resets to `AATestCustomer_server_license.txt` on reopen
- No state leakage between dialog sessions