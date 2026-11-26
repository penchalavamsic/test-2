import fs from 'fs';
import path from 'path';
import ExcelJS from 'exceljs';

const root = path.resolve(__dirname, '../..');
export const checklistPath = path.resolve(root, process.env.LIMAS_CHECKLIST_PATH || 'inventory/LIMAS_3_Simple_Test_Checklist_AUTH-01_ADDED.xlsx');
let catalog: Promise<Map<string, Record<string, string>>> | undefined;
export function loadCaseCatalog(): Promise<Map<string, Record<string, string>>> {
  return catalog ??= (async () => {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(checklistPath);
    const sheet = workbook.getWorksheet('Test Checklist');
    if (!sheet) throw new Error('Checklist is missing the Test Checklist sheet');
    const result = new Map<string, Record<string, string>>();
    let headers: string[] = [];
    sheet.eachRow(row => {
      const values = Array.from({ length: row.cellCount }, (_, i) => row.getCell(i + 1).text);
      if (values[0] === 'Test ID') { headers = values; return; }
      if (!/^LIMAS-[A-Z]+-\d+$/.test(values[0] || '')) return;
      if (result.has(values[0])) throw new Error(`Duplicate checklist ID: ${values[0]}`);
      result.set(values[0], Object.fromEntries(headers.map((header, i) => [header, values[i] ?? ''])));
    });
    return result;
  })();
}
let plans: string[] | undefined;
export function findPlans(testId: string): string[] {
  function walk(dir: string): string[] {
    return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry =>
      entry.isDirectory() ? walk(path.join(dir, entry.name)) : [path.join(dir, entry.name)]);
  }
  plans ??= walk(path.join(root, 'plans')).filter(file => file.endsWith('.md'));
  return plans.filter(file => path.basename(file).startsWith(`${testId}-`) || path.basename(file) === `${testId}.md`);
}
