Feature: Launches
  Background:
    Given I navigate to "Launches" page

  Scenario: As a user I should see column names
    Then "columnTitles" collection should equal "launchesTableTitles" data

  Scenario: As a user I should be able to remove launch
    When I get "launchItemNames" element text and save as "launchName"
      And I click on "hamburgerMenu" element by index 0
      And I click on "deleteOption" element by index 1
      And I click on "deleteSubmitButton" element
      And I reload "Launches" page
    Then "launchItemNames" collection should not include "launchName" member