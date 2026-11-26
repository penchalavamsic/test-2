# Test Plan: LIMAS-SUD-2721 — SVL-E: Floating Tab Count

## Metadata

- **Test ID:** LIMAS-SUD-2721
- **Test Suite:** Server License Management SVL-E
- **Module:** Server License Management SVL-E
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** The Floating tab badge displays the actual runtime count of Floating licenses (e.g., "2").

## Scope

Verify that the Floating tab button shows a badge with the numeric count of Floating licenses belonging to the customer. The count is discovered at runtime and must match the actual number of Floating license cards.

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card expanded
- Floating tab is visible

## Test Steps

1. Expand a customer card
2. Locate the Floating tab button
3. Read the badge or count text within the tab (e.g., "2" inside the tab label)
4. Assert the count is a non-negative integer
5. Optionally: switch to the Floating tab and count the rendered cards; assert they match

## Expected Result

The Floating tab displays a numeric badge matching the actual count of Floating licenses for that customer.

## Test Data

- Use runtime discovery for: customer names, Floating license counts
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: a customer with at least one Floating license (for non-zero validation)

## Notes

- The badge format (e.g., "2" standalone or "Floating 2") is discovered at runtime