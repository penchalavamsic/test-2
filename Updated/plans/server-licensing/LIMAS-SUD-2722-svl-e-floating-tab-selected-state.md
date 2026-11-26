# Test Plan: LIMAS-SUD-2722 — SVL-E: Floating Tab Selected State

## Metadata

- **Test ID:** LIMAS-SUD-2722
- **Test Suite:** Server License Management SVL-E
- **Module:** Server License Management SVL-E
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** When clicked, the Floating tab enters an active/selected state indicated by an aria-pressed attribute or an active CSS class.

## Scope

Verify that the Floating tab button has a visually and programmatically detectable selected state when active. The state change must be conveyed through aria-pressed (true/false) or an active/selected class on the tab element.

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card is expanded

## Test Steps

1. Expand a customer card (Standard tab is active by default)
2. Assert the Floating tab button has aria-pressed="false" or lacks the active class
3. Click the Floating tab button
4. Assert the Floating tab button now has aria-pressed="true" or has the active/selected class
5. Assert the Standard tab button has aria-pressed="false" or lacks the active class

## Expected Result

The Floating tab button reflects its selected state via aria-pressed attribute or an active CSS class when it is the active tab.

## Test Data

- Use runtime discovery for: aria-pressed values, CSS class names
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: any expanded customer card

## Notes

- Verify the mechanism used (aria-pressed vs active class) at runtime; test whichever is present