import { Page, Locator } from '@playwright/test'
import { commonMethods } from '../helpers/commonMethods.js'
import { ENV } from '../config/env.js'

export class LoginPage {
    readonly page: Page;
    readonly common: commonMethods;
    readonly loginNameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly link: Locator;

    constructor(page: Page) {
        this.page = page;
        this.common = new commonMethods(page);
        this.loginNameInput = page.locator("input[name='txtUserName']");
        this.passwordInput = page.locator("input[name='txtPassword']");
        this.loginButton = page.locator("input[value='Login']");
        this.link = page.locator("//a");
    }

    async navigateToURL() {
        await this.common.navigateTo(ENV.BASE_URL);
    }

    async login(userName: string, userPswd: string) {
        await this.common.clearAndType(this.loginNameInput, userName);
        await this.common.clearAndType(this.passwordInput, userPswd);
        await this.common.clickBtn(this.loginButton);
    }

    async verifyLink(link: string) {
        await this.common.linkIsPresent(this.link, link);
    }

}