import { Page, Locator, expect } from '@playwright/test'
import { TIMEOUT } from 'dns';
import { url } from 'inspector';
import myExcel from 'xlsx';

export class commonMethods {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    //Navigation
    async navigateTo(Url: string) {
        await this.page.goto(Url);
        // await this.page.waitForLoadState("networkidle");
        await this.page.waitForTimeout(4000);
    }

    async refreshPage() {
        await this.page.reload();
        await this.page.waitForLoadState("networkidle");
    }

    async clearAndType(locator: Locator, text: string) {
        await locator.clear();
        await locator.fill(text, { timeout: 10000 });
    }

    async clickBtn(locator: Locator) {
        await locator.click({ timeout: 10000 });
    }

    async linkIsPresent(linkLocator: Locator, link: string) {

        expect(await linkLocator.getAttribute("href")).toContain(link);
    }

    async selectDropDown(locator: Locator, value: string) {
        await locator.selectOption(value);
    }

    async hoverTheElement(locator: Locator) {
        await locator.hover();
    }

    // ─── Wait Helpers ─────────────────────────────────────

    async waitForElement(locator: Locator) {
        await locator.waitFor({ state: "visible", timeout: 10000 });
    }

    async waitForElementToDisappear(locator: Locator) {
        await locator.waitFor({ state: "visible", timeout: 10000 });
    }

    async waitForURL(url: string) {
        await this.page.waitForURL(url);
    }

    // _________Asseration _________________

    async verifyText(locator: Locator, expectedText: string) {
        await expect(locator).toContainText(expectedText);
    }

    async verifyURL(expectedURL: string) {
        await expect(this.page).toHaveURL(expectedURL);
    }

    async verifyTitle(expectedTitle: string) {
        await expect(this.page).toHaveTitle(expectedTitle);
    }

    // __________ScreenShot______________

    async screenShot(name: string) {
        await this.page.screenshot({
            path: `screenshots/${name}.png`,
            fullPage: true,
        });
    }

    // ─── Alert / Dialog ───────────────────────────────────

    async acceptAlert() {
        this.page.on("dialog", async (dialog) => {
            dialog.accept();
        });
    }

    async dismissAlert() {
        this.page.on("dialog", async (dialog) => {
            dialog.dismiss();
        });
    }

    async getAlertText(expectedAlertText: string) {
        this.page.on("dialog", async (dialog) => {
            expect(dialog.message()).toBe(expectedAlertText);
        });
    }
    //  async getAlertType(alertType:string): Promise<string>
    //  {
    //     this.page.on("dialog", async(dialoge) =>{
    //        return dialoge.type();
    //     });
    //  }

    async framesCount(): Promise<number> {
        return this.page.frames.length;
    }

    async eleInTheFrame(frameEle: string, webEle: string): Promise<Locator> {
        return this.page.frameLocator(frameEle).locator(webEle);
    }

    async fillInFrame(frameLocator: string, elementLocator: string, value: string) {
        const ele = this.page.frameLocator(frameLocator).locator(elementLocator);
        ele.waitFor({ state: "visible", timeout: 10000 });
        ele.fill(value);
    }

    async clickEleInFrame(frameLocator: string, elementLocator: string) {
        const ele = await this.eleInTheFrame(frameLocator, elementLocator);
        ele.waitFor({ state: "visible", timeout: 10000 });
        ele.click();
    }

    async seleByDDInFrame(frameLocator: string, elementLocator: string, value: string){
        const ele = this.page.frameLocator(frameLocator).locator(elementLocator);
        ele.waitFor({ state: "visible", timeout: 10000 });
        ele.selectOption(value);
    }

    async checkBoxSelection(checkBoxs: string): Promise<Locator>
    {
        return this.page.locator(checkBoxs);
    }

    async checkBoxSelectionInFrame(frameLocator: string, elementLocator: string)
    {
        const ele = this.page.frameLocator(frameLocator).locator(elementLocator);
        ele.waitFor({ state: "visible", timeout: 10000 });
        ele.check();
    }

}