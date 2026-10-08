import { test, expect } from '@playwright/test';

import { LoginPage } from '../pages/login.page';
import { DashboardPage } from '../pages/dashboard.page';
import { RecruitmentPage } from '../pages/recruitment.page';

import { generateCandidate } from '../utils/test-data';


test.describe('Recruitment Tests', () => {

  test('admin can add a candidate', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const recruitmentPage = new RecruitmentPage(page);

    const candidate = generateCandidate();


    await loginPage.goto();

    await loginPage.login(
      process.env.ORANGEHRM_USERNAME!,
      process.env.ORANGEHRM_PASSWORD!
    );


    // Go to Recruitment

    await dashboardPage.goToRecruitment();


    await expect(
      recruitmentPage.candidatesHeading
    ).toBeVisible();


    // Add Candidate

    await recruitmentPage.clickAddCandidate();


    await recruitmentPage.addCandidate(
      candidate.firstName,
      candidate.middleName,
      candidate.lastName,
      candidate.email
    );


    // Verify candidate details

    await expect(
      recruitmentPage.firstNameInput
    ).toHaveValue(candidate.firstName);

    await expect(
      recruitmentPage.lastNameInput
    ).toHaveValue(candidate.lastName);

  });

});