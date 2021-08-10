using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Rawpotion.Meals.Api.Controllers
{
    [ApiController]
    [Authorize]
    public class BaseApiController : ControllerBase
    {
    }
}