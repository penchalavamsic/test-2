# SLC-A Handoff: Standard License Configurations — Read-Only Data Page

## Scope

SLC-A covers the read-only Standard License Configurations data page. This is a simple listing page with no Search, Filters, Create, Edit, Delete, selection, or action menus. Cards display product identity (name + role badge) and metadata (licenses, maintenance, expiration).

## Test Range

| Item | Value |
|------|-------|
| Test IDs | LIMAS-SUD-2009 – LIMAS-SUD-2028 |
| Count | 20 |
| Spec | `tests/standard-license-configurations/standard-license-configurations-data.spec.ts` |
| Page Object | `tests/pages/standard-license-configurations.page.ts` |
| Plans | `plans/standard-license-configurations/LIMAS-SUD-2009-*.md` through `LIMAS-SUD-2028-*.md` |
| Checklist | Rows appended to `inventory/LIMAS_3_Simple_Test_Checklist.xlsx` |

## Describe Blocks

### 1. Page Shell (5 tests)
- **LIMAS-SUD-2009**: Sidebar navigation to SLC page
- **LIMAS-SUD-2010**: h1 + h2 heading structure
- **LIMAS-SUD-2011**: Dynamic "N configurations" count badge
- **LIMAS-SUD-2012**: Main content region with card grid
- **LIMAS-SUD-2013**: No horizontal overflow

### 2. Configuration Cards (5 tests)
- **LIMAS-SUD-2014**: Product name and role badge on each card
- **LIMAS-SUD-2015**: Licenses numeric value (non-negative integer)
- **LIMAS-SUD-2016**: Maintenance and Expiration dates visible
- **LIMAS-SUD-2017**: Card spacing, alignment, no overlap
- **LIMAS-SUD-2018**: Cards are read-only — no checkboxes, buttons, or menus

### 3. Runtime Data Validation (4 tests)
- **LIMAS-SUD-2019**: Visible card count matches configuration count
- **LIMAS-SUD-2020**: All license counts are non-negative integers
- **LIMAS-SUD-2021**: Date fields use DD MMM YYYY format
- **LIMAS-SUD-2022**: Each card has ≥1 non-empty role badge

### 4. API Contract (2 tests)
- **LIMAS-SUD-2023**: Data fetched via GET `/limas/api/slconfig`
- **LIMAS-SUD-2024**: No POST/PUT/PATCH/DELETE requests to SLC API

### 5. State Handling (2 tests)
- **LIMAS-SUD-2025**: Cards render without lingering loading indicator
- **LIMAS-SUD-2026**: All cards render simultaneously — no pagination

### 6. Accessibility (2 tests)
- **LIMAS-SUD-2027**: Heading hierarchy — h1 + h2
- **LIMAS-SUD-2028**: Keyboard-navigable page

## Live Inspection Findings

- **Route**: `/standard-license-configurations`
- **API**: `GET http://localhost:8083/limas/api/slconfig` — returns all configurations in a single response
- **Page structure**: h1 "Standard License Configurations" + h2 subtitle + "N configurations" count badge, then a flat card grid
- **Cards**: No checkboxes, no action buttons, no menus. Completely read-only.
- **Card fields**: Product name, role badge (e.g. "Intern", "Engineer", "All"), Licenses (integer), Maintenance date, Expiration date
- **Date format**: DD MMM YYYY (e.g. "30 Dec 2099", "17 Dec 2023")
- **All 14 cards** loaded at once — no pagination, no lazy loading, no scroll container
- **No horizontal overflow** at standard viewport
- **Duplicate cards** exist (DDM/Engineer x2 with different dates, AGCO ST122 x2) — expected, not a bug

## Page Object

```typescript
export class StandardLicenseConfigurationsPage {
  readonly heading: Locator;              // h1 "Standard License Configurations"
  readonly pageSubheading: Locator;       // h2 "Standard License Configurations"
  readonly configurationCountText: Locator; // "N configurations"
  readonly configurationCards: Locator;   // all card elements
  readonly cardByName: (name) => Locator; // find card by product name
  // Per-card field accessors: productName, roleBadge, licensesValue, maintenanceValue, expirationValue
  // Helpers: getConfigurationCount(), getVisibleCardCount(), getCardTitles(), getLicensesValue(), getRolesForCard()
}
```

## Classification

All 20 tests are read-only, positive, and do not modify any data.

## End State

After SLC-A:
- SLC total: 20
- Grand total: 2048 (+20 from 2028)
- Last ID: LIMAS-SUD-2028