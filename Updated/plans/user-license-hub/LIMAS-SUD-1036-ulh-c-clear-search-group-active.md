# LIMAS-SUD-1036: Clearing search preserves the active group and restores its results

Use available runtime user/group data. Verify final search/filter results against the selected query and server result. Clearing a query or group filter must restore the corresponding baseline list, whether it is cached or newly fetched. Do not require one request per keystroke or a fresh request solely for restoring cached results. Skip only if the required runtime user data does not exist.
