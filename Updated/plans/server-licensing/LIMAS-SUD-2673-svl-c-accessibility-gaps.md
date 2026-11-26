# LIMAS-SUD-2673: Accessibility gaps — label association, heading roles, live announcements

**Batch:** SVL-C (Edit Customer Dialog)
**Profile:** SUPER_USER_ADMIN_USER
**Evidence Source:** Live UI observation

## Atomic Behavior
Documentation of observed accessibility behavior in the Edit Customer dialog.

## Observed Gaps
1. **Pre-filled fields lack explicit `<label>` association:** The Customer name (id="edit-cust-name") and Hardware ID (id="edit-hwid") textboxes have no `<label for="...">` element linking to their ids. They rely on preceding text for accessible name.
2. **User Groups and System User sections use generic containers without heading roles:** The sections lack semantic heading roles (e.g., h3, heading ARIA role), making navigation by screen-reader heading shortcuts difficult.
3. **No `aria-live` announcements for inline group edit/delete:** Adding or removing a User Group row, or transforming a row to edit mode, does not use `aria-live` regions to announce the change to assistive technology users.

## Observed Strengths
- Dialog region has accessible name "Edit Customer"
- Heading "Edit Customer" is semantic h2
- Buttons have accessible names with contextual labels (e.g., "Edit group testGroup", "Delete group testGroup", "Close Edit Customer")
- Focus returns to the Edit Customer button after dialog close
- Server type uses a properly named radiogroup "Server type"

## Steps
1. Open the Edit Customer dialog
2. Inspect the Customer name and Hardware ID fields for `<label for>` association
3. Inspect the User Groups and System User sections for heading roles
4. Perform Add Group, Edit Group, Delete Group actions and check for live region announcements
5. Document all findings

## Expected (documentation)
- Gaps are documented for future remediation
- No test assertion made for missing behavior