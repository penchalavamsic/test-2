# LIMAS-SUD-1414: Edit initial keyboard focus stays inside the dialog

Precondition: authenticate using the configured access profile. Runtime data is rediscovered on every run.

## Steps
1. Open User & License Hub with the configured access profile and wait for runtime data.
2. Perform the selection, dialog, or cancellation action stated in the case title.
3. Assert the actual identity, control state, keyboard focus, or absence of writes required by the title.

## Expected result
The stated behavior is verified against the rendered UI. Missing accessible names remain failures. No business-record mutation is required by these checks.

Execution status is maintained in EARLIER-CRUD-REPAIR-STATUS.txt; this plan does not claim a pass.
