using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

namespace Rawpotion.Meals.Api.Controllers
{
    [ApiController]
    [Authorize]
    public class BaseApiController : ControllerBase
    {
        private ISender? _mediator;

        protected ISender Mediator
            => _mediator ??=
                HttpContext.RequestServices.GetRequiredService<ISender>();
    }
}