# LIMAS-SUD-1455: Update payload identifies the owned user and license

Create a unique disposable Hub user and license using live available Group/Profile/role data and a reserved example.invalid email. Verify the created license after reload.

Specific action: Update payload identifies the owned user and license.

Verify the exact owned user/license identity, saved values, counts, and final state after reload. Each mutation is observed at its deployed endpoint, with exactly one request per activation. Delete only the owned license and user in cleanup; cleanup failures remain failures. Skip only if a required live Group/Profile/role choice is unavailable.

The deployed license create/edit workflow uses PUT /users, with the owned user and license identifiers in the payload. Hardware ID and Profile remain unchanged on edit; their presence in the full user payload is not an error.
