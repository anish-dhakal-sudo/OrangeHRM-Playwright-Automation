import { test, expect } from '@playwright/test';

import { LoginPage } from '../pages/login.page';
import { DashboardPage } from '../pages/dashboard.page';
import { PimPage } from '../pages/pim.page';
import { AdminPage } from '../pages/admin.page';
import { RecruitmentPage } from '../pages/recruitment.page';

import {
  generateEmployee,
  generateSystemUser,
  generateCandidate
} from '../utils/test-data';


test.describe('Complete Workflow', () => {

  test('admin can complete employee, user and candidate workflow', async ({ page }) => {

    // test.setTimeout(180_000);

    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const pimPage = new PimPage(page);
    const adminPage = new AdminPage(page);
    const recruitmentPage = new RecruitmentPage(page);

    const employee = generateEmployee();
    const systemUser = generateSystemUser();
    const candidate = generateCandidate();


    // Login

    await loginPage.goto();

    await loginPage.login(
      process.env.ORANGEHRM_USERNAME!,
      process.env.ORANGEHRM_PASSWORD!
    );


    // Create Employee

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


    // Create System User

    await dashboardPage.goToAdmin();

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


    // Create Candidate

    await dashboardPage.goToRecruitment();

    await recruitmentPage.clickAddCandidate();

    await recruitmentPage.addCandidate(
      candidate.firstName,
      candidate.middleName,
      candidate.lastName,
      candidate.email
    );

    await expect(
      recruitmentPage.firstNameInput
    ).toHaveValue(candidate.firstName);

    await expect(
      recruitmentPage.lastNameInput
    ).toHaveValue(candidate.lastName);

  });

});