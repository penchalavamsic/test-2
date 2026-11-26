from pathlib import Path
import os, re

BASE = str(Path(__file__).resolve().parent.parent)
errors = []
warnings = []

# 1. Count plans
plans_dir = os.path.join(BASE, 'plans', 'reports')
plans = sorted([f for f in os.listdir(plans_dir) if f.endswith('.md') and 'rsl-b' in f.lower()])
print(f'=== PLAN FILES ({len(plans)}) ===')
for p in plans:
    print(f'  {p}')

ids = []
for p in plans:
    m = re.search(r'LIMAS-SUD-(\d+)', p)
    if m:
        ids.append(int(m.group(1)))
ids.sort()
print(f'\nTest ID range: {ids[0]} to {ids[-1]}, count: {len(ids)}')
if ids[0] != 1512: errors.append(f'First ID {ids[0]} != 1512')
if ids[-1] != 1529: errors.append(f'Last ID {ids[-1]} != 1529')
if len(ids) != 18: errors.append(f'Expected 18 plans, got {len(ids)}')
if len(set(ids)) != len(ids): errors.append('Duplicate plan IDs')

# 2. Check spec
spec_path = os.path.join(BASE, 'tests', 'reports', 'reports-standard-licenses-infinite-scroll.spec.ts')
with open(spec_path, encoding='utf-8') as f:
    spec = f.read()
spec_ids = re.findall(r'LIMAS-SUD-(\d+)', spec)
spec_nums = [int(x) for x in spec_ids]
print(f'\nSpec has {len(spec_ids)} Test IDs from {min(spec_nums)} to {max(spec_nums)}')
if len(set(spec_ids)) != len(spec_ids):
    errors.append('Duplicate IDs in spec')

# Check all plan IDs appear in spec
missing_from_spec = set(ids) - set(spec_nums)
if missing_from_spec:
    errors.append(f'IDs missing from spec: {missing_from_spec}')

# 3. Prohibited checks
prohibited = [
    ('Deleted activation', r'deletedTab\.click'),
    ('Floating Licenses activation', r'floatingLicensesCard\.click'),
    ('Floating Configs activation', r'floatingConfigurationsCard\.click'),
    ('Export Excel activation', r'exportExcelButton\.click'),
    ('waitForTimeout', r'waitForTimeout'),
    ('fixed sleep / sleep call', r'sleep\(\d+\)'),
    ('XPath', r'xpath'),
    ('Filter value entry (fill)', r'emailSearchbox\.fill|hardwareIdsSearchbox\.fill'),
    ('Full dataset traversal', r'scrollStandardLicensesToNextLoadThreshold.*for|while.*scroll'),
]
print('\n=== PROHIBITED ACTIONS ===')
for label, pattern in prohibited:
    if re.search(pattern, spec):
        errors.append(f'{label} found in spec')
        print(f'  FAIL: {label}')
    else:
        print(f'  PASS: No {label}')

# 4. Restoration
if 'restoreStandardLicenseInitialBatch' in spec:
    print('\n  PASS: Safe restoration in spec')
else:
    errors.append('No safe restoration in spec')

# Also check page object has restore
po_path = os.path.join(BASE, 'tests', 'pages', 'reports.page.ts')
with open(po_path, encoding='utf-8') as f:
    po = f.read()
if 'restoreStandardLicenseInitialBatch' in po:
    print('  PASS: restoreStandardLicenseInitialBatch in page object')
else:
    errors.append('restoreStandardLicenseInitialBatch missing from page object')

# 5. Sensitive data scan
sensitive_patterns = [
    (r'[\w.-]+@kpit\.com', 'email addresses'),
    (r'localhost:8091', 'hardcoded URL'),
    (r'(?<!")\b2699\b(?!")', 'hardcoded total 2699'),
    (r'(?<!")\b2,699\b(?!")', 'hardcoded total 2,699'),
    (r'(?<!")\b10\b(?!.*loaded)', 'hardcoded count 10'),
]
print('\n=== SENSITIVE DATA SCAN ===')
for pattern, label in sensitive_patterns:
    matches = re.findall(pattern, spec)
    if matches:
        warnings.append(f'{label}: {len(matches)} matches')
        print(f'  WARN: {label}: {len(matches)} matches')
    else:
        print(f'  PASS: No {label}')

# 6. Page object methods check
methods = re.findall(r'async (\w+)\(', po)
rsl_b_methods = [m for m in methods if 'StandardLicense' in m or 'scroll' in m.lower() or 'append' in m.lower()]
print(f'\nPage object has {len(methods)} async methods')
print(f'  RSL-B methods: {len(rsl_b_methods)}')

required_methods = [
    'getStandardLicenseScrollContainer',
    'getStandardLicenseScrollMetrics',
    'getStandardLicenseRenderedRowCount',
    'getStandardLicenseRuntimeFingerprints',
    'scrollStandardLicensesWithinCurrentBatch',
    'scrollStandardLicensesToNextLoadThreshold',
    'waitForStandardLicenseNextPageRequest',
    'getStandardLicenseLoadingIndicator',
    'verifyStandardLicenseAppendState',
    'verifyNoDuplicateStandardLicenseRows',
    'getStandardLicensePaginationMetadata',
    'restoreStandardLicenseInitialBatch',
]
for m in required_methods:
    if m not in methods:
        errors.append(f'Missing method: {m}')

# 7. Spec group check
groups = re.findall(r"test\.describe\('([^']+)'", spec)
print(f'\nSpec groups: {len(groups)}')
for g in groups:
    print(f'  - {g}')

expected_groups = [
    'Scroll Container',
    'Initial State',
    'Additional Batch Load',
    'Append and Duplicate Prevention',
    'Loading and Scroll Stability',
    'End-of-Data Contract',
    'Accessibility and Restoration',
]
for eg in expected_groups:
    if eg not in groups:
        errors.append(f'Missing spec group: {eg}')

# 8. No hardcoded counts in spec
hardcoded_checks = [
    (r'page=\d+', 'hardcoded page parameter'),
    (r'size=\d+', 'hardcoded size parameter'),
    (r'scrollTop\s*[=!]==?\s*\d+', 'hardcoded scrollTop'),
]
print('\n=== HARDCODED VALUE CHECK ===')
for pattern, label in hardcoded_checks:
    matches = re.findall(pattern, spec)
    non_string = [m for m in matches if not re.search(r"'[^']*" + re.escape(m) + r"[^']*'|\"[^\"]*" + re.escape(m) + r"[^\"]*\"", spec)]
    if non_string:
        warnings.append(f'{label}: {len(non_string)} non-string matches')
        print(f'  WARN: {label}: {len(non_string)} matches')
    else:
        print(f'  PASS: No {label}')

# 9. Only RSL-B spec and RSL-A spec should exist
specs = [f for f in os.listdir(os.path.join(BASE, 'tests', 'reports')) if f.endswith('.spec.ts')]
print(f'\nReport spec files: {len(specs)}')
for s in specs:
    print(f'  - {s}')

# 10. Check no waitForTimeout abuse
wft_matches = re.findall(r'waitForTimeout\(\d+\)', spec)
if wft_matches:
    # Allow small waitForTimeout for scroll settling only
    for m in wft_matches:
        ms = int(re.search(r'\d+', m).group())
        if ms > 500:
            errors.append(f'waitForTimeout({ms}) exceeds 500ms threshold')
    print(f'\nwaitForTimeout calls: {len(wft_matches)} (max allowed: 500ms)')
else:
    print('\nPASS: No waitForTimeout calls')

# 11. Plan status check
plan_statuses = []
for p in plans:
    with open(os.path.join(plans_dir, p), encoding='utf-8') as f:
        content = f.read()
    pstat = re.search(r'plan_status:\s*"([^"]+)"', content)
    sstat = re.search(r'script_status:\s*"([^"]+)"', content)
    plan_statuses.append((p, pstat.group(1) if pstat else '?', sstat.group(1) if sstat else '?'))
drafts = [ps for ps in plan_statuses if ps[1] != 'Reviewed']
if drafts:
    print(f'\nWARN: {len(drafts)} plans not in Reviewed status')

# Final
print('\n=== SUMMARY ===')
if errors:
    print(f'ERRORS ({len(errors)}):')
    for e in errors:
        print(f'  - {e}')
else:
    print('No errors.')
if warnings:
    print(f'WARNINGS ({len(warnings)}):')
    for w in warnings:
        print(f'  - {w}')
print(f'\nPlans: {len(plans)}, Spec: 1, Page Object: 1')
print('Browser remains open: Yes')
print('Generated tests executed: No')
print('RSL-B status: PLANS AND SPEC CREATED')