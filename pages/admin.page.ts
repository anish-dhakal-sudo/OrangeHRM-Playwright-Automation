import { Page, Locator } from '@playwright/test';

export class AdminPage {

  readonly page: Page;

  // System Users page
  readonly systemUsersHeading: Locator;
  readonly addUserButton: Locator;

  // Search / Filter
  readonly usernameInput: Locator;
  readonly employeeNameInput: Locator;
  readonly searchButton: Locator;

  // User table
  readonly userTable: Locator;
  readonly userRows: Locator;

  // Add User
  readonly userRoleDropdown: Locator;
  readonly employeeNameAddInput: Locator;
  readonly statusDropdown: Locator;
  readonly addUsernameInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly saveButton: Locator;


  constructor(page: Page) {

    this.page = page;


    // System Users page

    this.systemUsersHeading = page.getByRole(
      'heading',
      {
        name: 'System Users'
      }
    );

    this.addUserButton = page.getByRole(
      'button',
      {
        name: 'Add'
      }
    );


    // Search / Filter

    this.usernameInput = page
      .locator('.oxd-input-group')
      .filter({
        hasText: 'Username'
      })
      .locator('input');

    this.employeeNameInput = page
      .locator('.oxd-input-group')
      .filter({
        hasText: 'Employee Name'
      })
      .locator('input');

    this.searchButton = page.getByRole(
      'button',
      {
        name: 'Search'
      }
    );


    // User table

    this.userTable = page.locator(
      '.oxd-table-body'
    );

    this.userRows = this.userTable.locator(
      '.oxd-table-row'
    );

    // Add User

    this.userRoleDropdown = page
      .locator('.oxd-input-group')
      .filter({
        hasText: 'User Role'
      })
      .locator('.oxd-select-text');

    this.employeeNameAddInput = page
      .locator('.oxd-input-group')
      .filter({
        hasText: 'Employee Name'
      })
      .locator('input');

    this.statusDropdown = page
      .locator('.oxd-input-group')
      .filter({
        hasText: 'Status'
      })
      .locator('.oxd-select-text');

    this.addUsernameInput = page
      .locator('.oxd-input-group')
      .filter({
        hasText: 'Username'
      })
      .locator('input');

    this.passwordInput = page
      .locator('input[type="password"]')
      .nth(0);

    this.confirmPasswordInput = page
      .locator('input[type="password"]')
      .nth(1);

    this.saveButton = page.getByRole(
      'button',
      {
        name: 'Save'
      }
    );

  }


  async clickAddUser() {

    await this.addUserButton.click();

  }


  async searchUserByUsername(username: string) {

    await this.usernameInput.fill(username);

    await this.searchButton.click();

  }

  async selectUserRole(role: string) {

    await this.userRoleDropdown.click();

    await this.page
      .getByRole('option', {
        name: role
      })
      .click();

  }

  async selectStatus(status: string) {

    await this.statusDropdown.click();

    await this.page
      .getByRole('option', {
        name: status
      })
      .click();

  }

  async selectEmployee(
    firstName: string,
    lastName: string
  ) {

    await this.employeeNameAddInput.fill(firstName);

    const employeeOption = this.page
      .getByRole('option')
      .filter({
        hasText: firstName
      })
      .filter({
        hasText: lastName
      });

    await employeeOption.click();

  }

  async addUser(
    role: string,
    employeeFirstName: string,
    employeeLastName: string,
    status: string,
    username: string,
    password: string
  ) {

    await this.selectUserRole(role);

    await this.selectEmployee(
      employeeFirstName,
      employeeLastName
    );

    await this.selectStatus(status);

    await this.addUsernameInput.fill(username);

    await this.passwordInput.fill(password);

    await this.confirmPasswordInput.fill(password);

    await this.saveButton.click();

  }

}