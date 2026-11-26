# Updated LIMAS automation

Current scripts and documentation, including scripts for tabs not yet executed.

Current office-repair disposition: 446 passed, 18 failed, 67 skipped. Manual export/download verification and genuine missing-data skips are separated in OFFICE-REPAIR-STATUS.txt. This does not mean all tests passed or all tabs were executed.

Read OFFICE-REPAIR-STATUS.txt, CURRENT-FAILURES-REVIEW.txt, MANUAL-EXPORT-VERIFICATION.txt and docs/execution-records/office-repair. Older status files remain as history.

Download Updated-source.zip for source only. Extract it fully, configure your own .env, then run npm ci --include=dev if dependencies are missing. No application tests are launched by the upload command.

Latest-Evidence contains separate self-contained report packages and restoration instructions. test-runs, credentials, saved sessions, node_modules and temporary files are excluded from Updated.
