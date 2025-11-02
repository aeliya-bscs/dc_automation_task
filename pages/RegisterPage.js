class RegisterPage {
  constructor(page) {
    this.page = page;
    this.firstNameField = '#firstName';
    this.lastNameField = '#lastName';
    this.passwordField='#password'
    this.emailField='#emailAddress'
    this.phoneNumber='#phone'
    this.countryDropdown = '#countries_dropdown_menu';
    this.terms='#exampleCheck1'

    this.registerButton = '#registerBtn';
    this.errorMessage = '#message';
    this.successMessage = '#message';
    this.resultFirstName='#resultFn';
    this.resultLastName='#resultLn';
    this.resultPhone='#resultPhone';
    this.resultCountry='#country';
    this.resultEmail='#resultEmail';
    this.passwordError='#message';
    this.phoneNumberMessage = '#message';




  }

  async navigate() {
    await this.page.goto('https://qa-practice.netlify.app/bugs-form');
  }

  async enterFirstName(fname) {
    await this.page.fill(this.firstNameField, fname);
  }
async enterLastName(lname) {
    await this.page.fill(this.lastNameField, lname);
  }
  async enterPassword(pass) {
    await this.page.fill(this.passwordField, pass);
  }
    async enterEmail(email) {
    await this.page.fill(this.emailField, email);
  }
   async enterPhoneNumber(phone) {
    await this.page.fill(this.phoneNumber, phone);
  }
  
   async selectCountry(countryName) {
    await this.page.selectOption(this.countryDropdown, { label: countryName });
  }

  async clickTermsCheckbox() {
    await this.page.click(this.terms);
  }

  async isTermsChecked() {
    return await this.page.isChecked(this.terms);
  }

  async clickRegister() {
    await this.page.click(this.registerButton);
  }

  async getErrorMessage() {
    return await this.page.textContent(this.errorMessage);
  }
   async getSuccessMessage() {
    return await this.page.textContent(this.successMessage);
  }
  async getFirstName() {
    return await this.page.textContent(this.resultFirstName); //  inputValue returns only the value
      }
  async getLastName() {
    return await this.page.textContent(this.resultLastName);
  }
  async getEmail() {
    return await this.page.textContent(this.resultEmail);
  }
  async getCountry() {
    return await this.page.textContent(this.resultCountry);
  }
  async getPhoneNumber() {
    return await this.page.textContent(this.resultPhone);
  }
  async getPasswordValue() {
  return await this.page.$eval(this.passwordField, el => el.value);
}
async getPasswordError(){
    return await this.page.textContent(this.passwordError);

}
async getPhoneNumberMessage(){
    return await this.page.textContent(this.phoneNumberMessage);

}
}

module.exports = RegisterPage;
