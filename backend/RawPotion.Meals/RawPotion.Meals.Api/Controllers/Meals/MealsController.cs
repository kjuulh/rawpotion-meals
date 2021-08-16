using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using RawPotion.Meals.Application.Features.MealParticipation.Command.
    ParticipateInMeal;
using RawPotion.Meals.Application.Features.Meals.Commands.CreateMealForGroup;
using RawPotion.Meals.Application.Features.Meals.Queries.GetMealById;

namespace Rawpotion.Meals.Api.Controllers.Meals
{
    [Route("/api/meals/")]
    public class MealsController : BaseApiController
    {
        [HttpPost(Name = "Create meal")]
        public async Task<MealBriefVm> CreateMealAsync(
            [FromBody] CreateMealForGroupCommand request)
            => await Mediator.Send(request);

        [HttpGet("{mealId}", Name = "Get meal by id")]
        public async Task<MealVm> GetMealById([FromRoute] int mealId)
            => await Mediator.Send(new GetMealByIdQuery {MealId = mealId});

        [HttpPost(
            "{mealId}/participate/{userId}",
            Name = "Participate in meal")]
        public async Task<MealVm> ParticipateInMealAsync(
            [FromRoute] int mealId,
            [FromRoute] int userId)
            => await Mediator.Send(
                new ParticipateInMealCommand
                {
                    MealId = mealId,
                    UserId = userId,
                    Participate = true
                });

        [HttpDelete(
            "{mealId}/participate/{userId}",
            Name = "Dont participate in meal")]
        public async Task<MealVm>
            DontParticipateInMealAsync(
                [FromRoute] int mealId,
                [FromRoute] int userId)
            => await Mediator.Send(
                new ParticipateInMealCommand
                {
                    MealId = mealId,
                    UserId = userId,
                    Participate = false
                });
    }
}