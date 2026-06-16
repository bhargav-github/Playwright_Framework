import myExcel from 'xlsx'
import path from 'path'

export function ExcelReader(filePath: string, sheetName: string): any
{
    const workBook = myExcel.readFile(filePath);
    const sheet = workBook.Sheets[sheetName]!;
    const myData = myExcel.utils.sheet_to_json(sheet) as any[][];
    return myData;
}