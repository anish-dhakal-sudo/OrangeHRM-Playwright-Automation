import { Page, Locator } from '@playwright/test';

export class RecruitmentPage {

  readonly page: Page;

  readonly candidatesHeading: Locator;
  readonly addButton: Locator;

  readonly firstNameInput: Locator;
  readonly middleNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;

  readonly saveButton: Locator;


  constructor(page: Page) {

    this.page = page;


    // Candidates page

    this.candidatesHeading = page.getByRole(
      'heading',
      {
        name: 'Candidates'
      }
    );

    this.addButton = page.getByRole(
      'button',
      {
        name: 'Add'
      }
    );


    // Add Candidate page

    this.firstNameInput = page.locator(
      'input[name="firstName"]'
    );

    this.middleNameInput = page.locator(
      'input[name="middleName"]'
    );

    this.lastNameInput = page.locator(
      'input[name="lastName"]'
    );

    this.emailInput = page
      .locator('.oxd-input-group')
      .filter({
        hasText: 'Email'
      })
      .locator('input');

    this.saveButton = page.getByRole(
      'button',
      {
        name: 'Save'
      }
    );

  }


  async clickAddCandidate() {

    await this.addButton.click();

  }


  async addCandidate(
    firstName: string,
    middleName: string,
    lastName: string,
    email: string
  ) {

    await this.firstNameInput.fill(firstName);

    await this.middleNameInput.fill(middleName);

    await this.lastNameInput.fill(lastName);

    await this.emailInput.fill(email);

    await this.saveButton.click();

  }

}