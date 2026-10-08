import { test, expect } from '@playwright/test';

import { LoginPage } from '../pages/login.page';


test.describe('Login Tests', () => {


  test('user can login with valid credentials', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.login(
      process.env.ORANGEHRM_USERNAME!,
      process.env.ORANGEHRM_PASSWORD!
    );

    await expect(page).toHaveURL(/dashboard/);

  });


  test('user cannot login with invalid credentials', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.login(
      'wronguser',
      'wrongpassword'
    );

    await expect(
      loginPage.errorMessage
    ).toHaveText('Invalid credentials');

  });


});