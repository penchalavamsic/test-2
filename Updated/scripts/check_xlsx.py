from pathlib import Path
import openpyxl
wb = openpyxl.load_workbook(str(Path(__file__).resolve().parent.parent / "inventory/LIMAS_3_Simple_Test_Checklist.xlsx"))
print('Sheets:', wb.sheetnames)
ws = wb['Checklist']
print('Dimensions:', ws.dimensions)
print('Max row:', ws.max_row)
print('Max col:', ws.max_column)
for row in range(max(1, ws.max_row - 5), ws.max_row + 1):
    vals = []
    for col in range(1, min(ws.max_column + 1, 8)):
        cell = ws.cell(row=row, column=col)
        vals.append(f'{cell.value}')
    print(f'Row {row}: {vals}')
# Check Summary sheet
if 'Summary' in wb.sheetnames:
    ws2 = wb['Summary']
    print('\nSummary sheet rows:', ws2.max_row)
    for row in range(1, ws2.max_row + 1):
        vals = []
        for col in range(1, 5):
            cell = ws2.cell(row=row, column=col)
            vals.append(f'{cell.value}')
        print(f'Summary Row {row}: {vals}')
wb.close()