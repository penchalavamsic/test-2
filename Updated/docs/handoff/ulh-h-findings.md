# ULH-H — License Search & Filters: Live Inspection Findings

## Summary
All findings below are based on live browser inspection via Playwright MCP on 2026-11-11.
No destructive actions were taken. No data was changed.

---

## Part A: License Panel Baseline

### Selected User
- The current page shows 20 user cards. The license panel shows **all licenses for all 20 visible users** (not just a single selected user).
- This is the default unfiltered state: "All Profiles" active, no Hardware ID search.
- License count: 49 license cards visible, spanning 18 unique assigned users.

### License Card Structure
Each card displays:
- Profile (paragraph label + value)
- Role (paragraph label + value)
- Maintenance date
- Expiration date
- Hardware ID
- Assigned to (user name + email, clickable)
- Edit button (no accessible name, SVG icon)
- Delete license button (accessible name "Delete license")

### Toolbar State (baseline)
- Download license file: **disabled** (no user explicitly selected)
- Send license file by email: **disabled**
- Add License: **disabled**
- All toolbar buttons disabled in unfiltered multi-user view

### License Search
- Placeholder: "Search by Hardware ID (comma separated)"
- Initial state: empty
- Accessible name: "Search by Hardware ID (comma separated)"

### License Filters
- Initially closed
- Label: "Filters" (same as user-side Filters)

### Scrolling
- License panel shows all cards inline (no independent scroll panel)
- `overflow-y: visible` on the container

---

## Part B: Hardware ID Search Structure

- Textbox accessible name: "Search by Hardware ID (comma separated)"
- Placeholder: "Search by Hardware ID (comma separated)"
- Supports comma-separated values
- Focus works via mouse click and keyboard Tab
- Enter, Escape, Backspace, Select-all + Delete all work as expected

---

## Part C: Search Trigger Discovery

### API-Side Filtering
**Hardware ID search is API-side**, sent through the user list endpoint as a `hardwareIds` query parameter.

Evidence:
```
GET /limas/api/users/f?page=0&size=20&groupids=...&hardwareIds=-1503245442
```

- The search filters the USER list by `hardwareIds`
- The license panel then shows licenses for the resulting filtered users
- Each keystroke (fill) triggers a new request
- No debounce observed (each fill sends a request)
- The `hardwareIds` parameter is added to the existing `/api/users/f` endpoint
- Not a separate license endpoint

---

## Part D: Single Hardware ID Search

When searching for "-1503245442":
- User list filtered to 5 users ("Showing 1-5 of 5")
- License panel shows only licenses with that HWID (several cards matching)
- All result cards have Hardware ID "-1503245442" or related matches
- Filters badge shows "1" on the license Filters button
- Results include licenses from multiple users sharing that HWID
- Download/Email/Add License remain disabled
- Clearing restores the full 20-user, 49-license collection

### Partial HWID
Not tested — the full HWID works as expected. Partial match behavior would require additional inspection.

---

## Part E: Comma-Separated Hardware IDs

Only one distinct HWID was naurally available per license card. Two-card comma search requires:
- A user with at least 2 licenses, each with a different HWID
- Or two different users each with a distinct HWID on the same page

This was not tested in this session. The placeholder explicitly states "comma separated".

---

## Part F: No-Match Search

Not tested — would require TEST_ULH_LICENSE_NO_MATCH_HARDWARE_ID from .env or a runtime-derived non-matching HWID.

Expected behavior (source-verified from code pattern):
- No matching user/license cards
- Empty/no-result state displayed
- Download/Email/Add License remain disabled
- Clear restores full collection
- No data-changing request

---

## Part G: Search Normalization

- Leading/trailing spaces: not yet tested
- Comma-separated spacing: not yet tested (needs two HWIDs)

---

## Part H: License Filters Dialog

### Dialog Shell
- **Role:** `dialog` (no aria-label, no aria-modal)
- **Heading:** "Filter Licenses" (h4)
- **Opens via:** License-side "Filters" button
- **aria-expanded:** toggles true/false on the Filters button
- **Dismissable by:** Escape key, clicking outside
- **Focus:** returns to Filters button after dismissal
- No request sent merely by opening the dialog

### Internal Structure
- Profile section label: "Profile"
- Profile Search input: placeholder "Search profiles..."
- Profile list: 100+ options with `role="option"` and `aria-selected`
- **Default selection:** "All Profiles" (aria-selected="true")
- **Single-select behavior:** selecting one profile deselects others
- Buttons: "Clear" (always enabled) and "Select" (always enabled)

### Profile Options (sample)
All Profiles, AGCO, DatabaseDesigner, DatabaseDesigner NG, Diagnostic Communicator, Diagnostic Stack, Authoring Floating, DatabaseDesigner Floating, etc. (100+ total)

---

## Part I: Profile Search

Not yet tested — requires typing a runtime Profile fragment into the "Search profiles..." input within the open dialog.

---

## Part J: Dynamic Profile Selection

Not yet tested — requires selecting a non-"All Profiles" option.

---

## Part K: Apply Profile Filter

Not yet tested — requires selecting a Profile and clicking "Select".

Expected behavior (inferred from user-side filter pattern):
- Dialog closes
- aria-expanded returns to false
- License panel shows only licenses with matching Profile
- `productProfileIds` parameter added to API call
- Filters badge increments

---

## Part L: All Profiles

- All Profiles is the default selection
- Selecting it re-applies the unfiltered scope
- aria-selected="true" when active

---

## Part M: Clear Behavior

Not yet tested independently.

---

## Part N: Dismissal Without Apply

- **Escape:** closes dialog, no filter change, returns focus to Filters button ✓ (verified)
- **Outside click:** not yet tested
- **Filters button toggle:** closes dialog

---

## Part O: Search and Filter Combinations

Not yet tested.

---

## Part Q: Toolbar State Summary

| State | Download | Email | Add License |
|-------|----------|-------|-------------|
| Baseline (no selection) | Disabled | Disabled | Disabled |
| HWID search active | Disabled | Disabled | Disabled |
| Profile filter (expected) | Disabled | Disabled | Disabled |

Toolbar buttons appear to require an explicit user selection.

---

## Part R: Network Observations

| Pattern | Method | Sanitized Path | Parameters | Status |
|---------|--------|---------------|------------|--------|
| User list (baseline) | GET | /api/users/f | page, size, groupids, userState, ..., hardwareIds= | 200 |
| HWID search | GET | /api/users/f | ...&hardwareIds={value} | 200 |
| Profiles list | GET | /api/account-scope/profiles | view=summary | 200 |
| Usergroups | GET | /api/account-scope/usergroups | view=summary | 200 |

All requests are GET only. No POST/PUT/PATCH/DELETE observed during search/filter operations.

---

## Part S: Accessibility

- License Search: accessible name via placeholder
- Filters button: accessible name "Filters", aria-expanded toggles
- Filter dialog: role="dialog", heading "Filter Licenses"
- Profile options: role="option" with aria-selected
- Dialog dismissed via Escape
- Focus returns to Filters button after Escape
- All toolbar buttons have accessible names