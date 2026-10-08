import { test, expect } from '@playwright/test';

import { LoginPage } from '../pages/login.page';
import { DashboardPage } from '../pages/dashboard.page';
import { PimPage } from '../pages/pim.page';
import { AdminPage } from '../pages/admin.page';
import {
  generateEmployee,
  generateSystemUser
} from '../utils/test-data';


test.describe('Admin - User Management Tests', () => {

  test('admin can access System Users', async ({ page }) => {

    test.setTimeout(120_000);

    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const pimPage = new PimPage(page);
    const adminPage = new AdminPage(page);


    const employee = generateEmployee();
    const systemUser = generateSystemUser();


    await loginPage.goto();

    await loginPage.login(
      process.env.ORANGEHRM_USERNAME!,
      process.env.ORANGEHRM_PASSWORD!
    );


    // Create employee

    await dashboardPage.goToPIM();

    await pimPage.clickAddEmployee();

    await pimPage.addEmployee(
      employee.firstName,
      employee.middleName,
      employee.lastName,
      employee.employeeId
    );

    await expect(page).toHaveURL(
      /viewPersonalDetails/
    );

    await expect(
      pimPage.firstNameInput
    ).toHaveValue(employee.firstName);


    // Go to Admin

    await dashboardPage.goToAdmin();

    await expect(
      adminPage.systemUsersHeading
    ).toBeVisible();


    // Add system user

    await adminPage.clickAddUser();

    await adminPage.addUser(
      'ESS',
      employee.firstName,
      employee.lastName,
      'Enabled',
      systemUser.username,
      systemUser.password
    );

    await expect(page).toHaveURL(
      /admin\/viewSystemUsers/
    );

    await adminPage.searchUserByUsername(
      systemUser.username
    );

    await expect(
      adminPage.userTable
    ).toContainText(systemUser.username);

    await expect(
      adminPage.userTable
    ).toContainText('ESS');

    await expect(
      adminPage.userTable
    ).toContainText('Enabled');

  });

});