---
test_id: "LIMAS-SUD-1780"
title: "To verify the functionality of \"Reports\" → \"Floating Configurations\" → \"API\" → \"Deleted API Freshness\""
module: "Reports"
page: "Reports"
section: "Floating Configurations"
control: "API"
action: "Deleted API Freshness"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Reports Floating Configurations RFC-B"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/reports/reports-floating-configurations-error-deleted.spec.ts"
---

# Purpose

Verify that each visit to Deleted mode fetches fresh data from the API (not a stale cache), the Active→Deleted transition always triggers a new re-fetch, and the displayed counts and data are current rather than stale from a prior Deleted visit.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated on the Reports page with Floating Configurations selected.

# Test Data

Use environment variables and the authenticated fixture. API responses and network request timestamps are monitored.

# Steps and Expected Results

1. Action: With Active mode selected, switch to Deleted. Note the request timestamp.
   Expected Result: A fresh GET request to report/alldeleted is sent. The response timestamp is recent.

2. Action: Switch back to Active mode.
   Expected Result: Active mode loads. A request to report/all is sent.

3. Action: Switch to Deleted mode again. Compare the request timestamp.
   Expected Result: A new GET request to report/alldeleted is sent — not served from cache. The timestamp is more recent than the first Deleted request.

4. Action: Verify the counts are current after the second Deleted visit.
   Expected Result: The record count and loaded/total counts reflect the fresh API response. They are not stale values retained from the first Deleted visit.

5. Action: Switch modes multiple times and verify each Deleted re-fetch.
   Expected Result: Every Active→Deleted transition fires a new GET request to report/alldeleted. No cached responses are reused.

# Network Verification

- Each Active→Deleted switch: GET report/alldeleted?page={runtimePage}&size={runtimeSize}
- Request is a fresh network call, not served from disk or memory cache.
- Response headers confirm no stale caching (e.g., Cache-Control: no-cache or similar).

# Expected Final Result

Every Deleted mode visit fetches fresh data from the API, with no stale caching, and counts are always current.

# Classification

- Read-only
- Positive
- API

# Restrictions

- Do not hardcode endpoint paths, page, or size values.
- Do not include credentials, tokens, cookies, or sensitive payloads.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending