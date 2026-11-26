# LIMAS-SUD-2386: Controlled HTTP 403 deletion shows an error and preserves the record

Open the delete confirmation on an existing Profile. Intercept the DELETE at the browser boundary with HTTP 403. Verify an actionable error and unchanged persisted records after reload. This tests client handling of a controlled rejection, not server authorization enforcement. No real delete reaches the server.

Skip only when no Profile exists; data availability is checked on every run.
