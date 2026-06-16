import { test, expect, Page } from '@playwright/test';
import { ENV } from '../config/env.js'
import { LoginPage } from '../pages/loginPage.js';
import { EmployeeInformationPage } from '../pages/employeeInformationPage.js'
import { Data } from '../data/testData.js'

test.describe("Delete the employee from employee information list", () => {
    let loginPage: LoginPage;
    let empInfoPage: EmployeeInformationPage;

    test.beforeEach("creating the instance of page", async ({ page }) => {
        loginPage = new LoginPage(page);
        empInfoPage = new EmployeeInformationPage(page);
        loginPage.navigateToURL();
        await page.waitForTimeout(3000);
        loginPage.login(ENV.USERNAME, ENV.PASSWORD)
        await page.waitForTimeout(3000);
        const count = empInfoPage.checkBoxsCount();
    });

    test("Deleting the Employee individually", async ({ page }) => {
        const allIds = await empInfoPage.getAllEmployeeIds();
        console.log(allIds);
        test.setTimeout(120000);
        await empInfoPage.selectByDD();
        for (const id of allIds) {
            console.log(`Deleted Employee Id: ${id}`);
            await empInfoPage.searchByEmployeeID(id);
            await empInfoPage.checkBoxSelectInFrame();
            await empInfoPage.deleteTheEmployee();
        }

    });



});