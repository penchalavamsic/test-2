# LIMAS-SUD-2004: Controlled not-found deletion shows feedback and preserves the configuration

Intercept every DELETE and return controlled HTTP 404. Activate the selected configuration Delete action, verify visible failure feedback and unchanged exact configuration after reload. No real server mutation occurs; this checks client error handling only.

Skip only when required runtime data is unavailable. Server failures and missing persistence remain failed results.
