using System;
using System.ComponentModel.DataAnnotations;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using RawPotion.Meals.Application.Common.Exceptions;
using RawPotion.Meals.Application.Features.Meals.Queries.GetMealById;
using RawPotion.Meals.Application.Interfaces.Authentication;
using RawPotion.Meals.Application.Interfaces.MealParticipation;
using RawPotion.Meals.Application.Interfaces.Meals;

namespace RawPotion.Meals.Application.Features.MealParticipation.Command.
    ParticipateInMeal
{
    public class ParticipateInMealCommand : IRequest<MealVm>
    {
        [Required]
        public int MealId { get; set; }

        [Required]
        public int UserId { get; set; }

        [Required]
        public bool Participate { get; set; }
    }

    public class ParticipateInMealCommandHandler
        : IRequestHandler<ParticipateInMealCommand, MealVm>
    {
        private readonly ICurrentUserService _currentUserService;

        private readonly IMealParticipationRepository
            _mealParticipationRepository;

        private readonly IMealsRepository _mealsRepository;

        private readonly IMapper _mapper;

        public ParticipateInMealCommandHandler(
            ICurrentUserService currentUserService,
            IMealParticipationRepository mealParticipationRepository,
            IMealsRepository mealsRepository,
            IMapper mapper)
        {
            _currentUserService = currentUserService;
            _mealParticipationRepository = mealParticipationRepository;
            _mealsRepository = mealsRepository;
            _mapper = mapper;
        }

        public async Task<MealVm> Handle(
            ParticipateInMealCommand request,
            CancellationToken cancellationToken)
        {
            var userId = _currentUserService.UserId;

            if (userId != request.UserId)
                throw new NotAuthorizedException();

            var success = await _mealParticipationRepository
                .SetParticipatingStatusForUserAsync(
                    request.MealId,
                    request.UserId,
                    request.Participate);

            if (!success)
                throw new ApplicationException("Something went wrong");

            var meal = await _mealsRepository.GetMealByIdAsync(request.MealId);

            return _mapper.Map<MealVm>(meal);
        }
    }
}