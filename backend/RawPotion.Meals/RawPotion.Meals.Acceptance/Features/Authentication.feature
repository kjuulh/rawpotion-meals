Feature: Authentication
User authentication service. Can facilitate proof of id verification

    @rawpotion
    Scenario: User is logged in using username and password
        Given username is "kjuulh"
        And password is "Blizzard123"
        When the credentials are validated
        Then the user should be signed in and an access token returned