# LIMAS-SUD-2620: Initial filename value is derived from customer name

**Batch:** SVL-B (Create Server License Dialog)
**Profile:** SUPER_USER_ADMIN_USER
**Evidence Source:** Live UI observation

## Atomic Behavior
When the dialog opens, the filename field is pre-filled with `<CustomerName>_server_license.txt`.

## Preconditions
- Dialog is open on a known customer card

## Steps
1. Open the Create Server License dialog on "AATestCustomer" card
2. Read the initial value of the "File name" textbox

## Expected
- Initial value matches pattern `<CustomerName>_server_license.txt`

## Observed
- Value: `AATestCustomer_server_license.txt`
- Pattern confirmed: customer name + `_server_license.txt`