import { faker } from '@faker-js/faker';

export function generateEmployee() {

  return {
    firstName: faker.person.firstName(),
    middleName: faker.person.middleName(),
    lastName: faker.person.lastName(),
    employeeId: faker.string.numeric(7)
  };

}


export function generateUpdatedEmployee() {

    return {
        firstName: faker.person.firstName(),
        middleName: faker.person.middleName(),
        lastName: faker.person.lastName()
    };

}

export function generateSystemUser() {

  return {
    username: faker.internet.username().replace(/[^a-zA-Z0-9]/g, ''),
    password: 'Admin@12345'
  };

}

export function generateCandidate() {

  return {
    firstName: faker.person.firstName(),
    middleName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email()
  };

}