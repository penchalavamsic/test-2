# Test Plan: LIMAS-SUD-2806 — SVL-E: Create SL Lifecycle Blocked

## Metadata

- **Test ID:** LIMAS-SUD-2806
- **Test Suite:** Server License Management SVL-E
- **Module:** Server License Management SVL-E
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Blocked
- **Atomic Behavior:** The complete Standard License create lifecycle — fill form, click Apply, verify card appears, verify badge count increments, verify persistence after refresh — cannot be guaranteed because safe runtime creation and cleanup require API access for deletion.

## Scope

Document that the complete create lifecycle test is blocked. The Create Standard License form functionality (fill and submit) can be verified in isolation, but the full lifecycle including safe teardown requires API-level deletion capability not available through the UI alone (since the Delete Standard License flow itself is incomplete).

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card expanded, Standard tab active
- Create Standard License form is open and filled with valid data

## Test Steps

1. Fill all required fields in the Create Standard License form
2. Click Apply to submit
3. Assert the form closes (verifiable)
4. Assert a new Standard License card appears with the submitted values (verifiable)
5. Assert the Standard tab badge count increments by 1 (verifiable)
6. Refresh the page and re-expand the customer card
7. Assert the created license persists after refresh (verifiable)
8. Delete the created license to clean up (BLOCKED — Delete SL lifecycle is incomplete)

## Expected Result

The create form submits successfully and produces a persistent Standard License card. Cleanup via Delete is blocked.

## Test Data

- Use runtime discovery for: badge counts, card presence, field values
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: a customer where Standard Licenses can be created with safe cleanup

## Notes

- **BLOCKED.** Status: Blocked. Reason: "Safe runtime Standard License creation and cleanup cannot be guaranteed. Reliable teardown would require API access for deletion."
- The Delete Standard License UI flow is incomplete; see related SVL-D Delete SL cases