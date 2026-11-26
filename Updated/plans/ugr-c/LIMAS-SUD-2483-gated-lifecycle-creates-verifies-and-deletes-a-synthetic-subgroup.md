# LIMAS-SUD-2483: User Groups saved lifecycle

Category: CRUD
Precondition: Authenticated profile has access to User Groups.

## Steps
Create an owned parent and subgroup, verify the child nesting after reload, then delete child and parent and verify removal.

## Evidence and outcome
Capture important before-submit and persisted-result screenshots, mutation response status, video, and trace. Verify persistence after fresh navigation. Cleanup must use only uniquely named records created by the current test. A successful HTTP status alone is insufficient: the expected UI state must persist. Record failed cleanup and remaining fixture names as failures requiring follow-up.

## Skip rule
No opt-in flag or unfinished-code skip. This test creates its own required group data.
