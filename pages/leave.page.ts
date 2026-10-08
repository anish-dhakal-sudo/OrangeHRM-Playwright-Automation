import { Page, Locator } from '@playwright/test';

export class LeavePage {

  readonly page: Page;

  readonly assignLeaveMenu: Locator;
  readonly assignLeaveHeading: Locator;

  readonly employeeNameInput: Locator;
  readonly leaveTypeDropdown: Locator;
  readonly fromDateInput: Locator;
  readonly toDateInput: Locator;
  readonly commentsInput: Locator;
  readonly assignButton: Locator;


  constructor(page: Page) {

    this.page = page;

    this.assignLeaveMenu = page.getByText(
      'Assign Leave'
    );

    this.assignLeaveHeading = page.getByRole(
      'heading',
      {
        name: 'Assign Leave'
      }
    );

    this.employeeNameInput = page
      .locator('.oxd-input-group')
      .filter({
        hasText: 'Employee Name'
      })
      .locator('input');

    this.leaveTypeDropdown = page
      .locator('.oxd-input-group')
      .filter({
        hasText: 'Leave Type'
      })
      .locator('.oxd-select-text');

    this.fromDateInput = page
      .locator('.oxd-input-group')
      .filter({
        hasText: 'From Date'
      })
      .locator('input');

    this.toDateInput = page
      .locator('.oxd-input-group')
      .filter({
        hasText: 'To Date'
      })
      .locator('input');

    this.commentsInput = page.locator(
      'textarea'
    );

    this.assignButton = page.getByRole(
      'button',
      {
        name: 'Assign'
      }
    );


  }


  async goToAssignLeave() {

    await this.assignLeaveMenu.click();

  }


  async selectEmployee(
    firstName: string,
    lastName: string
  ) {

    await this.employeeNameInput.fill(firstName);

    await this.page
      .getByRole('option')
      .filter({
        hasText: firstName
      })
      .filter({
        hasText: lastName
      })
      .click();

  }


  async selectLeaveType() {

    await this.leaveTypeDropdown.click();

    await this.page
      .getByRole('option')
      .first()
      .click();

  }

}