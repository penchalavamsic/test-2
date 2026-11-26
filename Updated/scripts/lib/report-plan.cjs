function resolveReportPlan({ workbookRow, atomicPlan, mappingWarning }) {
  const shifted = workbookRow && /^(Read-only|Data-changing|Destructive)$/i.test(String(workbookRow['Expected Result'] || '').trim()) && /^(Generated|Reviewed|Pending)$/i.test(String(workbookRow.Type || '').trim());
  const warning = [shifted ? 'Workbook columns are misplaced: the Expected Result cell contains a classification. The existing atomic plan is shown for review; this does not establish correct workbook coverage.' : '', mappingWarning || ''].filter(Boolean).join(' ');
  const row = shifted ? null : workbookRow;
  const raw = row ? '# Purpose\n\n' + row['Test Case Title'] + '\n\n# Preconditions\n\n' + row.Preconditions + '\n\n# Test Steps\n\n' + row['Test Steps'] + '\n\n# Expected Final Result\n\n' + row['Expected Result'] + '\n' : atomicPlan || null;
  return { raw, warning, source: row ? 'workbook' : raw ? 'atomic-plan' : 'unavailable' };
}
module.exports = { resolveReportPlan };
