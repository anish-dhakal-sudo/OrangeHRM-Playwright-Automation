import { test, expect } from '@playwright/test';

import { LoginPage } from '../pages/login.page';
import { DashboardPage } from '../pages/dashboard.page';
import { PimPage } from '../pages/pim.page';
import { LeavePage } from '../pages/leave.page';
import { generateEmployee } from '../utils/test-data';


test.describe('Leave Tests', () => {

    test('admin can assign leave to an employee', async ({ page }) => {

        test.setTimeout(120_000);

        const loginPage = new LoginPage(page);
        const dashboardPage = new DashboardPage(page);
        const pimPage = new PimPage(page);
        const leavePage = new LeavePage(page);

        const employee = generateEmployee();


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


        // Go to Leave

        await dashboardPage.goToLeave();

        await leavePage.goToAssignLeave();

        await expect(page).toHaveURL(
            /leave\/assignLeave/
        );

        await expect(
            leavePage.assignLeaveHeading
        ).toBeVisible();


        // Select created employee

        await leavePage.selectEmployee(
            employee.firstName,
            employee.lastName
        );


        // Select available leave type

        await leavePage.selectLeaveType();


        await expect(
            page.getByText(/Day\(s\)/)
        ).toBeVisible();

    });

});