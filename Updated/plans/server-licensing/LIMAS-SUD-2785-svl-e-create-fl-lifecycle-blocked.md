# Test Plan: LIMAS-SUD-2785 — SVL-E: Create FL Lifecycle Blocked

## Metadata

- **Test ID:** LIMAS-SUD-2785
- **Test Suite:** Server License Management SVL-E
- **Module:** Server License Management SVL-E
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Blocked
- **Atomic Behavior:** The complete Floating License create lifecycle — fill form, click Apply, verify card appears, verify badge count increments, verify persistence after refresh — cannot be guaranteed because safe runtime creation and cleanup require API access for deletion.

## Scope

Document that the complete create lifecycle test is blocked. The Create Floating License form functionality (fill and submit) can be verified in isolation, but the full lifecycle including safe teardown requires API-level deletion capability not available through the UI alone (since the Delete Floating License flow itself is incomplete).

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card expanded, Floating tab active
- Create Floating License form is open and filled with valid data

## Test Steps

1. Fill all required fields in the Create Floating License form
2. Click Apply to submit
3. Assert the form closes (verifiable)
4. Assert a new Floating License card appears with the submitted values (verifiable)
5. Assert the Floating tab badge count increments by 1 (verifiable)
6. Refresh the page and re-expand the customer card
7. Assert the created license persists after refresh (verifiable)
8. Delete the created license to clean up (BLOCKED — Delete FL lifecycle is incomplete)

## Expected Result

The create form submits successfully and produces a persistent Floating License card. Cleanup via Delete is blocked.

## Test Data

- Use runtime discovery for: badge counts, card presence, field values
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: a customer where Floating Licenses can be created with safe cleanup

## Notes

- **BLOCKED.** Safe runtime Floating License creation and cleanup cannot be guaranteed. Reliable teardown would require API access for deletion. The Delete Floating License UI flow is incomplete (see LIMAS-SUD-2764).
- Reason: "Safe runtime Floating License creation and cleanup cannot be guaranteed. Reliable teardown would require API access for deletion."