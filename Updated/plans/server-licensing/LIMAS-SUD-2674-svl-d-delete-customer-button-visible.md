# Test Plan: LIMAS-SUD-2674 — SVL-D: Delete Customer Button Visible

## Metadata

- **Test ID:** LIMAS-SUD-2674
- **Test Suite:** Server License Management SVL-D
- **Module:** Server License Management SVL-D
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** The "Delete Customer" button is visible on every expanded customer card on the Server License Management page.

## Scope

Verify that a button with accessible name "Delete Customer" is rendered on each expanded customer card. The button must be discoverable by visible inspection and by assistive technology.

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card is expanded (expand toggle activated)

## Test Steps

1. Expand a customer card on the Server License Management page
2. Locate the element with accessible name "Delete Customer" within the expanded card
3. Assert the element has a button role

## Expected Result

A button with accessible name "Delete Customer" is visible inside each expanded customer card.

## Test Data

- Use runtime discovery for: customer names
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: any available customer card

## Notes

- Button may be visually positioned near the Edit Customer button
- Button presence does not imply enabled state — that is tested separately
