# LIMAS-SUD-1941: Save Configuration becomes enabled after required fields are filled

Precondition: authenticate using the configured access profile. Runtime data is rediscovered on every run.

## Steps
1. Open Create Configuration under an available runtime group.
2. Discover an available Profile and role from the current selectors; fill numeric fields.
3. Check Save is enabled and cancel without submitting.

## Expected result
A valid runtime combination enables Save. Skip only when no Profile with a role is available.

Execution status is maintained in EARLIER-CRUD-REPAIR-STATUS.txt; this plan does not claim a pass.
