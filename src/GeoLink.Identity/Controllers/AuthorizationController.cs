using System.Configuration;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.DirectoryServices.AccountManagement;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using GeoLink.Identity.Authorization;
using Microsoft.AspNetCore.Authentication.Negotiate;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace GeoLink.Identity.Controllers;

[ApiController]
[Route("[controller]")]
public class AuthorizationController : ControllerBase
{
    private readonly ILogger<AuthorizationController> _logger;
    private readonly JwtConfiguration _jwtConfiguration;
    private readonly UserManager<IdentityUser> _userManager;

    public AuthorizationController(
        ILogger<AuthorizationController> logger,
        IOptions<JwtConfiguration> jwtConfiguration,
        UserManager<IdentityUser> userManager)
    {
        _logger = logger;
        _jwtConfiguration = jwtConfiguration.Value;
        _userManager = userManager;
    }

    [Authorize(AuthenticationSchemes = NegotiateDefaults.AuthenticationScheme)]
    [HttpGet("token")]
    public async Task<ActionResult<string>> GetToken()
    {
        var userName = User.Identity?.Name;

        if (userName is null)
            return Unauthorized();
        
        // TODO: Firstly we should check here if user has proper AD role assigned to.
        // TODO: Then we should check user privileges against Identity DB and prepare the JWT Token and Claims and return it

        var jwtToken = await CreateJwtToken();
        
        return jwtToken;
    }

    private async Task<string> CreateJwtToken()
    {
        var exists = await _userManager.FindByNameAsync(User.Identity.Name);
        
        var key = Encoding.ASCII.GetBytes(_jwtConfiguration.Key);
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[]
            {
                new Claim("Id", Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Sub, User.Identity.Name),
                new Claim(JwtRegisteredClaimNames.Email, User.Identity.Name),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                // TODO: Here we can add new claims with permissions from Identity DB
            }),
            Expires = DateTime.UtcNow.AddMinutes(5),
            Issuer = _jwtConfiguration.Issuer,
            Audience = _jwtConfiguration.Audience,
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha512Signature)
        };
        var tokenHandler = new JwtSecurityTokenHandler();
        var token = tokenHandler.CreateToken(tokenDescriptor);
        var jwtToken = tokenHandler.WriteToken(token);
        
        return jwtToken;
    }

    // private static List<string> GetUserADGroups(string userName)
    // {
    //     if (userName is null)
    //         return new List<string>();
    //
    //     using var ctx = new PrincipalContext(ContextType.Domain);
    //     using var user = UserPrincipal.FindByIdentity(ctx, userName);
    //     
    //     if (user is null)
    //         return new List<string>();
    //
    //     return user
    //         .GetGroups()
    //         .Select(x => x.SamAccountName)
    //         .ToList();
    // }
}