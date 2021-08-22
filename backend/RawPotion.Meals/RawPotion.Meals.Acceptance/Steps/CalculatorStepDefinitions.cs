using FluentAssertions;
using TechTalk.SpecFlow;

namespace RawPotion.Meals.Acceptance.Steps
{
    [Binding]
    public sealed class CalculatorStepDefinitions
    {
        // For additional details on SpecFlow step definitions see https://go.specflow.org/doc-stepdef
        private static int _number;
        private static int _firstNumber;
        private static int _secondNumber;

        private readonly ScenarioContext _scenarioContext;

        public CalculatorStepDefinitions(
            ScenarioContext scenarioContext)
        {
            _scenarioContext = scenarioContext;
        }

        [Given("the first number is (.*)")]
        public void GivenTheFirstNumberIs(
            int number)
        {
            _firstNumber = number;
        }

        [Given("the second number is (.*)")]
        public void GivenTheSecondNumberIs(
            int number)
        {
            _secondNumber = number;
        }

        [When("the two numbers are added")]
        public void WhenTheTwoNumbersAreAdded()
        {
            _number = _firstNumber + _secondNumber;
        }

        [Then("the result should be (.*)")]
        public void ThenTheResultShouldBe(
            int result)
        {
            _number.Should()
                .Be(result);
        }
    }
}