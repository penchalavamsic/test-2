# Test Plan: LIMAS-SUD-2762 — SVL-E: Delete FL Card Not Removed

## Metadata

- **Test ID:** LIMAS-SUD-2762
- **Test Suite:** Server License Management SVL-E
- **Module:** Server License Management SVL-E
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** After clicking Delete Floating License (without confirmation), the card text remains unchanged. The card is not removed from the list.

## Scope

Document the observed behavior that clicking Delete does not immediately remove the card from the DOM. The card's visible content and position remain unchanged after the click.

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card expanded, Floating tab active
- Floating License card is visible

## Test Steps

1. Record the heading text and content of a Floating License card
2. Click the Delete Floating License button on that card
3. Assert the card element is still present in the DOM
4. Assert the card heading and text match the recorded values
5. Assert the Floating tab badge count has not changed

## Expected Result

The Floating License card remains present and unchanged after clicking Delete. Card heading and content are identical to pre-click state.

## Test Data

- Use runtime discovery for: card text, badge count
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: a Floating License card

## Notes

- Observation source: STIHL EOL Tester — card remained after click
- This behavior suggests the Delete flow is incomplete or non-functional
- Do NOT click Delete in automated tests — document behavior only