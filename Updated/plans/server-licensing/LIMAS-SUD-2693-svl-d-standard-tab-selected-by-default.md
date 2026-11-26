# Test Plan: LIMAS-SUD-2693 — SVL-D: Standard Tab Selected By Default

## Metadata

- **Test ID:** LIMAS-SUD-2693
- **Test Suite:** Server License Management SVL-D
- **Module:** Server License Management SVL-D
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** The Standard tab is selected by default when a customer card is expanded.

## Scope

Verify the default tab selection behavior: when a customer card is first expanded, the Standard tab should be the active tab, showing Standard license content. Observed on CLAAS_LMT_DEV.

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card is collapsed (or freshly loaded page)

## Test Steps

1. Locate a customer card that is currently collapsed
2. Expand the card (click expand toggle)
3. Assert the "Standard" tab is in the selected/active state
4. Assert Standard license content is visible (heading "Standard Licenses" or cards or empty state)

## Expected Result

The Standard tab is selected and Standard license content is displayed immediately on card expansion.

## Test Data

- Use runtime discovery for: customer names, tab states
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: any customer card in collapsed state

## Notes

- This was observed on CLAAS_LMT_DEV at time of inspection; verify at runtime
- Default tab selection must be consistent across all customers
