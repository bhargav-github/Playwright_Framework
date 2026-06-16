import {Page, Locator, expect} from '@playwright/test'
import {commonMethods} from '../helpers/commonMethods.js'
import {ENV} from '../config/env.js'
import {Data} from '../data/testData.js'

export class AddEmployeePage{
    readonly page: Page;
    readonly common : commonMethods;
    readonly PIM:Locator;
    readonly AddEmp:Locator;
    readonly frameEle = "//iframe[@name='rightMenu']";
    readonly headerEle = "//h2";
    readonly employeeId = "input#txtEmployeeId";
    readonly empFirstName = "input#txtEmpFirstName";
    readonly empLastName = "input#txtEmpLastName";
    readonly empNickName = "input#txtEmpNickName";
    readonly empUploadEle = "input#photofile";
    readonly emplSaveBtn = "input.savebutton";
    

    constructor(page: Page)
    {
        this.page = page;
        this.common = new commonMethods(page);
        this.PIM = page.locator("li#pim span.drop.current");
        this.AddEmp = page.locator("a[href*='capturemode=addmod']");
    }

    async HoverOnPIM()
    {
        await this.common.hoverTheElement(this.PIM);
    }

    async AddEmployeeEle()
    {
        await this.common.clickBtn(this.AddEmp);
    }

    async verifyAddEmployeePageVisible()
    {
        const frames =  await this.common.eleInTheFrame(this.frameEle,this.headerEle); 
       expect(await frames.textContent()).toContain(Data.addEmployee.header);
    }

    async empID()
    {
        this.common.fillInFrame(this.frameEle,this.employeeId,Math.floor(Math.random() * 10000).toString());

    }

    async fillLastName(value: string)
    {
        this.common.fillInFrame(this.frameEle, this.empLastName,value);
    }

    async fillFirstName(value: string)
    {
        this.common.fillInFrame(this.frameEle, this.empFirstName,value);
    }

    async fillNickName(value: string)
    {
        this.common.fillInFrame(this.frameEle, this.empNickName,value);
    }

    async empUploadFile(filePath:string)
    {
        const frames =  await this.common.eleInTheFrame(this.frameEle,this.empUploadEle); 
        console.log("filepath             "+filePath);
        await frames.waitFor({state:"visible"})
        frames.setInputFiles(filePath);
    }

    async empSaveBtn()
    {
        this.common.clickEleInFrame(this.frameEle, this.emplSaveBtn);
    }

    async verifyPersonalDetailsHeader()
    {
        const frames =  await this.common.eleInTheFrame(this.frameEle,this.headerEle); 
       expect(await frames.textContent()).toContain(Data.singleEmployeeData.header);
    }
    
}