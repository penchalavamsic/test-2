# LIMAS-SUD-2670: Switching the Server type radio selection enables Apply

**Batch:** SVL-C (Edit Customer Dialog)
**Profile:** SUPER_USER_ADMIN_USER
**Evidence Source:** Live UI observation

## Atomic Behavior
Selecting a different Server type radio option from the pre-selected one enables the Apply button.

## Preconditions
- Edit Customer dialog is open with a pre-selected Server type (e.g., Full License on AATestCustomer)
- Apply is initially disabled

## Steps
1. Open the Edit Customer dialog
2. Select a different Server type radio option (e.g., switch from Full License to Standard or Hybrid)
3. Verify the Apply button state

## Expected
- Apply button is enabled
- The radio selection change triggers the Apply enablement

## Observed
- Apply enabled after Server type radio selection is changed