using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using RawPotion.Meals.Application.Common.Exceptions;
using RawPotion.Meals.Application.Interfaces.Authentication;
using RawPotion.Meals.Application.Interfaces.Meals;
using RawPotion.Meals.Domain.Entities;

namespace RawPotion.Meals.Application.Features.Meals.Queries.GetMealById
{
    public class GetMealByIdQuery : IRequest<MealVm>
    {
        [Required]
        public int MealId { get; set; }
    }

    public class GetMealByIdQueryHandler
        : IRequestHandler<GetMealByIdQuery, MealVm>
    {
        private readonly ICurrentUserService _currentUserService;
        private readonly IMealsRepository _mealsRepository;
        private readonly IMapper _mapper;

        public GetMealByIdQueryHandler(
            ICurrentUserService currentUserService,
            IMealsRepository mealsRepository,
            IMapper mapper)
        {
            _currentUserService = currentUserService;
            _mealsRepository = mealsRepository;
            _mapper = mapper;
        }

        public async Task<MealVm> Handle(
            GetMealByIdQuery request,
            CancellationToken cancellationToken)
        {
            var userId = _currentUserService.UserId;
            Meal meal = await _mealsRepository.GetMealByIdAsync(request.MealId);

            if (!meal.Group.Members.Any(m => m.Id == userId))
                throw new NotAuthorizedException("meals, userId", userId);

            return _mapper.Map<MealVm>(meal);
        }
    }
}