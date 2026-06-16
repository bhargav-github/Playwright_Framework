import { Page, Locator, expect } from '@playwright/test';
import { commonMethods } from '../helpers/commonMethods.js'
import { ENV } from '../config/env.js'
import { promises } from 'dns';

export class EmployeeInformationPage {
    readonly page: Page;
    readonly common: commonMethods;
    readonly checkBoxs = "input.checkbox";
    readonly checkBox = "//input[@name='chkLocID[]']";
    readonly deleteEle = "//input[@value='Delete']";
    readonly frameEle = "//iframe[@name='rightMenu']";
    readonly employeeId = "//tbody//td[1]/following-sibling::td[1]";
    readonly searchBy = "select#loc_code";
    readonly searchByEmpId = "input#loc_name";
    readonly searchBtn = "//input[@value='Search']";

    constructor(page: Page) {
        this.page = page;
        this.common = new commonMethods(page);
        // this.deleteEle = page.locator("//input[@value='Delete']");
    }

    async checkBoxsCount(): Promise<any> {
        const ele = await this.common.checkBoxSelection(this.checkBoxs);
        return await ele.count();
    }

    async checkBoxSelect(num: number) {
        const ele = await this.common.checkBoxSelection(this.checkBoxs);
        await ele.nth(num).check();
    }

    async checkBoxSelectInFrame() {
        const ele = await this.common.eleInTheFrame(this.frameEle, this.checkBox);
        await ele.check();
        await this.page.waitForTimeout(3000);
    }


    async deleteTheEmployee() {

        const ele = await this.common.eleInTheFrame(this.frameEle, this.deleteEle);
        await ele.click();
        await this.page.waitForTimeout(3000);

    }

    async getAllEmployeeIds() {
        const ele = await this.common.eleInTheFrame(this.frameEle, this.employeeId);
        const count = await ele.count();
        const ids: string[] = [];

        for (let i = 0; i < count; i++) {
            const id = await ele.nth(i).textContent();
            ids.push((id ?? '').trim());
        }
        return ids;
    }

    async searchByEmployeeID(id: string) {
        await this.common.fillInFrame(this.frameEle, this.searchByEmpId, id);
        await this.page.waitForTimeout(3000);
        await this.common.clickEleInFrame(this.frameEle, this.searchBtn);
        await this.page.waitForTimeout(3000);

    }


    async selectByDD() {
        await this.common.seleByDDInFrame(this.frameEle, this.searchBy, "Emp. ID");
        await this.page.waitForTimeout(3000);
    }


}