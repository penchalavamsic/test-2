# Test Plan: LIMAS-SUD-2719 — SVL-D: Edit/Delete Standard License Accessibility Gaps

## Metadata

- **Test ID:** LIMAS-SUD-2719
- **Test Suite:** Server License Management SVL-D
- **Module:** Server License Management SVL-D
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** Documentation of observed accessibility gaps in the Standard License card Edit/Delete interactions: missing label associations on card fields, potential lack of focus trap in Edit dialog, immediate destructive Delete without confirmation, and tabs that may not announce state changes.

## Scope

Catalog accessibility gaps specific to the Standard License editing and deletion flows. This is a documentation-only test — no assertions of passing behavior. Gaps are recorded for future remediation tracking.

## Observed Gaps

1. **Standard License card fields lack proper label associations:** Fields such as Profile Role, Licenses, Maintenance, and Expiration on the card may not have explicit `<label>` elements or `aria-labelledby` associations linking labels to their values. Screen reader users may not hear clear field-label announcements when navigating card content.
2. **Edit Standard License dialog may lack focus trap:** When the dialog is open, focus may not be constrained within the dialog — users tabbing past the last focusable element could escape into the underlying page, breaking the modal UX for keyboard and screen reader users.
3. **Delete Standard License has no confirmation — immediate destructive action:** Clicking Delete removes the license instantly with no confirmation dialog, warning, or undo capability. This violates WCAG 2.1 Success Criterion 3.3.4 (Error Prevention — Legal, Financial, Data) for irreversible actions.
4. **Tabs may not announce state changes:** When switching between Standard and Floating tabs, or when the badge count updates after a deletion, no `aria-live` region announces the change. Assistive technology users may not be aware that content has changed or that a count has updated.

## Observed Strengths

- Edit Standard License dialog region has accessible name "Edit Standard License"
- Dialog contains an h3 heading
- Close button has accessible name "Close Edit Standard License"
- Apply button has accessible name "Apply Standard License changes"
- Focus returns to the Edit button after dialog close

## Test Steps

1. Navigate to an expanded customer card with Standard Licenses on the Standard tab
2. Inspect a Standard License card's field labels and values for explicit label associations
3. Open the Edit Standard License dialog and test tab navigation for focus trap behavior
4. Inspect the Delete Standard License button for any confirmation dialog trigger
5. Switch between tabs and observe for `aria-live` or status announcement regions
6. Document all findings

## Expected Result

Gaps are documented for future remediation. No test assertions are made for missing behavior — this is a cataloging test.

## Test Data

- Use runtime discovery for: element attributes, ARIA properties, dialog behavior
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: a customer with at least one Standard License card

## Notes

- This test aggregates the SVL-D accessibility findings specific to Edit/Delete Standard License
- Companion to LIMAS-SUD-2673 (SVL-C accessibility gaps) and LIMAS-SUD-2641 (SVL-B accessibility gaps)
- No destructive actions should be performed during this test
