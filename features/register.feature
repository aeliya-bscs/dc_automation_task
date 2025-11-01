Feature: User Registration


# Testcase : 1 : Successful registration, verifcation of success message and user data.
Scenario: Fill all registration fields from feature file
  Given I am on the registration page
  When I fill all registration fields with:
    | Field        | Value                  |
    | First Name   | John                   |
    | Last Name    | Doe                    |
    | Email        | john.doe@example.com   |
    | Phone Number | 1234567890             |
    | Password     | Password123            |
  And I click on the Register button
  Then I should see a success message
  Then verify all data


  # Testcase : 2 : verify all input fields should be cleared after registration.
Scenario: Fill all registration fields from feature file
  Given I am on the registration page
  When I fill all registration fields with:
    | Field        | Value                  |
    | First Name   | John                   |
    | Last Name    | Doe                    |
    | Email        | john.doe@example.com   |
    | Phone Number | 1234567890             |
    | Password     | Password123            |
    | Country      | New Zealand            |
  And I click on the Register button
  Then I should see a success message
  Then all input fields should be cleared after registration

# Testcase : 3 : User tries to register without entering phone number

 Scenario: Register without phone number
    Given I am on the registration page
    When I enter "John" in the "first name" field
    And I enter "Doe" in the "last name" field
    And I enter "Password123" in the "password" field
    And I click on the Register button
    Then I should see an error message for the missing phone number


#  Testcase : 4 : User tries to register without entering password

 Scenario: Register without password
    Given I am on the registration page
    When I enter "John" in the "first name" field
    And I enter "Doe" in the "last name" field
    And I enter "1234567890" in the "phone number" field
    And I click on the Register button
    Then I should see an error message for the missing password

# Testcase : 5 : User tries to register without entering last name
  Scenario: Register without Last Name
    Given I am on the registration page
    When I enter "John" in the "first name" field
    And I enter "1234567890" in the "phone number" field
    And I enter "Password123" in the "password" field
    And I click on the Register button
    Then I should see an error message for the missing Last Name

# Testcase : 6 : User tries to register without entering email

 Scenario: Register without Email
    Given I am on the registration page
    When I enter "John" in the "first name" field
    And I enter "Doe" in the "last name" field
    And I enter "1234567890" in the "phone number" field
    And I enter "Password123" in the "password" field
    And I click on the Register button
    Then I should see an error message for the missing Email


# Testcase : 7 : Term and condition checkbox functionality

Scenario:Term and condition checkbox is not functional 
    Given I am on the registration page
    When I enter "John" in the "first name" field
    And I enter "Doe" in the "last name" field
    And I enter "1234567890" in the "phone number" field
    And I enter "Password123" in the "password" field
    When I click on the Terms and Conditions checkbox
    Then the Terms and Conditions checkbox should be selected
    And I should see a validation message for the checkbox


# Testcase : 8 : No validation shown if user enter invalid email format.
Scenario:  No validation shown if user enter invalid email format.
    Given I am on the registration page
    When I enter "John" in the "first name" field
    And I enter "Doe" in the "last name" field
    And I enter "1234567890" in the "phone number" field
    And I enter "Password123" in the "password" field
    And I enter "testd123" in the "email" field
    And I click on the Register button
    Then I should see a validation error for invalid email format


  # Testcase : 9 : verify  password field length should not be less than 6 characters.

  Scenario: Verify password field should not be less than 6 characters
  Given I am on the registration page
  And I enter "12345" in the "phone number" field
  When I enter a password less than 6 characters
  And I click on the Register button
  Then error message should be shown

  # Testcase : 10 : verify password field length should be equal to 20 characters.

  Scenario: Verify password field accepts only up to 20 characters
  Given I am on the registration page
  And I enter "1234567890" in the "phone number" field
  When I enter a password equal to 20 characters
  And I click on the Register button
    
  # Testcase : 11 : verify  password field length should not be greater than 20 characters.

  Scenario: Verify password field should not accepts more than 20 characters
  Given I am on the registration page
  And I enter "1234567890" in the "phone number" field
  When I enter a password greater to 20 characters
  And I click on the Register button
  Then error message should be shown

 