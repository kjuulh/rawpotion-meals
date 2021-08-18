using System.ComponentModel.DataAnnotations;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using RawPotion.Meals.Application.Interfaces.Authentication;
using RawPotion.Meals.Application.Interfaces.Meals;

namespace RawPotion.Meals.Application.Features.Meals.Commands.CreateMealForGroup
{
    public class CreateMealForGroupCommand : IRequest<MealBriefVm>
    {
        [Required]
        public string Recipe { get; init; }
        
        public string? Description { get; set; }

        [Required]
        public int GroupId { get; set; }

        [Required]
        public string Date { get; init; }
    }

    public class CreateMealForGroupCommandHandler
        : IRequestHandler<CreateMealForGroupCommand, MealBriefVm>
    {
        private readonly IMealsService _mealsService;
        private readonly ICurrentUserService _currentUserService;
        private readonly IMapper _mapper;

        public CreateMealForGroupCommandHandler(
            IMealsService mealsService,
            ICurrentUserService currentUserService,
            IMapper mapper)
        {
            _mealsService = mealsService;
            _currentUserService = currentUserService;
            _mapper = mapper;
        }

        public async Task<MealBriefVm> Handle(
            CreateMealForGroupCommand request,
            CancellationToken cancellationToken)
        {
            var userId = _currentUserService.UserId;
            var meal = await _mealsService.CreateMealAsync(
                userId,
                request.GroupId,
                request.Recipe,
                request.Description,
                request.Date);

            return _mapper.Map<MealBriefVm>(meal);
        }
    }
}