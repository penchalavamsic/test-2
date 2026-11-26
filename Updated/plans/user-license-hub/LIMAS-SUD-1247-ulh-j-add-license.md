# LIMAS-SUD-1247: Rapid Save activation creates one persisted owned license

Create a disposable user and fill an owned license from runtime Profile/role data. Double-activate Save, wait for every resulting update response, and record the request count. Require exactly one matching license after a fresh server search and exactly one UI card/badge. Delete that license and its owned user and verify absence after reload. Multiple HTTP requests alone are not treated as duplicate data; any failed response or duplicate persisted license remains a failure.
