# LIMAS-SUD-2002: Deleting the owned configuration restores its group count to zero

Create a new owned group and configuration using runtime Profile/role data. Activate card Delete on that exact configuration. Require successful response, no confirmation dialog, and absence after fresh reload. Restore the owned group. Never resubmit a failed deletion automatically.

Skip only when required runtime data is unavailable. Server failures and missing persistence remain failed results.
