# LIMAS-SUD-2336: Feature access options match the runtime catalog

Precondition: authenticate using the configured access profile. Runtime data is rediscovered on every run.

## Steps
1. Read the current Feature catalog and Profile assignments.
2. Select an assigned Feature with a role and the required runtime catalog options.
3. Open its Version or Access Level selector and compare the complete option list with the catalog.

## Expected result
Visible options exactly match the catalog. Skip only if the required runtime assignment/options do not exist.

Execution status is maintained in EARLIER-CRUD-REPAIR-STATUS.txt; this plan does not claim a pass.
