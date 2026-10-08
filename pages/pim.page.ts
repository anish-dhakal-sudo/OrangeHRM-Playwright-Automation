import { Page, Locator } from '@playwright/test';

export class PimPage {

    readonly page: Page;

    readonly addButton: Locator;

    readonly firstNameInput: Locator;
    readonly middleNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly employeeIdInput: Locator;

    readonly saveButton: Locator;
    readonly successToast: Locator;

    readonly personalDetailsHeading: Locator;

    readonly employeeListLink: Locator;
    readonly employeeIdSearchInput: Locator;
    readonly searchButton: Locator;
    readonly employeeTable: Locator;
    readonly employeeRows: Locator;



    constructor(page: Page) {

        this.page = page;

        this.addButton = page.getByRole('button', {
            name: 'Add'
        });

        this.firstNameInput = page.locator(
            'input[name="firstName"]'
        );

        this.middleNameInput = page.locator(
            'input[name="middleName"]'
        );

        this.lastNameInput = page.locator(
            'input[name="lastName"]'
        );

        this.employeeIdInput = page
            .locator('.oxd-input-group')
            .filter({ hasText: 'Employee Id' })
            .locator('input');

        this.saveButton = page
            .locator('form:has(input[name="firstName"])')
            .getByRole('button', {
                name: 'Save'
            });

        this.successToast = page.getByText(
            'Successfully Updated',
            {
                exact: true
            }
        );


        this.personalDetailsHeading = page.getByRole(
            'heading',
            {
                name: 'Personal Details'
            }
        );

        this.employeeListLink = page.getByText(
            'Employee List',
            {
                exact: true
            }
        );

        this.employeeIdSearchInput = page
            .locator('.oxd-input-group')
            .filter({ hasText: 'Employee Id' })
            .locator('input');


        this.searchButton = page.getByRole('button', {
            name: 'Search'
        });

        this.employeeTable = page.locator(
            '.oxd-table-body'
        );

        this.employeeRows = this.employeeTable.locator(
            '.oxd-table-row'
        );

    }


    async clickAddEmployee() {

        await this.addButton.click();

    }


    async addEmployee(
        firstName: string,
        middleName: string,
        lastName: string,
        employeeId: string
    ) {

        await this.firstNameInput.fill(firstName);

        await this.middleNameInput.fill(middleName);

        await this.lastNameInput.fill(lastName);

        await this.employeeIdInput.fill(employeeId);

        await this.saveButton.click();
    }


    async goToEmployeeList() {

        await this.employeeListLink.click();

    }

    async searchEmployeeById(employeeId: string) {

        await this.employeeIdSearchInput.fill(employeeId);

        await this.searchButton.click();

    }


    async openEmployeeRecord(employeeId: string) {

        await this.page
            .locator('.oxd-table-body .oxd-table-row')
            .filter({
                hasText: employeeId
            })
            .click();

    }

    async updateEmployee(
        firstName: string,
        middleName: string,
        lastName: string
    ) {

        await this.firstNameInput.fill(firstName);

        await this.middleNameInput.fill(middleName);

        await this.lastNameInput.fill(lastName);

        await this.saveButton.click();

    }


    async deleteEmployee(employeeId: string) {

        const employeeRow = this.page
            .locator('.oxd-table-body .oxd-table-row')
            .filter({
                hasText: employeeId
            });

        await employeeRow
            .locator('button')
            .nth(1)
            .click();

        await this.page
            .getByRole('button', {
                name: 'Yes, Delete'
            })
            .click();

    }


}