using System;
using System.Diagnostics;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.Extensions.Logging;
using RawPotion.Meals.Application.Interfaces.Authentication;

namespace RawPotion.Meals.Application.Common.Behaviors
{
    public class PerformanceBehaviour<TRequest, TResponse>
        : IPipelineBehavior<TRequest, TResponse>
    {
        private readonly Stopwatch _timer;
        private readonly ILogger<TRequest> _logger;
        private readonly ICurrentUserService _currentUserService;

        public PerformanceBehaviour(ILogger<TRequest> logger)
        {
            _timer = new Stopwatch();

            _logger = logger;
        }

        public async Task<TResponse> Handle(
            TRequest request,
            CancellationToken cancellationToken,
            RequestHandlerDelegate<TResponse> next)
        {
            _timer.Start();

            var response = await next();

            _timer.Stop();

            var elapsedMilliseconds = _timer.ElapsedMilliseconds;

            if (elapsedMilliseconds > 500)
            {
                var requestName = typeof(TRequest).Name;

                _logger.LogWarning(
                    "RawPotion.Meals Long Running Request: {Name} ({ElapsedMilliseconds} milliseconds) {@Request}",
                    requestName,
                    elapsedMilliseconds,
                    request);
            }

            return response;
        }
    }
}