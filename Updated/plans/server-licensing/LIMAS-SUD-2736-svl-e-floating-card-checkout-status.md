# Test Plan: LIMAS-SUD-2736 — SVL-E: Floating Card Checkout Status

## Metadata

- **Test ID:** LIMAS-SUD-2736
- **Test Suite:** Server License Management SVL-E
- **Module:** Server License Management SVL-E
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** Each Floating License card displays a checkout availability status (e.g., "Checkout unavailable") discovered at runtime.

## Scope

Verify that every Floating License card shows a checkout status field indicating whether license checkout is currently available. The status text is discovered at runtime.

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card expanded, Floating tab active
- Customer has at least one Floating license card

## Test Steps

1. Expand a customer card with at least one Floating license
2. Switch to the Floating tab
3. Locate the first Floating license card
4. Assert a checkout status indicator or text is visible on the card
5. Read the status text (e.g., "Checkout unavailable")
6. Assert the status text is non-empty

## Expected Result

Each Floating license card displays a checkout availability status (e.g., "Checkout unavailable").

## Test Data

- Use runtime discovery for: checkout status text
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: at least one Floating license card

## Notes

- The exact status text (e.g., "Checkout unavailable", "Available") is discovered at runtime