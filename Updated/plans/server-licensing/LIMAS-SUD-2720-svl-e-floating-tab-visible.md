# Test Plan: LIMAS-SUD-2720 — SVL-E: Floating Tab Visible

## Metadata

- **Test ID:** LIMAS-SUD-2720
- **Test Suite:** Server License Management SVL-E
- **Module:** Server License Management SVL-E
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** The Floating tab button is visible within the tab bar when a customer card is expanded.

## Scope

Verify that the Floating tab button is present and visible inside the tab bar of an expanded customer card. This tab is the entry point for Floating license management.

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card is expanded

## Test Steps

1. Expand a customer card
2. Locate the tab bar within the card
3. Assert a tab button with label containing "Floating" is visible
4. Assert the tab button is not hidden or obscured

## Expected Result

The Floating tab button is visible in the tab bar of the expanded customer card.

## Test Data

- Use runtime discovery for: customer names, tab labels
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: any expanded customer card

## Notes

- The Floating tab may not be selected by default; verify only visibility