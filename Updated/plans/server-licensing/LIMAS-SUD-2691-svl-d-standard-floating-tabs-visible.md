# Test Plan: LIMAS-SUD-2691 — SVL-D: Standard Floating Tabs Visible

## Metadata

- **Test ID:** LIMAS-SUD-2691
- **Test Suite:** Server License Management SVL-D
- **Module:** Server License Management SVL-D
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** Standard and Floating tab buttons are visible with runtime license counts displayed.

## Scope

Verify that the tab bar inside an expanded customer card contains two tab buttons labeled "Standard" and "Floating", each showing the current license count discovered at runtime.

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card is expanded

## Test Steps

1. Expand a customer card
2. Locate the tab bar within the card
3. Assert a tab button with label containing "Standard" and a numeric count is visible
4. Assert a tab button with label containing "Floating" and a numeric count is visible

## Expected Result

Two tab buttons are visible: "Standard N" and "Floating M" where N and M are the actual runtime counts.

## Test Data

- Use runtime discovery for: customer names, Standard count, Floating count
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: any expanded customer card

## Notes

- Tab button text format (e.g., "Standard 1", "Floating 2") is discovered at runtime
