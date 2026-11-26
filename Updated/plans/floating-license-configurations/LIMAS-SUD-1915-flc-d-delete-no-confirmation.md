# LIMAS-SUD-1915: Bulk Delete proceeds without a confirmation and persists removal

Create a new owned group and configuration using runtime Profile/role data. Activate bulk Delete on that exact configuration. Require successful response, no confirmation dialog, and absence after fresh reload. Restore the owned group. Never resubmit a failed deletion automatically.

Skip only when required runtime data is unavailable. Server failures and missing persistence remain failed results.
