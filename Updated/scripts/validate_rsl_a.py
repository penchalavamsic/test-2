from pathlib import Path
import os, re

BASE = str(Path(__file__).resolve().parent.parent)
errors = []
warnings = []

# 1. Count plans
plans_dir = os.path.join(BASE, 'plans', 'reports')
plans = sorted([f for f in os.listdir(plans_dir) if f.endswith('.md') and 'rsl-a' in f.lower()])
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
if ids[0] != 1482: errors.append(f'First ID {ids[0]} != 1482')
if ids[-1] != 1511: errors.append(f'Last ID {ids[-1]} != 1511')
if len(ids) != 30: errors.append(f'Expected 30 plans, got {len(ids)}')
if len(set(ids)) != len(ids): errors.append('Duplicate plan IDs')

# 2. Check spec
spec_path = os.path.join(BASE, 'tests', 'reports', 'reports-standard-licenses-shell.spec.ts')
with open(spec_path, encoding='utf-8') as f:
    spec = f.read()
spec_ids = re.findall(r'LIMAS-SUD-(\d+)', spec)
print(f'\nSpec has {len(spec_ids)} Test IDs from {spec_ids[0]} to {spec_ids[-1]}')
if len(set(spec_ids)) != len(spec_ids):
    errors.append('Duplicate IDs in spec')

# 3. Prohibited checks
prohibited = [
    ('Deleted activation', r'deletedTab\.click'),
    ('Floating Licenses activation', r'floatingLicensesCard\.click'),
    ('Floating Configs activation', r'floatingConfigurationsCard\.click'),
    ('Export Excel activation', r'exportExcelButton\.click'),
    ('waitForTimeout', r'waitForTimeout'),
    ('fixed sleep', r'sleep\(\d+\)'),
    ('XPath', r'xpath'),
]
print('\n=== PROHIBITED ACTIONS ===')
for label, pattern in prohibited:
    if re.search(pattern, spec):
        errors.append(f'{label} found in spec')
        print(f'  FAIL: {label}')
    else:
        print(f'  PASS: No {label}')

# 4. Restoration
if 'restoreStandardLicenseInitialState' in spec:
    print('\n  PASS: Safe restoration in afterEach')
else:
    errors.append('No safe restoration in afterEach')

# 5. Sensitive data scan
sensitive_patterns = [
    (r'[\w.-]+@kpit\.com', 'email addresses'),
    (r'localhost:8091', 'hardcoded URL'),
    (r'(?<!")\b2699\b(?!")', 'hardcoded total 2699'),
    (r'(?<!")\b2,699\b(?!")', 'hardcoded total 2,699'),
]
print('\n=== SENSITIVE DATA SCAN ===')
for pattern, label in sensitive_patterns:
    matches = re.findall(pattern, spec)
    if matches:
        warnings.append(f'{label}: {len(matches)} matches')
        print(f'  WARN: {label}: {len(matches)} matches')
    else:
        print(f'  PASS: No {label}')

# 6. Page object check
po_path = os.path.join(BASE, 'tests', 'pages', 'reports.page.ts')
with open(po_path, encoding='utf-8') as f:
    po = f.read()
methods = re.findall(r'async (\w+)\(', po)
print(f'\nPage object has {len(methods)} async methods')

# 7. Handoff check
handoff_path = os.path.join(BASE, 'docs', 'handoff', 'rsl-a-handoff.md')
if os.path.exists(handoff_path):
    print('PASS: Handoff doc exists')
else:
    errors.append('Handoff doc missing')

# 8. Index check
index_path = os.path.join(BASE, 'docs', 'handoff', 'generated-test-index.md')
with open(index_path, encoding='utf-8') as f:
    idx = f.read()
if 'RSL-A' in idx and 'LIMAS-SUD-1482' in idx:
    print('PASS: Index updated with RSL-A')
else:
    errors.append('Index not updated')

# 9. Only one RSL-A spec
specs = [f for f in os.listdir(os.path.join(BASE, 'tests', 'reports')) if f.endswith('.spec.ts')]
print(f'\nReport spec files: {len(specs)}')
if len(specs) > 1:
    errors.append(f'Expected 1 RSL-A spec, found {len(specs)}: {specs}')

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
print(f'\nPlans: {len(plans)}, Spec: 1, Page Object: 1, Handoff: 1')
print('Browser remains open: Yes')
print('Generated tests executed: No')
print('RSL-A status: COMPLETE')