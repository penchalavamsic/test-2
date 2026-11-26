# LIMAS-SUD-2142: Edit a disposable feature and verify persisted fields

Create uniquely named disposable records through the UI, using unique Feature IDs. Verify persisted names, descriptions, versions and access levels after reload. Edit name and description; verify persisted values and unchanged record identity. Delete only owned features; require a successful response and absence after a fresh server listing and in the UI.

No existing feature is required for the owned lifecycle. Unset flags and missing fixture implementations are not skip reasons. HTTP, persistence, and cleanup errors remain failures. Never repeat a failed delete automatically.
