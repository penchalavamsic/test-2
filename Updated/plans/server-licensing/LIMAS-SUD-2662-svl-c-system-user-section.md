# LIMAS-SUD-2662: System User section shows "Not assigned" with correct button states

**Batch:** SVL-C (Edit Customer Dialog)
**Profile:** SUPER_USER_ADMIN_USER
**Evidence Source:** Live UI observation

## Atomic Behavior
The System User section is visible, showing "Not assigned" status with Create System User button enabled, and Edit System User and Delete System User buttons disabled.

## Preconditions
- Edit Customer dialog is open on a customer card with no System User assigned (e.g., AATestCustomer)

## Steps
1. Open the Edit Customer dialog
2. Scroll to the System User section
3. Verify the status text shows "Not assigned"
4. Verify Create System User button is visible and enabled
5. Verify Edit System User button is visible and disabled
6. Verify Delete System User button is visible and disabled

## Expected
- System User section is visible
- "Not assigned" text displayed
- Create System User button enabled
- Edit System User button disabled
- Delete System User button disabled

## Observed
- "Not assigned" shown
- Create System User enabled; Edit and Delete System User disabled