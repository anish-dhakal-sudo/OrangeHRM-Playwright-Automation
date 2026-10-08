import { Page, Locator } from '@playwright/test';

export class DashboardPage {

  readonly page: Page;
  readonly pimMenu: Locator;
  readonly adminMenu: Locator;
  readonly leaveMenu: Locator;
  readonly recruitmentMenu: Locator;

  constructor(page: Page) {

    this.page = page;

    this.pimMenu = page.getByRole('link', {
      name: 'PIM'
    });

    this.adminMenu = page.getByRole('link', {
      name: 'Admin',
      exact: true
    });

    this.leaveMenu = page.getByRole('link', {
      name: 'Leave'
    });

    this.recruitmentMenu = page.getByRole('link', {
      name: 'Recruitment'
    });

  }


  async goToPIM() {

    await this.pimMenu.click();

  }


  async goToAdmin() {

    await this.adminMenu.click();

  }

  async goToLeave() {

    await this.leaveMenu.click();

  }

  async goToRecruitment() {

    await this.recruitmentMenu.click();

  }

}