# LIMAS-SUD-2671: No success toast or alert after applying Edit Customer changes

**Batch:** SVL-C (Edit Customer Dialog)
**Profile:** SUPER_USER_ADMIN_USER
**Evidence Source:** Live UI observation

## Atomic Behavior
After clicking Apply to save Edit Customer changes, the dialog simply closes. No success toast, alert, or notification is displayed.

## Preconditions
- Edit Customer dialog is open with valid changes made
- Apply button is enabled

## Steps
1. Open the Edit Customer dialog
2. Make a valid change (e.g., modify Customer name)
3. Click Apply
4. Observe whether any success toast, alert, or notification appears
5. Verify the dialog closes

## Expected
- Dialog closes after Apply
- No success toast or alert is shown
- The change is reflected on the customer card (if visible)

## Observed
- Dialog closes silently after Apply
- No toast or alert displayed