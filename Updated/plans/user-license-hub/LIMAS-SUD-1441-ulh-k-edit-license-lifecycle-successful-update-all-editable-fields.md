# LIMAS-SUD-1441: Edit role and dates on an owned license and verify persisted fields

Create a disposable Hub user, select an available scoped Profile/role, and create a license with a unique Hardware ID and future dates. The deployed Save updates the user through PUT /users. Verify exact owned Hardware ID, Profile, role, dates, and no duplicate after reload. Edit the role when an alternative exists and both dates, then verify the same license ID and persisted values. Delete that exact license through its card, verify absence after reload, then delete the owned user.

Only absent live User Group/Profile/role data may skip the test. HTTP errors, persistence mismatches, and cleanup failures remain failures. Record important screenshots, video, and trace. Do not retry failed mutations.
