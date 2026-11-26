# LIMAS-SUD-625: Persist Dashboard license extension

Create a uniquely owned Hub user and a license expiring in seven days. Find that license on Dashboard by its unique Hardware ID, open Extend, and set expiration thirty days later. Apply the real update. Verify HTTP success, the exact owned user/license IDs, and the persisted dates after a fresh server read. Delete the owned license and user and verify absence. Skip only when required assignable groups or Profiles/roles are unavailable. A missing newly created license in Dashboard or an unsuccessful save remains a failure.
