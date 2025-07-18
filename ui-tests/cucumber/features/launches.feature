Feature: Launches
  Background:
    Given I navigate to "Launches" page

  Scenario: As a user I should see column names
    Then "Column Titles" collection should equal "launchesTableTitles" data

  Scenario: As a user I should be able to remove launch
    When I get "Launch Item Names" element text and save as "launchName"
      And I click on first "Hamburger Menu" element
      And I click on second "Delete Option" element
      And I click on "Delete Submit Button" element
      And I reload "Launches" page
    Then "Launch Item Names" collection should not include "launchName" member
