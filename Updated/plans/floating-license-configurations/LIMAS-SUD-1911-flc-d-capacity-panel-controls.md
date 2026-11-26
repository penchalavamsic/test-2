# LIMAS-SUD-1911: Bulk capacity update persists on an owned configuration

Precondition: authenticate using the configured access profile. Runtime data is rediscovered on every run.

## Steps
1. Create an owned User Group and one uniquely scoped Floating License Configuration.
2. Select only that configuration and apply the date or capacity update through the bulk panel.
3. Verify the updated values in a fresh server response and UI, then delete the owned configuration and group.

## Expected result
The requested values persist. HTTP success without persisted values is a failure; unsuccessful cleanup is also reported.

Execution status is maintained in EARLIER-CRUD-REPAIR-STATUS.txt; this plan does not claim a pass.
