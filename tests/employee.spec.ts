import { test, expect } from '@playwright/test';

import { LoginPage } from '../pages/login.page';
import { DashboardPage } from '../pages/dashboard.page';
import { PimPage } from '../pages/pim.page';

import {
  generateEmployee,
  generateUpdatedEmployee
} from '../utils/test-data';


test.describe('Employee Management Tests', () => {


  test('admin can add a new employee', async ({ page }) => {

    const loginPage = new LoginPage(page);

    const dashboardPage = new DashboardPage(page);

    const pimPage = new PimPage(page);


    const employee = generateEmployee();


    await loginPage.goto();

    await loginPage.login(
      process.env.ORANGEHRM_USERNAME!,
      process.env.ORANGEHRM_PASSWORD!
    );


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
      pimPage.personalDetailsHeading
    ).toBeVisible();

    await expect(
      pimPage.firstNameInput
    ).toHaveValue(employee.firstName);

    await expect(
      pimPage.middleNameInput
    ).toHaveValue(employee.middleName);

    await expect(
      pimPage.lastNameInput
    ).toHaveValue(employee.lastName);

    await expect(
      pimPage.employeeIdInput
    ).toHaveValue(employee.employeeId);

    // Go to Employee List

    await pimPage.goToEmployeeList();

    // Search employee

    await pimPage.searchEmployeeById(
      employee.employeeId
    );

    // Verify search result

    await expect(
      pimPage.employeeTable
    ).toContainText(employee.employeeId);


    await expect(
      pimPage.employeeTable
    ).toContainText(employee.firstName);


    await expect(
      pimPage.employeeTable
    ).toContainText(employee.lastName);


    const updatedEmployee = generateUpdatedEmployee();


    await pimPage.openEmployeeRecord(
      employee.employeeId
    );


    await expect(page).toHaveURL(
      /viewPersonalDetails/
    );


    // Wait until the employee's existing data is fully loaded
    await expect(
      pimPage.firstNameInput
    ).toHaveValue(employee.firstName, {
      timeout: 30_000
    });

    await expect(
      pimPage.middleNameInput
    ).toHaveValue(employee.middleName, {
      timeout: 30_000
    });

    await expect(
      pimPage.lastNameInput
    ).toHaveValue(employee.lastName, {
      timeout: 30_000
    });

    // Now update the employee
    await pimPage.updateEmployee(
      updatedEmployee.firstName,
      updatedEmployee.middleName,
      updatedEmployee.lastName
    );

    // Verify update succeeded
    await expect(
      pimPage.successToast
    ).toBeVisible();

    await expect(
      pimPage.personalDetailsHeading
    ).toBeVisible();


    // Verify persisted values
    await expect(
      pimPage.firstNameInput
    ).toHaveValue(updatedEmployee.firstName);

    await expect(
      pimPage.middleNameInput
    ).toHaveValue(updatedEmployee.middleName);

    await expect(
      pimPage.lastNameInput
    ).toHaveValue(updatedEmployee.lastName);


    // Verify updated employee in Employee List

    await pimPage.goToEmployeeList();

    await pimPage.searchEmployeeById(
      employee.employeeId
    );

    await expect(
      pimPage.employeeTable
    ).toContainText(updatedEmployee.firstName);

    await expect(
      pimPage.employeeTable
    ).toContainText(updatedEmployee.middleName);

    await expect(
      pimPage.employeeTable
    ).toContainText(updatedEmployee.lastName);


    // Delete employee

    await pimPage.deleteEmployee(
      employee.employeeId
    );

    // Verify employee was deleted

    await expect(
      pimPage.employeeRows
    ).toHaveCount(0);


  });


});