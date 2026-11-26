# LIMAS-SUD-2316: Create and read a disposable profile, then verify cleanup

Category: CRUD / persistence

Preconditions: Authenticated user can manage Profiles. The test creates its own uniquely named disposable profile; existing business records are not required.

1. Create a unique profile through the UI. Assert POST succeeds.
2. Reload Profiles and verify the saved record and both fields in the Edit dialog.
3. Delete only the record owned by this test; reload and verify the record is absent from the server listing and UI.

Expected: Every requested change persists. Any HTTP error, persistence mismatch, or cleanup failure fails the test. No mutation-flag or missing-implementation skips. Capture important form, persisted-state, and delete evidence; do not automatically retry mutations.
