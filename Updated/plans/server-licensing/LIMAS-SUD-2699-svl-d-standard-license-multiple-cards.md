# Test Plan: LIMAS-SUD-2699 — SVL-D: Standard License Multiple Cards

## Metadata

- **Test ID:** LIMAS-SUD-2699
- **Test Suite:** Server License Management SVL-D
- **Module:** Server License Management SVL-D
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** Multiple Standard license cards render with independent fields and actions for each card.

## Scope

Verify that when a customer has multiple Standard licenses, each card is rendered independently with its own field values and action buttons. No data leakage between cards. Discover from a multi-license customer at runtime.

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card expanded, Standard tab active
- Customer has two or more Standard license cards (discovered at runtime)

## Test Steps

1. Identify a customer with multiple Standard licenses via the tab badge count (> 1)
2. Expand the card and ensure Standard tab is active
3. Assert at least two Standard license cards are visible
4. For each card, verify independent h3 heading text
5. For each card, verify independent field values (licenses, dates, profile role)
6. For each card, verify Edit and Delete buttons are present and card-scoped

## Expected Result

Each card has its own heading, field values, and action buttons. No two cards share the same heading or field data unless coincidentally identical.

## Test Data

- Use runtime discovery for: multi-license customer names, license names, quantities, dates, profile roles
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: a customer with two or more Standard licenses

## Notes

- If no multi-license customer exists at runtime, skip with note
