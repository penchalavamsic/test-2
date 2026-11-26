# LIMAS-SUD-2275: Duplicate role names are persisted distinctly or visibly rejected without overwriting

Precondition: authenticate using the configured access profile. Runtime data is rediscovered on every run.

## Steps
1. Create a uniquely named disposable Profile through the UI.
2. Create the role values described in this case, submit Save, and verify each role independently after a fresh reload.
3. Delete only the roles created by the test, verify their absence, then delete the owned Profile.

## Expected result
Role values and distinct identities persist after reload. Cleanup is verified; any server rejection or leftover remains a failure.

Execution status is maintained in EARLIER-CRUD-REPAIR-STATUS.txt; this plan does not claim a pass.
