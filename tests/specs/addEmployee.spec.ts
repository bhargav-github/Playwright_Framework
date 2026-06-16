import { test, expect, Page } from '@playwright/test';
import { ENV } from '../config/env.js'
import { Data } from '../data/testData.js'
import { LoginPage } from '../pages/loginPage.js'
import { AddEmployeePage } from '../pages/addEmployeePage.js';
import { ExcelReader } from '../helpers/excelReader.js';

const bulkEmployee = ExcelReader("./tests/data/bulkEmployeeList.xlsx", "BulkEmployee") as Array<
    {
        firstName: string; lastName: string; nickName: string; filePath: string;
    }>;
test.describe("Add employees", () => {
    let loginPage: LoginPage;
    let addEmployee: AddEmployeePage;

    test.beforeEach("Login to the appplication", async ({ page }) => {
        loginPage = new LoginPage(page);
        addEmployee = new AddEmployeePage(page);
        loginPage.navigateToURL();
        await page.waitForTimeout(3000);
        loginPage.login(ENV.USERNAME, ENV.PASSWORD)
        await page.waitForTimeout(3000);
    });
    test.skip("TC001- verify the addd Employee Page visible", async ({ page }) => {
        addEmployee.HoverOnPIM();
        await page.waitForTimeout(2000);
        addEmployee.AddEmployeeEle();
        await page.waitForTimeout(2000);
        addEmployee.verifyAddEmployeePageVisible();
        await page.waitForTimeout(2000);
    })

    test.skip("TC002- Verify the single Employee Data", async ({ page }) => {
        addEmployee.HoverOnPIM();
        await page.waitForTimeout(3000);
        addEmployee.AddEmployeeEle();
        await page.waitForTimeout(2000);
        addEmployee.verifyAddEmployeePageVisible();
        await page.waitForTimeout(2000);
        addEmployee.empID();
        await page.waitForTimeout(1000);
        addEmployee.fillLastName(Data.singleEmployeeData.lastName);
        await page.waitForTimeout(1000);
        addEmployee.fillFirstName(Data.singleEmployeeData.firstName);
        await page.waitForTimeout(1000);
        addEmployee.fillNickName(Data.singleEmployeeData.nickName);
        await page.waitForTimeout(1000);
    });

    test.skip("TC003- Verify the upload file", async ({ page }) => {
        addEmployee.HoverOnPIM();
        await page.waitForTimeout(3000);
        addEmployee.AddEmployeeEle();
        await page.waitForTimeout(2000);
        addEmployee.verifyAddEmployeePageVisible();
        await page.waitForTimeout(2000);
        addEmployee.empUploadFile(Data.singleEmployeeData.filePath);
        await page.waitForTimeout(4000);

    });

    test.skip("TC004- Add the Single Employee from test data", async ({ page }) => {
        addEmployee.HoverOnPIM();
        await page.waitForTimeout(3000);
        addEmployee.AddEmployeeEle();
        await page.waitForTimeout(2000);
        addEmployee.verifyAddEmployeePageVisible();
        await page.waitForTimeout(4000);
        addEmployee.empID();
        await page.waitForTimeout(4000);
        addEmployee.fillLastName(Data.singleEmployeeData.lastName);
        await page.waitForTimeout(4000);
        addEmployee.fillFirstName(Data.singleEmployeeData.firstName);
        await page.waitForTimeout(4000);
        addEmployee.fillNickName(Data.singleEmployeeData.nickName);
        await page.waitForTimeout(4000);
        addEmployee.empUploadFile(Data.singleEmployeeData.filePath);
        await page.waitForTimeout(4000);
        addEmployee.empSaveBtn();
        await page.waitForTimeout(4000);
        addEmployee.verifyPersonalDetailsHeader();
        await page.waitForTimeout(4000);
    });

    for (const emp of bulkEmployee) {
        test.skip(`TC005- Add Multiple Employee of ${emp.lastName} from excel`, async ({ page }) => {
            addEmployee.HoverOnPIM();
            await page.waitForTimeout(3000);
            addEmployee.AddEmployeeEle();
            await page.waitForTimeout(4000);
            addEmployee.verifyAddEmployeePageVisible();
            await page.waitForTimeout(3000);
            addEmployee.empID();
            await page.waitForTimeout(2000);
            addEmployee.fillLastName(emp.lastName);
             await page.waitForTimeout(2000);
            addEmployee.fillFirstName(emp.firstName);
             await page.waitForTimeout(2000);
            addEmployee.fillNickName(emp.nickName);
            await page.waitForTimeout(3000);
            await addEmployee.empUploadFile(emp.filePath);
             await page.waitForTimeout(3000);
            //  await page.pause();
           await addEmployee.empSaveBtn();
            // await page.waitForTimeout(3000);
            // await addEmployee.verifyPersonalDetailsHeader();
            // await page.waitForTimeout(3000);
            //bhargav	Mogali	bha	./cat.jpg
        });
    }
    
    test("Delete the Employees from the Employee Information Individually", async({page})=>{

    });


})