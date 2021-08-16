using System.ComponentModel.DataAnnotations;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using RawPotion.Meals.Application.Interfaces;

namespace RawPotion.Meals.Application.Features.Users.Commands.RegisterUser
{
    public class RegisterUserCommand : IRequest<UserVm>
    {
        [Required]
        public string Username { get; init; }

        [Required]
        public string Email { get; init; }

        [Required]
        public string Password { get; init; }
    }

    public class RegisterUserCommandHandler
        : IRequestHandler<RegisterUserCommand, UserVm>
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public RegisterUserCommandHandler(
            IUserRepository userRepository,
            IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }

        public async Task<UserVm> Handle(
            RegisterUserCommand request,
            CancellationToken cancellationToken)
        {
            var user = await _userRepository.RegisterAsync(
                request.Username,
                request.Email,
                request.Password);

            return _mapper.Map<UserVm>(user);
        }
    }
}