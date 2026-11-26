# LIMAS-SUD-2641: Accessibility gaps — Close button not in tab order, no focus trap

**Batch:** SVL-B (Create Server License Dialog)
**Profile:** SUPER_USER_ADMIN_USER
**Evidence Source:** Live UI observation

## Atomic Behavior
Documentation of observed accessibility behavior in the Create Server License dialog.

## Observed Gaps
1. **Close button not in Tab order:** The "Close Create Server License" button is skipped during Tab navigation. Only filename, Cancel, and Apply are reachable.
2. **No focus trap:** Tab after Apply exits the dialog region; focus can land on page controls outside the dialog.
3. **Filename field has no `<label>` element association** — labeled via preceding text element, not `<label for="create-sl-filename">`.
4. **Filename field lacks `aria-label` or `aria-labelledby`** — relies on adjacent text for accessible name.

## Observed Strengths
- Create Server License button has `aria-label`
- Close button has accessible name "Close Create Server License"
- Heading is semantic h2
- Dialog is a named `region`
- Focus returns to trigger button on close

## Steps
1. Open the dialog
2. Tab through all interactive elements
3. Document which elements receive focus and which do not

## Expected (documentation)
- Gaps are documented for future remediation
- No test assertion made for missing behavior