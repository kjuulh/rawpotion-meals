using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using RawPotion.Meals.Application.Features.WeatherForecasts.Queries;
using RawPotion.Meals.Application.Features.WeatherForecasts.Queries.
    GetWeatherForecasts;

namespace Rawpotion.Meals.Api.Controllers
{
    [Route("[controller]")]
    public class WeatherForecastController : BaseApiController
    {
        [HttpGet]
        public async Task<IEnumerable<WeatherForecast>> Get()
            => await Mediator.Send(new GetWeatherForecastsQuery());
    }
}