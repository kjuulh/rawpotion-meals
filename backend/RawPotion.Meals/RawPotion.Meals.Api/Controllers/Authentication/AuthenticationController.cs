using System;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RawPotion.Meals.Domain.Features.Authentication;

namespace Rawpotion.Meals.Api.Controllers.Authentication
{
    [ApiController]
    [Route("/api/authentication")]
    [AllowAnonymous]
    public class AuthenticationController : ControllerBase
    {
        private readonly IAuthenticationService _authenticationService;

        public AuthenticationController(IAuthenticationService authenticationService)
        {
            _authenticationService = authenticationService;
        }

        public record AuthenticateUserRequest
        {
            [Required] public string Email { get; init; } = null!;

            [Required] public string Password { get; init; } = null!;
        }

        public record AuthenticateUserResponse
        {
            public string AccessToken { get; set; }
            public int UserId { get; set; }
            public string Email { get; set; }
        };

        [HttpPost(Name = "Authenticate user")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(AuthenticateUserResponse))]
        public async Task<ActionResult<AuthenticateUserResponse>> AuthenticateUserAsync(
            [FromBody] AuthenticateUserRequest request)
        {
            var (accessToken, refreshToken, userId) =
                await _authenticationService.Authenticate(request.Email, request.Password, IpAddress());
            SetTokenCookie(refreshToken);

            return Ok(new AuthenticateUserResponse
            {
                AccessToken = accessToken,
                Email = request.Email,
                UserId = userId
            });
        }

        [HttpGet("refresh-token", Name = "Refresh user token")]
        public async Task<ActionResult<AuthenticationResponse>> RefreshTokenAsync()
        {
            var refreshToken = Request.Cookies["refreshToken"];
            var response = await _authenticationService.RefreshToken(refreshToken, IpAddress());
            SetTokenCookie(response.refreshToken);
            return Ok(response.authenticateResponse);
        }

        private string? IpAddress()
        {
            if (Request.Headers.ContainsKey("X-Forwarded-For"))
                return Request.Headers["X-Forwarded-For"];
            return HttpContext.Connection.RemoteIpAddress?.MapToIPv4().ToString();
        }

        private void SetTokenCookie(string token)
        {
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Expires = DateTimeOffset.UtcNow.AddMonths(3)
            };
            Response.Cookies.Append("refreshToken", token, cookieOptions);
        }
    }
}