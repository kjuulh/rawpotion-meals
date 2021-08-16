using System.ComponentModel.DataAnnotations;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using RawPotion.Meals.Application.Common.Exceptions;
using RawPotion.Meals.Application.Features.Users.Commands.RegisterUser;
using RawPotion.Meals.Application.Interfaces;

namespace RawPotion.Meals.Application.Features.Users.Queries.GetUserById
{
    public class GetUserByIdQuery : IRequest<UserVm>
    {
        [Required]
        public int UserId { get; init; }
    }

    public class GetUserByIdQueryHandler
        : IRequestHandler<GetUserByIdQuery, UserVm>
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public GetUserByIdQueryHandler(
            IUserRepository userRepository,
            IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }

        public async Task<UserVm> Handle(
            GetUserByIdQuery request,
            CancellationToken cancellationToken)
        {
            var user = await _userRepository.GetUserByIdAsync(request.UserId);

            if (user is null)
                throw new NotFoundException("user", request.UserId);

            return _mapper.Map<UserVm>(user);
        }
    }
}