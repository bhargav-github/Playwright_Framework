import { test, expect, Page } from '@playwright/test';
import { ENV } from '../config/env.js'
import { LoginPage } from '../pages/loginPage.js';
import { Data } from '../data/testData.js'

test.describe("Login Page Test", () => {
    let loginPage: LoginPage
    test.beforeEach("creating the instance of page", ({ page }) => {
        loginPage = new LoginPage(page);
    });

    test("TC001 - validate the login", async ({ page }) => {
        loginPage.navigateToURL();
        await page.waitForTimeout(3000);
        loginPage.login(ENV.USERNAME.trim(), ENV.PASSWORD.trim());
        await page.waitForTimeout(3000);
    })

    test("TC002 - Validate the link", async ({ page }) => {
        loginPage.navigateToURL();
        await page.waitForTimeout(3000);
        loginPage.verifyLink(Data.links.LoginLink);
        await page.waitForTimeout(3000);
    })


})