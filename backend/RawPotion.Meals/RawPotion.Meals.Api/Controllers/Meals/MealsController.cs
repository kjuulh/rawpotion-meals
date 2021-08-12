using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Rawpotion.Meals.Api.Controllers.User;
using RawPotion.Meals.Application.Interfaces.Authentication;
using RawPotion.Meals.Application.Interfaces.Meals;
using RawPotion.Meals.Domain.Entities;

namespace Rawpotion.Meals.Api.Controllers.Meals
{
    [Route("/api/meals/")]
    public class MealsController : BaseApiController
    {
        private readonly IMealsService _mealsService;
        private readonly ICurrentUserService _currentUserService;

        public MealsController(
            IMealsService mealsService,
            ICurrentUserService currentUserService)
        {
            _mealsService = mealsService;
            _currentUserService = currentUserService;
        }

        public record CreateMealRequest
        {
            [Required]
            public string Recipe { get; init; }

            [Required]
            public int GroupId { get; set; }

            [Required]
            public string Date { get; init; }
        }

        [HttpPost(Name = "Create meal")]
        public async Task<ActionResult<MealDto>> CreateMealAsync(
            [FromBody] CreateMealRequest request)
        {
            var userId = _currentUserService.UserId;
            Meal meal = await _mealsService.CreateMealAsync(
                userId,
                request.GroupId,
                request.Recipe,
                request.Date);

            return Ok(
                new MealDto()
                {
                    Id = meal.Id,
                    Host = new UserController.UserDto()
                    {
                        Id = meal.Host.Id,
                        Email = meal.Host.Email,
                        Username = meal.Host.Username
                    },
                    Group = new UserController.GroupDto() {Id = meal.Id},
                    Recipe = meal.Recipe,
                    Date = meal.Date,
                });
        }
    }

    public record MealDto
    {
        public int Id { get; set; }
        public UserController.UserDto Host { get; set; }
        public UserController.GroupDto Group { get; set; }
        public string Recipe { get; set; }
        public string Date { get; set; }
    }
}