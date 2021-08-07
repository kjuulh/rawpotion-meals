using System;
using TechTalk.SpecFlow;

namespace Rawpotion.Meals.Acceptance.Steps
{
    [Binding]
    public sealed class AuthenticationStepDefinitions
    {
        // For additional details on SpecFlow step definitions see https://go.specflow.org/doc-stepdef

        private readonly ScenarioContext _scenarioContext;
        private string _username;
        private string _password;

        public AuthenticationStepDefinitions(ScenarioContext scenarioContext)
        {
            _scenarioContext = scenarioContext;
        }

        [Given(@"username is ""(.*)""")]
        public void GivenUsernameIs(string username)
        {
            _username = username;
        }

        [Given(@"password is ""(.*)""")]
        public void GivenPasswordIs(string password)
        {
            _password = password;
        }

        [When(@"the credentials are validated")]
        public void WhenTheCredentialsAreValidated()
        {
            if (_username != "kjuulh" || _password != "Blizzard12")
            {
                throw new InvalidOperationException("Either of the credentials was incorrect");
            }
        }

        [Then(@"the user should be signed in and an access token returned")]
        public void ThenTheUserShouldBeSignedInAndAnAccessTokenReturned()
        {
            
        }
    }
}