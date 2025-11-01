const { Given, When, Then } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const { expect } = require('@playwright/test');
const RegisterPage = require('../../pages/RegisterPage');
const assert = require('assert');

let browser, context, page, registerPage;

Given('I am on the registration page', { timeout: 20 * 1000 }, async function () {
  browser = await chromium.launch({ headless: true });
  context = await browser.newContext();
  page = await context.newPage();
  registerPage = new RegisterPage(page);
  await registerPage.navigate();
});


When('I enter {string} in the {string} field', async function (value, field) {
  switch(field.toLowerCase()) {
    case 'first name':
      await registerPage.enterFirstName(value);
      break;
    case 'last name':
      await registerPage.enterLastName(value);
      break;
    case 'phone number':
      await registerPage.enterPhoneNumber(value);
      break;
    case 'password':
      await registerPage.enterPassword(value);
      break;
      case 'email':
      await registerPage.enterEmail(value);
      break;
    default:
      throw new Error(`Field ${field} is not defined`);
  }
});
When('I click on the Register button', async function () {
  await registerPage.clickRegister();
});

Then('I should see an error message for the missing Last Name', async function () {
  const errorText = await registerPage.getErrorMessage();
  assert(errorText.includes('Last Name is required'));
  await browser.close();
});
Then('I should see an error message for the missing Email', async function () {
  const errorText = await registerPage.getErrorMessage();
  assert(errorText.includes('Email is required'));
  await browser.close();
})
When('I click on the Terms and Conditions checkbox', async function () {
  await registerPage.clickTermsCheckbox();
});

Then('the Terms and Conditions checkbox should be selected', async function () {
  const isChecked = await registerPage.isTermsChecked();
  assert.strictEqual(isChecked, true, 'Checkbox should be checked');
});
Then('I should see a validation error for invalid email format', async function () {
  // Adjust the selector below based on your app's validation element
  const errorText = await registerPage.getErrorMessage();
  assert(errorText.includes('Invalid Email'));
  await browser.close();
});
When('I fill all registration fields with:', async function (dataTable) {
  // Convert the table to an array of rows
  const rows = dataTable.raw(); // Returns a 2D array including headers

  // Skip the first row (headers)
  for (let i = 1; i < rows.length; i++) {
    const field = rows[i][0];
    const value = rows[i][1];

    switch (field.toLowerCase()) {
      case 'first name':
        await registerPage.enterFirstName(value);
        break;
      case 'last name':
        await registerPage.enterLastName(value);
        break;
      case 'email':
        await registerPage.enterEmail(value);
        break;
      case 'phone number':
        await registerPage.enterPhoneNumber(value);
        break;
      case 'password':
        await registerPage.enterPassword(value);
        break;
      case 'country':
        await registerPage.selectCountry(value);
        break;
      default:
        throw new Error(`Unknown field: ${field}`);
    }
  }
});
Then('I should see a success message', async function () {
  const message = await registerPage.getSuccessMessage();
  expect(message).toContain('Successfully registered');
  //await browser.close();
});
Then('verify all data', async function () {
  

  const firstName = await registerPage.getFirstName();
  const lastName = await registerPage.getLastName();
  const email = await registerPage.getEmail();
  const phone = await registerPage.getPhoneNumber();
  const country = await registerPage.getCountry();

  expect(firstName).toBe('First Name: John');
  expect(email).toBe('Email: john.doe@example.com');
  expect(country).toBe('Country: New Zealand');
  expect(lastName).toBe('Last Name: Doe');
  expect(phone).toBe('Phone Number: 1234567890');

  await browser.close();
});

Then('all input fields should be cleared after registration', async function () {
  // Verify text inputs
  expect(await registerPage.getFirstName()).toBe('');
  expect(await registerPage.getLastName()).toBe('');
  expect(await registerPage.getEmail()).toBe('');
  expect(await registerPage.getPhoneNumber()).toBe('');

  // Verify dropdown resets to default (optional)
  const selectedCountry = await registerPage.getSelectedCountry();
  expect(selectedCountry).toBe(''); // or default value
});
When('I enter a password less than 6 characters', async function () {
  const shortPassword = 'a'.repeat(5); // 5 characters
  await registerPage.enterPassword(shortPassword);
});

Then('I enter a password equal to 20 characters', async function () {
  const enteredPassword = await registerPage.getPasswordValue();
  expect(enteredPassword.length).toBeLessThanOrEqual(20);

  const errorMessage = await registerPage.getPasswordError();
  expect(errorMessage).toBe('');
});

When('I enter a password greater to 20 characters', async function () {
  const longPassword = 'a'.repeat(22); // 20 characters
  await registerPage.enterPassword(longPassword);
});
Then('error message should be shown', async function () {
  const errorMessage = await registerPage.getPasswordError();
  expect(errorMessage).toContain('The password should contain between [6,20] characters!');
});
Then('I should see a validation message for the checkbox', async function () {
  const checkboxError = await registerPage.getCheckboxError();
  expect(checkboxError).toContain('You must agree to the terms and conditions');
});
Then('I should see an error message for the missing phone number', async function () {
  const message = await registerPage.getPhoneNumberMessage();
  expect(message).toContain('The phone number should contain at least 10 characters!');
  //await browser.close();
});
Then('I should see an error message for the missing password', async function () {
  const message = await registerPage.getPasswordError();
  expect(message).toContain('The password should contain between [6,20] characters!');
  //await browser.close();
});